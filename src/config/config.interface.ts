export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  graphql: GraphqlConfig;
}

export interface AppConfig {
  port: number;
  cors: CorsConfig;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface DatabaseConfig {
  url: string;
}

export interface GraphqlConfig {
  sortSchema: boolean;
  debug: boolean;
  playground: boolean;
  introspection: boolean;
}
