import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.error(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let responseMessage = (exception as Error).message;
    let stack = (exception as Error).stack;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      responseMessage = exception.getResponse()['message'];
      stack = exception.stack;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      responseMessage,
      stack,
    });
  }
}
