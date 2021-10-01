import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { ConfigProviderModule } from './providers/config-provider.module';
import { GqlProviderModule } from './providers/gql-provider.module';

@Module({
  imports: [ConfigProviderModule, GqlProviderModule, UsersModule, AuthModule],
})
export class AppModule {}
