import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { ConfigProviderModule } from './providers/config-provider.module';
import { GraphqlProviderModule } from './providers/graphql-provider.module';
import { PrismaProviderModule } from './providers/prisma-provider.module';

@Module({
  imports: [ConfigProviderModule, PrismaProviderModule, GraphqlProviderModule, UsersModule],
})
export class AppModule {}
