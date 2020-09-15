import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/app-config.module';
import { AppConfigService } from './config/app/app-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MysqlProviderModule } from './providers/database/mysql/mysql-provider.module';
import { EmailProviderModule } from './providers/email/email-provider.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlProviderModule,
    EmailProviderModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
