import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule, AppConfigService } from './config/app';
import { MysqlProviderModule } from './providers/database/mysql/mysql-provider.module';

@Module({
  imports: [AppConfigModule, MysqlProviderModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
