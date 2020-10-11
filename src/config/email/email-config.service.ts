import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get host(): string {
    return this._configService.get<string>('email.host');
  }

  get port(): number {
    return this._configService.get<number>('email.port');
  }

  get secure(): boolean {
    return this._configService.get<boolean>('email.secure');
  }

  get user(): string {
    return this._configService.get<string>('email.user');
  }

  get password(): string {
    return this._configService.get<string>('email.password');
  }
}
