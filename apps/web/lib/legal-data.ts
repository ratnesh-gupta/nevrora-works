import { STATUTORY_DETAILS } from "@nevrora/config";
import type { PrivacyNotice } from "@nevrora/types";

export const SITE_PRIVACY_POLICY: PrivacyNotice = {
  slug: "privacy-policy",
  title:
    "Nevrora Works — Digital Personal Data Protection Act (DPDP Act 2023) Privacy Policy",
  lastUpdated: "16 November 2026",
  dataCollected: [
    "Contact & Support Details: Full Name, Email Address, Organization Name (voluntary), Product Selected",
    "Inquiry Metadata: Inquiry Type (Early Access / Notify Me, Product Support, Partnership, General), Message Body",
    "Technical Telemetry: Anonymized product page view and CTA interaction counters (processed only with consent)",
  ],
  purposes: [
    "Sending requested product release notifications and beta invitations",
    "Responding to product support enquiries and user feedback",
    "Ensuring platform security, abuse prevention, and statutory compliance under Indian law",
  ],
  rights: [
    "Right to Access Information: Request a summary of personal data being processed and identities of data fiduciaries with whom it has been shared.",
    "Right to Correction and Erasure: Request correction of inaccurate personal data, completion of incomplete data, or erasure of personal data whose processing purpose has concluded.",
    "Right of Grievance Redressal: Access readily available grievance redressal mechanisms from our Data Protection Officer prior to escalating to the Data Protection Board of India.",
    "Right to Nominate: Nominate any other individual to exercise Data Principal rights in the event of death or incapacity.",
  ],
  grievanceOfficer: {
    name: STATUTORY_DETAILS.grievanceContact.name,
    role: STATUTORY_DETAILS.grievanceContact.role,
    email: STATUTORY_DETAILS.grievanceContact.email,
    phone: STATUTORY_DETAILS.grievanceContact.phone,
    address: STATUTORY_DETAILS.grievanceContact.address,
  },
  clauses: [
    {
      heading: "1. Notice and Lawful Purpose (Section 5 & 6)",
      body: [
        "Nevrora Technologies Private Limited ('Nevrora Works', 'we', 'us') functions as a Data Fiduciary under the Digital Personal Data Protection Act, 2023 ('DPDP Act 2023'). This Privacy Policy constitutes notice given prior to or at the time of collecting personal data through the Nevrora Works website and product portfolio hub.",
        "We collect and process personal data exclusively for lawful, specified product discovery, support, and communication purposes for which you have provided clear, affirmative consent.",
      ],
      list: [
        "Product Release Notifications: Communicating launch updates when you opt in via 'Notify Me'.",
        "Product Support: Resolving user enquiries submitted through our Support Directory or support@nevrora-works.com.",
        "Platform Integrity: Safeguarding our digital product pages against abuse and security vulnerabilities.",
      ],
    },
    {
      heading: "2. Personal Data Collected",
      body: [
        "We adhere strictly to the principle of data minimization. We collect only the data strictly necessary for fulfilling your product request or support inquiry:",
      ],
      list: [
        "Data provided through the Contact / Notify Me form: Name, Email Address, Product Name, Inquiry Category, and Message Body.",
        "Segmented Product Analytics: Product page views and outbound store/CTA click counts are segmented by product without storing personal identifiers.",
      ],
    },
    {
      heading: "3. Statutory Rights of the Data Principal (Section 11)",
      body: [
        "Under Section 11 of the DPDP Act 2023, you as the Data Principal enjoy unambiguous rights regarding your personal data:",
      ],
      list: [
        "Right to Access: Request confirmation and a summary of processed personal data.",
        "Right to Correction & Erasure: Request correction of inaccurate data or deletion of personal data when the original purpose is fulfilled.",
        "Right of Grievance Redressal: Prompt grievance redressal through our designated Grievance Officer.",
        "Right to Nominate: Nominate a representative to exercise rights on your behalf.",
      ],
    },
    {
      heading: "4. Data Retention and Erasure",
      body: [
        "We retain product inquiry and notification submissions only as long as necessary to fulfill the requested notification or support case. Upon receipt of a valid erasure request from the Data Principal, records are deleted within thirty (30) business days.",
      ],
    },
    {
      heading: "5. Grievance Redressal Mechanism & Officer Contact",
      body: [
        `In compliance with Section 13 of the DPDP Act 2023 and Rule 26 of the Companies (Incorporation) Rules, 2014, Nevrora Works has designated a Grievance Officer and Data Protection Officer:`,
        `Name: ${STATUTORY_DETAILS.grievanceContact.name}`,
        `Role: ${STATUTORY_DETAILS.grievanceContact.role}`,
        `Official Support & Grievance Email: ${STATUTORY_DETAILS.grievanceContact.email}`,
        `Registered Office: ${STATUTORY_DETAILS.registeredOffice}`,
        `We acknowledge grievances within twenty-four (24) hours and resolve Data Principal complaints within thirty (30) business days.`,
      ],
    },
  ],
};

export const PRODUCT_PRIVACY_NOTICES: Record<string, PrivacyNotice> = {
  "sadhana-daily": {
    slug: "sadhana-daily",
    productSlug: "sadhana-daily",
    effectiveVersion: "1.0",
    title: "Privacy Notice: Sadhana Daily",
    lastUpdated: "16 November 2026",
    dataCollected: [
      "Approximate geographic latitude/longitude for local solar and lunar Panchang computation",
      "Personal japa counters, daily practice logs, and reminder preferences stored on-device",
      "Voluntary support correspondence sent to support@nevrora-works.com",
    ],
    purposes: [
      "Calculating mathematically accurate local Tithi, Nakshatra, and Muhurat timings",
      "Providing quiet, private daily spiritual practice routines without third-party ads",
      "Responding to user support requests",
    ],
    rights: [
      "Right to complete privacy: Practice logs are stored locally on your device by default",
      "Right to immediate local data deletion at any time",
      "Right to contact our Grievance Officer under DPDP Act 2023",
    ],
    grievanceOfficer: {
      name: STATUTORY_DETAILS.grievanceContact.name,
      role: "Grievance Officer — Sadhana Daily (Nevrora Works)",
      email: STATUTORY_DETAILS.grievanceContact.email,
      phone: STATUTORY_DETAILS.grievanceContact.phone,
      address: STATUTORY_DETAILS.registeredOffice,
    },
    clauses: [
      {
        heading: "1. Sacred Practice & Privacy-First Architecture",
        body: [
          "Sadhana Daily is a digital product created and operated by Nevrora Works (Nevrora Technologies Private Limited). Operating under the Digital Personal Data Protection Act, 2023 (DPDP Act 2023), Sadhana Daily contains zero third-party advertisement trackers and zero behavioral profiling.",
        ],
      },
      {
        heading: "2. Local Panchang Calculations & On-Device Storage",
        body: [
          "Panchang and muhurat calculations are performed locally on your device whenever possible. Location coordinates are used strictly to compute sunrise, moonrise, and planetary horizons.",
        ],
      },
      {
        heading: "3. Data Principal Rights & Redressal",
        body: [
          "You retain complete ownership over your spiritual practice data and may clear local app storage at any time.",
          `Designated Grievance Officer: ${STATUTORY_DETAILS.grievanceContact.name} (${STATUTORY_DETAILS.grievanceContact.email}).`,
        ],
      },
    ],
  },
  "neermiti-collections": {
    slug: "neermiti-collections",
    productSlug: "neermiti-collections",
    effectiveVersion: "1.0",
    title: "Privacy Notice: Neermiti Collections",
    lastUpdated: "16 November 2026",
    dataCollected: [
      "Customer contact and delivery information (name, shipping address, phone, email)",
      "Order history and handloom provenance certificate identifiers",
      "Customer care correspondence sent to support@nevrora-works.com",
    ],
    purposes: [
      "Fulfillment and dispatch of handloom apparel and lifestyle orders",
      "Issuance of weave-cluster provenance details",
      "Customer support, sizing assistance, and returns processing",
    ],
    rights: [
      "Right to access order history and stored delivery details",
      "Right to correction and erasure of customer profile data",
      "Right to file a grievance with our designated Grievance Officer",
    ],
    grievanceOfficer: {
      name: STATUTORY_DETAILS.grievanceContact.name,
      role: "Grievance Officer — Neermiti Collections (Nevrora Works)",
      email: STATUTORY_DETAILS.grievanceContact.email,
      phone: STATUTORY_DETAILS.grievanceContact.phone,
      address: STATUTORY_DETAILS.registeredOffice,
    },
    clauses: [
      {
        heading: "1. Scope and Product Context",
        body: [
          "This dedicated Privacy Notice applies specifically to Neermiti Collections, a consumer commerce product operated by Nevrora Works (Nevrora Technologies Private Limited), conforming to the Digital Personal Data Protection Act, 2023 (DPDP Act 2023).",
        ],
      },
      {
        heading: "2. Order Fulfillment & Payment Security",
        body: [
          "Personal data collected during checkout is shared solely with verified logistics and payment partners to complete your order. We never sell or rent customer data.",
        ],
      },
      {
        heading: "3. Data Principal Rights & Redressal",
        body: [
          "Customers may exercise their statutory rights of access, correction, and erasure at any time by contacting our Grievance Officer.",
          `Grievance Officer: ${STATUTORY_DETAILS.grievanceContact.name} (${STATUTORY_DETAILS.grievanceContact.email}).`,
        ],
      },
    ],
  },
  driveiq: {
    slug: "driveiq",
    productSlug: "driveiq",
    effectiveVersion: "1.0",
    title: "Privacy Notice: DriveIQ",
    lastUpdated: "16 November 2026",
    dataCollected: [
      "Driving school administrator and instructor account profile information",
      "Enrolled learner scheduling, attendance logs, and training milestone records",
      "Support correspondence submitted to support@nevrora-works.com",
    ],
    purposes: [
      "Operating driving institute class rosters, vehicle schedules, and learner attendance logs",
      "Generating training completion summaries and fee receipts for enrolled students",
      "Providing technical support and account assistance",
    ],
    rights: [
      "Right to access and export institute and learner records",
      "Right to correction and erasure of personal data upon account closure",
      "Right to contact our Grievance Officer under DPDP Act 2023",
    ],
    grievanceOfficer: {
      name: STATUTORY_DETAILS.grievanceContact.name,
      role: "Grievance Officer — DriveIQ (Nevrora Works)",
      email: STATUTORY_DETAILS.grievanceContact.email,
      phone: STATUTORY_DETAILS.grievanceContact.phone,
      address: STATUTORY_DETAILS.registeredOffice,
    },
    clauses: [
      {
        heading: "1. Scope and Product Context",
        body: [
          "This Privacy Notice governs DriveIQ, a SaaS operations and scheduling product operated by Nevrora Works (Nevrora Technologies Private Limited) under the Digital Personal Data Protection Act, 2023 (DPDP Act 2023).",
        ],
      },
      {
        heading: "2. Tenant Data Isolation & Security",
        body: [
          "Driving school records, instructor schedules, and student progress logs are logically isolated per institute account and encrypted in transit and at rest.",
        ],
      },
      {
        heading: "3. Data Principal Rights & Redressal",
        body: [
          "Institutes and learners may exercise their statutory rights of access, correction, and erasure by contacting our Grievance Officer.",
          `Grievance Officer: ${STATUTORY_DETAILS.grievanceContact.name} (${STATUTORY_DETAILS.grievanceContact.email}).`,
        ],
      },
    ],
  },
};

export const PRODUCT_TERMS_NOTICES: Record<string, PrivacyNotice> = {
  "sadhana-daily": {
    slug: "sadhana-daily",
    productSlug: "sadhana-daily",
    effectiveVersion: "1.0",
    title: "Product Terms of Use: Sadhana Daily",
    lastUpdated: "16 November 2026",
    dataCollected: [],
    purposes: [],
    rights: [
      "Personal, non-exclusive license to use Sadhana Daily for individual spiritual and calendar reference",
      "Clear notice of Coming Soon preview status and feature evolution",
      "Direct product support via support@nevrora-works.com",
    ],
    grievanceOfficer: STATUTORY_DETAILS.grievanceContact,
    clauses: [
      {
        heading: "1. Product Scope & Acceptance",
        body: [
          "These Product Terms govern your access to and use of Sadhana Daily, operated by Nevrora Works (Nevrora Technologies Private Limited).",
        ],
      },
      {
        heading: "2. Informational & Cultural Reference Purpose",
        body: [
          "Panchang, tithi, and muhurat calculations are provided for cultural, astronomical, and personal contemplative reference.",
        ],
      },
      {
        heading: "3. Support & Contact",
        body: [
          `For product questions or support, contact ${STATUTORY_DETAILS.supportEmail}.`,
        ],
      },
    ],
  },
  "neermiti-collections": {
    slug: "neermiti-collections",
    productSlug: "neermiti-collections",
    effectiveVersion: "1.0",
    title: "Product Terms of Use: Neermiti Collections",
    lastUpdated: "16 November 2026",
    dataCollected: [],
    purposes: [],
    rights: [
      "Transparent product descriptions, weave provenance, and care instructions",
      "Clear return, exchange, and order support policies upon storefront launch",
      "Direct customer support via support@nevrora-works.com",
    ],
    grievanceOfficer: STATUTORY_DETAILS.grievanceContact,
    clauses: [
      {
        heading: "1. Product Scope & Storefront Preview",
        body: [
          "These Product Terms govern Neermiti Collections, operated by Nevrora Works (Nevrora Technologies Private Limited). During the Coming Soon preview phase, no online checkout charges are processed.",
        ],
      },
      {
        heading: "2. Handloom Characteristics",
        body: [
          "Authentic handloom textiles feature natural variations in weave texture and plant-dyed tones, reflecting genuine artisan craftsmanship.",
        ],
      },
      {
        heading: "3. Support & Contact",
        body: [
          `For product enquiries or assistance, contact ${STATUTORY_DETAILS.supportEmail}.`,
        ],
      },
    ],
  },
  driveiq: {
    slug: "driveiq",
    productSlug: "driveiq",
    effectiveVersion: "1.0",
    title: "Product Terms of Use: DriveIQ",
    lastUpdated: "16 November 2026",
    dataCollected: [],
    purposes: [],
    rights: [
      "Clear SaaS subscription and pilot onboarding terms for driving schools",
      "Institute ownership of uploaded student and scheduling records",
      "Direct technical support via support@nevrora-works.com",
    ],
    grievanceOfficer: STATUTORY_DETAILS.grievanceContact,
    clauses: [
      {
        heading: "1. Product Scope & SaaS Preview",
        body: [
          "These Product Terms govern DriveIQ, a SaaS operations platform operated by Nevrora Works (Nevrora Technologies Private Limited).",
        ],
      },
      {
        heading: "2. Account Responsibilities",
        body: [
          "Participating driving institutes are responsible for maintaining accurate instructor and learner authorization records.",
        ],
      },
      {
        heading: "3. Support & Contact",
        body: [
          `For pilot onboarding or product support, contact ${STATUTORY_DETAILS.supportEmail}.`,
        ],
      },
    ],
  },
};
