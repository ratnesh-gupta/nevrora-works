import { STATUTORY_DETAILS } from "@nevrora/config";
import type { PrivacyNotice } from "@nevrora/types";

export const SITE_PRIVACY_POLICY: PrivacyNotice = {
  slug: "privacy-policy",
  title: "Digital Personal Data Protection Act (DPDP Act 2023) Privacy Policy",
  lastUpdated: "30 October 2026",
  dataCollected: [
    "Contact Details: Full Name, Official Email Address, Organization Name, Phone Number (voluntary)",
    "Inquiry Metadata: Inquiry Type, Message Context, Collaboration Scope",
    "Technical Telemetry: IP address, user-agent string, page interaction timestamps (processed only with explicit consent)",
  ],
  purposes: [
    "Evaluating project proposals, strategic partnerships, and commercial collaborations",
    "Communicating directly with prospective enterprise clients, partners, and entrepreneurs",
    "Ensuring platform security, fraud prevention, and regulatory compliance under Indian law",
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
        "Nevrora Technologies Private Limited ('Nevrora Ventures', 'we', 'us') functions as a Data Fiduciary under the Digital Personal Data Protection Act, 2023 ('DPDP Act 2023'). This Privacy Policy constitutes notice given prior to or at the time of collecting personal data through our website.",
        "We collect and process personal data exclusively for lawful, specified purposes for which you have provided clear, affirmative consent or where processing is permissible under applicable law.",
      ],
      list: [
        "Inquiry Evaluation: Reviewing venture ideas, technology proposals, and advisory engagements.",
        "Direct Correspondence: Answering commercial inquiries and delivering requested documentation.",
        "Platform Integrity: Safeguarding our digital infrastructure against DDoS attacks, abuse, and security vulnerabilities.",
      ],
    },
    {
      heading: "2. Personal Data Collected",
      body: [
        "We adhere strictly to the principle of data minimization. We collect only the data strictly necessary for fulfilling your inquiry:",
      ],
      list: [
        "Data provided through the Contact form: Name, Work Email, Organization Name, Category of Interest, and Message Body.",
        "Technical Analytics: When you explicitly consent via our Cookie Banner, Google Analytics 4 logs anonymized metrics (approximate geographical region, device type, pages visited). IP addresses are not logged or stored.",
      ],
    },
    {
      heading: "3. Statutory Rights of the Data Principal (Section 11)",
      body: [
        "Under Section 11 of the DPDP Act 2023, you as the Data Principal enjoy unambiguous rights regarding your personal data:",
      ],
      list: [
        "Right to Access: You may request confirmation on whether we process your data, a summary of processed data, and third-party disclosure details.",
        "Right to Correction & Erasure: You may request correction of inaccurate data or deletion of personal data when the original purpose is fulfilled.",
        "Right of Grievance Redressal: You are entitled to prompt grievance redressal through our designated Grievance Officer.",
        "Right to Nominate: You may nominate a representative to exercise rights on your behalf.",
      ],
    },
    {
      heading: "4. Data Retention and Erasure",
      body: [
        "We retain inquiry submissions only as long as necessary to fulfill the collaboration assessment and maintain necessary statutory accounting records. Upon fulfillment or upon receipt of a valid erasure request from the Data Principal, records are irrevocably deleted from our production systems within thirty (30) business days.",
      ],
    },
    {
      heading: "5. Grievance Redressal Mechanism & Officer Contact",
      body: [
        `In compliance with Section 13 of the DPDP Act 2023 and Rule 26 of the Companies (Incorporation) Rules, 2014, Nevrora has designated a dedicated Grievance Officer and Data Protection Officer:`,
        `Name: ${STATUTORY_DETAILS.grievanceContact.name}`,
        `Role: ${STATUTORY_DETAILS.grievanceContact.role}`,
        `Official Email: ${STATUTORY_DETAILS.grievanceContact.email}`,
        `Registered Office: ${STATUTORY_DETAILS.registeredOffice}`,
        `We acknowledge grievances within twenty-four (24) hours and commit to resolving all Data Principal complaints within thirty (30) business days.`,
      ],
    },
  ],
};

export const PRODUCT_PRIVACY_NOTICES: Record<string, PrivacyNotice> = {
  "neermiti-collections": {
    slug: "neermiti-collections",
    productSlug: "neermiti-collections",
    title: "Privacy Notice: Neermiti Collections",
    lastUpdated: "30 October 2026",
    dataCollected: [
      "Customer contact information (name, delivery address, phone, email)",
      "Transaction records and digital authenticity certificate identifiers",
      "Customer service correspondence regarding artisanal orders",
    ],
    purposes: [
      "Fulfillment and dispatch of bespoke handloom and artisanal lifestyle orders",
      "Issuance of verifiable handloom origin certificates",
      "Customer support and post-delivery sizing assistance",
    ],
    rights: [
      "Right to access purchase history and stored shipping information",
      "Right to erasure of marketing and customer profile data",
      "Right to file a grievance with our designated Grievance Officer",
    ],
    grievanceOfficer: {
      name: STATUTORY_DETAILS.grievanceContact.name,
      role: "Grievance Officer — Neermiti Collections",
      email: STATUTORY_DETAILS.grievanceContact.email,
      phone: STATUTORY_DETAILS.grievanceContact.phone,
      address: STATUTORY_DETAILS.registeredOffice,
    },
    clauses: [
      {
        heading: "1. Scope and Product Context",
        body: [
          "This dedicated Privacy Notice applies specifically to Neermiti Collections, an artisanal fashion and lifestyle venture incubated by Nevrora Technologies Private Limited, conforming to the Digital Personal Data Protection Act, 2023 (DPDP Act 2023).",
        ],
      },
      {
        heading: "2. Commercial Processing and Supply Chain Transparency",
        body: [
          "Personal data collected during checkout is shared solely with logistics partners for shipping purposes. We do not sell, rent, or monetize customer data. Payment processing occurs through PCI-DSS certified payment gateways; Nevrora does not store raw credit card credentials.",
        ],
      },
      {
        heading: "3. Data Principal Rights & Redressal",
        body: [
          "Users and customers may exercise their statutory rights of access, correction, and erasure at any time by contacting our designated Grievance Officer.",
          `Grievance Officer: ${STATUTORY_DETAILS.grievanceContact.name} (${STATUTORY_DETAILS.grievanceContact.email}).`,
        ],
      },
    ],
  },
  "sadhana-daily": {
    slug: "sadhana-daily",
    productSlug: "sadhana-daily",
    title: "Privacy Notice: Sadhana Daily",
    lastUpdated: "30 October 2026",
    dataCollected: [
      "Approximate geographic latitude/longitude for solar and lunar Panchang computation",
      "Personal japa counters, spiritual diary notes, and meditation duration",
      "Device preferences (theme, notification quiet hours)",
    ],
    purposes: [
      "Calculating mathematically precise local Tithi, Nakshatra, and Muhurat timings",
      "Providing quiet, private daily spiritual practice routines without commercial interruption",
      "Local on-device synchronization of personal spiritual progress",
    ],
    rights: [
      "Right to complete privacy: Spiritual records are strictly client-side by default",
      "Right to immediate local data deletion with one tap",
      "Right to contact our Grievance Officer under DPDP Act 2023",
    ],
    grievanceOfficer: {
      name: STATUTORY_DETAILS.grievanceContact.name,
      role: "Grievance Officer — Sadhana Daily",
      email: STATUTORY_DETAILS.grievanceContact.email,
      phone: STATUTORY_DETAILS.grievanceContact.phone,
      address: STATUTORY_DETAILS.registeredOffice,
    },
    clauses: [
      {
        heading: "1. Sacred Practice & Privacy First Architecture",
        body: [
          "Sadhana Daily is built upon principles of reverence and complete user privacy. Operating under the Digital Personal Data Protection Act, 2023 (DPDP Act 2023), our application contains zero third-party advertisement trackers, zero behavioral profiling, and zero data brokerage integrations.",
        ],
      },
      {
        heading: "2. Astrological Calculations & Local Data",
        body: [
          "Panchang and muhurta calculations are performed locally on your device whenever possible. Geographic location coordinates are used strictly to calculate planetary horizons and are never transmitted to third parties or logged remotely.",
        ],
      },
      {
        heading: "3. Data Principal Rights & Redressal",
        body: [
          "You retain complete ownership over your spiritual practice data. You may export or purge all application data instantly.",
          `Designated Grievance Officer: ${STATUTORY_DETAILS.grievanceContact.name} (${STATUTORY_DETAILS.grievanceContact.email}).`,
        ],
      },
    ],
  },
};
