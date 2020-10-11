import { AuthConfigService } from '@config/auth/auth-config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces';

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

  async validate(payload: JwtPayload): Promise<GetUserDto> {
    const { username } = payload;
    const user = await this._authService.validateUser(username);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
