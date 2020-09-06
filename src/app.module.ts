import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule, AppConfigService } from './config/app';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MysqlProviderModule } from './providers/database/mysql/mysql-provider.module';

@Module({
  imports: [AppConfigModule, MysqlProviderModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
