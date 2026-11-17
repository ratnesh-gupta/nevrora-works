import { Router } from "express";
import { servicesData } from "../data/services.data.js";

export const servicesRouter = Router();

/**
 * GET /api/services
 * Returns all published commercial services
 */
servicesRouter.get("/services", (_req, res) => {
  const published = servicesData.filter((s) => s.published);
  res.status(200).json({
    success: true,
    data: published,
  });
  return;
});

/**
 * GET /api/services/:slug
 * Returns a specific published service by slug; 404 if not found or unpublished
 */
servicesRouter.get("/services/:slug", (req, res) => {
  const { slug } = req.params;
  const service = servicesData.find((s) => s.slug === slug && s.published);

  if (!service) {
    res.status(404).json({
      success: false,
      error: `Service '${slug}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: service,
  });
  return;
});
