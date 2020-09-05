import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfigService } from 'src/config/auth/auth-config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @description Pass configuration to PassportStrategy as JWT strategy.
   */
  constructor(
    private readonly _authService: AuthService,
    private readonly _authConfigService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _authConfigService.jwtSecretKey,
    });
  }

  validate(): void {
    console.log('test');
  }
}
