import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get port(): number {
    return Number(this._configService.get<number>('app.port'));
  }
}
