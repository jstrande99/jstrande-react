"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./Resume.module.css";

/* Line kinds emitted from the resume script. Each one is a single visual
 * unit that fades in as the terminal "types" through the output. */
type Line =
  | { kind: "prompt"; content: string }
  | { kind: "comment"; content: string }
  | { kind: "h1"; content: string }
  | { kind: "h2"; content: string }
  | { kind: "h3"; title: string; org: string; date: string }
  | { kind: "subhead"; content: string }
  | { kind: "product"; title: string; tagline: string; url: string }
  | { kind: "stackRow"; content: string }
  | { kind: "bullet"; content: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "blank" }
  | { kind: "success"; content: string }
  | { kind: "sep" };

/* Source of truth: /public/resume.pdf. Keep the content in sync with
 * that file — this view is a stylized mirror, not a separate résumé. */
function script(): Line[] {
  return [
    { kind: "prompt", content: "cat ~/strande/resume.md" },
    { kind: "blank" },
    { kind: "h1", content: "# JORDAN STRANDE" },
    {
      kind: "meta",
      label: "role",
      value: "Full Stack · AI / ML Engineer · Founder",
    },
    {
      kind: "meta",
      label: "based",
      value: `${SITE.location} · Remote-friendly`,
    },
    { kind: "meta", label: "phone", value: SITE.phone },
    { kind: "meta", label: "email", value: SITE.email },
    { kind: "meta", label: "web", value: "jordanstrande.com" },
    { kind: "meta", label: "co", value: "langelogic.com" },
    { kind: "blank" },
    { kind: "comment", content: "// Full-stack engineer and AI systems builder with 3+ years of post-graduation" },
    { kind: "comment", content: "// experience shipping production software across web, mobile, cloud, and" },
    { kind: "comment", content: "// LLM-powered systems. Co-founder of Lange Logic LLC and architect of multiple" },
    { kind: "comment", content: "// revenue-generating SaaS products spanning AI agents, automated security," },
    { kind: "comment", content: "// mobile CI/CD, and SEO infrastructure. Former US Ski Team competitor —" },
    { kind: "comment", content: "// high performer under pressure." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "technical skills" },
    { kind: "blank" },
    { kind: "meta", label: "languages", value: "TypeScript · JavaScript · Python · SQL · Bash · Java · C/C++ · PHP · Deno" },
    { kind: "meta", label: "frontend", value: "React 18/19 · Next.js 14 · React Native · Expo · Vite · Tailwind CSS · Three.js · Monaco Editor · Tamagui" },
    { kind: "meta", label: "backend", value: "Node.js · Fastify · Express · FastAPI · Flask · GraphQL · Docker · Microservices · BullMQ · Redis" },
    { kind: "meta", label: "edge/cloud", value: "Cloudflare Workers · Cloudflare KV · AWS (Lambda, EC2, S3, Cognito) · Google Cloud · Vercel · Supabase · Firebase · Oracle Cloud" },
    { kind: "meta", label: "database", value: "Postgres · Supabase (Auth, RLS, Edge Functions, Realtime) · Firebase / Firestore · Redis · Multi-tenant RLS" },
    { kind: "meta", label: "ai/ml", value: "Anthropic Claude · OpenAI · Gemini · NVIDIA NIM · xAI · PyTorch · TensorFlow · LLM Fine-tuning · RAG · Agentic Workflows · MCP · LangChain" },
    { kind: "meta", label: "mobile", value: "React Native · Expo · Electron · Xcode / xcodebuild · Gradle · EAS · Turborepo · GitHub Actions · CI/CD" },
    { kind: "meta", label: "security", value: "AES-256-GCM · TLS 1.3 · MFA · RBAC · Penetration Testing · Exploit Chain Analysis · Audit Logging · HIPAA-aware design" },
    { kind: "meta", label: "observ.", value: "Grafana · Sentry · Lighthouse / PageSpeed · CloudWatch · Uptime Monitoring · SSE Log Streaming" },
    { kind: "meta", label: "testing", value: "Jest · Cypress · Playwright · Postman · API contract testing" },
    { kind: "meta", label: "tools", value: "Docker · Wrangler · Figma · Jira · Git/GitHub · Swagger / OpenAPI · Agile / Scrum" },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "experience" },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Lead Developer & Project Manager",
      org: "Lingows Automation",
      date: "2024 — Present",
    },
    { kind: "subhead", content: "AI Engineering & Automation" },
    { kind: "bullet", content: "Deliver a 30% productivity increase across enterprise deployments by architecting AI automation systems in Python, TensorFlow, React, and Node.js, moving from R&D prototype to production within each sprint cycle." },
    { kind: "bullet", content: "Sustain 1,000+ requests/minute at 99.9% uptime on self-hosted Flask + Docker infrastructure, with circuit-breaker patterns and Sentry/Grafana observability across all client deployments." },
    { kind: "bullet", content: "Build LLM fine-tuning pipelines, RAG systems, and multi-agent orchestration layers, integrating validated approaches into client-facing products each release." },
    { kind: "subhead", content: "Engineering Leadership" },
    { kind: "bullet", content: "Lead a 7-engineer agile pod through sprint planning, stand-ups, and retrospectives; maintain a two-week release cadence with zero critical regressions; define architecture standards and mentor engineers on API design, testing, and AI integration." },
    { kind: "bullet", content: "Translate business requirements into technical specifications and delivery roadmaps, bridging stakeholder goals and engineering execution across all active client engagements." },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Co-Founder & Lead AI Developer",
      org: "SpinFlow AI",
      date: "2024 — Present",
    },
    { kind: "subhead", content: "Platform Architecture & AI Systems" },
    { kind: "bullet", content: "Took SpinFlow.ai from zero to Fortune-500 pilot in 12 months, shipping a multi-LLM SaaS on React/Next.js + Node TypeScript + Python microservices across AWS, Firebase, and Oracle Cloud." },
    { kind: "bullet", content: "Built a no-code Agentic Flow Engine unifying five LLMs for enterprise workflow automation, secured with AES-256/TLS 1.3, MFA, RBAC, and full audit trails from day one; passed security review for Fortune-500 onboarding." },
    { kind: "bullet", content: "Deployed Grafana, Sentry, and CloudWatch observability across all microservices; launched White-Glove Onboarding, cutting average client go-live to under 30 days and support volume by 25%." },
    { kind: "subhead", content: "Product & Growth" },
    { kind: "bullet", content: "Shipped native Voice Capture and a Chrome Extension converting speech and browser context into structured knowledge streams; ran investor demos, roadmap planning, and agile ceremonies for a distributed dev-ops pod." },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Competitive Ski Team Coach",
      org: "Winter Park Resort",
      date: "2019 — Present",
    },
    { kind: "bullet", content: "Coach high-school-level racers in advanced technique and race strategy; manage weekly parent communications with structured problem-solving and de-escalation, upholding team values of integrity, excellence, and accountability." },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Geek Squad Advanced Repair Agent",
      org: "Best Buy",
      date: "2022 — 2024",
    },
    { kind: "bullet", content: "Reduced per-case remediation time across the regional micro-market by engineering a Bash automation script for the full macOS malware-removal workflow, adopted company-wide; documented techniques that improved team throughput and reduced escalation rates." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "founded products · lange logic llc" },
    { kind: "blank" },
    {
      kind: "product",
      title: "Olana AI",
      tagline: "Proactive Multi-Model AI Agent Platform",
      url: "langelogic.com/products/olana-ai",
    },
    { kind: "stackRow", content: "React 19 · React Native / Expo · Electron · Node.js · Supabase · Monaco Editor · Playwright · node-pty · Docker · Anthropic · OpenAI · Gemini · xAI · NVIDIA NIM · MCP · Turborepo" },
    { kind: "bullet", content: "Built a proactive multi-model agent platform that routes tasks across Anthropic, OpenAI, Gemini, xAI, and NVIDIA NIM, re-weighting model selection based on outcomes and session context; agents track goals, run scheduled background tasks, and proactively surface context-aware actions based on accumulated memory and user patterns." },
    { kind: "bullet", content: "Deployed across mobile (React Native/Expo), web (React 19), desktop (Electron with Playwright, node-pty, filesystem and OS control, wake-word/STT voice), embeddable webchat, and 13 messaging channels including Slack, Discord, WhatsApp, Telegram, and Teams — all backed by shared Supabase/Postgres with Realtime sync and encrypted credential storage." },
    { kind: "bullet", content: "Shipped an in-agent coding studio with Monaco Editor, GitHub repo integration, sandboxed Docker execution, live dev-server preview, and checkpoint/diff/branch management; paired with an extensible skill/plugin SDK, MCP support, and auto-generated tools from user OAuth apps — enabling the agent to open a repo, run and debug code, and iterate on fixes without leaving the agent interface." },
    { kind: "blank" },
    {
      kind: "product",
      title: "Crawlable AI",
      tagline: "AI SEO & Edge Pre-rendering SaaS",
      url: "crawlableai.com",
    },
    { kind: "stackRow", content: "Cloudflare Workers · Browser Rendering / Puppeteer · KV Cache · Supabase / Postgres · 27 Deno Edge Functions · React 18 · Vite · Google Search Console · Gemini · Stripe · Vercel" },
    { kind: "bullet", content: "Made JavaScript SPAs instantly crawlable for 150+ bots — Googlebot, GPTBot, ClaudeBot, PerplexityBot — by intercepting traffic at the Cloudflare edge, rendering via headless Chromium, and serving static HTML from global KV cache in under 50 ms; zero-code CNAME onboarding." },
    { kind: "bullet", content: "Powered a full AI SEO suite via 27 Deno Edge Functions and a 37-migration multi-tenant Postgres schema: AI metadata generation, JSON-LD AEO injection, Lighthouse cron audits, SERP rank tracking, backlink sync, content-gap detection, AI citation monitoring, and A/B variant learning that auto-promotes winning SEO title/meta combinations." },
    { kind: "blank" },
    {
      kind: "product",
      title: "RedLens",
      tagline: "AI-Powered Red Team & Automated Pentesting",
      url: "redlens.langelogic.com",
    },
    { kind: "stackRow", content: "Python · FastAPI · React 18 · TypeScript · Supabase / Postgres · Playwright · Docker · Anthropic · OpenAI · NVIDIA NIM · MCP · Three.js · GitHub OAuth" },
    { kind: "bullet", content: "Delivered full pentest-grade reports in approximately two minutes via 17 parallel recon modules (headers, TLS, auth, APIs, CORS, cloud misconfigs, cryptography, DNS, SPF/DKIM/DMARC, dependency risks, and more) feeding into a multi-model AI engine that produces exploit chains, CWE classifications, and remediation code." },
    { kind: "bullet", content: "Extended coverage with source-aware scanning of migrations, auth middleware, and commit history for removed secrets via GitHub OAuth; tri-modal auditing correlating live site, linked source repo, and mobile APK/IPA static analysis into one unified report; exploit-chain validation with CWE classification; and native MCP/CLI integrations for scan triggering and fix guidance inside Cursor, Claude Code, ChatGPT, and JetBrains." },
    { kind: "blank" },
    {
      kind: "product",
      title: "Forge",
      tagline: "Self-Hosted Mobile CI/CD Platform",
      url: "langelogic.com",
    },
    { kind: "stackRow", content: "Next.js 14 · Fastify · Node.js · TypeScript · Supabase / Postgres · BullMQ · Redis · Docker · Xcode / xcodebuild · Gradle · Cloudflare Tunnel · Stripe · Commander.js" },
    { kind: "bullet", content: "Replaced Expo's hosted build service with a self-hosted, EAS-compatible mobile CI/CD platform: iOS builds use Xcode with temporary keychains and provisioning profiles, signed and submitted via App Store Connect tooling; Android builds run in Docker-isolated Gradle, producing signed .apk/.aab artifacts submitted via the Google Play Developer API — triggered through a CLI, REST API, or Next.js 14 dashboard with live SSE log streaming." },
    { kind: "bullet", content: "Built a secure multi-tenant backend with Supabase/Postgres/RLS, AES-256-GCM credential encryption, bcrypt API-key hashing, BullMQ/Redis build queuing, Cloudflare Tunnel for private worker exposure, signed webhook delivery, and Stripe subscription enforcement with org/role management." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "education & certifications" },
    { kind: "blank" },
    {
      kind: "h3",
      title: "BS Applied Computing Technology",
      org: "Colorado State University, Fort Collins, CO",
      date: "Dec 2022",
    },
    {
      kind: "h3",
      title: "Google Cybersecurity Professional Certificate",
      org: "Google",
      date: "",
    },
    {
      kind: "h3",
      title: "Google AI Professional Certificate",
      org: "Google",
      date: "",
    },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "success", content: "EOF · resume.md · 2026-04" },
    { kind: "prompt", content: "" },
  ];
}

export default function ResumeTerminal() {
  const lines = useMemo(() => script(), []);
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(lines.length);
      setDone(true);
      return;
    }
    /* Schedule reveal of each line with a slight stagger.
     * The delay varies by kind — structural lines (h1/h2) pause longer,
     * bullets cascade faster. Total runtime ≈ 5s; skip button bypasses. */
    const kindDelay: Record<Line["kind"], number> = {
      prompt: 200,
      comment: 25,
      h1: 180,
      h2: 140,
      h3: 100,
      subhead: 60,
      product: 120,
      stackRow: 40,
      bullet: 25,
      meta: 25,
      blank: 30,
      success: 220,
      sep: 80,
    };

    let elapsed = 180; /* initial wait for page/transition to settle */
    lines.forEach((l, i) => {
      elapsed += kindDelay[l.kind];
      const id = window.setTimeout(() => {
        setVisible((v) => Math.max(v, i + 1));
        if (i === lines.length - 1) setDone(true);
      }, elapsed);
      timers.current.push(id);
    });

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [lines]);

  const skip = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setVisible(lines.length);
    setDone(true);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.breadcrumb}>
          <span className={styles.breadcrumbSlash}>λ</span>
          jstrande@portfolio
          <span className={styles.breadcrumbSlash}>:</span>
          ~/resume
        </span>
        <Reveal>
          <h1 className={styles.title}>
            Experience, <em>shipped.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            Streamed like a terminal session, because that&rsquo;s how I build.
            If you prefer a printable document, grab the PDF.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className={styles.actions}>
            <Button
              href="/resume.pdf"
              variant="solid"
              {...{ target: "_blank", rel: "noopener noreferrer" }}
            >
              Download PDF
            </Button>
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </Reveal>
      </header>

      <div className={styles.terminal}>
        <div className={styles.termBar}>
          <span className={styles.lights} aria-hidden>
            <span className={styles.light} />
            <span className={styles.light} />
            <span className={styles.light} />
          </span>
          <span>resume.md · read-only</span>
          <span className={styles.termPath}>~/strande</span>
        </div>
        <button
          type="button"
          className={`${styles.skip} ${done ? styles.skipHidden : ""}`}
          onClick={skip}
          data-cursor="link"
          aria-label="Skip typing animation"
        >
          Skip ›
        </button>
        <div className={styles.termBody}>
          {lines.map((l, i) => (
            <span
              key={i}
              className={`${styles.line} ${i < visible ? styles.lineVisible : ""}`}
            >
              <LineRender line={l} isLast={done && i === lines.length - 1} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LineRender({ line, isLast }: { line: Line; isLast: boolean }) {
  switch (line.kind) {
    case "prompt":
      return (
        <>
          <span className={styles.prompt}>λ </span>
          <span className={styles.command}>{line.content}</span>
          {isLast && <span className={styles.cursor} />}
          {"\n"}
        </>
      );
    case "comment":
      return (
        <>
          <span className={styles.comment}>{line.content}</span>
          {"\n"}
        </>
      );
    case "h1":
      return (
        <>
          <span className={styles.h1}>{line.content}</span>
          {"\n"}
        </>
      );
    case "h2":
      return (
        <>
          <span className={styles.h2}>{line.content}</span>
          {"\n"}
        </>
      );
    case "h3":
      return (
        <>
          <span className={styles.h3}>{line.title}</span>
          {line.org && (
            <span className={styles.meta}> · {line.org}</span>
          )}
          {line.date && (
            <span className={styles.dateCol}>  {line.date}</span>
          )}
          {"\n"}
        </>
      );
    case "subhead":
      return (
        <>
          <span className={styles.subhead}>{line.content}</span>
          {"\n"}
        </>
      );
    case "product":
      return (
        <>
          <span className={styles.productTitle}>{line.title}</span>
          <span className={styles.productTagline}> — {line.tagline}</span>
          {line.url && (
            <span className={styles.productUrl}>  {line.url}</span>
          )}
          {"\n"}
        </>
      );
    case "stackRow":
      return (
        <>
          <span className={styles.stackRow}>{line.content}</span>
          {"\n"}
        </>
      );
    case "meta":
      return (
        <>
          <span className={styles.metaLabel}>{line.label.padEnd(12, " ")}</span>
          <span className={styles.meta}>{line.value}</span>
          {"\n"}
        </>
      );
    case "bullet":
      return (
        <>
          <span className={styles.bullet}>{line.content}</span>
        </>
      );
    case "blank":
      return <>{"\n"}</>;
    case "sep":
      return (
        <>
          <span className={styles.sep}>
            ─────────────────────────────────────────────
          </span>
          {"\n"}
        </>
      );
    case "success":
      return (
        <>
          <span className={styles.success}>✓ {line.content}</span>
          {"\n"}
        </>
      );
  }
}
