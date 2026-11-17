import type {
  Product,
  Service,
  PrivacyNotice,
  ContactSubmission,
  CaseStudy,
  SiteConfig,
  ApiResponse,
  VentureTheme,
} from "../src/index";

// Type assertion tests to ensure strict adherence to required interfaces

const _mockTheme: VentureTheme = "neermiti";

const _mockProduct: Product = {
  slug: "neermiti-collections",
  number: "01",
  title: "Neermiti Collections",
  category: "Apparel & Lifestyle",
  summary: "Contemporary apparel",
  overview: "Full overview",
  audience: "Conscious consumers",
  valueProposition: "Sustainable luxury",
  features: ["Organic cotton", "Ethical craftsmanship"],
  cta: "Explore Collection",
  theme: _mockTheme,
  published: true,
};

const _mockService: Service = {
  slug: "ai-intelligent-automation",
  number: "01",
  title: "AI & Intelligent Automation",
  short: "AI solutions",
  statement: "Empowering enterprises",
  problems: ["Manual overhead"],
  capabilities: ["LLM integration"],
  deliverables: ["Production pipelines"],
  processSteps: [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding requirements",
    },
  ],
  techBadges: ["Python", "PyTorch"],
  color: "#173C32",
  published: true,
};

const _mockContact: ContactSubmission = {
  name: "Jane Doe",
  email: "jane@example.com",
  organization: "Acme Corp",
  type: "Strategic partnership",
  message: "We are interested in collaborating on new ventures.",
};

const _mockPrivacyNotice: PrivacyNotice = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  lastUpdated: "2026-11-13",
  dataCollected: ["Name", "Email"],
  purposes: ["Inquiry communication"],
  rights: ["Access", "Correction", "Erasure"],
  grievanceOfficer: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer",
    email: "ratnesh.k.gupta@icloud.com",
  },
  clauses: [
    {
      heading: "Collection of Personal Data",
      body: ["We collect data provided voluntarily."],
    },
  ],
};

const _mockCaseStudy: CaseStudy = {
  slug: "autonomous-agents",
  title: "Autonomous Multi-Agent Platform",
  industry: "Enterprise AI",
  summary: "Scalable agent runtime",
  challenge: "Coordination complexity",
  solution: "Deterministic state graphs",
  results: ["10x speedup"],
  technologies: ["TypeScript", "Node.js"],
  featured: true,
};

const _mockApiResponse: ApiResponse<Product> = {
  success: true,
  data: _mockProduct,
  message: "Product retrieved successfully",
};

const _mockSiteConfig: SiteConfig = {
  name: "Nevrora Ventures",
  tagline: "Venture Studio",
  description: "Building next-generation companies",
  legalName: "Nevrora Technologies Private Limited",
  cin: "U72900KA2024PTC189000",
  registeredOffice: "Bengaluru, Karnataka, India",
  phone: "+91 80 4123 4567",
  email: "hello@nevrora.com",
  grievanceContact: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer",
    email: "ratnesh.k.gupta@icloud.com",
  },
  navigation: [{ label: "Home", href: "/" }],
  cta: { label: "Start a Conversation", href: "/contact" },
  inquiryTypes: ["General inquiry"],
};

// Ensure all mocks satisfy interface checks
export const typeCheckPassed =
  Boolean(_mockProduct) &&
  Boolean(_mockService) &&
  Boolean(_mockContact) &&
  Boolean(_mockPrivacyNotice) &&
  Boolean(_mockCaseStudy) &&
  Boolean(_mockApiResponse) &&
  Boolean(_mockSiteConfig);
