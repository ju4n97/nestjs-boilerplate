import { GenericStatusResponse } from '@lib/interfaces/generic';
import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserDto,
  ForgotPasswordUserDto,
  GetUserDto,
  LoginUserDto,
  ResetPasswordUserDto,
} from '../users/dto';
import { AuthService } from './auth.service';
import { LoginResult } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return await this._authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResult> {
    return await this._authService.login(loginUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordUserDto: ForgotPasswordUserDto,
  ): Promise<any> {
    return await this._authService.sendEmailForgotPassword(
      forgotPasswordUserDto,
    );
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordUserDto: ResetPasswordUserDto,
  ): Promise<GenericStatusResponse> {
    return await this._authService.resetPassword(resetPasswordUserDto);
  }
}
