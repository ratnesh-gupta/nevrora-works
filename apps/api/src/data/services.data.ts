import type { Service } from "@nevrora/types";

export const servicesData: Service[] = [
  {
    slug: "ai-intelligent-automation",
    number: "01",
    title: "AI & Intelligent Automation",
    short:
      "Agents and workflows that turn repetitive operations into scalable advantage.",
    statement:
      "Put intelligence to work, exactly where your business needs it.",
    problems: [
      "Teams buried in repetitive work",
      "Disconnected tools and data",
      "AI experiments without business value",
    ],
    capabilities: [
      "AI agents & copilots",
      "Workflow orchestration",
      "Knowledge systems",
      "Model & API integration",
      "Process automation",
      "Responsible AI strategy",
    ],
    deliverables: [
      "Opportunity map",
      "Working proof of value",
      "Production automation",
      "Measurement dashboard",
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Opportunity Mapping",
        description:
          "Audit current operations, pinpoint high-leverage bottlenecks, and evaluate ROI potential.",
      },
      {
        step: "02",
        title: "Architecture & Model Selection",
        description:
          "Design agentic workflows, select frontier LLMs or SLMs, and structure retrieval-augmented pipelines.",
      },
      {
        step: "03",
        title: "Rapid Prototyping & PoV",
        description:
          "Build functional proof-of-value prototypes to validate accuracy, latency, and business logic.",
      },
      {
        step: "04",
        title: "Production Hardening & Integration",
        description:
          "Deploy resilient, scalable automation pipelines with monitoring, guardrails, and telemetry.",
      },
    ],
    techBadges: [
      "LangChain",
      "LlamaIndex",
      "OpenAI",
      "Anthropic",
      "Python",
      "FastAPI",
      "Vector DBs",
      "Docker",
    ],
    color: "#d8ff5f",
    published: true,
  },
  {
    slug: "custom-software-development",
    number: "02",
    title: "Custom Software Development",
    short:
      "Purpose-built platforms, applications, and APIs engineered for the long term.",
    statement: "Software that fits the business—not the other way around.",
    problems: [
      "Off-the-shelf tools create friction",
      "Legacy systems limit growth",
      "Product ideas stall before launch",
    ],
    capabilities: [
      "SaaS platforms",
      "Business applications",
      "API ecosystems",
      "System integrations",
      "Data platforms",
      "Legacy modernization",
    ],
    deliverables: [
      "Product roadmap",
      "Technical architecture",
      "Production application",
      "Documentation & handover",
    ],
    processSteps: [
      {
        step: "01",
        title: "Domain Discovery & Requirements",
        description:
          "Uncover core domain workflows, define entity boundaries, and specify non-functional performance benchmarks.",
      },
      {
        step: "02",
        title: "System & Architecture Design",
        description:
          "Formulate domain-driven design, schema architecture, and decoupled service boundaries.",
      },
      {
        step: "03",
        title: "Iterative Engineering Sprints",
        description:
          "Deliver clean, test-driven TypeScript/Node or Go services with automated CI validations.",
      },
      {
        step: "04",
        title: "Verification, Handover & Support",
        description:
          "Execute comprehensive security checks, provide rigorous documentation, and enable team handover.",
      },
    ],
    techBadges: [
      "TypeScript",
      "Node.js",
      "React",
      "PostgreSQL",
      "GraphQL",
      "REST",
      "Redis",
      "Tailwind CSS",
    ],
    color: "#ff7e5f",
    published: true,
  },
  {
    slug: "web-digital-experiences",
    number: "03",
    title: "Web & Digital Experiences",
    short:
      "High-performing digital experiences that make complex businesses feel simple.",
    statement: "Make every digital interaction clear, useful, and memorable.",
    problems: [
      "Digital presence undersells the brand",
      "Journeys are confusing or slow",
      "Content cannot evolve easily",
    ],
    capabilities: [
      "Corporate websites",
      "Web applications",
      "Customer portals",
      "E-commerce",
      "Design systems",
      "Content platforms",
    ],
    deliverables: [
      "Experience strategy",
      "UX/UI design",
      "Responsive build",
      "Analytics & optimization",
    ],
    processSteps: [
      {
        step: "01",
        title: "Experience Strategy & User Research",
        description:
          "Analyze user behaviors, map key journey funnels, and benchmark industry visual standards.",
      },
      {
        step: "02",
        title: "Design Systems & Prototyping",
        description:
          "Craft responsive design tokens, accessible components, and high-fidelity interactive prototypes.",
      },
      {
        step: "03",
        title: "Modern Web Engineering",
        description:
          "Build fast, server-rendered Next.js applications optimized for Core Web Vitals and SEO.",
      },
      {
        step: "04",
        title: "Analytics & Conversion Tuning",
        description:
          "Integrate privacy-compliant analytics, monitor performance budgets, and optimize funnel conversion.",
      },
    ],
    techBadges: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "TypeScript",
      "Vercel",
    ],
    color: "#7be0d4",
    published: true,
  },
  {
    slug: "mobile-application-development",
    number: "04",
    title: "Mobile Application Development",
    short:
      "Thoughtful mobile products designed around real habits and real-world use.",
    statement: "Useful in the moment. Dependable for the long run.",
    problems: [
      "Desktop cannot meet users where they are",
      "Existing apps lack engagement",
      "Separate platforms inflate delivery cost",
    ],
    capabilities: [
      "iOS applications",
      "Android applications",
      "Cross-platform products",
      "Mobile commerce",
      "Offline-first experiences",
      "App modernization",
    ],
    deliverables: [
      "Product definition",
      "Interactive prototype",
      "Store-ready application",
      "Release & growth plan",
    ],
    processSteps: [
      {
        step: "01",
        title: "Mobile UX & Flow Architecture",
        description:
          "Design ergonomic interfaces and intuitive offline-first navigation patterns.",
      },
      {
        step: "02",
        title: "Cross-Platform Core Build",
        description:
          "Engineer high-performance native-feel applications utilizing React Native or Flutter.",
      },
      {
        step: "03",
        title: "Device Testing & Performance Profiling",
        description:
          "Test across heterogeneous device screen sizes, battery constraints, and network conditions.",
      },
      {
        step: "04",
        title: "Store Submission & Release Management",
        description:
          "Manage Apple App Store and Google Play submissions, compliance checks, and phased rollouts.",
      },
    ],
    techBadges: [
      "React Native",
      "Flutter",
      "iOS / Swift",
      "Android / Kotlin",
      "Expo",
      "SQLite",
      "Push Notifications",
    ],
    color: "#9ea9ff",
    published: true,
  },
  {
    slug: "cloud-devops",
    number: "05",
    title: "Cloud & DevOps",
    short:
      "Resilient infrastructure and delivery systems that make change feel routine.",
    statement: "Build the foundation for faster, safer progress.",
    problems: [
      "Releases are risky and manual",
      "Cloud costs are difficult to control",
      "Infrastructure cannot keep up with demand",
    ],
    capabilities: [
      "Cloud architecture",
      "CI/CD systems",
      "Infrastructure as code",
      "Observability",
      "Performance engineering",
      "Security hardening",
    ],
    deliverables: [
      "Cloud blueprint",
      "Automated pipelines",
      "Operational dashboards",
      "Runbooks & enablement",
    ],
    processSteps: [
      {
        step: "01",
        title: "Infrastructure Audit & Assessment",
        description:
          "Review cloud architecture, compute allocation, security perimeters, and monthly cloud spend.",
      },
      {
        step: "02",
        title: "Infrastructure as Code (IaC)",
        description:
          "Codify multi-region environments using Terraform or Pulumi with modular security baselines.",
      },
      {
        step: "03",
        title: "Automated CI/CD Delivery",
        description:
          "Build zero-downtime deployment pipelines with automated regression testing and canary rollouts.",
      },
      {
        step: "04",
        title: "Observability & Incident Readiness",
        description:
          "Set up centralized logging, OpenTelemetry tracing, alert routing, and automated runbooks.",
      },
    ],
    techBadges: [
      "AWS",
      "Google Cloud",
      "Kubernetes",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    color: "#ffcf57",
    published: true,
  },
  {
    slug: "technology-consulting",
    number: "06",
    title: "Technology Consulting",
    short:
      "Clear technical direction for consequential decisions and complex change.",
    statement: "Turn technology uncertainty into a practical path forward.",
    problems: [
      "Roadmaps lack technical confidence",
      "Architecture has grown fragmented",
      "Transformation efforts feel too broad",
    ],
    capabilities: [
      "Technical discovery",
      "Architecture advisory",
      "Modernization strategy",
      "Product due diligence",
      "Vendor evaluation",
      "Delivery planning",
    ],
    deliverables: [
      "Current-state assessment",
      "Target architecture",
      "Prioritized roadmap",
      "Executive decision brief",
    ],
    processSteps: [
      {
        step: "01",
        title: "Strategic Technical Assessment",
        description:
          "Evaluate legacy codebase health, architectural debt, team velocity, and engineering bottlenecks.",
      },
      {
        step: "02",
        title: "Target Architecture & Options Analysis",
        description:
          "Develop future-state architectural options with rigorous trade-off and risk evaluations.",
      },
      {
        step: "03",
        title: "Executive Decision Roadmapping",
        description:
          "Formulate phase-gated execution timelines aligning business targets with technical realities.",
      },
      {
        step: "04",
        title: "Advisory Guidance & Governance",
        description:
          "Provide continuous guidance, architectural review boards, and vendor evaluation frameworks.",
      },
    ],
    techBadges: [
      "Enterprise Architecture",
      "Cloud Strategy",
      "Due Diligence",
      "Security Audits",
      "Microservices",
      "Cost Governance",
    ],
    color: "#f2a2c0",
    published: true,
  },
];
