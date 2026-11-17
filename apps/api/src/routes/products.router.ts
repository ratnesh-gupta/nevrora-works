import { Router } from "express";
import { getPublishedProductsData } from "../data/products.data.js";

export const productsRouter = Router();

/**
 * GET /api/products
 * Returns strictly published products (lifecycle_status !== "internal_draft")
 * Supports optional filtering by ?category=, ?platform=, ?status=, ?featured=, ?q=
 */
productsRouter.get("/products", (req, res) => {
  const { category, platform, status, featured, q } = req.query;

  let filtered = getPublishedProductsData();

  if (typeof category === "string" && category.trim().length > 0) {
    const catLower = category.trim().toLowerCase();
    filtered = filtered.filter((p) => p.category.toLowerCase() === catLower);
  }

  if (typeof platform === "string" && platform.trim().length > 0) {
    const platLower = platform.trim().toLowerCase();
    filtered = filtered.filter((p) =>
      p.platforms.some((pl) => pl.platformType.toLowerCase() === platLower),
    );
  }

  if (typeof status === "string" && status.trim().length > 0) {
    const statusLower = status.trim().toLowerCase();
    // Never expose internal_draft even if explicitly queried
    if (statusLower === "internal_draft") {
      filtered = [];
    } else {
      filtered = filtered.filter(
        (p) => p.lifecycle_status.toLowerCase() === statusLower,
      );
    }
  }

  if (featured === "true") {
    filtered = filtered.filter((p) => p.featured === true);
  }

  if (typeof q === "string" && q.trim().length > 0) {
    const queryLower = q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(queryLower) ||
        p.tagline.toLowerCase().includes(queryLower) ||
        p.summary.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower),
    );
  }

  res.status(200).json({
    success: true,
    data: filtered,
  });
  return;
});

/**
 * GET /api/products/:slug
 * Returns a single published product detail by slug.
 * Returns 404 for internal_draft / unpublished products or non-existent slugs (NW-FR-03, NW-FR-11).
 */
productsRouter.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  const publishedProducts = getPublishedProductsData();
  const product = publishedProducts.find((p) => p.slug === slug);

  if (!product) {
    res.status(404).json({
      success: false,
      error: `Product '${slug}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: product,
  });
  return;
});
