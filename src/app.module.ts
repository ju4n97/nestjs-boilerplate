import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { ConfigProviderModule } from './providers/config-provider.module';
import { GqlProviderModule } from './providers/gql-provider.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    ConfigProviderModule,
    GqlProviderModule,
    PubSubModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
