/* Single source of truth for site copy + project data. */

export const SITE = {
  name: "Jordan Strande",
  role: "Full-Stack & AI Engineer",
  location: "Denver, CO",
  email: "StrandeJordan@gmail.com",
  phone: "(720) 331-2995",
  year: new Date().getFullYear(),
  socials: {
    github: "https://github.com/jstrande99",
    linkedin: "https://www.linkedin.com/in/jordan-strande/",
    langelogic: "https://langelogic.com",
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/projects", label: "Work", index: "02" },
  { href: "/resume", label: "Resume", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export const BIO = [
  "Full-stack engineer and AI systems builder with 3+ years of post-graduation experience shipping production software across web, mobile, cloud, and LLM-powered systems.",
  "As co-founder of Lange Logic LLC, I architect revenue-generating SaaS spanning AI agents, automated security, mobile CI/CD, and edge-rendered SEO infrastructure — taking prototypes from whiteboard to customer-facing product within a single sprint cycle.",
  "Former US Ski Team competitor. I bring the same discipline to shipping code: high performer under pressure, calm when it counts.",
];

/* Full stack groups mirror the technical-skills matrix in the resume.
 * Nine groups, each an honest list of what's shipped in production. */
export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: [
      "TypeScript",
      "JavaScript (ES2024)",
      "Python",
      "Java",
      "C",
      "C++",
      "SQL",
      "Bash",
      "PHP",
      "Deno",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React 19",
      "Next.js 14",
      "Vite",
      "Tailwind CSS",
      "Tamagui",
      "Bootstrap",
      "Three.js",
      "React Three Fiber",
      "Monaco Editor",
      "D3.js",
    ],
  },
  {
    title: "Mobile & CI/CD",
    items: [
      "React Native",
      "Expo",
      "EAS",
      "Electron",
      "Xcode",
      "xcodebuild",
      "Gradle",
      "App Store Connect",
      "Google Play",
      "Turborepo",
      "pnpm Workspaces",
      "GitHub Actions",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "Fastify",
      "Express",
      "FastAPI",
      "Flask",
      "GraphQL",
      "gRPC",
      "REST",
      "BullMQ",
      "Celery",
      "Redis",
    ],
  },
  {
    title: "Data & Cloud",
    items: [
      "Postgres",
      "Supabase",
      "Firebase",
      "Firestore",
      "Cloudflare Workers",
      "Cloudflare KV",
      "Browser Rendering",
      "AWS (Lambda · S3 · Cognito)",
      "Google Cloud",
      "Vercel",
      "Oracle Cloud",
      "Docker",
      "Wrangler",
    ],
  },
  {
    title: "AI & ML",
    items: [
      "Anthropic Claude",
      "OpenAI",
      "Google Gemini",
      "NVIDIA NIM",
      "xAI",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "LangChain",
      "LLM Fine-tuning",
      "RAG",
      "Agentic Workflows",
      "MCP",
      "NLP",
      "Embeddings",
    ],
  },
  {
    title: "Security",
    items: [
      "AES-256-GCM",
      "TLS 1.3",
      "MFA",
      "RBAC",
      "bcrypt",
      "Signed Webhooks",
      "Automated Red-Teaming",
      "Exploit Chain Analysis",
      "Penetration Testing",
      "Audit Logging",
      "HIPAA-aware",
    ],
  },
  {
    title: "Observability & Testing",
    items: [
      "Grafana",
      "Sentry",
      "CloudWatch",
      "Lighthouse",
      "PageSpeed",
      "Uptime Monitoring",
      "SSE Log Streaming",
      "Redash",
      "Jest",
      "Cypress",
      "Playwright",
      "Postman",
    ],
  },
  {
    title: "Integrations",
    items: [
      "Stripe",
      "Google Search Console",
      "GitHub OAuth",
      "Resend",
      "App Store Connect API",
      "Google Play Developer API",
      "Semrush",
      "DataForSEO",
      "Firecrawl",
    ],
  },
] as const;

export type Project = {
  num: string;
  title: string;
  italic: string;
  tagline: string;
  category: string;
  year: string;
  stack: string[];
  link: string;
  /* Primary screenshot — used by list/grid thumbnails. */
  image?: string;
  /* Full screenshot deck for the showcase panel. */
  gallery?: string[];
  /* Square logo shown in the browser-chrome of the showcase panel. */
  logo?: string;
  /* Headline stats lifted from langelogic.com/products. */
  stats?: { value: string; label: string }[];
  /* Engineering-infra products (no consumer UI screenshots). When present,
   * the Work section renders a GitHub repo card instead of a phone deck. */
  repo?: {
    owner: string;
    name: string;
    language: string;
    languagePct: string;
    license: string;
    release: string;
    features: string[];
  };
  /* Legacy typography-only flag retained for catalog compatibility. */
  typographyOnly?: boolean;
  stat?: string;
};

/* Flagship roster — three Lange Logic products Jordan built. Tagline +
 * stats strings mirror the authoritative source (langelogic.com/products
 * and the langelogic repo's src/data/projects.ts). */
export const FLAGSHIP_PROJECTS: Project[] = [
  {
    num: "01",
    title: "Olana AI",
    italic: "Don't just talk. Get things done.",
    tagline:
      "Proactive multi-model AI agent platform. Executes tasks, automates workflows, and interacts with digital systems safely across every device — extending beyond conversation.",
    category: "AI Agent Platform",
    year: "2026",
    stack: ["React Native", "Electron", "Python", "Node.js", "LLMs"],
    link: "https://langelogic.com/products/olana-ai",
    image: "/projects/langelogic/olana/olana1.webp",
    gallery: [
      "/projects/langelogic/olana/olana1.webp",
      "/projects/langelogic/olana/olana2.webp",
      "/projects/langelogic/olana/olana3.webp",
    ],
    logo: "/projects/langelogic/olana/olana_logo.png",
    stats: [
      { value: "9", label: "Core pillars" },
      { value: "24/7", label: "Availability" },
      { value: "100%", label: "Human-in-the-loop" },
      { value: "∞", label: "Skill extensibility" },
    ],
  },
  {
    num: "02",
    title: "Crawlable AI",
    italic: "Make your site visible to every crawler and AI.",
    tagline:
      "JavaScript pre-rendering + AI-powered SEO and AEO platform. Renders JS sites fully visible to Google, ChatGPT, Perplexity, and 150+ crawlers via edge caching, AI-optimized meta tags, schema injection, and rank tracking — with zero code changes.",
    category: "SEO & AI Visibility",
    year: "2025",
    stack: [
      "Edge CDN",
      "DNS Pre-rendering",
      "AI / LLMs",
      "Schema Injection",
      "A/B Testing",
    ],
    link: "https://crawlableai.com",
    image: "/projects/langelogic/crawlable/crawlable1.webp",
    gallery: [
      "/projects/langelogic/crawlable/crawlable1.webp",
      "/projects/langelogic/crawlable/crawlable2.webp",
      "/projects/langelogic/crawlable/crawlable3.webp",
      "/projects/langelogic/crawlable/crawlable4.webp",
    ],
    logo: "/projects/langelogic/crawlable/crawlableLogo.png",
    stats: [
      { value: "150+", label: "Crawlers supported" },
      { value: "<50ms", label: "Edge cache" },
      { value: "0", label: "Code changes" },
      { value: "2 min", label: "Setup" },
    ],
  },
  {
    num: "03",
    title: "RedLens",
    italic: "Think like an attacker.",
    tagline:
      "Web-based automated red team. Scans apps, discovers vulnerabilities, validates exploit chains, and ships pentest-grade reports with AI reasoning, MCP + CLI integrations, and detection-only probes.",
    category: "AI Red Team",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Cloudflare",
      "LLM Orchestration",
      "MCP",
    ],
    link: "https://redlens.langelogic.com",
    image: "/projects/langelogic/redlens/redlens1.webp",
    gallery: [
      "/projects/langelogic/redlens/redlens1.webp",
      "/projects/langelogic/redlens/redlens2.webp",
      "/projects/langelogic/redlens/redlens3.webp",
    ],
    logo: "/projects/langelogic/redlens/redlens_logo.png",
    stats: [
      { value: "17", label: "Security modules" },
      { value: "8+", label: "Probe types" },
      { value: "~2 min", label: "Avg recon" },
      { value: "4+", label: "AI integrations" },
    ],
  },
  {
    num: "04",
    title: "Forge",
    italic: "Self-hosted build platform for iOS and Android.",
    tagline:
      "Open-source mobile CI/CD that runs on your own infrastructure. Native iOS builds via Xcode, Android in isolated Docker. Multi-tenant with AES-256-GCM credential encryption, BullMQ queuing, real-time SSE log streaming, and drop-in eas.json compatibility.",
    category: "Mobile CI/CD · OSS",
    year: "2026",
    stack: ["Node.js", "Fastify", "BullMQ", "Docker", "Xcode"],
    link: "https://github.com/Lange-Logic-LLC/Forge",
    stats: [
      { value: "iOS+AND", label: "Build targets" },
      { value: "AES-256", label: "Credential encryption" },
      { value: "Apache 2.0", label: "License" },
      { value: "v0.1.0", label: "Initial release" },
    ],
    repo: {
      owner: "Lange-Logic-LLC",
      name: "Forge",
      language: "TypeScript",
      languagePct: "83.2%",
      license: "Apache 2.0",
      release: "v0.1.0 · April 2026",
      features: [
        "Native iOS builds via Xcode on macOS",
        "Android builds in isolated Docker containers",
        "Multi-tenant orgs + role-based access control",
        "AES-256-GCM encrypted credential storage",
        "Real-time log streaming over Server-Sent Events",
        "Auto-submit to TestFlight, App Store, Play",
        "Drop-in eas.json compatibility",
        "Zero open ports via Cloudflare Tunnel",
      ],
    },
  },
];

export const OTHER_WORK = [
  {
    title: "SpinFlow AI",
    sub: "Multi-LLM SaaS for enterprise workflow automation",
    link: "https://app.spinflow.ai",
    image: "/projects/SpinFlow.png",
    tag: "F500 Pilot",
    year: "2024",
  },
  {
    title: "TJ's Sportsbar & Grill",
    sub: "Full-stack restaurant site with events & service",
    link: "https://tjssportsbarlakewood.com/",
    image: "/projects/TJsportsBarAndGrill.png",
    tag: "Client Work",
    year: "2024",
  },
  {
    title: "Strande Designs",
    sub: "3D interactive e-commerce showcase",
    link: "https://strandedesigns.netlify.app",
    image: "/projects/StrandeDesigns2.png",
    tag: "Three.js",
    year: "2023",
  },
  {
    title: "Tail Trails",
    sub: "QR-based pet health & location tracking",
    link: "https://tailtrails.netlify.app/",
    image: "/projects/TailTrails.png",
    tag: "Mobile-First",
    year: "2023",
  },
  {
    title: "Sibling Kinect",
    sub: "Child & family-services discovery platform",
    link: "https://sibling-kinect.netlify.app",
    image: "/projects/siblingkinnect.png",
    tag: "Social Impact",
    year: "2023",
  },
] as const;

export const STATS = [
  { value: 50, suffix: "+", label: "Services shipped in production" },
  { value: 4.5, suffix: "yr", label: "Sustained shipping cadence" },
  { value: 99.9, suffix: "%", label: "Uptime at 1000+ req/min" },
] as const;
