import type { CaseStudy } from "@nevrora/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "autonomous-intelligence-pipeline",
    title: "Autonomous Decision Intelligence for Logistics",
    client: "National Logistics Consortium",
    industry: "Supply Chain & Logistics",
    summary:
      "Engineered an autonomous multi-agent routing and exception handling platform that reduced manual dispatch bottlenecks by 42%.",
    challenge:
      "Over 8,000 daily exception tickets required human triage, causing compounding terminal delivery delays.",
    solution:
      "Designed a distributed multi-agent system with deterministic validation guardrails and real-time Kafka event streams.",
    results: [
      "42% reduction in manual dispatch triage overhead",
      "Sub-200ms automated resolution latency for 80% of standard exceptions",
      "Zero operational downtime during peak holiday transit windows",
    ],
    technologies: ["Python", "FastAPI", "Ray", "Docker", "Kafka", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "high-throughput-wealth-engine",
    title: "High-Throughput Portfolio Analytics Engine",
    client: "Apex Wealth Partners",
    industry: "FinTech & Wealth Advisory",
    summary:
      "Architected a low-latency portfolio rebalancing engine handling over $4B in simulated multi-asset portfolios.",
    challenge:
      "Legacy calculation batches took over 4 hours, preventing real-time intra-day market risk rebalancing.",
    solution:
      "Rebuilt calculation kernel in Go with memory-mapped vector structures and a modern Next.js executive cockpit.",
    results: [
      "Calculation runtime slashed from 4 hours to 18 seconds",
      "99.99% uptime with automated multi-region active-active failover",
      "Sub-second executive dashboard load times globally",
    ],
    technologies: [
      "Go",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redis",
      "AWS EKS",
    ],
    featured: true,
  },
  {
    slug: "artisanal-provenance-commerce",
    title: "Artisanal Provenance & Handloom Traceability",
    client: "Neermiti Collections",
    industry: "Luxury E-Commerce & Lifestyle",
    summary:
      "Developed an omnichannel e-commerce experience with interactive 3D textile showcases and cryptographic origin tracking.",
    challenge:
      "Conveying the tactile nuance and authentic weaver heritage of handloom luxury through traditional flat 2D catalogs.",
    solution:
      "Built a customized Three.js WebGL material inspection canvas paired with an ultra-lightweight Next.js commerce frontend.",
    results: [
      "3.4x increase in user dwell time on artisan story pages",
      "Sub-second Core Web Vitals across all mobile devices",
      "Direct weaver revenue distribution verified across 14 artisan clusters",
    ],
    technologies: [
      "Next.js",
      "React Three Fiber",
      "Three.js",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    featured: true,
  },
];
