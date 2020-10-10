import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './auth-config.service';
import authConfiguration from './auth-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [authConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string(),
        JWT_EXPIRES_IN: Joi.string().default('2d'),
        AUTH_ACCESS_FAILED_COUNT_LIMIT: Joi.number().default(3),
        AUTH_PASSWORD_RESET_TOKEN_EXPIRES: Joi.number().default(2),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
