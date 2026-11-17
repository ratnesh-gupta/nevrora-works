# Nevrora Works — Product Portfolio Platform Monorepo

> **Ideas into products.**  
> Official product-company website, product portfolio directory, support routing hub, and API services for **Nevrora Works** (`Nevrora Technologies Private Limited`).

---

## 🏛️ Architecture Overview

Built as a **Turborepo** monorepo using **pnpm workspaces**:

```text
nevrora-works/
├── apps/
│   ├── web/                     # Next.js 15+ App Router, React 19, Tailwind CSS, reusable product portfolio UI
│   └── api/                     # Node.js 22 + Express REST API (products, support directory, announcements, contact)
├── packages/
│   ├── types/                   # Shared TypeScript contracts (Product, Lifecycle, Platform, Feature, Media, FAQ, Support, Legal)
│   └── config/                  # Shared design tokens, lifecycle rules, navigation, statutory details (support@nevrora-works.com)
└── tests/                       # Automated unit, adversarial, and E2E verification suites
```

---

## 📦 Product Lifecycle & Portfolio Baseline (v1.0)

Nevrora Works enforces a 6-state product lifecycle engine (`NW-FR-03`, `NW-FR-11`):
- `internal_draft`: Strictly non-public; concealed from all listings, API responses, and sitemaps (`404` on direct access).
- `coming_soon`: Approved product preview (`Notify Me` CTA; no unconfirmed launch dates).
- `beta`: Limited release with eligibility and preview boundaries explained (`Join Beta` CTA).
- `live`: Generally available on verified platforms (`Get it on Google Play` / `Open Web App` CTA).
- `maintenance`: Displays clear user-impact notice and expected next steps (`Contact Support` CTA).
- `discontinued`: Explains end of active distribution and migration/support options.

### Initial Portfolio (Coming Soon)
1. **Sadhana Daily** (`/products/sadhana-daily`) — *Mobile & Daily Practice*
2. **Neermiti Collections** (`/products/neermiti-collections`) — *Commerce & Lifestyle*
3. **DriveIQ** (`/products/driveiq`) — *SaaS & Operations*

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Both Web and API
```bash
pnpm run dev
```
- **Web Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000) (Health check: [http://localhost:8000/health](http://localhost:8000/health))

### 3. Official Support Contact
- **Support & Grievance Email**: `support@nevrora-works.com`
