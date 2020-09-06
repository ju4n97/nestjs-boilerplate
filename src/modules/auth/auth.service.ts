import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { AuthConfigService } from 'src/config/auth/auth-config.service';
import { CreateUserDto, GetUserDto, LoginUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { JwtPayload, LoginResult, Token } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _authConfigService: AuthConfigService,
    private readonly _jwtService: JwtService,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('AuthService');
  }

  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this._usersService.create(createUserDto);
    return plainToClass(GetUserDto, user);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResult> {
    const user = await this._usersService.getByLoginCredentials(loginUserDto);
    const token: Token = this._createToken(user);
    return { user, token };
  }

  async validateUser(username: string): Promise<GetUserDto> {
    return await this._usersService.getByUsername(username);
  }

  private _createToken({ username }: GetUserDto): Token {
    const expiresIn = this._authConfigService.jwtExpiresIn;

    const user: JwtPayload = { username };
    const accessToken = this._jwtService.sign(user);

    return {
      expiresIn,
      accessToken,
    };
  }
}
