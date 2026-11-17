import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { STATUTORY_DETAILS, OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";
import {
  SITE_PRIVACY_POLICY,
  PRODUCT_PRIVACY_NOTICES,
  PRODUCT_TERMS_NOTICES,
} from "../lib/legal-data";

describe("Nevrora Works Statutory & Legal Compliance Unit Tests", () => {
  it("conforms to Companies Act 2013 Rule 26 and uses support@nevrora-works.com", () => {
    assert.equal(
      STATUTORY_DETAILS.legalName,
      "Nevrora Technologies Private Limited",
    );
    assert.equal(STATUTORY_DETAILS.cin, "U72900KA2024PTC189000");
    assert.equal(
      STATUTORY_DETAILS.registeredOffice,
      "Bengaluru, Karnataka, India",
    );
    assert.equal(OFFICIAL_SUPPORT_EMAIL, "support@nevrora-works.com");
    assert.equal(STATUTORY_DETAILS.supportEmail, "support@nevrora-works.com");
    assert.equal(
      STATUTORY_DETAILS.grievanceContact.email,
      "support@nevrora-works.com",
    );
  });

  it("conforms to DPDP Act 2023 site-wide privacy policy requirements", () => {
    assert.ok(SITE_PRIVACY_POLICY.dataCollected.length > 0);
    assert.ok(SITE_PRIVACY_POLICY.purposes.length > 0);
    assert.ok(SITE_PRIVACY_POLICY.rights.length >= 4);
  });

  it("contains product-specific privacy and terms notices for all published products (NW-FR-07)", () => {
    for (const slug of ["sadhana-daily", "neermiti-collections", "driveiq"]) {
      assert.ok(PRODUCT_PRIVACY_NOTICES[slug]);
      assert.ok(PRODUCT_TERMS_NOTICES[slug]);
    }
  });
});
