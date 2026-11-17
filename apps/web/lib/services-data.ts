import type { Service } from "@nevrora/types";

export const SERVICES_DATA: Service[] = [
  {
    slug: "ai-intelligent-automation",
    number: "01",
    title: "AI & Intelligent Automation",
    short:
      "Autonomous agents, intelligent workflows, and ML pipelines that scale decision-making.",
    statement:
      "Transform manual workflows into resilient, high-throughput intelligence systems.",
    problems: [
      "Operational teams buried in manual, error-prone data processing",
      "Disconnected legacy tooling preventing real-time decision synthesis",
      "AI experiments stalled in prototypes without measurable commercial value",
    ],
    capabilities: [
      "Autonomous AI Agents & Copilots",
      "Orchestrated Decision Workflows",
      "Enterprise Knowledge Systems & RAG",
      "High-Throughput Inference Pipelines",
      "Deterministic Guardrails & Model Monitoring",
      "Responsible AI & Safety Governance",
    ],
    deliverables: [
      "Enterprise Automation Blueprint",
      "Working Production Proof-of-Value (PoV)",
      "Hardened Microservices & API Integration",
      "Observability & Telemetry Dashboards",
    ],
    processSteps: [
      {
        step: "01",
        title: "Data Audit & Readiness",
        description:
          "Comprehensive assessment of data topology, compliance requirements, and latency targets.",
      },
      {
        step: "02",
        title: "Agent Architecture",
        description:
          "Design of specialized multi-agent networks with deterministic state management.",
      },
      {
        step: "03",
        title: "Production Pipeline",
        description:
          "Engineering fault-tolerant streaming inference pipelines with automated failover.",
      },
      {
        step: "04",
        title: "Continuous Governance",
        description:
          "Real-time drift detection, accuracy monitoring, and operational handover.",
      },
    ],
    techBadges: ["PyTorch", "LangChain", "FastAPI", "Docker", "Python", "Ray"],
    color: "#173C32",
    published: true,
  },
  {
    slug: "custom-software-development",
    number: "02",
    title: "Custom Software Development",
    short:
      "Purpose-built platforms, applications, and APIs engineered for durability and scale.",
    statement:
      "Software engineered to fit the exact contours of your business model.",
    problems: [
      "Off-the-shelf software imposing painful operational workarounds",
      "Architectural technical debt choking feature release velocity",
      "Monolithic systems with severe single points of failure",
    ],
    capabilities: [
      "Full-Stack Web & Distributed Systems",
      "Domain-Driven Architecture (DDD)",
      "High-Throughput Event-Driven APIs",
      "Relational & Distributed Database Design",
      "Legacy Code Modernization",
      "Automated CI/CD Delivery Infrastructure",
    ],
    deliverables: [
      "Technical Architecture Specification",
      "Interactive High-Fidelity Prototype",
      "Production-Grade Application Codebase",
      "Automated Test Suites & Runbooks",
    ],
    processSteps: [
      {
        step: "01",
        title: "Domain Modeling",
        description:
          "Establish bounded contexts, core entities, and invariant rules with your domain experts.",
      },
      {
        step: "02",
        title: "System Architecture",
        description:
          "Specify service boundaries, message contracts, data schemas, and resilience patterns.",
      },
      {
        step: "03",
        title: "Sprint Execution",
        description:
          "Test-driven implementation with continuous integration, peer code reviews, and benchmarks.",
      },
      {
        step: "04",
        title: "Production Handover",
        description:
          "Zero-downtime deployment, infrastructure-as-code scripts, and engineering enablement.",
      },
    ],
    techBadges: [
      "TypeScript",
      "Node.js",
      "Go",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    color: "#071B18",
    published: true,
  },
  {
    slug: "web-digital-experiences",
    number: "03",
    title: "Web & Digital Experiences",
    short:
      "Modern web platforms pairing high editorial aesthetics with sub-second performance.",
    statement:
      "Make every customer interaction visually memorable, responsive, and clear.",
    problems: [
      "Digital presence underselling brand prestige and technical depth",
      "Poor Core Web Vitals driving elevated bounce rates and drop-offs",
      "Rigid CMS implementations preventing marketing agility",
    ],
    capabilities: [
      "Next.js App Router Architecture",
      "3D WebGL & Interactive Visualizations",
      "Fluid Animation Systems with Framer Motion",
      "WCAG 2.1 AA Accessibility (a11y)",
      "Global Edge Content Delivery & Caching",
      "Conversion Rate Optimization Architecture",
    ],
    deliverables: [
      "UX/UI Design System in Figma",
      "Responsive Production Web Platform",
      "Core Web Vitals Optimization Report",
      "CMS & Analytics Integration",
    ],
    processSteps: [
      {
        step: "01",
        title: "Design Alignment",
        description:
          "Audit existing brand touchpoints and establish cohesive typography, color, and component tokens.",
      },
      {
        step: "02",
        title: "Interactive Prototyping",
        description:
          "Validate complex 3D interactions and micro-animations with real user input.",
      },
      {
        step: "03",
        title: "Core Web Vitals Tuning",
        description:
          "Fine-tune asset loading, server-side rendering, and layout stability to achieve sub-second LCP.",
      },
      {
        step: "04",
        title: "Edge Deployment",
        description:
          "Deploy onto global multi-region edge networks with instant cache revalidation.",
      },
    ],
    techBadges: [
      "Next.js",
      "React",
      "Three.js",
      "Tailwind CSS",
      "Framer Motion",
      "WebGL",
    ],
    color: "#C9A35B",
    published: true,
  },
  {
    slug: "mobile-application-development",
    number: "04",
    title: "Mobile Application Development",
    short:
      "Native-feel iOS and Android applications built for real-world reliability.",
    statement:
      "Useful in the moment. Dependable across connectivity environments.",
    problems: [
      "Mobile web failing to deliver fluid, 60fps native gestures",
      "Fragmented user experiences between iOS and Android codebases",
      "App crashes and lost state in low-connectivity conditions",
    ],
    capabilities: [
      "Native iOS (Swift) & Android (Kotlin) Development",
      "High-Performance Cross-Platform Engineering (React Native)",
      "Offline-First Data Synchronization",
      "Biometric Authentication & Secure Storage",
      "Push Notification & Background Sync Architecture",
      "App Store & Google Play Launch Management",
    ],
    deliverables: [
      "Clickable Mobile UX Prototype",
      "Store-Ready Application Builds",
      "Offline Sync Engine & Local SQLite DB",
      "App Store & Play Store Submissions",
    ],
    processSteps: [
      {
        step: "01",
        title: "Platform UX Mapping",
        description:
          "Translate product workflows to native Human Interface Guidelines and Material Design 3.",
      },
      {
        step: "02",
        title: "Offline-First Engine",
        description:
          "Implement local database caching, delta synchronizations, and optimistic state updates.",
      },
      {
        step: "03",
        title: "Device Testing",
        description:
          "Automated regression testing across a wide matrix of physical iOS and Android hardware.",
      },
      {
        step: "04",
        title: "App Store Submission",
        description:
          "Coordinate security audits, privacy questionnaires, and app review approvals.",
      },
    ],
    techBadges: ["React Native", "Kotlin", "Swift", "SQLite", "GraphQL"],
    color: "#173C32",
    published: true,
  },
  {
    slug: "cloud-devops",
    number: "05",
    title: "Cloud & DevOps",
    short:
      "Resilient cloud infrastructure and automated pipelines that make change feel routine.",
    statement:
      "Build the resilient foundation for faster, safer, zero-downtime engineering progress.",
    problems: [
      "Manual deployment runs prone to human oversight and configuration drift",
      "Unmonitored cloud spending and runaway compute allocations",
      "Single points of failure and lack of disaster recovery runbooks",
    ],
    capabilities: [
      "Infrastructure as Code (Terraform, OpenTofu)",
      "Container Orchestration with Kubernetes (EKS, GKE)",
      "Automated CI/CD Pipeline Engineering",
      "Zero-Trust Cloud Security & IAM Governance",
      "Distributed Observability & Synthetic Monitoring",
      "FinOps & Cloud Cost Optimization",
    ],
    deliverables: [
      "Declarative Infrastructure Repositories",
      "Automated Multi-Stage CI/CD Workflows",
      "Observability & Alerting Dashboards",
      "Disaster Recovery Runbooks & Drills",
    ],
    processSteps: [
      {
        step: "01",
        title: "Infra Audit",
        description:
          "Deep audit of existing infrastructure posture, vulnerabilities, and cost inefficiencies.",
      },
      {
        step: "02",
        title: "IaC Implementation",
        description:
          "Codify all cloud primitives into version-controlled, modular declarative templates.",
      },
      {
        step: "03",
        title: "Pipeline Automation",
        description:
          "Build ephemeral preview environments and automated canary release pipelines.",
      },
      {
        step: "04",
        title: "SRE Hardening",
        description:
          "Conduct load testing, chaos experiments, and establish SLO/SLA alerting triggers.",
      },
    ],
    techBadges: [
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
    ],
    color: "#071B18",
    published: true,
  },
  {
    slug: "technology-consulting",
    number: "06",
    title: "Technology Consulting",
    short:
      "Clear technical direction for consequential decisions, acquisitions, and transformations.",
    statement:
      "Turn technology uncertainty into a practical, de-risked path forward.",
    problems: [
      "Executive leadership navigating high-stakes technical debt vs rewrite debates",
      "M&A technical due diligence requiring impartial architecture vetting",
      "Vendor lock-in and opaque proprietary software contracts",
    ],
    capabilities: [
      "Enterprise Architecture Diligence",
      "M&A Technology & Codebase Due Diligence",
      "Engineering Organization Design & Benchmarking",
      "Vendor & Cloud Strategy Evaluation",
      "Application Modernization Roadmaps",
      "Fractional CTO & Executive Advisory",
    ],
    deliverables: [
      "Comprehensive Due Diligence Audit",
      "Target-State Architecture Blueprint",
      "Prioritized Engineering Transformation Roadmap",
      "Executive & Boardroom Decision Briefs",
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Interview",
        description:
          "Engage executive leadership, product managers, and engineering teams to understand root goals.",
      },
      {
        step: "02",
        title: "Technical Diligence",
        description:
          "Inspect code repositories, deployment history, incident logs, and architectural dependencies.",
      },
      {
        step: "03",
        title: "Roadmap Definition",
        description:
          "Synthesize findings into an actionable, ROI-ranked milestone plan with clear cost estimates.",
      },
      {
        step: "04",
        title: "Executive Presentation",
        description:
          "Deliver boardroom-ready briefs and facilitate cross-functional alignment sessions.",
      },
    ],
    techBadges: [
      "System Design",
      "Enterprise Architecture",
      "Due Diligence",
      "FinOps",
      "Governance",
    ],
    color: "#C9A35B",
    published: true,
  },
];

export function getPublishedServices(): Service[] {
  return SERVICES_DATA.filter((s) => s.published);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug && s.published);
}
