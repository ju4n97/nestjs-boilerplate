export interface Config {
  app: AppConfig
  database: DatabaseConfig
}

export interface AppConfig {
  port: number
  cors: CorsConfig
}

export interface CorsConfig {
  enabled: boolean
}

export interface DatabaseConfig {
  url: string
}
