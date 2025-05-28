import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Import configurations
import { corsConfig } from './config/cors.config';
import { sessionConfig } from './config/session.config';
import { rateLimitConfig } from './config/rate-limit.config';

// Import middleware
import { errorMiddleware } from './middleware/error.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';
import { securityMiddleware } from './middleware/security.middleware';

// Import routes
import routes from './routes';

// Import utilities
import { logger } from './utils/logger.util';

// Create Express application
const app: Application = express();

// ===========================================
// SECURITY MIDDLEWARE
// ===========================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors(corsConfig));

// Security middleware
app.use(securityMiddleware);

// ===========================================
// GENERAL MIDDLEWARE
// ===========================================
// Request compression
app.use(compression());

// Body parsing middleware
app.use(express.json({ 
  limit: '10mb',
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Cookie parser
app.use(cookieParser());

// Session management
app.use(session(sessionConfig));

// ===========================================
// LOGGING MIDDLEWARE
// ===========================================
// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      }
    }
  }));
}

// Custom logging middleware
app.use(loggingMiddleware);

// ===========================================
// RATE LIMITING
// ===========================================
// General rate limiting
app.use(rateLimit(rateLimitConfig.general));

// Slow down repeated requests
app.use(slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per windowMs without delay
  delayMs: 500, // Add 500ms delay per request after delayAfter
  maxDelayMs: 20000, // Maximum delay of 20 seconds
}));

// ===========================================
// API ROUTES
// ===========================================
// Health check endpoint (before rate limiting)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: 'connected', // TODO: Add actual health checks
      redis: 'connected',
      elasticsearch: 'connected'
    }
  });
});

// API routes
app.use('/api/v1', routes);

// API Documentation
if (process.env.SWAGGER_ENABLED === 'true') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('../swagger.json');
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ShubUpad API Documentation'
  }));
}

// ===========================================
// ERROR HANDLING
// ===========================================
// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handling middleware
app.use(errorMiddleware);

// ===========================================
// GRACEFUL SHUTDOWN HANDLING
// ===========================================
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Starting graceful shutdown...');
  // Add cleanup logic here
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Starting graceful shutdown...');
  // Add cleanup logic here
});

export { app };