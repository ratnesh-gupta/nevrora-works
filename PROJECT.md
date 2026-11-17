# Project: Nevrora Works — Product Portfolio Platform Monorepo

## 1. Business Identity & Positioning (Requirements Baseline v1.0)
- **Brand**: Nevrora Works
- **Tagline**: *Ideas into products.*
- **Positioning**: Product company creating, owning, and operating useful digital products across mobile, web, SaaS, and AI-enabled categories.
- **Official Support & Grievance Contact**: `support@nevrora-works.com`
- **B2B Isolation**: Completely distinct from Nevrora Digital's B2B consulting and service operations (`/services` and `/our-work` are strictly excluded).

## 2. Information Architecture
- **Home (`/`)**: Product-company proposition, featured products, categories, and product discovery CTAs (P0).
- **Products Directory (`/products`)**: Search and filter by category, platform, and lifecycle status; product cards with lifecycle badges and destination links (P0).
- **Reusable Product Detail (`/products/[slug]`)**: Overview, audience/problem, value proposition, prioritized features, responsive screenshot gallery, platform availability matrix, lifecycle-aware CTA, FAQs, support routing, and product-specific legal links (P0).
- **Support Directory (`/support`)**: Routes users to each product's dedicated support email (`support@nevrora-works.com`), help links, and FAQs (P0).
- **Legal (`/privacy-policy`, `/terms`, `/disclaimer`, `/cookies`, `/products/[slug]/privacy`, `/products/[slug]/terms`)**: Company-level and product-specific DPDP Act 2023 privacy notices and Terms of Use (P0).
- **About Works & Innovation (`/about`)**: Product philosophy, lifecycle governance, and corporate disclosures (P1).
- **Contact (`/contact`)**: Product early-access notifications (`Notify Me`), product support, and partnership enquiries (P1).
- **Announcements (`/announcements`)**: Dated product previews and release updates (P2).

## 3. API Endpoints (`apps/api`)
- `GET /health` -> `{ status: "ok", timestamp: string }`
- `GET /api/products` -> Published products (`lifecycle_status !== "internal_draft"`), supports `?category=`, `?platform=`, `?status=`, `?featured=`, `?q=`
- `GET /api/products/:slug` -> Single published product detail (`404` for `internal_draft` or unknown slug)
- `GET /api/support` -> Product support directory and published FAQs
- `GET /api/announcements` -> Published product announcements
- `GET /api/company` -> Nevrora Works `SiteConfig` & Rule 26 statutory details
- `POST /api/contact` -> Zod-validated product inquiry endpoint with mailto fallback to `support@nevrora-works.com`

## 4. Git & Branching Workflow
- `main`: Production root.
- `develop`: Active integration branch branched from `main`.
- Incremental phase commits pushed regularly to `origin/develop`, merged to `main` via Pull Request.
