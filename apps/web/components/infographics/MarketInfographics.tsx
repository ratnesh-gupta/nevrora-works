import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

export interface ArchitectureNode {
  stage: string;
  title: string;
  tech: string;
  metric: string;
}

export interface BenchmarkMetric {
  label: string;
  beforeLabel: string;
  afterLabel: string;
  percentImprovement: string;
  barWidthClass: string;
}

export interface ComparisonRow {
  aspect: string;
  legacyApproach: string;
  nevroraSolution: string;
}

export interface ServiceVisualMeta {
  imageUrl: string;
  imageAlt: string;
  tagline: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  architectureNodes: ArchitectureNode[];
  benchmarks: BenchmarkMetric[];
  comparison: ComparisonRow[];
}

export const SERVICE_VISUAL_META: Record<string, ServiceVisualMeta> = {
  "ai-intelligent-automation": {
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "High-density AI compute silicon and neural processing hardware architecture",
    tagline: "Autonomous Multi-Agent & RAG Pipelines",
    primaryMetric: {
      value: "-42%",
      label: "Manual Triage Overhead",
    },
    architectureNodes: [
      {
        stage: "01 INGEST",
        title: "Enterprise Data Sources",
        tech: "Kafka • Webhooks • ERP",
        metric: "10k+ events/s",
      },
      {
        stage: "02 INDEX",
        title: "Vector & RAG Synthesis",
        tech: "Embeddings • Semantic Cache",
        metric: "99.2% recall",
      },
      {
        stage: "03 DECIDE",
        title: "Multi-Agent Router",
        tech: "LangChain • Ray • Guardrails",
        metric: "Deterministic",
      },
      {
        stage: "04 EXECUTE",
        title: "Production API Action",
        tech: "FastAPI • PyTorch • Audit",
        metric: "<200ms latency",
      },
    ],
    benchmarks: [
      {
        label: "Operational Exception Triage",
        beforeLabel: "100% Manual Queue (14m avg)",
        afterLabel: "80% Automated (<200ms)",
        percentImprovement: "42% Ops Cost Reduction",
        barWidthClass: "w-[84%]",
      },
      {
        label: "Enterprise Knowledge Retrieval",
        beforeLabel: "22m Cross-Doc Search",
        afterLabel: "1.4s Cited RAG Answer",
        percentImprovement: "94% Faster Synthesis",
        barWidthClass: "w-[94%]",
      },
      {
        label: "Model Accuracy & Safety Audit",
        beforeLabel: "Unmonitored Prompt Drift",
        afterLabel: "Continuous Schema Guardrails",
        percentImprovement: "99.9% Validated Output",
        barWidthClass: "w-[96%]",
      },
    ],
    comparison: [
      {
        aspect: "Production Reliability",
        legacyApproach: "Fragile prompt notebooks prone to hallucination",
        nevroraSolution:
          "Deterministic state machines, schema validators & automated fallback",
      },
      {
        aspect: "Enterprise Data Privacy",
        legacyApproach: "Opaque third-party API logging without PII masking",
        nevroraSolution:
          "VPC-isolated inference, zero data retention & DPDP/SOC2 audit logs",
      },
      {
        aspect: "Commercial Impact",
        legacyApproach: "Isolated AI demos disconnected from core ERPs",
        nevroraSolution:
          "Event-driven workflows wired directly into transactional systems",
      },
    ],
  },
  "custom-software-development": {
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Clean engineering workstation displaying distributed software code",
    tagline: "High-Throughput Distributed Systems",
    primaryMetric: {
      value: "800x",
      label: "Compute Acceleration",
    },
    architectureNodes: [
      {
        stage: "01 EDGE",
        title: "Zero-Trust API Gateway",
        tech: "TypeScript • Auth • Rate Limit",
        metric: "99.99% edge SLA",
      },
      {
        stage: "02 CORE",
        title: "Domain Microservices",
        tech: "Go • Node.js • DDD",
        metric: "18s batch kernel",
      },
      {
        stage: "03 STREAM",
        title: "Event & Cache Fabric",
        tech: "Redis Cluster • Message Bus",
        metric: "<5ms cache hit",
      },
      {
        stage: "04 LEDGER",
        title: "Distributed Persistence",
        tech: "PostgreSQL • Read Replicas",
        metric: "ACID compliant",
      },
    ],
    benchmarks: [
      {
        label: "Portfolio Risk & Batch Kernel",
        beforeLabel: "4 Hours Legacy Monolith",
        afterLabel: "18 Seconds Go Vector Engine",
        percentImprovement: "800x Faster Compute",
        barWidthClass: "w-[98%]",
      },
      {
        label: "Release & Regression Cadence",
        beforeLabel: "Bi-Monthly Manual Freeze",
        afterLabel: "Daily Automated Canary CI",
        percentImprovement: "12x Deploy Velocity",
        barWidthClass: "w-[90%]",
      },
      {
        label: "System Availability",
        beforeLabel: "Single-Node SPOF Outages",
        afterLabel: "Active-Active Failover",
        percentImprovement: "99.99% Uptime SLA",
        barWidthClass: "w-[99%]",
      },
    ],
    comparison: [
      {
        aspect: "Domain Fit",
        legacyApproach:
          "Generic SaaS forcing brittle spreadsheets and workarounds",
        nevroraSolution:
          "Domain-Driven Design tailored to exact operational invariants",
      },
      {
        aspect: "Codebase Longevity",
        legacyApproach: "Tightly coupled spaghetti with zero contract tests",
        nevroraSolution:
          "Strictly typed monorepo contracts, modular APIs & runbooks",
      },
      {
        aspect: "Throughput Ceiling",
        legacyApproach:
          "Database lock contention under concurrent enterprise load",
        nevroraSolution:
          "Non-blocking event pipelines, CQRS reads & distributed caching",
      },
    ],
  },
  "web-digital-experiences": {
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Modern digital interface analytics and web platform design setup",
    tagline: "Sub-Second Edge Web & 3D WebGL",
    primaryMetric: {
      value: "0.7s",
      label: "Global Edge LCP",
    },
    architectureNodes: [
      {
        stage: "01 CACHE",
        title: "Global Multi-Region CDN",
        tech: "Edge Caching • Brotli • HTTP/3",
        metric: "<40ms TTFB",
      },
      {
        stage: "02 RENDER",
        title: "Hybrid App Router",
        tech: "Next.js 15 • RSC • ISR",
        metric: "0.7s LCP target",
      },
      {
        stage: "03 MOTION",
        title: "Interactive 3D & UI",
        tech: "Three.js • WebGL • Framer",
        metric: "60fps fluid",
      },
      {
        stage: "04 MEASURE",
        title: "Accessibility & CWV",
        tech: "WCAG 2.1 AA • Telemetry",
        metric: "3.4x dwell lift",
      },
    ],
    benchmarks: [
      {
        label: "Largest Contentful Paint (LCP)",
        beforeLabel: "3.8s Heavy SPA Bundle",
        afterLabel: "0.7s Streaming Edge RSC",
        percentImprovement: "81% Faster Initial Load",
        barWidthClass: "w-[88%]",
      },
      {
        label: "Enterprise Product Dwell Time",
        beforeLabel: "42s Flat Static Catalog",
        afterLabel: "2m 24s Interactive 3D Stage",
        percentImprovement: "3.4x Engagement Lift",
        barWidthClass: "w-[92%]",
      },
      {
        label: "Mobile Viewport & Touch Polish",
        beforeLabel: "Horizontal Scroll Breakage",
        afterLabel: "Apple HIG 44pt Responsive Grid",
        percentImprovement: "100% Viewport Integrity",
        barWidthClass: "w-[100%]",
      },
    ],
    comparison: [
      {
        aspect: "Rendering Pipeline",
        legacyApproach:
          "Bloated client-only bundles stalling mobile first paint",
        nevroraSolution:
          "Server Components + granular island hydration for sub-second UX",
      },
      {
        aspect: "Brand & Product Depth",
        legacyApproach:
          "Cookie-cutter templates indistinguishable from competitors",
        nevroraSolution:
          "Bespoke Apple-grade design tokens, 3D showcases & live infographics",
      },
      {
        aspect: "Compliance & Accessibility",
        legacyApproach: "Inconsistent contrast and broken keyboard navigation",
        nevroraSolution:
          "WCAG AAA typography contrast, semantic DOM & reduced-motion support",
      },
    ],
  },
  "mobile-application-development": {
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Hand holding smartphone displaying sleek native mobile application UI",
    tagline: "Offline-First iOS & Android Engines",
    primaryMetric: {
      value: "100%",
      label: "Offline-First Sync",
    },
    architectureNodes: [
      {
        stage: "01 SURFACE",
        title: "Native HIG / Material UI",
        tech: "Swift • Kotlin • React Native",
        metric: "60fps gestures",
      },
      {
        stage: "02 STATE",
        title: "Optimistic Action Queue",
        tech: "Encrypted Enclave • Haptics",
        metric: "Zero input lag",
      },
      {
        stage: "03 VAULT",
        title: "Local-First Persistence",
        tech: "SQLite • WASM Compute",
        metric: "100% offline",
      },
      {
        stage: "04 SYNC",
        title: "Delta Cloud Reconciler",
        tech: "GraphQL • Biometric Auth",
        metric: "CRDT safe",
      },
    ],
    benchmarks: [
      {
        label: "App Operation in Zero-Signal Zones",
        beforeLabel: "Network Spinner Blocking UI",
        afterLabel: "Instant Local SQLite Execution",
        percentImprovement: "100% Offline Continuity",
        barWidthClass: "w-[100%]",
      },
      {
        label: "iOS & Android Feature Parity",
        beforeLabel: "Divergent Dual Codebases",
        afterLabel: "Shared Typed Core + Native UI",
        percentImprovement: "2.2x Faster Shipping",
        barWidthClass: "w-[86%]",
      },
      {
        label: "Session Crash-Free Rate",
        beforeLabel: "96.4% Uncaught Async Failures",
        afterLabel: "99.95% Hardened Telemetry",
        percentImprovement: "99.95% Crash-Free",
        barWidthClass: "w-[97%]",
      },
    ],
    comparison: [
      {
        aspect: "Connectivity Resilience",
        legacyApproach:
          "Online-only wrappers failing inside elevators, transit & rural sites",
        nevroraSolution:
          "Local-first SQLite storage with conflict-free background delta sync",
      },
      {
        aspect: "On-Device Privacy & Speed",
        legacyApproach:
          "Sensitive user routines routed over slow cloud polling",
        nevroraSolution:
          "Edge WASM engines (proven in Sadhana Daily) & biometric keychain vault",
      },
      {
        aspect: "Store Approval Governance",
        legacyApproach:
          "Last-minute Apple/Google rejections over privacy manifests",
        nevroraSolution:
          "Built-in DPDP consent flows, store compliance & automated device matrices",
      },
    ],
  },
  "cloud-devops": {
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Structured high-throughput data center servers and fiber interconnects",
    tagline: "Zero-Trust Kubernetes & FinOps Fabric",
    primaryMetric: {
      value: "99.99%",
      label: "Multi-Region HA SLA",
    },
    architectureNodes: [
      {
        stage: "01 CODE",
        title: "Declarative IaC Templates",
        tech: "Terraform • OpenTofu • GitOps",
        metric: "Zero drift",
      },
      {
        stage: "02 VERIFY",
        title: "Automated CI/CD & SAST",
        tech: "GitHub Actions • Canary",
        metric: "<8m deploy",
      },
      {
        stage: "03 CLUSTER",
        title: "Multi-Region Orchestration",
        tech: "AWS EKS • GKE • Docker",
        metric: "99.99% uptime",
      },
      {
        stage: "04 GUARD",
        title: "Zero-Trust SRE & FinOps",
        tech: "Prometheus • IAM • SLOs",
        metric: "-31% cloud spend",
      },
    ],
    benchmarks: [
      {
        label: "Production Deployment Recovery",
        beforeLabel: "45m Manual Console Rollback",
        afterLabel: "90s Automated Canary Abort",
        percentImprovement: "30x Faster Recovery",
        barWidthClass: "w-[95%]",
      },
      {
        label: "Cloud Compute & Storage Efficiency",
        beforeLabel: "Idle Overprovisioned Instances",
        afterLabel: "Autoscale Spot + FinOps Policies",
        percentImprovement: "31% Monthly Cloud Savings",
        barWidthClass: "w-[82%]",
      },
      {
        label: "Multi-Region Uptime Resilience",
        beforeLabel: "Single-AZ Maintenance Windows",
        afterLabel: "Zero-Downtime Rolling Clusters",
        percentImprovement: "99.99% Availability",
        barWidthClass: "w-[99%]",
      },
    ],
    comparison: [
      {
        aspect: "Infrastructure Provisioning",
        legacyApproach: "Click-ops console changes causing undocumented drift",
        nevroraSolution:
          "100% versioned Terraform modules with ephemeral preview stacks",
      },
      {
        aspect: "Security Posture",
        legacyApproach: "Static perimeter firewalls and shared service keys",
        nevroraSolution:
          "Least-privilege IAM workloads, automated secrets rotation & Helmet hardening",
      },
      {
        aspect: "Observability & Cost",
        legacyApproach: "Reactive firefighting when customers report downtime",
        nevroraSolution:
          "Synthetic SLO alerts, distributed traces & continuous FinOps attribution",
      },
    ],
  },
  "technology-consulting": {
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Engineering leadership and enterprise executives reviewing technical roadmap charts",
    tagline: "Principal CTO & M&A Technical Diligence",
    primaryMetric: {
      value: "2.8x",
      label: "18-Mo Modernization ROI",
    },
    architectureNodes: [
      {
        stage: "01 AUDIT",
        title: "Repo & Infra Forensics",
        tech: "Codebase • SLO • FinOps Audit",
        metric: "100% transparency",
      },
      {
        stage: "02 SCORE",
        title: "Risk & Bottleneck Matrix",
        tech: "Security • Scaling • Debt",
        metric: "Quantified risk",
      },
      {
        stage: "03 DESIGN",
        title: "Target Blueprint & TCO",
        tech: "DDD • Cloud Strategy • Buy/Build",
        metric: "Fixed milestones",
      },
      {
        stage: "04 ALIGN",
        title: "Boardroom Execution Plan",
        tech: "Org Topology • Pod Kickoff",
        metric: "Day-14 readiness",
      },
    ],
    benchmarks: [
      {
        label: "M&A Technical Diligence Turnaround",
        beforeLabel: "6 Weeks Fragmented Audits",
        afterLabel: "10 Days Quantitative Blueprint",
        percentImprovement: "3.2x Faster Deal Velocity",
        barWidthClass: "w-[90%]",
      },
      {
        label: "Modernization vs Rewrite ROI",
        beforeLabel: "Uncapped High-Risk Big Bang Rewrite",
        afterLabel: "Strangler-Fig Phased Migration",
        percentImprovement: "2.8x Capital Efficiency",
        barWidthClass: "w-[88%]",
      },
      {
        label: "Vendor Lock-In & Licensing Exposure",
        beforeLabel: "Opaque Proprietary Contracts",
        afterLabel: "Open Standards & Portable IaC",
        percentImprovement: "Full IP Ownership",
        barWidthClass: "w-[96%]",
      },
    ],
    comparison: [
      {
        aspect: "Advisory Output",
        legacyApproach:
          "High-level slide decks divorced from production code reality",
        nevroraSolution:
          "Repository-level forensics, TCO modeling & actionable architecture RFCs",
      },
      {
        aspect: "Modernization Strategy",
        legacyApproach:
          "Risky all-or-nothing rewrites stalling revenue roadmaps for years",
        nevroraSolution:
          "Incremental strangler patterns preserving uptime while extracting bottlenecks",
      },
      {
        aspect: "Governance & Talent",
        legacyApproach:
          "Vendor dependency locking out internal engineering teams",
        nevroraSolution:
          "Co-engineered enablement, clean runbooks & full team handover",
      },
    ],
  },
};

export const TELEMETRY_HIGHLIGHTS = [
  {
    value: "800x",
    label: "Compute Kernel Speedup",
    detail: "Portfolio analytics cut from 4 hrs to 18s in Go",
    progress: "w-[95%]",
    accent: "from-blue-600 to-indigo-600",
    icon: Zap,
  },
  {
    value: "-42%",
    label: "Manual Triage Overhead",
    detail: "Autonomous AI exception routing in <200ms",
    progress: "w-[84%]",
    accent: "from-indigo-600 to-violet-600",
    icon: Workflow,
  },
  {
    value: "99.99%",
    label: "Multi-Region Uptime SLA",
    detail: "Active-active Kubernetes & Terraform SRE fabric",
    progress: "w-[99%]",
    accent: "from-cyan-600 to-blue-600",
    icon: ShieldCheck,
  },
  {
    value: "3.4x",
    label: "Digital Dwell & Conversion",
    detail: "Sub-second Next.js 15 edge + WebGL product UX",
    progress: "w-[90%]",
    accent: "from-violet-600 to-fuchsia-600",
    icon: TrendingUp,
  },
];

export function EnterpriseTelemetryStrip() {
  return (
    <section className="relative py-12 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700">
            <Activity className="h-3.5 w-3.5 text-blue-600" />
            <span>Measured Enterprise IT & Product Telemetry</span>
          </div>
          <span className="text-xs text-slate-500">
            Verified benchmarks across FinTech, Logistics & White-Label Commerce
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TELEMETRY_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60 p-5 shadow-sm hover:border-blue-400/40 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-3xl font-bold bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}
                  >
                    {item.value}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-[#0B1020]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.accent} ${item.progress}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ARCHITECTURE_LAYERS = [
  {
    tier: "TIER 01",
    name: "Omnichannel Client & 3D Edge Experience",
    summary:
      "Sub-second storefronts, executive cockpits, and offline-first mobile apps engineered for WCAG AAA clarity.",
    stack: ["Next.js 15 App Router", "React Native", "Three.js WebGL"],
    sla: "0.7s LCP • 60fps",
    icon: Globe,
    tint: "border-blue-200/80 bg-blue-50/40",
    badge: "bg-blue-600 text-white",
  },
  {
    tier: "TIER 02",
    name: "Autonomous AI & Decision Orchestration",
    summary:
      "Multi-agent RAG pipelines, deterministic schema guardrails, and sub-200ms exception resolution.",
    stack: ["PyTorch & Ray", "LangChain", "FastAPI Inference"],
    sla: "<200ms Inference",
    icon: Cpu,
    tint: "border-indigo-200/80 bg-indigo-50/40",
    badge: "bg-indigo-600 text-white",
  },
  {
    tier: "TIER 03",
    name: "Core Domain & White-Label Product Engines",
    summary:
      "Multi-tenant SaaS kernels, headless provenance ledgers, WASM ephemeris modules, and event-driven APIs.",
    stack: ["Go Compute Kernels", "TypeScript Node.js", "PostgreSQL / Redis"],
    sla: "800x Compute Lift",
    icon: Database,
    tint: "border-violet-200/80 bg-violet-50/40",
    badge: "bg-violet-600 text-white",
  },
  {
    tier: "TIER 04",
    name: "Zero-Trust Multi-Cloud & FinOps Fabric",
    summary:
      "Declarative Terraform IaC, automated canary delivery, and multi-region Kubernetes SRE monitoring.",
    stack: ["AWS EKS / GKE", "Terraform IaC", "Prometheus SRE"],
    sla: "99.99% Availability",
    icon: Lock,
    tint: "border-cyan-200/80 bg-cyan-50/40",
    badge: "bg-cyan-600 text-white",
  },
];

export function MarketArchitectureInfographic() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/80 to-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-3 py-1 text-xs font-mono font-bold text-blue-700">
              <Layers className="h-3.5 w-3.5" />
              <span>MARKET IT SOLUTIONS BLUEPRINT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
              How Our 4-Tier Engineering Stack Powers Modern Enterprises
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Unlike traditional IT agencies that stitch together isolated SaaS
              tools, Nevrora builds vertically integrated, white-label-ready
              systems—from edge UX down to multi-region Kubernetes compute.
            </p>
          </div>

          <div className="lg:col-span-5 relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
              alt="Enterprise cloud server architecture and high-throughput networking infrastructure"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-white">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300 block">
                  Production Topology
                </span>
                <p className="font-display text-sm font-bold">
                  Zero-Trust Cloud & White-Label Fabric
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 font-mono text-[11px] font-semibold">
                SOC2 &bull; DPDP
              </span>
            </div>
          </div>
        </div>

        {/* 4-Tier Visual Stack Diagram */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-elevated space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1020]">
              <Network className="h-4 w-4 text-blue-600" />
              <span>END-TO-END ENTERPRISE & WHITE-LABEL ARCHITECTURE</span>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>Inspect All 6 Practice Specs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {ARCHITECTURE_LAYERS.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div key={layer.tier} className="space-y-2">
                  <div
                    className={`rounded-2xl border ${layer.tint} p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all hover:shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <span
                          className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full ${layer.badge}`}
                        >
                          {layer.tier}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/80 text-[#0B1020] shadow-sm">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#0B1020]">
                          {layer.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                          {layer.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <span className="inline-flex w-fit items-center rounded-full bg-white border border-slate-200 px-3 py-1 font-mono text-[11px] font-bold text-blue-700 shadow-sm">
                        {layer.sla}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/90 border border-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < ARCHITECTURE_LAYERS.length - 1 && (
                    <div className="flex justify-center">
                      <div className="h-3 w-0.5 bg-gradient-to-b from-blue-400 to-violet-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface MethodologyStage {
  name: string;
  description: string;
  timeline: string;
  artifact: string;
  kpi: string;
}

const LIFECYCLE_STAGES: MethodologyStage[] = [
  {
    name: "IDEAS",
    description:
      "Identify high-conviction, mathematically verified problems worth solving.",
    timeline: "Weeks 1–2",
    artifact: "Domain Forensics & TCO Model",
    kpi: "Validated ROI Thesis",
  },
  {
    name: "BUILD",
    description:
      "Shape robust architectures and build production-grade platforms around them.",
    timeline: "Weeks 3–8",
    artifact: "DDD Microservices & Working PoV",
    kpi: "100% Contract Tests",
  },
  {
    name: "GROW",
    description:
      "Scale operations sustainably with institutional discipline and long-term mindset.",
    timeline: "Weeks 9–16",
    artifact: "Canary CI/CD & White-Label Rollout",
    kpi: "99.99% HA Uptime",
  },
  {
    name: "IMPACT",
    description:
      "Create enduring economic and human value for enterprises and communities.",
    timeline: "Ongoing Scale",
    artifact: "Autonomous SRE & Team Handover",
    kpi: "Measurable EBITDA Lift",
  },
];

export function MethodologyLifecycleInfographic() {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">
            The Nevrora Delivery & Venture Pipeline
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
            Ideas &bull; Build &bull; Grow &bull; Impact
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our structured 4-gate execution infographic tracks every enterprise
            solution and incubated venture from technical discovery to sustained
            production ROI.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIFECYCLE_STAGES.map((stage, idx) => (
            <div
              key={stage.name}
              className="relative rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm hover:border-blue-400/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 font-mono text-xs font-bold text-white">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                    {stage.timeline}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-[#0B1020] tracking-wider">
                    {stage.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#0B1020] font-medium">
                  <GitBranch className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{stage.artifact}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>Gate: {stage.kpi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceArchitectureInfographic({ slug }: { slug: string }) {
  const meta =
    SERVICE_VISUAL_META[slug] ??
    SERVICE_VISUAL_META["custom-software-development"];
  if (!meta) return null;

  return (
    <div className="my-12 space-y-10">
      {/* Visual Hero Banner + Key Metric Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 relative min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
          <Image
            src={meta.imageUrl}
            alt={meta.imageAlt}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-0.5 text-[11px] font-mono font-semibold text-cyan-200">
                <Sparkles className="h-3 w-3" />
                <span>{meta.tagline}</span>
              </span>
              <p className="font-display text-lg sm:text-xl font-bold">
                Production Reference Architecture & Benchmarks
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/60 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              Verified Impact Metric
            </span>
            <div className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {meta.primaryMetric.value}
            </div>
            <p className="text-sm font-semibold text-[#0B1020]">
              {meta.primaryMetric.label}
            </p>
          </div>
          <div className="pt-6 border-t border-blue-200/60 space-y-2 text-xs text-slate-600">
            <p>
              Engineered for mission-critical enterprise workloads with strict
              SLOs, automated failover, and complete IP transfer.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage System Topology Flowchart Infographic */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              System Architecture Blueprint
            </span>
            <h2 className="font-display text-2xl font-bold text-[#0B1020] mt-1">
              End-to-End Solution Topology
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/70 px-3 py-1 font-mono text-[11px] font-semibold text-blue-700">
            <Network className="h-3.5 w-3.5" />
            <span>4-Stage Data & Execution Flow</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {meta.architectureNodes.map((node) => (
            <div
              key={node.stage}
              className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-3 hover:border-blue-400/50 hover:bg-white transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 rounded-full">
                  {node.stage}
                </span>
                <span className="font-mono text-[11px] font-semibold text-blue-700">
                  {node.metric}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1020]">
                {node.title}
              </h3>
              <p className="text-xs font-mono text-slate-600">{node.tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After Benchmarks + Legacy Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quantitative Visual Bars */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              Performance Infographic
            </span>
            <h3 className="font-display text-xl font-bold text-[#0B1020] mt-1">
              Before vs. After Nevrora Architecture
            </h3>
          </div>

          <div className="space-y-5">
            {meta.benchmarks.map((b) => (
              <div key={b.label} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#0B1020]">
                    {b.label}
                  </span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                    {b.percentImprovement}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 ${b.barWidthClass}`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>Before: {b.beforeLabel}</span>
                  <span className="font-medium text-blue-700">
                    After: {b.afterLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explanatory Legacy vs Nevrora Table */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm space-y-5">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              Architectural Differentiation
            </span>
            <h3 className="font-display text-xl font-bold text-[#0B1020] mt-1">
              Legacy IT Approach vs. Nevrora Solution
            </h3>
          </div>

          <div className="space-y-3">
            {meta.comparison.map((row) => (
              <div
                key={row.aspect}
                className="rounded-xl border border-slate-200/70 bg-slate-50/60 p-4 space-y-2"
              >
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[#0B1020] block">
                  {row.aspect}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-white border border-slate-200/80 p-2.5 text-slate-500">
                    <span className="font-semibold text-slate-700 block mb-0.5">
                      Legacy IT
                    </span>
                    {row.legacyApproach}
                  </div>
                  <div className="rounded-lg bg-blue-50/70 border border-blue-200/70 p-2.5 text-[#0B1020]">
                    <span className="font-semibold text-blue-700 block mb-0.5">
                      Nevrora Engineered
                    </span>
                    {row.nevroraSolution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
