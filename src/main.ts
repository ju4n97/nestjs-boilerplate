import { AllExceptionsFilter } from '@lib/filters';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .use(helmet())
    .use(csurf())
    .use(compression())
    .use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    )
    .useGlobalPipes(new ValidationPipe({ whitelist: true }))
    .useGlobalFilters(new AllExceptionsFilter())
    .setGlobalPrefix('api/v1')
    .enableCors({ origin: '*' } as CorsOptions);

  // Get config service instance
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port);
}

bootstrap();
