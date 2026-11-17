import rateLimit from "express-rate-limit";

/**
 * Global rate limiter: 100 requests per 15 minutes per IP
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

/**
 * Strict rate limiter for contact form submissions:
 * 10 submissions per 15 minutes per IP
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact submissions from this IP, please try again later.",
  },
});
