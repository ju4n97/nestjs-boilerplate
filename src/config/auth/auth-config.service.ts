import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get jwtSecretKey(): string {
    return this._configService.get<string>('auth.jwtSecretKey');
  }

  get jwtExpiresIn(): string {
    return this._configService.get<string>('auth.jwtExpiresIn');
  }

  get authAccessFailedCountLimit(): number {
    return this._configService.get<number>('auth.authAccessFailedCountLimit');
  }

  get authPasswordResetTokenExpires(): number {
    return this._configService.get<number>(
      'auth.authPasswordResetTokenExpires',
    );
  }
}
