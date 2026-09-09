import app from './app';
import config from './config/env';
import logger from './config/logger';
import { initializeSchema } from './models/schema';
import { closeDatabase, initializeDatabase } from './config/database';

async function start() {
  try {
    // Initialize database and schema
    await initializeSchema();
    await initializeDatabase();
    logger.info('Database initialized successfully');

    // Start HTTP server
    const server = app.listen(config.port, () => {
      logger.info(`MediSmart API running on http://localhost:${config.port}/api/v1`);
      logger.info(`Environment: ${config.nodeEnv}`);
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(() => {
        void closeDatabase().finally(() => logger.info('Server closed'));
        process.exit(0);
      });
      // Force exit after 10s if connections don't close
      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
