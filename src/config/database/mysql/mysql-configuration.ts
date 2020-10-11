import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  synchronize: process.env.DB_SYNCHRONIZE,
}));
