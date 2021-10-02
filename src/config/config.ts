import { Config } from './config.types';

const config: Config = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    cors: {
      enabled: true,
    },
  },
  graphql: {
    sortSchema: true,
    debug: true,
    playground: true,
    introspection: true,
    installSubscriptionHandlers: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
