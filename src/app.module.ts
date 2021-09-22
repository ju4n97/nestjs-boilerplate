import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { ConfigProviderModule } from './providers/config-provider.module';
import { GraphqlProviderModule } from './providers/graphql-provider.module';

@Module({
  imports: [ConfigProviderModule, GraphqlProviderModule, UsersModule, AuthModule],
})
export class AppModule {}
