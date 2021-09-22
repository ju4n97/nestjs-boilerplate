import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/@generated/user/user.model';
import { SecurityConfig } from 'src/config/config.types';
import { CryptService } from 'src/crypt/crypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessToken } from './dto/access-token.dto';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private cryptService: CryptService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user in the application
   */
  async signUp(input: SignUpInput): Promise<AccessToken> {
    const hashedPassword = await this.cryptService.hashPassword(input.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...input,
        email: input.email.toLowerCase(),
        password: hashedPassword,
        detail: {
          create: {
            firstName: '',
            lastName: '',
          },
        },
      },
    });

    return this.generateTokens({ userId: newUser.id });
  }

  /**
   * Login existing user by email & password
   * @returns access token
   */
  async signIn({ email, password }: SignInInput): Promise<AccessToken> {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      throw new NotFoundException(`Email address: ${email} was not found`);
    }

    const isPasswordValid = await this.cryptService.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({ userId: user.id });
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(accessToken: string): Promise<User> {
    const userId = this.jwtService.decode(accessToken)['userId'];
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  private generateTokens(payload: { userId: User['id'] }): AccessToken {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: User['id'] }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: User['id'] }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const secret = this.configService.get('JWT_REFRESH_SECRET');
    const expiresIn = securityConfig.refreshIn;

    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  refreshToken(token: string) {
    try {
      const secret = this.configService.get('JWT_REFRESH_SECRET');
      const { userId } = this.jwtService.verify(token, { secret });
      this.generateTokens(userId);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
