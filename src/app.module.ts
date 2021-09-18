import { Module } from '@nestjs/common';
import { ConfigProviderModule } from './providers/config-provider.module';
import { GraphqlProviderModule } from './providers/graphql-provider.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [ConfigProviderModule, GraphqlProviderModule, UsersModule],
})
export class AppModule {}
