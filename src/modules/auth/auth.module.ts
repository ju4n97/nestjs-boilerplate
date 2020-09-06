import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from 'src/config/auth/auth-config.module';
import { AuthConfigService } from 'src/config/auth/auth-config.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
  providers: [AuthService, AuthConfigService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
