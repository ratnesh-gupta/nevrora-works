# Test Infrastructure Specification: Nevrora Ventures E2E Suite

## 1. Overview & Architecture Philosophy

The Nevrora Ventures End-to-End (E2E) Test Suite is an opaque-box verification framework engineered to validate all system capabilities, security controls, and regulatory requirements specified in `ORIGINAL_REQUEST.md` and `PROJECT.md`.

### Core Design Principles
1. **Opaque-Box Verification**: Tests validate observable external behaviors (HTTP status codes, headers, response payloads, DOM hierarchy, and security guarantees) without coupling to internal implementation mechanics.
2. **Progressive Testability**: The suite features dual-transport architecture. It can execute in **in-process reference mode** (100% sandbox-safe, zero socket permissions needed, instantaneous execution during early milestone bootstrapping) and **live mode** (against running Next.js and Express instances on ports 3000 and 8000).
3. **Zero External Dependencies**: Built on Node.js 20+ native test runner (`node:test`, `node:assert/strict`, `fetch`, and native ESM), eliminating dependency drift, native compilation bottlenecks, and security vulnerabilities.
4. **Self-Contained & Isolated**: Every test manages its own state and IP address isolation, ensuring deterministic execution order independence.

---

## 2. 4-Tier Test Taxonomy

The test suite is structured into four progressive tiers:

```
tests/
├── e2e/
│   ├── tier1-feature-coverage/       # Primary Happy Path & Core Capabilities
│   │   ├── navigation.test.mjs
│   │   ├── services.test.mjs
│   │   ├── products.test.mjs
│   │   ├── contact-api.test.mjs
│   │   └── compliance.test.mjs
│   ├── tier2-boundary-corner/        # Boundaries, Negative Constraints & Failure Modes
│   │   ├── contact-boundaries.test.mjs
│   │   ├── route-concealment.test.mjs
│   │   ├── webhook-fallback.test.mjs
│   │   └── rate-limiting.test.mjs
│   ├── tier3-cross-feature/          # Inter-module Workflows & System Cohesion
│   │   ├── service-to-contact-flow.test.mjs
│   │   ├── cookie-consent-analytics.test.mjs
│   │   └── theme-consistency.test.mjs
│   └── tier4-real-world-scenarios/   # End-to-End User & Auditor Journeys
│       ├── user-inquiry-journey.test.mjs
│       ├── client-service-vetting.test.mjs
│       └── investor-compliance-audit.test.mjs
└── runner/                           # Harness, Dispatcher, Inspector & Assertions
    ├── index.mjs
    ├── config.mjs
    ├── http-client.mjs
    ├── html-parser.mjs
    ├── assertions.mjs
    ├── mock-server.mjs
    └── test-context.mjs
```

### Tier 1: Feature Coverage
- **Navigation & Route Integrity (`navigation.test.mjs`)**:
  - Verifies presence of the 6 locked primary navigation items: `Home`, `About`, `Services`, `Products`, `Our Work`, `Contact`.
  - Verifies primary CTA button labelled `Start a Conversation` linking to `/contact`.
  - Verifies strict absence and 404 response on `/ventures`.
- **Service Showcases & API (`services.test.mjs`)**:
  - Verifies `GET /api/services` returns all 6 published services.
  - Verifies `GET /api/services/:slug` returns valid contracts for all 6 services and 404 for invalid slugs.
  - Verifies 6 dedicated service routes (`ai-intelligent-automation`, `custom-software-development`, `web-digital-experiences`, `mobile-application-development`, `cloud-devops`, `technology-consulting`) render commercial statements, 4-step process steppers, tech badges, and engagement CTAs.
- **Product Showcases & Concealment (`products.test.mjs`)**:
  - Verifies published launch products: `neermiti-collections` and `sadhana-daily`.
  - Verifies strict exclusion and HTTP 404 concealment of unpublished product `driveiq` across API and web.
- **Contact Form & API Validation (`contact-api.test.mjs`)**:
  - Verifies `POST /api/contact` happy path with and without optional `organization` field.
  - Verifies acceptance of all 4 inquiry categories (`Venture idea`, `Strategic partnership`, `Business collaboration`, `General inquiry`).
  - Verifies HTTP 400 rejection on missing mandatory fields.
  - Verifies `/contact` interactive web form markup and input elements.
- **Regulatory & Legal Compliance (`compliance.test.mjs`)**:
  - Verifies corporate footer strip conforms to Companies Act 2013 Rule 26 (Legal Name, CIN, Registered Office, Telephone, Email, Grievance Officer).
  - Verifies standalone DPDP Act 2023 site-wide Privacy Policy at `/privacy-policy`.
  - Verifies dedicated product privacy notices at `/products/neermiti-collections/privacy` and `/products/sadhana-daily/privacy`.
  - Verifies standalone `/terms`, `/disclaimer`, and `/cookies` policies.

### Tier 2: Boundary & Corner Cases
- **Contact Form Validation Boundaries (`contact-boundaries.test.mjs`)**:
  - Message length threshold: Rejects 19 chars (< 20 chars), whitespace-only; accepts exactly 20 chars and 21 chars.
  - Message extreme payload: Handles large 5,000-character payloads.
  - Email format edge cases: Rejects invalid syntaxes (`plain`, `@missing.com`, `user@`, `user@domain..com`, spaces); accepts complex valid RFC 5322 emails.
  - Inquiry categories: Rejects unauthorized category strings.
- **Route Concealment & Negative Assertions (`route-concealment.test.mjs`)**:
  - Strictly asserts 404 on direct access to `/ventures`, `/ventures/`, `/ventures/portfolio`.
  - Strictly asserts 404 on `/products/driveiq` and `GET /api/products/driveiq`.
  - Asserts zero unpublished items leak into public API listings.
- **Webhook Degradation & Mailto Fallback (`webhook-fallback.test.mjs`)**:
  - Verifies fallback to `mailto:ratnesh.k.gupta@icloud.com` when `GOOGLE_SHEET_WEBHOOK_URL` is unconfigured.
  - Validates pre-encoded subject and body in mailto payload.
  - Asserts server never throws unhandled exceptions or HTTP 500 on external network errors.
- **Rate Limiting & Throttling Thresholds (`rate-limiting.test.mjs`)**:
  - Verifies client IP burst submission throttling (> 10 requests within window triggers HTTP 429 Too Many Requests).
  - Validates `Retry-After` and `RateLimit-Remaining` headers.

### Tier 3: Cross-Feature Combinations
- **Service-to-Contact Flow (`service-to-contact-flow.test.mjs`)**:
  - Verifies CTA links from service pages deep-link to `/contact` with query parameters.
  - Validates that the contact form pre-populates category state from query parameters.
  - Verifies bidirectional navigation between product showcases and dedicated product privacy notices.
- **Cookie Consent & Analytics Isolation (`cookie-consent-analytics.test.mjs`)**:
  - Asserts zero analytics trackers or third-party cookies execute prior to explicit user consent.
  - Verifies interactive cookie preference controls on `/cookies`.
- **Brand Theme & Design System Consistency (`theme-consistency.test.mjs`)**:
  - Verifies Palette A color tokens (`#173C32`, `#071B18`, `#C9A35B`, `#F7F2E9`, `#252725`, `#A8B7A8`, `#FFFFFF`) across layouts.
  - Verifies typography font family stacks (`Playfair Display`, `Inter` / `Instrument Sans`).
  - Verifies `meta name="theme-color"` corresponds to Palette A evergreen/forest tokens.

### Tier 4: Real-World Scenarios
- **Scenario 1: User Inquiry Submission Journey (`user-inquiry-journey.test.mjs`)**:
  - Complete user journey: Home landing -> Services directory -> Web & Digital Experiences -> CTA click -> Contact pre-fill -> Form submission -> Confirmation acknowledgment.
- **Scenario 2: Enterprise Client Service Vetting (`client-service-vetting.test.mjs`)**:
  - Enterprise buyer evaluation: AI & Intelligent Automation inspection -> Capability analysis -> 4-stage process stepper verification -> Tech badges validation -> Case studies audit on `/our-work`.
- **Scenario 3: Statutory Compliance & Investor Due Diligence (`investor-compliance-audit.test.mjs`)**:
  - Comprehensive audit: Rule 26 corporate footer validation -> DPDP Act 2023 rights and grievance redressal audit -> Product privacy notices verification -> Terms of Use, Disclaimer, and Cookie policy audit.

---

## 3. Test Runner & Harness Architecture

### Core Components
1. **CLI Runner (`tests/runner/index.mjs`)**:
   - Discovers test files dynamically.
   - Provides tier filtering (`--tier=1`, `--tier=2`, `--tier=3`, `--tier=4`, `--tier=all`).
   - Supports pluggable reporters (`spec`, `tap`, `dot`, `junit`).
   - Tracks passes and failures with clear exit codes.
2. **HTTP Client (`tests/runner/http-client.mjs`)**:
   - Wraps standard `fetch` with timeouts, automatic JSON parsing, status tracking, and timing metrics.
   - Transparently routes to in-process mock dispatcher when running in sandboxed/offline environments.
3. **HTML Inspector (`tests/runner/html-parser.mjs`)**:
   - Zero-dependency DOM/HTML inspector extracting links, headings, form inputs, meta tags, and text occurrences.
4. **Custom Assertions (`tests/runner/assertions.mjs`)**:
   - Diagnostic assert wrappers: `assertStatus`, `assertHeader`, `assertContainsText`, `assertNotContainsText`, `assertRule26Compliant`, `assertDPDPActCompliant`.
5. **Reference Mock Server (`tests/runner/mock-server.mjs`)**:
   - Implements the exact specification contracts from `PROJECT.md`. Provides dual execution: direct in-process dispatch (for sandbox environments) and standard Node HTTP server.

---

## 4. Execution Commands

### Full Suite
```bash
# Run all 4 tiers via custom runner
node tests/runner/index.mjs

# Or via native Node test runner
node --test tests/e2e/**/*.test.mjs
```

### Specific Tiers
```bash
# Tier 1: Feature Coverage only
node tests/runner/index.mjs --tier=1

# Tier 2: Boundary & Corner Cases only
node tests/runner/index.mjs --tier=2

# Tier 3: Cross-Feature Combinations only
node tests/runner/index.mjs --tier=3

# Tier 4: Real-World Scenarios only
node tests/runner/index.mjs --tier=4
```

### Target Mode Selection
```bash
# Auto mode: tests live server if up, falls back to in-process reference (default)
node tests/runner/index.mjs --target=auto

# Live mode: mandates live servers running on TEST_WEB_URL and TEST_API_URL
node tests/runner/index.mjs --target=live

# Ephemeral mock mode: runs against spec reference dispatcher
node tests/runner/index.mjs --target=mock
```

### CI / Automated Reporting
```bash
# TAP output for CI pipelines
node tests/runner/index.mjs --reporter=tap

# JUnit XML output for build dashboards
node tests/runner/index.mjs --reporter=junit
```

---

## 5. Environment Variables

| Variable | Description | Default |
|---|---|---|
| `TEST_WEB_URL` | Base URL for frontend web platform | `http://localhost:3000` |
| `TEST_API_URL` | Base URL for backend Express API server | `http://localhost:8000` |
| `TEST_TARGET` | Execution mode (`auto`, `live`, `mock`) | `auto` |
| `TEST_TIMEOUT_MS` | HTTP client request timeout in milliseconds | `5000` |
| `GOOGLE_SHEET_WEBHOOK_URL` | Target webhook URL for forwarder tests | (optional) |
