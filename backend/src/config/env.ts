import 'dotenv/config';

const env = process.env;
const config = {
  nodeEnv: env.NODE_ENV || 'development',
  port: Number(env.PORT || 4000),
  isDev: env.NODE_ENV !== 'production',
  jwt: { secret: env.JWT_SECRET || 'development-only-change-this-secret-32chars', expiresIn: env.JWT_EXPIRES_IN || '7d' },
  databaseUrl: env.DATABASE_URL || '',
  cors: { frontendUrl: env.FRONTEND_URL || 'http://localhost:3000' },
};
export default config;
