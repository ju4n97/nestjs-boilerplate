import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailConfigService } from './email-config.service';
import emailConfiguration from './email-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [emailConfiguration],
      validationSchema: Joi.object({
        EMAIL_HOST: Joi.string().default('smtp.gmail.com'),
        EMAIL_PORT: Joi.number().default(587),
        EMAIL_SECURE: Joi.boolean().default(true),
        EMAIL_AUTH_USER: Joi.string(),
        EMAIL_AUTH_PASSWORD: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, EmailConfigService],
  exports: [ConfigService, EmailConfigService],
})
export class EmailConfigModule {}
