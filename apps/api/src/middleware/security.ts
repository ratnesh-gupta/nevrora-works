import cors from "cors";
import helmet from "helmet";
import type { RequestHandler } from "express";

/**
 * Helmet middleware configured for secure HTTP headers
 */
export const helmetMiddleware: RequestHandler = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

/**
 * CORS middleware configured for web application integration
 */
export const corsMiddleware: RequestHandler = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:8000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:8000",
      "https://nevrora.com",
      "https://www.nevrora.com",
    ];

    if (
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== "production"
    ) {
      return callback(null, true);
    }

    return callback(new Error("CORS policy violation: Origin not allowed"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
});
