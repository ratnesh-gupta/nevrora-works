import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { STATUTORY_DETAILS } from "@nevrora/config";
import {
  SITE_PRIVACY_POLICY,
  PRODUCT_PRIVACY_NOTICES,
} from "../lib/legal-data";

describe("Statutory Compliance Data Layer Unit Tests", () => {
  it("conforms to Companies Act 2013 Rule 26 statutory requirements", () => {
    assert.equal(
      STATUTORY_DETAILS.legalName,
      "Nevrora Technologies Private Limited",
    );
    assert.equal(STATUTORY_DETAILS.cin, "U72900KA2024PTC189000");
    assert.equal(
      STATUTORY_DETAILS.registeredOffice,
      "Bengaluru, Karnataka, India",
    );
    assert.equal(STATUTORY_DETAILS.phone, "+91 80 4123 4567");
    assert.equal(STATUTORY_DETAILS.email, "hello@nevrora.com");
    assert.equal(
      STATUTORY_DETAILS.grievanceContact.name,
      "Ratnesh Kumar Gupta",
    );
    assert.equal(
      STATUTORY_DETAILS.grievanceContact.email,
      "ratnesh.k.gupta@icloud.com",
    );
  });

  it("conforms to DPDP Act 2023 site-wide privacy policy requirements", () => {
    assert.ok(SITE_PRIVACY_POLICY.dataCollected.length > 0);
    assert.ok(SITE_PRIVACY_POLICY.purposes.length > 0);
    assert.ok(SITE_PRIVACY_POLICY.rights.length >= 4);

    const rightsText = SITE_PRIVACY_POLICY.rights.join(" ").toLowerCase();
    assert.ok(rightsText.includes("access"));
    assert.ok(rightsText.includes("correction"));
    assert.ok(rightsText.includes("erasure"));
    assert.ok(rightsText.includes("grievance"));
    assert.ok(rightsText.includes("nominate"));
  });

  it("contains product-specific privacy notices for launch products", () => {
    assert.ok(PRODUCT_PRIVACY_NOTICES["neermiti-collections"]);
    assert.ok(PRODUCT_PRIVACY_NOTICES["sadhana-daily"]);
    assert.equal(PRODUCT_PRIVACY_NOTICES["driveiq"], undefined);
  });
});
