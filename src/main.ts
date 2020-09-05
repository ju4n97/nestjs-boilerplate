import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config service instance
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port);
}
bootstrap();
