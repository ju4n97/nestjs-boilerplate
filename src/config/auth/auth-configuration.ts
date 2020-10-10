import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  authAccessFailedCountLimit: process.env.AUTH_ACCESS_FAILED_COUNT_LIMIT,
  authPasswordResetTokenExpires: process.env.AUTH_PASSWORD_RESET_TOKEN_EXPIRES,
}));
