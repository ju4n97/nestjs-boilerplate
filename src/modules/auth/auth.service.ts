import { AuthConfigService } from '@config/auth/auth-config.service';
import { GenericStatusResponse } from '@lib/interfaces/generic';
import { addHours } from '@lib/utils/date';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Body,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { createHash, randomBytes } from 'crypto';
import { getConnection } from 'typeorm';
import {
  CreateUserDto,
  ForgotPasswordUserDto,
  GetUserDto,
  LoginUserDto,
  ResetPasswordUserDto,
} from '../users/dto';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload, LoginResult, Token } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _mailerService: MailerService,
    private readonly _authConfigService: AuthConfigService,
    private readonly _jwtService: JwtService,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('AuthService');
  }

  async validateUser(username: string): Promise<GetUserDto> {
    return await this._usersService.getByUsername(username);
  }

  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this._usersService.create(createUserDto);
    this._sendWelcomeEmail(user.email, user.username);
    return plainToClass(GetUserDto, user);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResult> {
    const user = await this._usersService.getByLoginCredentials(loginUserDto);
    const token: Token = this._createToken(user);
    return { user, token };
  }

  async sendEmailForgotPassword(
    forgotPasswordUserDto: ForgotPasswordUserDto,
  ): Promise<GenericStatusResponse> {
    // Gets user by email.
    const { email } = forgotPasswordUserDto;
    const userRepository = getConnection().getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { email } });

    // Validates if user exists.
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // Validates if user already requested a password token.
    if (
      user.passwordResetToken &&
      new Date().getTime() < user.passwordResetTokenExpire.getTime()
    ) {
      throw new BadRequestException(
        'Password reset token already have been requested.',
      );
    }

    // Creates password reset token.
    const passwordResetToken = randomBytes(20).toString('hex');

    // Encrypts password reset token.
    user.passwordResetToken = createHash('sha256')
      .update(passwordResetToken)
      .digest('hex');

    // Sets lifetime to password reset token.
    user.passwordResetTokenExpire = addHours(
      new Date(),
      this._authConfigService.authPasswordResetTokenExpires,
    );

    // Saves password reset token in user entity and sends email.
    user.save();

    this._sendEmailForgotPassword(email, user.username, passwordResetToken);

    return {
      succeeded: true,
      message: 'Email sent',
    };
  }

  async resetPassword(
    @Body() resetPasswordUserDto: ResetPasswordUserDto,
  ): Promise<GenericStatusResponse> {
    const { passwordResetToken, password } = resetPasswordUserDto;

    // Encrypts token to compare it with the stored one.
    const hashToken = createHash('sha256')
      .update(passwordResetToken)
      .digest('hex');

    // Gets user by token.
    const userRepository = getConnection().getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: { passwordResetToken: hashToken },
    });

    // Validate if the password reset token is valid.
    if (!user) {
      throw new BadRequestException('User token invalid');
    }

    // Validates if the password reset token expired.
    if (
      user.passwordResetToken &&
      new Date().getTime() > user.passwordResetTokenExpire.getTime()
    ) {
      user.passwordResetToken = null;
      user.passwordResetTokenExpire = null;
      user.save();
      throw new BadRequestException('Password reset token expired');
    }

    // Sets the new password.
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetTokenExpire = null;
    user.save();

    return {
      succeeded: true,
      message: 'Password was recoverd correctly',
    };
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

  private _sendWelcomeEmail(email: string, username: string): void {
    this._mailerService.sendMail({
      to: email,
      from: 'codevlab.development@gmail.com',
      subject: '🥳🎉 Welcome to the amazing Nestjs boilerplate!',
      template: 'welcome',
      context: {
        username: username,
      },
    });
  }

  private _sendEmailForgotPassword(
    email: string,
    username: string,
    passwordResetToken: string,
  ): void {
    this._mailerService.sendMail({
      to: email,
      from: 'nestjsboilerplate@gmail.com',
      subject: '🔑 Request to recover your password',
      template: 'forgot-password',
      context: {
        username: username,
        frontendUrl: '',
        token: passwordResetToken,
      },
    });
  }
}
