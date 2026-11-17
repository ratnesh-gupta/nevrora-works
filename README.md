# Nevrora Ventures — Platform Monorepo

> **Building Businesses. Creating Lasting Value.**  
> Official corporate technology platform, venture studio catalog, and API services for **Nevrora Ventures**.

---

## 🏛️ Architecture Overview

Built as a high-performance **Turborepo** monorepo using **pnpm workspaces**:

```text
nevrora-ventures/
├── apps/
│   ├── web/                     # Next.js 15+ App Router, React 19, Tailwind CSS, Three.js 3D hero
│   └── api/                     # Node.js 22 + Express REST API (security, rate limits, data store)
├── packages/
│   ├── types/                   # Shared TypeScript models (Product, Service, Legal, Contact)
│   └── config/                  # Shared design tokens (Palette A), navigation, site constants
└── tests/                       # 4-tier dual-track E2E test harness
```

---

## ⚡ Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **pnpm**: `v9.x` or `v10.x` (`corepack enable pnpm` or `npm install -g pnpm`)

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Both Web and API (Recommended)
```bash
pnpm run dev
```
This runs Turborepo, concurrently launching:
- **Web Platform**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000) (Health check: [http://localhost:8000/health](http://localhost:8000/health))

### 3. Running Services Independently

To run only the Next.js web application:
```bash
pnpm --filter @nevrora/web dev
```

To run only the Express backend API:
```bash
pnpm --filter @nevrora/api dev
```

---

## 🛠️ Troubleshooting Common Local Issues

### Issue 1: Port Already in Use (`EADDRINUSE: 3000` or `8000`)
If another background terminal or process is occupying port 3000 or 8000:

**macOS / Linux:**
```bash
# Check what is using the ports
lsof -i :3000 -i :8000

# Kill lingering processes
lsof -ti :3000 -i :8000 | xargs kill -9
```

**Windows (PowerShell):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000,8000).OwningProcess | Stop-Process
```

### Issue 2: Slow Initial Page Load or `Internal Server Error`
When running on external USB/SD drives (e.g. `/Volumes/...`), Next.js compiles 700+ modules on the first request, which may take 15–20 seconds.
- Wait a few seconds for the compilation to complete (`✓ Compiled / in ...`).
- If corrupted, clear the cache and restart:
  ```bash
  rm -rf apps/web/.next
  pnpm --filter @nevrora/web dev
  ```

---

## 🧪 Testing & Verification

Run all test suites across the monorepo:

```bash
# Run all unit and integration tests
pnpm run test

# Run strict TypeScript typecheck
pnpm run typecheck

# Run full Turborepo production build
pnpm run build

# Run linting / formatting checks
pnpm run lint
```

---

## 🌐 Routes & Highlights

### Core Navigation
- **Home**: `/` (Interactive 3D Three.js "Venture Constellation" Hero with SVG fallback, Approach stepper, Companies Act Rule 26 strip)
- **About**: `/about` (Studio philosophy, methodology, venture incubation)
- **Services**: `/services` (Interactive overview of technology capabilities)
- **Products**: `/products` (Verified venture catalog: **Neermiti Collections** and **Sadhana Daily**)
- **Our Work**: `/our-work` (Portfolio case studies & development milestones)
- **Contact**: `/contact` (Zod-validated form with Google Sheets webhook forwarding and mailto fallback)

### 6 Dedicated Interactive Service Pages
1. `/services/ai-intelligent-automation` — Custom LLMs, cognitive agents, RAG, and workflow automation.
2. `/services/custom-software-development` — Scalable distributed backends, microservices, and enterprise portals.
3. `/services/web-digital-experiences` — High-performance Next.js/React applications and 3D WebGL interfaces.
4. `/services/mobile-application-development` — Native iOS/Android and cross-platform Flutter/React Native solutions.
5. `/services/cloud-devops` — Cloud-native architecture (AWS/GCP), Kubernetes, and automated CI/CD GitOps.
6. `/services/technology-consulting` — Architecture modernization, tech due diligence, and enterprise advisory.

### Legal & Regulatory Compliance
- **Rule 26 Corporate Strip**: Companies Act, 2013 disclosures on the homepage footer.
- **Privacy Policy**: Standalone DPDP Act 2023 notice at `/privacy-policy`.
- **Product Privacy Notices**: `/products/neermiti-collections/privacy`, `/products/sadhana-daily/privacy`.
- **Terms & Disclaimer**: `/terms`, `/disclaimer`, and cookie notice banner.

---

## ✉️ Contact Form Google Sheets Integration

In `apps/api/.env`, configure your Google Apps Script webhook URL to automatically append submissions to a Google Sheet:

```env
PORT=8000
NODE_ENV=development
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

If not configured, the API logs inquiries in-memory and provides a transparent `mailto:ratnesh.k.gupta@icloud.com` fallback.
