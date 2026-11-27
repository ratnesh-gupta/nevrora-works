import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PRODUCTS_DATA,
  getPublishedProducts,
  getProductBySlug,
  resolveProductPrimaryCta,
} from "../lib/products-data";

describe("Nevrora Works Products Data Layer & Lifecycle Unit Tests", () => {
  it("includes sadhana-daily, neermiti-collections, and driveiq as coming_soon published products", () => {
    const published = getPublishedProducts();
    const slugs = published.map((p) => p.slug);

    assert.equal(published.length, 3);
    assert.ok(slugs.includes("sadhana-daily"));
    assert.ok(slugs.includes("neermiti-collections"));
    assert.ok(slugs.includes("driveiq"));

    for (const p of published) {
      assert.equal(p.published, true);
      assert.equal(p.lifecycle_status, "coming_soon");
    }
  });

  it("strictly conceals internal_draft products (NW-FR-03, NW-FR-11)", () => {
    const draftRaw = PRODUCTS_DATA.find(
      (p) => p.slug === "internal-draft-sandbox",
    );
    assert.ok(draftRaw, "internal-draft-sandbox should exist in raw data");
    assert.equal(draftRaw?.lifecycle_status, "internal_draft");
    assert.equal(draftRaw?.published, false);

    const published = getPublishedProducts();
    const hasDraft = published.some(
      (p) => p.slug === "internal-draft-sandbox",
    );
    assert.equal(hasDraft, false);

    const bySlug = getProductBySlug("internal-draft-sandbox");
    assert.equal(bySlug, undefined);
  });

  it("returns complete Section 7 & 8 contract fields and resolves Coming Soon CTA to Notify Me", () => {
    for (const slug of ["sadhana-daily", "neermiti-collections", "driveiq"]) {
      const product = getProductBySlug(slug);
      assert.ok(product);
      assert.ok(product.tagline.length > 0);
      assert.ok(product.problemSolved.length > 0);
      assert.ok(product.valueProposition.length > 0);
      assert.ok(product.platforms.length > 0);
      assert.ok(product.structuredFeatures.length >= 3);
      assert.ok(product.mediaGallery.length >= 2);
      assert.ok(product.faqs.length >= 2);
      assert.equal(product.support.supportEmail, "support@nevrora-works.com");

      const cta = resolveProductPrimaryCta(product);
      assert.equal(cta.label, "Notify Me");
      assert.equal(cta.isExternal, false);
    }
  });
});
