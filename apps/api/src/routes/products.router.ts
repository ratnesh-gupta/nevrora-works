import { Router } from "express";
import { productsData } from "../data/products.data.js";

export const productsRouter = Router();

/**
 * GET /api/products
 * Returns strictly published products only, concealing unpublished products (e.g. driveiq)
 */
productsRouter.get("/products", (_req, res) => {
  const publishedProducts = productsData.filter((p) => p.published === true);
  res.status(200).json({
    success: true,
    data: publishedProducts,
  });
  return;
});

/**
 * GET /api/products/:slug
 * Returns a single product detail by slug.
 * Returns 404 for any unpublished product (including driveiq) or non-existent slug.
 */
productsRouter.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  const product = productsData.find((p) => p.slug === slug);

  // Strictly conceal unpublished products
  if (!product || !product.published) {
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
