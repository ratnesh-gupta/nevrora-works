import {
  PALETTE_A,
  TYPOGRAPHY,
  LOCKED_NAVIGATION,
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
  INQUIRY_TYPES,
  STATUTORY_DETAILS,
  DEFAULT_SITE_CONFIG,
} from "../src/index";

// Verify PALETTE_A contains exactly required colors with correct hex format
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

// 3. Locked navigation checks (6 items + CTA)
assert(
  LOCKED_NAVIGATION.length === 6,
  "LOCKED_NAVIGATION array length must be 6",
);
assert(
  LOCKED_NAVIGATION.items.length === 6,
  "LOCKED_NAVIGATION.items must have 6 items",
);
assert(
  LOCKED_NAVIGATION.cta.label === "Start a Conversation",
  "LOCKED_NAVIGATION.cta must be accessible",
);
assert(
  LOCKED_NAVIGATION_ITEMS.length === 6,
  "Navigation must have exactly 6 items",
);
const expectedLabels = [
  "Home",
  "About",
  "Services",
  "Products",
  "Our Work",
  "Contact",
];
for (const [idx, label] of expectedLabels.entries()) {
  assert(
    LOCKED_NAVIGATION_ITEMS[idx]?.label === label,
    `Item ${idx} must be ${label}`,
  );
}

// Negative constraint verification: /ventures MUST NOT exist in navigation
for (const item of LOCKED_NAVIGATION_ITEMS) {
  assert(
    item.href !== "/ventures",
    "Forbidden /ventures found in navigation items",
  );
  assert(
    item.label.toLowerCase() !== "ventures",
    'Forbidden "ventures" label found',
  );
}

assert(
  LOCKED_NAVIGATION_CTA.label === "Start a Conversation",
  "CTA label must match",
);
assert(LOCKED_NAVIGATION_CTA.href === "/contact", "CTA href must be /contact");

// 4. Inquiry types checks
assert(INQUIRY_TYPES.length === 4, "Must have 4 inquiry types");
assert(INQUIRY_TYPES.includes("Venture idea"), "Must include Venture idea");
assert(
  INQUIRY_TYPES.includes("Strategic partnership"),
  "Must include Strategic partnership",
);
assert(
  INQUIRY_TYPES.includes("Business collaboration"),
  "Must include Business collaboration",
);
assert(
  INQUIRY_TYPES.includes("General inquiry"),
  "Must include General inquiry",
);

// 5. Statutory details (Companies Act Rule 26 & DPDP Act 2023)
assert(
  STATUTORY_DETAILS.legalName === "Nevrora Technologies Private Limited",
  "Legal name must match",
);
assert(STATUTORY_DETAILS.cin.length === 21, "CIN must be 21 characters");
assert(
  STATUTORY_DETAILS.cin === "U72900KA2024PTC189000",
  "CIN must match statutory registration",
);
assert(
  Boolean(STATUTORY_DETAILS.registeredOffice),
  "Registered office must be present",
);
assert(Boolean(STATUTORY_DETAILS.phone), "Phone must be present");
assert(Boolean(STATUTORY_DETAILS.email), "Email must be present");
assert(
  Boolean(STATUTORY_DETAILS.grievanceContact.name),
  "Grievance officer name must be present",
);
assert(
  Boolean(STATUTORY_DETAILS.grievanceContact.email),
  "Grievance officer email must be present",
);

// 6. Default site config
assert(DEFAULT_SITE_CONFIG.name === "Nevrora Ventures", "Site name must match");
assert(
  DEFAULT_SITE_CONFIG.navigation.length === 6,
  "SiteConfig navigation length must be 6",
);
assert(
  DEFAULT_SITE_CONFIG.cta.label === "Start a Conversation",
  "SiteConfig CTA label must match",
);

export const allConfigTestsPassed = true;
