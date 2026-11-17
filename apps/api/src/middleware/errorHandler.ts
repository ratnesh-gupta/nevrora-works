import type { ErrorRequestHandler } from "express";

/**
 * Standardized JSON error response handler
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status =
    typeof err.status === "number"
      ? err.status
      : typeof err.statusCode === "number"
        ? err.statusCode
        : 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "test") {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(status).json({
    success: false,
    error: message,
    ...(err.details ? { details: err.details } : {}),
  });
};
