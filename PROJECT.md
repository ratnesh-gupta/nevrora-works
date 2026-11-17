# Project: Nevrora Ventures Platform Monorepo

## Architecture

- **Monorepo Tooling**: pnpm workspaces (`apps/*`, `packages/*`) + Turborepo (`turbo.json`) for cached task execution.
- **Node Engine**: `"engines": { "node": "^20.0.0 || ^22.0.0", "pnpm": ">=9.0.0" }`.
- **Packages & Apps**:
  - `apps/web`: Next.js 15+ (App Router), React 19, TypeScript (strict), Tailwind CSS, Three.js (`@react-three/fiber`, `@react-three/drei`), Framer Motion (`framer-motion`), Lucide icons (`lucide-react`).
  - `apps/api`: Standalone Node.js + Express + TypeScript, Zod validation, rate limiting (`express-rate-limit`), Helmet, CORS, in-memory/JSON data layer.
  - `packages/types`: Shared TypeScript interfaces (`Product`, `Service`, `PrivacyNotice`, `ContactSubmission`, `CaseStudy`, `SiteConfig`, `ApiResponse`).
  - `packages/config`: Shared design tokens (Palette A: `#173C32`, `#071B18`, `#C9A35B`, `#F7F2E9`, `#252725`, `#A8B7A8`, `#FFFFFF`), typography stacks, locked navigation, statutory defaults.
- **Git & Branching Workflow**:
  - `main`: Production root.
  - `develop`: Development integration root branched from `main`.
  - Feature branches (`feat/*` or `feature/*`) branched off `develop`.
  - Push branches to `origin` via `git push -u origin <branch>` and merge to `develop` via standard git branch workflow.
  - Coordinated by Team Lead with Senior Frontend and Backend Engineers.

## Feature Inventory

| #   | Feature                                 | Description                                                        | Milestone | Source     |
| --- | --------------------------------------- | ------------------------------------------------------------------ | --------- | ---------- |
| 1   | Turborepo & pnpm Workspace              | Monorepo root config, pnpm-workspace.yaml, turbo.json              | M1        | R1         |
| 2   | Node Engine Enforcement                 | Node ^20.0.0 \|\| ^22.0.0 strict engine constraints                | M1        | R1         |
| 3   | Product Interface                       | Shared TypeScript interface for venture products                   | M1        | R1, R4     |
| 4   | Service Interface                       | Shared TypeScript interface for services with steppers & badges    | M1        | R1, R4     |
| 5   | PrivacyNotice Interface                 | Shared TypeScript interface for DPDP Act notices                   | M1        | R1, R6     |
| 6   | ContactSubmission Interface             | Shared TypeScript interface & schema for contact submissions       | M1        | R1, R5     |
| 7   | CaseStudy Interface                     | Shared TypeScript interface for Our Work showcase                  | M1        | R1, R4     |
| 8   | SiteConfig Interface                    | Shared TypeScript interface for brand & Rule 26 statutory details  | M1        | R1, R6     |
| 9   | Palette A Design Tokens                 | Centralized color tokens in @nevrora/config                        | M1        | R3         |
| 10  | Typography Tokens                       | Playfair Display & Inter font stack definitions                    | M1        | R3         |
| 11  | Inquiry Types & Constants               | Predefined contact inquiry categories & statutory defaults         | M1        | R5         |
| 12  | Git Develop Branch & PR Workflow        | develop branch created from main, remote push & git PR workflow    | M1        | R2         |
| 13  | Express API Server Setup                | Standalone Node.js/Express server on Node 20/22                    | M2        | R1         |
| 14  | API Security Hardening                  | Helmet headers, CORS policy, JSON parsing limits                   | M2        | R1         |
| 15  | API Rate Limiting                       | IP rate limiter using express-rate-limit                           | M2        | R1         |
| 16  | API In-Memory Data Layer                | Structured typed data files (services, products, company)          | M2        | R5         |
| 17  | Endpoint: GET /api/services             | List of published services                                         | M2        | R4         |
| 18  | Endpoint: GET /api/services/:slug       | Detailed service specification by slug                             | M2        | R4         |
| 19  | Endpoint: GET /api/products             | List of published products (neermiti, sadhana)                     | M2        | R4         |
| 20  | Endpoint: GET /api/products/:slug       | Single product detail; 404 for driveiq                             | M2        | R4         |
| 21  | Endpoint: POST /api/contact             | Zod-validated contact endpoint                                     | M2        | R5         |
| 22  | Google Sheets Webhook Forwarder         | Forward contact submission to GOOGLE_SHEET_WEBHOOK_URL             | M2        | R5         |
| 23  | Mailto Fallback Generator               | Fallback to mailto:ratnesh.k.gupta@icloud.com on webhook failure   | M2        | R5         |
| 24  | Next.js 15+ App Router Structure        | Next.js modern App Router setup with layout & pages                | M3        | R1         |
| 25  | Responsive Navigation Bar               | Top navigation bar with desktop nav & mobile drawer                | M3        | R4         |
| 26  | Primary Navigation Links                | Fixed list: Home, About, Services, Products, Our Work, Contact     | M3        | R4         |
| 27  | Navigation CTA Button                   | Primary action button: Start a Conversation                        | M3        | R4         |
| 28  | Strict Prohibition of /ventures         | Zero existence of /ventures route or nav item                      | M3        | R4         |
| 29  | 3D Interactive Hero Constellation       | Three.js / R3F interactive scene with orbital nodes                | M3        | R3         |
| 30  | Constellation SVG/CSS Fallback          | High-performance 2D SVG/CSS fallback scene                         | M3        | R3         |
| 31  | Service: ai-intelligent-automation      | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 32  | Service: custom-software-development    | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 33  | Service: web-digital-experiences        | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 34  | Service: mobile-application-development | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 35  | Service: cloud-devops                   | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 36  | Service: technology-consulting          | Dedicated service page with process stepper & tech badges          | M3        | R4         |
| 37  | Service Process Steppers                | Interactive multi-step process indicator on service pages          | M3        | R3, R4     |
| 38  | Technology Badges Grid                  | Visual pill badges displaying tech stacks for each service         | M3        | R4         |
| 39  | Product: neermiti-collections           | Dedicated product showcase page                                    | M3        | R4         |
| 40  | Product: sadhana-daily                  | Dedicated product showcase page                                    | M3        | R4         |
| 41  | Strict Exclusion of driveiq             | driveiq published: false; excluded from UI, search, sitemap        | M3        | R4         |
| 42  | Our Work Showcase Page                  | Case studies listing page                                          | M3        | R4         |
| 43  | About Page                              | Company vision, methodology, operating principles                  | M3        | R4         |
| 44  | Contact Page & Form UI                  | Form with client-side validation & API submission                  | M3        | R4, R5     |
| 45  | Companies Act Rule 26 Footer Strip      | Statutory footer display with legal name, CIN, office, grievance   | M3        | R6         |
| 46  | DPDP Act 2023 Privacy Policy            | Standalone privacy policy at /privacy-policy                       | M3        | R6         |
| 47  | Product Privacy: Neermiti               | Dedicated privacy notice at /products/neermiti-collections/privacy | M3        | R6         |
| 48  | Product Privacy: Sadhana Daily          | Dedicated privacy notice at /products/sadhana-daily/privacy        | M3        | R6         |
| 49  | Terms of Use Page                       | Standalone terms page at /terms                                    | M3        | R6         |
| 50  | Disclaimer Page                         | Standalone disclaimer page at /disclaimer                          | M3        | R6         |
| 51  | Cookie Notice & Preferences             | Standalone cookie policy at /cookies with consent toggle           | M3        | R6         |
| 52  | Turborepo Monorepo Build                | Root build script executing workspace builds                       | M5        | Acceptance |
| 53  | Strict TypeScript Typecheck             | Strict typecheck across all workspaces                             | M5        | Acceptance |
| 54  | Code Linting Suite                      | ESLint and Prettier rules passing cleanly                          | M5        | Acceptance |
| 55  | Unit & API Test Suite                   | Comprehensive unit tests for API endpoints & utilities             | M5        | Acceptance |

## Milestones

| #   | Name                                  | Scope                                                                                                                                        | Dependencies | Status      |
| --- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| M1  | Monorepo Foundation & Shared Packages | develop branch from main, pnpm-workspace.yaml, turbo.json, root package.json, packages/types, packages/config                                | none         | IN_PROGRESS |
| M2  | Backend API & Data Layer (apps/api)   | Express + TS server, security middleware, rate limiter, data layer, endpoints, contact webhook & mailto fallback, unit tests                 | M1           | PLANNED     |
| M3  | Frontend Web Platform (apps/web)      | Next.js 15 App Router, Tailwind, Three.js 3D Hero Constellation + SVG fallback, locked nav, 6 service pages, product pages, legal compliance | M1, M2       | PLANNED     |
| M4  | E2E Testing Suite (E2E Track)         | Opaque-box test suite across Tiers 1-4, test runner, TEST_READY.md                                                                           | M1           | PLANNED     |
| M5  | Integration, Hardening & Final Gate   | Full monorepo build, strict typecheck, lint, 100% E2E test pass, Reviewer approval, Challenger verification, Forensic Auditor clean verdict  | M2, M3, M4   | PLANNED     |

## Interface Contracts

### @nevrora/types ↔ apps/api & apps/web

- Exported interfaces: `Product`, `Service`, `PrivacyNotice`, `ContactSubmission`, `CaseStudy`, `SiteConfig`, `ApiResponse<T>`.
- `Product.published: boolean`: when `false`, items MUST be excluded from all public listings, searches, and sitemaps.
- `ContactSubmission`: validated via Zod schema matching TypeScript interface.

### @nevrora/config ↔ apps/web & apps/api

- Exported constants: `PALETTE_A` (`forest`, `evergreen`, `gold`, `cream`, `charcoal`, `sage`, `white`), `PALETTE_LIGHT_GRADIENT` (Apple Daylight & Aurora Mesh tokens: `bgCanvas`, `bgHeroGradient`, `surfaceCard`, `surfaceElevated`, `borderSubtle`, `textPrimary`, `textSecondary`, `btnPrimary`, `textGradient`, `badgeSurface`, `cobalt`, `violet`, `cyan`), `TYPOGRAPHY` (`fontDisplay`, `fontBody`, `fontMono`), `LOCKED_NAVIGATION` (6 items + CTA), `STATUTORY_DETAILS` (legalName, cin, registeredOffice, phone, email, grievanceContact).

### apps/api ↔ apps/web

- `GET /health` -> `{ status: "ok", timestamp: string }`
- `GET /api/services` -> `{ success: true, data: Service[] }` (where `published === true`)
- `GET /api/services/:slug` -> `{ success: true, data: Service }` (404 if not found)
- `GET /api/products` -> `{ success: true, data: Product[] }` (only `published === true`, excluding `driveiq`)
- `GET /api/products/:slug` -> `{ success: true, data: Product }` (404 if `published !== true`)
- `POST /api/contact` -> Body: `{ name, email, organization?, type, message }` -> `{ success: true, message: string, forwardedToSheets: boolean, mailtoFallback?: string }` (400 if invalid Zod payload, 429 if rate limited)

## Code Layout

```
/Volumes/RatneshED/RatneshTech/Nevrora/codebase/nevrora-ventures/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── .gitignore
├── apps/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── data/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   └── test/
│   └── web/
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── postcss.config.js
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── about/
│       │   ├── services/
│       │   ├── products/
│       │   ├── our-work/
│       │   ├── contact/
│       │   ├── privacy-policy/
│       │   ├── terms/
│       │   ├── disclaimer/
│       │   └── cookies/
│       ├── components/
│       │   ├── hero/
│       │   ├── navigation/
│       │   ├── services/
│       │   ├── products/
│       │   └── contact/
│       └── public/
└── packages/
    ├── types/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    └── config/
        ├── package.json
        ├── tsconfig.json
        └── src/index.ts
```
