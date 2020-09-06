import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlConfigService } from './mysql-config.service';
import mysqlConfiguration from './mysql-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [mysqlConfiguration],
      validationSchema: Joi.object({
        DB: Joi.string(),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().default('root'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_SYNCHRONIZE: Joi.boolean().default(true),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
