import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlProviderModule } from './providers/database/mysql/mysql-provider.module';

@Module({
  imports: [MysqlProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
