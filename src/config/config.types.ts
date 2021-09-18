export type Config = {
  app: AppConfig;
  graphql: GraphqlConfig;
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
};
