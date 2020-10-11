import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MysqlConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get database(): string {
    return this._configService.get<string>('mysql.database');
  }

  get username(): string {
    return this._configService.get<string>('mysql.username');
  }

  get password(): string {
    return this._configService.get<string>('mysql.password');
  }

  get host(): string {
    return this._configService.get<string>('mysql.host');
  }

  get port(): number {
    return Number(this._configService.get<number>('mysql.port'));
  }

  get synchronize(): boolean {
    return this._configService.get<boolean>('mysql.synchronize');
  }
}
