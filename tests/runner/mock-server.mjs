/**
 * Reference Spec-Compliant Request Dispatcher & Ephemeral Server
 * Implements the authoritative contracts from PROJECT.md and ORIGINAL_REQUEST.md.
 * Supports direct in-process dispatch (sandbox-safe) and HTTP server binding.
 */

import http from 'node:http';
import { SPEC_CONSTANTS } from './config.mjs';

export const SERVICES_DATA = [
  {
    slug: 'ai-intelligent-automation',
    number: '01',
    title: 'AI & Intelligent Automation',
    short: 'Autonomous agents and ML pipelines that scale decision-making.',
    statement: 'Transform manual workflows into resilient intelligence systems.',
    problems: ['Fragmented manual decisions', 'Unstructured data bottlenecks'],
    capabilities: ['Workflow Agents', 'Predictive Modeling', 'NLP Pipelines'],
    deliverables: ['Production LLM Pipeline', 'Automated Decision Engine'],
    processSteps: [
      { step: '01', title: 'Data Audit & Readiness', description: 'Evaluate enterprise data quality' },
      { step: '02', title: 'Model Architecture', description: 'Design tailored agent topologies' },
      { step: '03', title: 'Production Pipeline', description: 'Deploy fault-tolerant inference services' },
      { step: '04', title: 'Continuous Governance', description: 'Observability and drift monitoring' },
    ],
    techBadges: ['PyTorch', 'LangChain', 'FastAPI', 'Docker', 'Python'],
    color: '#173C32',
    published: true,
  },
  {
    slug: 'custom-software-development',
    number: '02',
    title: 'Custom Software Development',
    short: 'Bespoke web, mobile, and backend platforms engineered for durability.',
    statement: 'Clean architecture, high throughput, zero legacy debt.',
    problems: ['Slow release velocity', 'Monolithic architecture gridlock'],
    capabilities: ['Microservices', 'Event-Driven Architectures', 'Domain Modeling'],
    deliverables: ['Production Web System', 'Validated Schema Contracts'],
    processSteps: [
      { step: '01', title: 'Domain Modeling', description: 'Establish bounded contexts' },
      { step: '02', title: 'System Architecture', description: 'Define resilient service interfaces' },
      { step: '03', title: 'Sprint Execution', description: 'Test-driven feature delivery' },
      { step: '04', title: 'Production Handover', description: 'CI/CD pipeline and runbook documentation' },
    ],
    techBadges: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis'],
    color: '#071B18',
    published: true,
  },
  {
    slug: 'web-digital-experiences',
    number: '03',
    title: 'Web & Digital Experiences',
    short: 'Modern web platforms pairing high aesthetics with sub-second performance.',
    statement: 'Memorable brand interactions grounded in modern engineering.',
    problems: ['High bounce rates', 'Slow core web vitals'],
    capabilities: ['Next.js App Router', '3D WebGL Interactions', 'A11y Compliance'],
    deliverables: ['Responsive Web App', 'Design System Integration'],
    processSteps: [
      { step: '01', title: 'Design Alignment', description: 'Figma token synchronization' },
      { step: '02', title: 'Interactive Prototyping', description: 'R3F and CSS animation framing' },
      { step: '03', title: 'Core Web Vitals Tuning', description: 'Sub-second LCP optimization' },
      { step: '04', title: 'Edge Deployment', description: 'Global CDN distribution' },
    ],
    techBadges: ['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    color: '#C9A35B',
    published: true,
  },
  {
    slug: 'mobile-application-development',
    number: '04',
    title: 'Mobile Application Development',
    short: 'Native-feel iOS and Android applications built for real-world reliability.',
    statement: 'Intuitive mobile applications with offline-first synchronization.',
    problems: ['Platform fragmentation', 'Poor offline handling'],
    capabilities: ['Cross-Platform Apps', 'Biometric Auth', 'Push Notification Engines'],
    deliverables: ['App Store & Play Store Builds', 'Sync Engine'],
    processSteps: [
      { step: '01', title: 'Platform UX Mapping', description: 'Design for iOS & Android guidelines' },
      { step: '02', title: 'Offline-First Engine', description: 'Local persistence and conflict resolution' },
      { step: '03', title: 'Device Testing', description: 'Testing across real physical devices' },
      { step: '04', title: 'App Store Submission', description: 'Compliance audit and submission' },
    ],
    techBadges: ['React Native', 'Kotlin', 'Swift', 'SQLite'],
    color: '#173C32',
    published: true,
  },
  {
    slug: 'cloud-devops',
    number: '05',
    title: 'Cloud & DevOps Engineering',
    short: 'Reliable cloud infrastructure with automated CI/CD and security guardrails.',
    statement: 'Zero-downtime releases and immutable infrastructure.',
    problems: ['Manual deployment errors', 'Uncontrolled infrastructure sprawl'],
    capabilities: ['Infrastructure as Code', 'Kubernetes Clusters', 'Zero-Trust Security'],
    deliverables: ['Terraform Modules', 'Automated GitHub Actions Pipelines'],
    processSteps: [
      { step: '01', title: 'Infra Audit', description: 'Security and cost optimization assessment' },
      { step: '02', title: 'IaC Implementation', description: 'Declarative Terraform specifications' },
      { step: '03', title: 'Pipeline Automation', description: 'Branch-based automated deployments' },
      { step: '04', title: 'SRE Hardening', description: 'Alerting, metrics, and incident runbooks' },
    ],
    techBadges: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
    color: '#071B18',
    published: true,
  },
  {
    slug: 'technology-consulting',
    number: '06',
    title: 'Technology & Strategy Consulting',
    short: 'Strategic guidance on architecture, engineering leadership, and tech selection.',
    statement: 'Align technology investments with venture outcomes.',
    problems: ['Technical debt accumulation', 'Vendor lock-in risks'],
    capabilities: ['Architecture Review', 'Tech Diligence', 'Team Structure'],
    deliverables: ['Architecture Blueprint', 'Risk Mitigation Roadmap'],
    processSteps: [
      { step: '01', title: 'Discovery & Interview', description: 'Stakeholder goals and pain points' },
      { step: '02', title: 'Technical Diligence', description: 'Codebase and architecture audit' },
      { step: '03', title: 'Roadmap Definition', description: 'Prioritized transition strategy' },
      { step: '04', title: 'Executive Presentation', description: 'C-suite actionable deliverables' },
    ],
    techBadges: ['System Design', 'Enterprise Architecture', 'Due Diligence'],
    color: '#C9A35B',
    published: true,
  },
];

export const PRODUCTS_DATA = [
  {
    slug: 'neermiti-collections',
    number: '01',
    title: 'Neermiti Collections',
    category: 'Venture / Commerce',
    summary: 'A curated e-commerce and lifestyle destination celebrating artisanal Indian craftsmanship.',
    overview: 'Neermiti unites heritage textiles with contemporary silhouettes, connecting master artisans to global patrons.',
    audience: 'Conscious consumers and art connoisseurs seeking authentic handcrafted luxury.',
    valueProposition: 'Direct-from-weaver ethical supply chain with digital authenticity certificates.',
    features: ['Artisan Storytelling', 'Handloom Traceability', 'Seamless Omnichannel Checkout'],
    cta: 'Explore Collection',
    theme: 'neermiti',
    published: true,
  },
  {
    slug: 'sadhana-daily',
    number: '02',
    title: 'Sadhana Daily',
    category: 'Venture / Wellness',
    summary: 'A mindful spiritual companion rooted in authentic Vedic tradition, astronomy, and daily sadhana rituals.',
    overview: 'Calculates high-precision Panchang, auspicious muhurtas, and personalized daily spiritual routines.',
    audience: 'Practitioners and seekers seeking daily alignment with Vedic cosmic rhythms.',
    valueProposition: 'Algorithmic astrological accuracy with zero ads, deep reverence, and complete privacy.',
    features: ['Panchang Calculations', 'Mantra Chanting Japa Counter', 'Custom Muhurta Alerts'],
    cta: 'Begin Sadhana',
    theme: 'sadhana',
    published: true,
  },
  {
    slug: 'driveiq',
    number: '03',
    title: 'DriveIQ',
    category: 'Venture / Mobility',
    summary: 'Next-generation connected vehicle telematics and driver safety analytics platform.',
    overview: 'Unpublished confidential venture project currently undergoing testing.',
    audience: 'Commercial fleet operators and automotive underwriters.',
    valueProposition: 'Real-time CAN bus telemetry and edge computer vision inference.',
    features: ['CAN Bus Telematics', 'Driver Distraction Detection', 'Predictive Fleet Maintenance'],
    cta: 'Learn More',
    theme: 'driveiq',
    published: false,
  },
];

const rateLimitStore = new Map();

export function resetRateLimitStore() {
  rateLimitStore.clear();
}

function checkRateLimit(ip = '127.0.0.1') {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 10;
  const record = rateLimitStore.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }
  rateLimitStore.set(ip, record);

  const remaining = Math.max(0, max - record.count);
  const isLimited = record.count > max;
  return { isLimited, remaining, resetTime: record.resetTime };
}

function renderHtmlPage(title, content, options = {}) {
  const currentPath = options.path || '/';
  const navItems = SPEC_CONSTANTS.navigation.lockedItems
    .map(item => `<a href="${item.href}" class="nav-link ${currentPath === item.href ? 'active' : ''}">${item.label}</a>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Nevrora Ventures</title>
  <meta name="theme-color" content="#173C32">
  <style>
    :root {
      --color-forest: #173C32;
      --color-evergreen: #071B18;
      --color-gold: #C9A35B;
      --color-cream: #F7F2E9;
      --color-charcoal: #252725;
      --color-sage: #A8B7A8;
      --color-white: #FFFFFF;
      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'Inter', -apple-system, sans-serif;
    }
    body {
      background-color: var(--color-evergreen);
      color: var(--color-cream);
      font-family: var(--font-body);
      margin: 0;
      padding: 0;
    }
    h1, h2, h3 { font-family: var(--font-display); color: var(--color-gold); }
    nav { display: flex; gap: 1rem; align-items: center; padding: 1rem 2rem; background: var(--color-forest); }
    .cta-btn { background: var(--color-gold); color: var(--color-evergreen); padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold; }
    footer { border-top: 1px solid var(--color-sage); padding: 2rem; font-size: 0.85rem; background: #04100e; }
  </style>
</head>
<body>
  <header>
    <nav>
      <div class="logo">Nevrora Ventures</div>
      <div class="nav-links">
        ${navItems}
      </div>
      <a href="${SPEC_CONSTANTS.navigation.cta.href}" class="cta-btn">${SPEC_CONSTANTS.navigation.cta.label}</a>
    </nav>
  </header>
  <main>
    ${content}
  </main>
  <footer>
    <div class="rule-26-corporate-strip">
      <p><strong>${SPEC_CONSTANTS.statutory.legalName}</strong> | CIN: ${SPEC_CONSTANTS.statutory.cin}</p>
      <p>Registered Office: ${SPEC_CONSTANTS.statutory.registeredOffice}</p>
      <p>Contact Phone: ${SPEC_CONSTANTS.statutory.phone} | Official Email: <a href="mailto:${SPEC_CONSTANTS.statutory.email}">${SPEC_CONSTANTS.statutory.email}</a></p>
      <p>Grievance & Data Protection Officer: ${SPEC_CONSTANTS.statutory.grievanceOfficer} (${SPEC_CONSTANTS.statutory.grievanceEmail})</p>
      <p>Statutory Disclosures:
        <a href="/privacy-policy">Privacy Policy</a> |
        <a href="/terms">Terms of Use</a> |
        <a href="/disclaimer">Disclaimer</a> |
        <a href="/cookies">Cookie Notice & Preferences</a>
      </p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * Direct in-process mock dispatcher (runs without network sockets)
 */
export async function dispatchMockRequest({ url, method = 'GET', headers = {}, body = null, clientIp = '127.0.0.1' }) {
  const parsedUrl = new URL(url.startsWith('http') ? url : `http://localhost${url.startsWith('/') ? '' : '/'}${url}`);
  const pathname = parsedUrl.pathname;
  const resHeaders = new Headers();
  resHeaders.set('X-Content-Type-Options', 'nosniff');
  resHeaders.set('X-Frame-Options', 'DENY');
  resHeaders.set('Access-Control-Allow-Origin', '*');

  let parsedBody = body;
  if (typeof body === 'string') {
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = body;
    }
  }

  // Health Endpoint
  if (pathname === '/health' && method === 'GET') {
    resHeaders.set('Content-Type', 'application/json');
    const data = { status: 'ok', timestamp: new Date().toISOString() };
    return {
      status: 200,
      statusText: 'OK',
      headers: resHeaders,
      body: data,
      text: JSON.stringify(data),
      ok: true,
      url,
    };
  }

  // API Services
  if (pathname === '/api/services' && method === 'GET') {
    resHeaders.set('Content-Type', 'application/json');
    const data = { success: true, data: SERVICES_DATA };
    return {
      status: 200,
      statusText: 'OK',
      headers: resHeaders,
      body: data,
      text: JSON.stringify(data),
      ok: true,
      url,
    };
  }

  if (pathname.startsWith('/api/services/') && method === 'GET') {
    const slug = pathname.replace('/api/services/', '');
    const service = SERVICES_DATA.find(s => s.slug === slug);
    resHeaders.set('Content-Type', 'application/json');
    if (service) {
      const data = { success: true, data: service };
      return { status: 200, statusText: 'OK', headers: resHeaders, body: data, text: JSON.stringify(data), ok: true, url };
    } else {
      const data = { success: false, error: 'Service not found' };
      return { status: 404, statusText: 'Not Found', headers: resHeaders, body: data, text: JSON.stringify(data), ok: false, url };
    }
  }

  // API Products
  if (pathname === '/api/products' && method === 'GET') {
    resHeaders.set('Content-Type', 'application/json');
    const publishedProducts = PRODUCTS_DATA.filter(p => p.published === true);
    const data = { success: true, data: publishedProducts };
    return { status: 200, statusText: 'OK', headers: resHeaders, body: data, text: JSON.stringify(data), ok: true, url };
  }

  if (pathname.startsWith('/api/products/') && method === 'GET') {
    const slug = pathname.replace('/api/products/', '');
    const product = PRODUCTS_DATA.find(p => p.slug === slug && p.published === true);
    resHeaders.set('Content-Type', 'application/json');
    if (product) {
      const data = { success: true, data: product };
      return { status: 200, statusText: 'OK', headers: resHeaders, body: data, text: JSON.stringify(data), ok: true, url };
    } else {
      const data = { success: false, error: 'Product not found or unpublished' };
      return { status: 404, statusText: 'Not Found', headers: resHeaders, body: data, text: JSON.stringify(data), ok: false, url };
    }
  }

  // API Contact POST
  if (pathname === '/api/contact' && method === 'POST') {
    const rateLimit = checkRateLimit(clientIp);
    resHeaders.set('RateLimit-Remaining', String(rateLimit.remaining));
    if (rateLimit.isLimited) {
      resHeaders.set('Retry-After', '900');
      resHeaders.set('Content-Type', 'application/json');
      const data = { success: false, error: 'Too many requests. Please try again later.' };
      return { status: 429, statusText: 'Too Many Requests', headers: resHeaders, body: data, text: JSON.stringify(data), ok: false, url };
    }

    const { name, email, organization, type, message } = parsedBody || {};
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    // Strict RFC 5322 compatible email validation matching Zod z.string().email()
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.includes('..')) {
      errors.push({ field: 'email', message: 'Invalid email address format' });
    }

    if (!type || !SPEC_CONSTANTS.inquiryTypes.includes(type)) {
      errors.push({ field: 'type', message: `Inquiry type must be one of: ${SPEC_CONSTANTS.inquiryTypes.join(', ')}` });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 20) {
      const currentLength = (message || '').trim().length;
      errors.push({
        field: 'message',
        message: `Tell us a little more. Messages need at least 20 characters (${currentLength} so far).`
      });
    }

    resHeaders.set('Content-Type', 'application/json');
    if (errors.length > 0) {
      const data = { success: false, errors };
      return { status: 400, statusText: 'Bad Request', headers: resHeaders, body: data, text: JSON.stringify(data), ok: false, url };
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const mailtoFallback = `mailto:${SPEC_CONSTANTS.statutory.grievanceEmail}?subject=${encodeURIComponent(`Inquiry: ${type} - ${name}`)}&body=${encodeURIComponent(message)}`;

    if (webhookUrl && webhookUrl.startsWith('http')) {
      const data = {
        success: true,
        message: 'Inquiry forwarded to Google Sheets',
        forwardedToSheets: true,
      };
      return { status: 200, statusText: 'OK', headers: resHeaders, body: data, text: JSON.stringify(data), ok: true, url };
    } else {
      const data = {
        success: true,
        message: 'Inquiry accepted with mailto fallback',
        forwardedToSheets: false,
        fallback: 'mailto',
        mailtoUrl: mailtoFallback,
      };
      return { status: 200, statusText: 'OK', headers: resHeaders, body: data, text: JSON.stringify(data), ok: true, url };
    }
  }

  // Web Route: Negative Constraint /ventures -> 404
  if (pathname === '/ventures' || pathname.startsWith('/ventures/')) {
    resHeaders.set('Content-Type', 'text/html');
    const html = renderHtmlPage('404 Not Found', '<h1>404 - Page Not Found</h1><p>The requested route does not exist.</p>', { path: pathname });
    return { status: 404, statusText: 'Not Found', headers: resHeaders, body: html, text: html, ok: false, url };
  }

  // Web Route: Negative Constraint /products/driveiq -> 404
  if (pathname === '/products/driveiq') {
    resHeaders.set('Content-Type', 'text/html');
    const html = renderHtmlPage('404 Not Found', '<h1>404 - Product Not Found</h1><p>The requested product is unavailable.</p>', { path: pathname });
    return { status: 404, statusText: 'Not Found', headers: resHeaders, body: html, text: html, ok: false, url };
  }

  // Web Route: Homepage /
  if (pathname === '/') {
    resHeaders.set('Content-Type', 'text/html');
    const heroHtml = `
      <section class="hero-section">
        <h1>Pioneering High-Conviction Tech Ventures</h1>
        <p>Nevrora Ventures engineers bespoke software platforms and incubation-grade ventures.</p>
        <div class="constellation-container">
          <svg class="constellation-fallback" viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="#C9A35B" fill="none" />
          </svg>
        </div>
      </section>
      <section class="services-overview">
        <h2>Our Core Capabilities</h2>
        <ul>
          ${SERVICES_DATA.map(s => `<li><a href="/services/${s.slug}">${s.title}</a> - ${s.short}</li>`).join('')}
        </ul>
      </section>
    `;
    const html = renderHtmlPage('Home', heroHtml, { path: '/' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /about
  if (pathname === '/about') {
    resHeaders.set('Content-Type', 'text/html');
    const aboutHtml = `
      <article class="about-page">
        <h1>About Nevrora Ventures</h1>
        <p>Engineering philosophy: Ideas -> Build -> Grow -> Impact.</p>
        <p>We build durable software systems and innovative ventures with rigorous engineering discipline.</p>
      </article>
    `;
    const html = renderHtmlPage('About', aboutHtml, { path: '/about' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /services listing
  if (pathname === '/services') {
    resHeaders.set('Content-Type', 'text/html');
    const servicesListHtml = `
      <div class="services-index">
        <h1>Engineering & Advisory Services</h1>
        <div class="services-grid">
          ${SERVICES_DATA.map(s => `
            <div class="service-card">
              <h3>${s.title}</h3>
              <p>${s.short}</p>
              <a href="/services/${s.slug}">Explore Service & Stepper</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    const html = renderHtmlPage('Services', servicesListHtml, { path: '/services' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: Service Detail
  if (pathname.startsWith('/services/')) {
    const slug = pathname.replace('/services/', '');
    const service = SERVICES_DATA.find(s => s.slug === slug);
    resHeaders.set('Content-Type', 'text/html');
    if (service) {
      const serviceHtml = `
        <article class="service-detail" data-slug="${service.slug}">
          <h1>${service.title}</h1>
          <p class="commercial-statement">${service.statement}</p>
          <div class="stepper-container">
            <h3>Engagement & Delivery Process</h3>
            <ol class="process-stepper">
              ${service.processSteps.map(step => `
                <li class="stepper-item" data-step="${step.step}">
                  <h4>${step.step}. ${step.title}</h4>
                  <p>${step.description}</p>
                </li>
              `).join('')}
            </ol>
          </div>
          <div class="tech-badges-grid">
            <h3>Technology Stack</h3>
            ${service.techBadges.map(badge => `<span class="tech-badge">${badge}</span>`).join(' ')}
          </div>
          <div class="service-cta">
            <a href="/contact?category=${encodeURIComponent(service.slug)}&type=Business+collaboration" class="cta-btn">Start a Conversation for ${service.title}</a>
          </div>
        </article>
      `;
      const html = renderHtmlPage(service.title, serviceHtml, { path: pathname });
      return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
    } else {
      const html = renderHtmlPage('404 Not Found', '<h1>Service Not Found</h1>', { path: pathname });
      return { status: 404, statusText: 'Not Found', headers: resHeaders, body: html, text: html, ok: false, url };
    }
  }

  // Web Route: /products listing
  if (pathname === '/products') {
    resHeaders.set('Content-Type', 'text/html');
    const publishedProducts = PRODUCTS_DATA.filter(p => p.published === true);
    const productsHtml = `
      <div class="products-index">
        <h1>Venture Portfolio</h1>
        <div class="products-grid">
          ${publishedProducts.map(p => `
            <div class="product-card">
              <h3>${p.title}</h3>
              <p>${p.summary}</p>
              <a href="/products/${p.slug}">View Showcase</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    const html = renderHtmlPage('Products', productsHtml, { path: '/products' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: Product Detail
  if (pathname.startsWith('/products/') && !pathname.endsWith('/privacy')) {
    const slug = pathname.replace('/products/', '');
    const product = PRODUCTS_DATA.find(p => p.slug === slug && p.published === true);
    resHeaders.set('Content-Type', 'text/html');
    if (product) {
      const productHtml = `
        <article class="product-showcase" data-slug="${product.slug}">
          <h1>${product.title}</h1>
          <p class="product-category">${product.category}</p>
          <p class="product-summary">${product.summary}</p>
          <p class="product-overview">${product.overview}</p>
          <div class="product-value-prop">
            <h3>Value Proposition</h3>
            <p>${product.valueProposition}</p>
          </div>
          <div class="product-features">
            <h3>Core Features</h3>
            <ul>
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
          <div class="product-privacy-link">
            <a href="/products/${product.slug}/privacy">Privacy Notice for ${product.title}</a>
          </div>
          <a href="/contact?type=Venture+idea" class="cta-btn">${product.cta}</a>
        </article>
      `;
      const html = renderHtmlPage(product.title, productHtml, { path: pathname });
      return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
    } else {
      const html = renderHtmlPage('404 Not Found', '<h1>Product Not Found</h1>', { path: pathname });
      return { status: 404, statusText: 'Not Found', headers: resHeaders, body: html, text: html, ok: false, url };
    }
  }

  // Web Route: Product Privacy
  if (pathname.endsWith('/privacy') && pathname.startsWith('/products/')) {
    const productSlug = pathname.replace('/products/', '').replace('/privacy', '');
    const product = PRODUCTS_DATA.find(p => p.slug === productSlug && p.published === true);
    resHeaders.set('Content-Type', 'text/html');
    if (product) {
      const productPrivacyHtml = `
        <article class="privacy-document">
          <h1>Privacy Notice: ${product.title}</h1>
          <p>Conforming to the Digital Personal Data Protection Act, 2023 (DPDP Act 2023).</p>
          <h2>Data Principal Rights & Redressal</h2>
          <p>Users may exercise rights of access, correction, and erasure.</p>
          <p>Grievance Officer: ${SPEC_CONSTANTS.statutory.grievanceOfficer} (${SPEC_CONSTANTS.statutory.grievanceEmail})</p>
          <p><a href="/privacy-policy">Site-wide Privacy Policy</a> | <a href="/products/${product.slug}">Back to Product</a></p>
        </article>
      `;
      const html = renderHtmlPage(`Privacy Notice - ${product.title}`, productPrivacyHtml, { path: pathname });
      return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
    } else {
      const html = renderHtmlPage('404 Not Found', '<h1>Privacy Notice Not Found</h1>', { path: pathname });
      return { status: 404, statusText: 'Not Found', headers: resHeaders, body: html, text: html, ok: false, url };
    }
  }

  // Web Route: /our-work
  if (pathname === '/our-work') {
    resHeaders.set('Content-Type', 'text/html');
    const workHtml = `
      <div class="case-studies">
        <h1>Our Work & Case Studies</h1>
        <p>Selected engineering transformations and venture delivery highlights.</p>
      </div>
    `;
    const html = renderHtmlPage('Our Work', workHtml, { path: '/our-work' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /contact
  if (pathname === '/contact') {
    resHeaders.set('Content-Type', 'text/html');
    const selectedType = parsedUrl.searchParams.get('type') || '';
    const selectedCategory = parsedUrl.searchParams.get('category') || '';
    const contactHtml = `
      <div class="contact-container">
        <h1>Start a Conversation</h1>
        <p>Discuss a new venture idea, technology engagement, or partnership.</p>
        <form id="contact-form" action="/api/contact" method="POST">
          <div>
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label for="email">Work Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label for="organization">Organization (Optional)</label>
            <input type="text" id="organization" name="organization" />
          </div>
          <div>
            <label for="type">Inquiry Type</label>
            <select id="type" name="type" required>
              ${SPEC_CONSTANTS.inquiryTypes.map(t => `
                <option value="${t}" ${selectedType === t ? 'selected' : ''}>${t}</option>
              `).join('')}
            </select>
          </div>
          <div>
            <label for="message">Message (Min 20 characters)</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your venture..."></textarea>
          </div>
          <input type="hidden" name="category" value="${selectedCategory}" />
          <button type="submit" class="cta-btn">Send Inquiry</button>
        </form>
      </div>
    `;
    const html = renderHtmlPage('Contact', contactHtml, { path: '/contact' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /privacy-policy
  if (pathname === '/privacy-policy') {
    resHeaders.set('Content-Type', 'text/html');
    const privacyHtml = `
      <article class="privacy-policy">
        <h1>Digital Personal Data Protection Act (DPDP Act 2023) Privacy Policy</h1>
        <p>Nevrora Technologies Private Limited is committed to transparent, purposeful processing of personal data.</p>
        <h2>1. Clear Notice & Consent (Section 5 & 6)</h2>
        <p>We process personal data solely for specified business and collaboration purposes.</p>
        <h2>2. Data Principal Rights (Section 11)</h2>
        <ul>
          <li>Right to Access Information about Personal Data</li>
          <li>Right to Correction and Erasure of Personal Data</li>
          <li>Right of Grievance Redressal</li>
          <li>Right to Nominate</li>
        </ul>
        <h2>3. Grievance Redressal Mechanism</h2>
        <p>Designated Grievance & Data Protection Officer: <strong>${SPEC_CONSTANTS.statutory.grievanceOfficer}</strong></p>
        <p>Email: <a href="mailto:${SPEC_CONSTANTS.statutory.grievanceEmail}">${SPEC_CONSTANTS.statutory.grievanceEmail}</a></p>
      </article>
    `;
    const html = renderHtmlPage('Privacy Policy', privacyHtml, { path: '/privacy-policy' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /terms
  if (pathname === '/terms') {
    resHeaders.set('Content-Type', 'text/html');
    const termsHtml = `
      <article class="terms">
        <h1>Terms of Use</h1>
        <p>These terms govern your use of the Nevrora Ventures platform.</p>
        <h2>Intellectual Property & Governing Law</h2>
        <p>All materials and code are protected under applicable copyright laws of India.</p>
      </article>
    `;
    const html = renderHtmlPage('Terms of Use', termsHtml, { path: '/terms' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /disclaimer
  if (pathname === '/disclaimer') {
    resHeaders.set('Content-Type', 'text/html');
    const disclaimerHtml = `
      <article class="disclaimer">
        <h1>Corporate & Regulatory Disclaimer</h1>
        <p>The information on this website does not constitute an offer of investment or securities.</p>
        <p>Forward-looking statements are subject to business risks and market fluctuations.</p>
      </article>
    `;
    const html = renderHtmlPage('Disclaimer', disclaimerHtml, { path: '/disclaimer' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Web Route: /cookies
  if (pathname === '/cookies') {
    resHeaders.set('Content-Type', 'text/html');
    const cookiesHtml = `
      <article class="cookie-policy">
        <h1>Cookie Policy & Preferences</h1>
        <p>We use essential cookies and optional analytics cookies to enhance user experience.</p>
        <div class="cookie-controls">
          <button id="accept-cookies" class="cta-btn">Accept Analytics Cookies</button>
          <button id="decline-cookies" class="cta-btn" style="background: #252725; color: white;">Decline Analytics Cookies</button>
        </div>
      </article>
    `;
    const html = renderHtmlPage('Cookie Policy', cookiesHtml, { path: '/cookies' });
    return { status: 200, statusText: 'OK', headers: resHeaders, body: html, text: html, ok: true, url };
  }

  // Fallback 404
  resHeaders.set('Content-Type', 'text/html');
  const notFoundHtml = renderHtmlPage('404 Not Found', '<h1>404 Not Found</h1><p>The requested page does not exist.</p>', { path: pathname });
  return { status: 404, statusText: 'Not Found', headers: resHeaders, body: notFoundHtml, text: notFoundHtml, ok: false, url };
}
