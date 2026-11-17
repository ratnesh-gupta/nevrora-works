import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
} from "@nevrora/config";

describe("Navigation & Route Integrity Unit Tests", () => {
  it("defines exactly 6 locked primary navigation items", () => {
    assert.equal(LOCKED_NAVIGATION_ITEMS.length, 6);
    const expected = [
      "/",
      "/about",
      "/services",
      "/products",
      "/our-work",
      "/contact",
    ];
    const actual = LOCKED_NAVIGATION_ITEMS.map((item) => item.href);
    assert.deepEqual(actual, expected);
  });

  it("defines primary CTA button labelled 'Start a Conversation' linking to /contact", () => {
    assert.equal(LOCKED_NAVIGATION_CTA.label, "Start a Conversation");
    assert.equal(LOCKED_NAVIGATION_CTA.href, "/contact");
  });

  it("strictly prohibits /ventures anywhere in navigation", () => {
    for (const item of LOCKED_NAVIGATION_ITEMS) {
      assert.notEqual(item.href, "/ventures");
      assert.notEqual(item.label.toLowerCase(), "ventures");
    }
  });
});
