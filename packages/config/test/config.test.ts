import {
  PALETTE_A,
  TYPOGRAPHY,
  OFFICIAL_SUPPORT_EMAIL,
  LOCKED_NAVIGATION,
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
  LIFECYCLE_STATUS_CONFIG,
  INQUIRY_TYPES,
  STATUTORY_DETAILS,
  DEFAULT_SITE_CONFIG,
} from "../src/index";

const hexRegex = /^#([A-Fa-f0-9]{6})$/;

function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

// 1. Palette A checks
assert(hexRegex.test(PALETTE_A.forest), "forest color must be valid hex");
assert(PALETTE_A.forest === "#173C32", "forest hex must match #173C32");
assert(PALETTE_A.evergreen === "#071B18", "evergreen hex must match #071B18");
assert(PALETTE_A.gold === "#C9A35B", "gold hex must match #C9A35B");
assert(PALETTE_A.cream === "#F7F2E9", "cream hex must match #F7F2E9");
assert(PALETTE_A.charcoal === "#252725", "charcoal hex must match #252725");
assert(PALETTE_A.sage === "#A8B7A8", "sage hex must match #A8B7A8");
assert(PALETTE_A.white === "#FFFFFF", "white hex must match #FFFFFF");

// 2. Typography checks
assert(
  TYPOGRAPHY.fontDisplay.includes("Playfair Display"),
  "fontDisplay must include Playfair Display",
);
assert(TYPOGRAPHY.fontBody.includes("Inter"), "fontBody must include Inter");
assert(
  TYPOGRAPHY.fontMono.includes("monospace"),
  "fontMono must include monospace",
);

// 3. Nevrora Works navigation checks (Section 4 IA)
assert(
  LOCKED_NAVIGATION.length === 6,
  "LOCKED_NAVIGATION array length must be 6",
);
assert(
  LOCKED_NAVIGATION.items.length === 6,
  "LOCKED_NAVIGATION.items must have 6 items",
);
assert(
  LOCKED_NAVIGATION.cta.label === "Explore Products",
  "LOCKED_NAVIGATION.cta label must be Explore Products",
);
assert(
  LOCKED_NAVIGATION_CTA.href === "/products",
  "CTA href must be /products",
);

const expectedLabels = [
  "Home",
  "Products",
  "Support",
  "About",
  "Announcements",
  "Contact",
];
for (const [idx, label] of expectedLabels.entries()) {
  assert(
    LOCKED_NAVIGATION_ITEMS[idx]?.label === label,
    `Item ${idx} must be ${label}`,
  );
}

// Negative constraint verification: B2B /services, /our-work, and /ventures MUST NOT exist in navigation
for (const item of LOCKED_NAVIGATION_ITEMS) {
  assert(
    item.href !== "/ventures" &&
      item.href !== "/services" &&
      item.href !== "/our-work",
    `Forbidden route ${item.href} found in Nevrora Works navigation`,
  );
}

// 4. Lifecycle status rules check (Section 5 & NW-FR-03)
assert(
  LIFECYCLE_STATUS_CONFIG.internal_draft.isPublic === false,
  "internal_draft must not be public",
);
assert(
  LIFECYCLE_STATUS_CONFIG.coming_soon.isPublic === true,
  "coming_soon must be public",
);
assert(
  LIFECYCLE_STATUS_CONFIG.beta.isPublic === true,
  "beta must be public",
);
assert(
  LIFECYCLE_STATUS_CONFIG.live.isPublic === true,
  "live must be public",
);
assert(
  LIFECYCLE_STATUS_CONFIG.maintenance.isPublic === true,
  "maintenance must be public",
);
assert(
  LIFECYCLE_STATUS_CONFIG.discontinued.isPublic === true,
  "discontinued must be public",
);

// 5. Support email & Statutory details
assert(
  OFFICIAL_SUPPORT_EMAIL === "support@nevrora-works.com",
  "Official support email must be support@nevrora-works.com",
);
assert(
  STATUTORY_DETAILS.legalName === "Nevrora Technologies Private Limited",
  "Legal name must match",
);
assert(
  STATUTORY_DETAILS.supportEmail === "support@nevrora-works.com",
  "Statutory support email must match support@nevrora-works.com",
);

// 6. Default site config (Section 1 Identity)
assert(DEFAULT_SITE_CONFIG.name === "Nevrora Works", "Site name must be Nevrora Works");
assert(
  DEFAULT_SITE_CONFIG.tagline === "Ideas into products.",
  "Tagline must be Ideas into products.",
);
assert(
  DEFAULT_SITE_CONFIG.inquiryTypes.length === 4,
  "Must have 4 product inquiry types",
);

export const allConfigTestsPassed = true;
