import { Config } from './config.interface';

const config: Config = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    cors: {
      enabled: true,
    },
  },
  prisma: {
    log: ['query', 'info', 'warn', 'error'],
    explicitConnect: true,
  },
  graphql: {
    sortSchema: true,
    debug: true,
    playground: true,
    introspection: true,
  },
};

export default (): Config => config;
