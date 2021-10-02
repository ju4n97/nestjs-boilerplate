export type Config = {
  app: AppConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
};

export type AppConfig = {
  port: number;
  cors: CorsConfig;
};

export type CorsConfig = {
  enabled: boolean;
};

export type GraphqlConfig = {
  sortSchema: boolean;
  debug: boolean;
  playground: boolean;
  introspection: boolean;
  installSubscriptionHandlers: boolean;
};

export type SecurityConfig = {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
};
