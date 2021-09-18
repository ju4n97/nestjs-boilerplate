export interface Config {
  app: AppConfig;
  prisma: PrismaConfig;
  graphql: GraphqlConfig;
}

export interface AppConfig {
  port: number;
  cors: CorsConfig;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface PrismaConfig {
  log: Array<'query' | 'info' | 'warn' | 'error'>;
  explicitConnect: boolean;
}

export interface GraphqlConfig {
  sortSchema: boolean;
  debug: boolean;
  playground: boolean;
  introspection: boolean;
}
