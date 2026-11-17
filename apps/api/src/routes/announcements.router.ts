import { Router } from "express";
import { getPublishedAnnouncementsData } from "../data/announcements.data.js";

export const announcementsRouter = Router();

/**
 * GET /api/announcements
 * Returns published product announcements (NW-FR-08)
 */
announcementsRouter.get("/announcements", (req, res) => {
  const { product } = req.query;
  let list = getPublishedAnnouncementsData();

  if (typeof product === "string" && product.trim().length > 0) {
    const slugLower = product.trim().toLowerCase();
    list = list.filter((a) => a.productSlug.toLowerCase() === slugLower);
  }

  res.status(200).json({
    success: true,
    data: list,
  });
  return;
});

/**
 * GET /api/announcements/:slug
 * Returns a single published announcement by slug
 */
announcementsRouter.get("/announcements/:slug", (req, res) => {
  const { slug } = req.params;
  const item = getPublishedAnnouncementsData().find((a) => a.slug === slug);

  if (!item) {
    res.status(404).json({
      success: false,
      error: `Announcement '${slug}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: item,
  });
  return;
});
