import { AuthConfigModule } from '@config/auth/auth-config.module';
import { AuthConfigService } from '@config/auth/auth-config.service';
import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    AuthConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtSecretKey,
        signOptions: {
          expiresIn: authConfigService.jwtExpiresIn,
        },
      }),
      inject: [AuthConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthConfigService, Logger],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
