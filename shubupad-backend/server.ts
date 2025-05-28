import 'dotenv/config';
import { app } from './src/app';
import { logger } from './src/utils/logger.util';
import { connectDatabase } from './src/database/connection';
import { connectRedis } from './src/config/redis.config';
import { initializeJobs } from './src/jobs/queue';
import { startScheduledTasks } from './src/tasks/scheduler';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

async function startServer(): Promise<void> {
  try {
    // Initialize database connection
    logger.info('🔄 Connecting to database...');
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Initialize Redis connection
    logger.info('🔄 Connecting to Redis...');
    await connectRedis();
    logger.info('✅ Redis connected successfully');

    // Initialize background jobs
    logger.info('🔄 Initializing background jobs...');
    await initializeJobs();
    logger.info('✅ Background jobs initialized');

    // Start scheduled tasks
    if (process.env.NODE_ENV === 'production') {
      logger.info('🔄 Starting scheduled tasks...');
      startScheduledTasks();
      logger.info('✅ Scheduled tasks started');
    }

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 ShubUpad API Server running on http://${HOST}:${PORT}`);
      logger.info(`📚 API Documentation available at http://${HOST}:${PORT}/api-docs`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📊 Health check available at http://${HOST}:${PORT}/health`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(() => {
        logger.info('✅ HTTP server closed');
        
        // Close database connections
        // Close Redis connections
        // Close job queues
        // Any other cleanup
        
        logger.info('✅ Graceful shutdown completed');
        process.exit(0);
      });

      // Force close server after 30 seconds
      setTimeout(() => {
        logger.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('❌ Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
      logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('unhandledRejection');
    });

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();