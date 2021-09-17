import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import config from 'src/config/config';
import { GraphqlConfig } from './config/config.interface';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<GraphqlConfig>('graphql');
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: config.sortSchema,
          debug: config.debug,
          playground: config.playground,
          introspection: config.introspection,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
