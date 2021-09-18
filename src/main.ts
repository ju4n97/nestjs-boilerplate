import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/config.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validations
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

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
