import express, { type Express } from "express";
import { corsMiddleware, helmetMiddleware } from "./middleware/security.js";
import { globalRateLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { healthRouter } from "./routes/health.router.js";
import { servicesRouter } from "./routes/services.router.js";
import { productsRouter } from "./routes/products.router.js";
import { companyRouter } from "./routes/company.router.js";
import { contactRouter } from "./routes/contact.router.js";

export function createApp(): Express {
  const app = express();

  // Basic settings
  app.set("trust proxy", 1);

  // Security and global rate limiting
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(globalRateLimiter);

  // Body parsing
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));

  // Routes mounting
  app.use(healthRouter);
  app.use("/api", servicesRouter);
  app.use("/api", productsRouter);
  app.use("/api", companyRouter);
  app.use("/api", contactRouter);

  // Catch-all 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: `Route not found: ${req.method} ${req.originalUrl}`,
    });
    return;
  });

  // Global standardized error handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
