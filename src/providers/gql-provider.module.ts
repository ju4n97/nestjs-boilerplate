import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GraphqlConfig } from 'src/config/config.types';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<GraphqlConfig>('graphql');
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: config.sortSchema,
          debug: config.debug,
          playground: config.playground,
          introspection: config.introspection,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GqlProviderModule {}
