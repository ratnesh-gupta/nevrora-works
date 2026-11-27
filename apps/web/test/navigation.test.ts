import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
} from "@nevrora/config";

describe("Nevrora Works Navigation & Route Integrity Unit Tests", () => {
  it("defines 6 locked primary navigation items matching Section 4 IA", () => {
    assert.equal(LOCKED_NAVIGATION_ITEMS.length, 6);
    const expected = [
      "/",
      "/products",
      "/support",
      "/about",
      "/announcements",
      "/contact",
    ];
    const actual = LOCKED_NAVIGATION_ITEMS.map((item) => item.href);
    assert.deepEqual(actual, expected);
  });

  it("defines primary CTA button labelled 'Explore Products' linking to /products", () => {
    assert.equal(LOCKED_NAVIGATION_CTA.label, "Explore Products");
    assert.equal(LOCKED_NAVIGATION_CTA.href, "/products");
  });

  it("strictly prohibits B2B /services, /our-work, and /ventures in navigation", () => {
    for (const item of LOCKED_NAVIGATION_ITEMS) {
      assert.notEqual(item.href, "/ventures");
      assert.notEqual(item.href, "/services");
      assert.notEqual(item.href, "/our-work");
    }
  });
});
