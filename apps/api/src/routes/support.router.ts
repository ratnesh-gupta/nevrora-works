import { Router } from "express";
import { getPublishedProductsData } from "../data/products.data.js";
import { OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";

export const supportRouter = Router();

/**
 * GET /api/support
 * Returns the Support Directory routing table for all published products (NW-FR-06)
 */
supportRouter.get("/support", (_req, res) => {
  const publishedProducts = getPublishedProductsData();

  const directory = publishedProducts.map((product) => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    lifecycle_status: product.lifecycle_status,
    support: product.support,
    legal: product.legal,
    faqs: product.faqs.filter((f) => f.status === "published"),
  }));

  res.status(200).json({
    success: true,
    data: {
      generalSupportEmail: OFFICIAL_SUPPORT_EMAIL,
      products: directory,
    },
  });
  return;
});
