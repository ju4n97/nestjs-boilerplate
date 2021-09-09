import { Config } from './config.interface';

const config: Config = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    cors: {
      enabled: true,
    },
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  graphql: {
    sortSchema: true,
    debug: true,
    playground: true,
    introspection: true,
  },
};

export default (): Config => config;
