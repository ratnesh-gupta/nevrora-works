import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PRODUCTS_DATA,
  getPublishedProducts,
  getProductBySlug,
} from "../lib/products-data";

describe("Products Data Layer & Concealment Unit Tests", () => {
  it("includes neermiti-collections and sadhana-daily as published products", () => {
    const published = getPublishedProducts();
    const slugs = published.map((p) => p.slug);

    assert.ok(slugs.includes("neermiti-collections"));
    assert.ok(slugs.includes("sadhana-daily"));
    for (const p of published) {
      assert.equal(p.published, true);
    }
  });

  it("strictly conceals driveiq with published === false", () => {
    const driveiqRaw = PRODUCTS_DATA.find((p) => p.slug === "driveiq");
    assert.ok(driveiqRaw, "driveiq should exist in raw data layer");
    assert.equal(
      driveiqRaw?.published,
      false,
      "driveiq MUST have published === false",
    );

    // Public getter must exclude driveiq
    const published = getPublishedProducts();
    const hasDriveiq = published.some((p) => p.slug === "driveiq");
    assert.equal(
      hasDriveiq,
      false,
      "driveiq must NEVER appear in published products",
    );

    // getProductBySlug must return undefined for driveiq
    const bySlug = getProductBySlug("driveiq");
    assert.equal(
      bySlug,
      undefined,
      "getProductBySlug('driveiq') must return undefined",
    );
  });

  it("returns full product detail for published products", () => {
    const neermiti = getProductBySlug("neermiti-collections");
    assert.ok(neermiti);
    assert.ok(neermiti.valueProposition.length > 0);
    assert.ok(neermiti.features.length >= 3);

    const sadhana = getProductBySlug("sadhana-daily");
    assert.ok(sadhana);
    assert.ok(sadhana.valueProposition.length > 0);
    assert.ok(sadhana.features.length >= 3);
  });

  it("ensures published products have sequential numbering and techBadges", () => {
    const published = getPublishedProducts();
    assert.equal(published.length, 2);
    assert.equal(published[0]?.number, "01");
    assert.equal(published[1]?.number, "02");
    assert.ok(published[0]?.techBadges && published[0].techBadges.length > 0);
    assert.ok(published[1]?.techBadges && published[1].techBadges.length > 0);
  });
});
