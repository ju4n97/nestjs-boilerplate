import { MysqlConfigModule } from '@config/database/mysql/mysql-config.module';
import { MysqlConfigService } from '@config/database/mysql/mysql-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (mysqlConfigService: MysqlConfigService) => ({
        type: 'mysql' as DatabaseType,
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        entities: [__dirname + '/../../../**/*.entity.{js,ts}'],
        synchronize: mysqlConfigService.synchronize,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MysqlProviderModule {}
