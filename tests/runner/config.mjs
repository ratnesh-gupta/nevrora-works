/**
 * Test Suite Configuration & Constants
 * Defines target URLs, mode selection, and reference values from specification.
 */

export const CONFIG = {
  webUrl: process.env.TEST_WEB_URL || 'http://localhost:3000',
  apiUrl: process.env.TEST_API_URL || 'http://localhost:8000',
  targetMode: process.env.TEST_TARGET || 'auto', // 'auto' | 'live' | 'mock'
  requestTimeoutMs: parseInt(process.env.TEST_TIMEOUT_MS || '5000', 10),
  rateLimitBurstCount: 15,
};

export const SPEC_CONSTANTS = {
  navigation: {
    lockedItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Products', href: '/products' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: {
      label: 'Start a Conversation',
      href: '/contact',
    },
    forbiddenRoutes: ['/ventures'],
  },
  services: [
    'ai-intelligent-automation',
    'custom-software-development',
    'web-digital-experiences',
    'mobile-application-development',
    'cloud-devops',
    'technology-consulting',
  ],
  products: {
    published: ['neermiti-collections', 'sadhana-daily'],
    unpublished: ['driveiq'],
  },
  statutory: {
    legalName: 'Nevrora Technologies Private Limited',
    cin: 'U72900KA2024PTC189000',
    registeredOffice: 'Bengaluru, Karnataka, India',
    phone: '+91 80 4123 4567',
    email: 'hello@nevrora.com',
    grievanceEmail: 'ratnesh.k.gupta@icloud.com',
    grievanceOfficer: 'Ratnesh Kumar Gupta',
  },
  paletteA: {
    forest: '#173C32',
    evergreen: '#071B18',
    gold: '#C9A35B',
    cream: '#F7F2E9',
    charcoal: '#252725',
    sage: '#A8B7A8',
    white: '#FFFFFF',
  },
  inquiryTypes: [
    'Venture idea',
    'Strategic partnership',
    'Business collaboration',
    'General inquiry',
  ],
};
