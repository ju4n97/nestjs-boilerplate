import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { AppConfig } from './config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validations
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // Filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Config declarations
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  // Cors
  if (appConfig.cors.enabled) {
    app.enableCors({ origin: '*' });
  }

  await app.listen(appConfig.port);
}

bootstrap();
