"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
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
  | { kind: "bullet"; content: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "blank" }
  | { kind: "success"; content: string }
  | { kind: "sep" };

function script(): Line[] {
  return [
    { kind: "prompt", content: "cat ~/strande/resume.md" },
    { kind: "blank" },
    { kind: "h1", content: "# JORDAN STRANDE" },
    { kind: "meta", label: "role", value: "Full-Stack & AI Engineer" },
    { kind: "meta", label: "based", value: `${SITE.location} · Remote-friendly` },
    { kind: "meta", label: "email", value: SITE.email },
    { kind: "meta", label: "phone", value: SITE.phone },
    { kind: "meta", label: "github", value: "@jstrande99" },
    { kind: "blank" },
    { kind: "comment", content: "// Three years post-grad, ten years shipping code." },
    { kind: "comment", content: "// LLM-powered products, edge infra, mobile CI/CD. Bias for production cadence." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "experience" },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Co-founder & Engineering Lead",
      org: "Lange Logic LLC",
      date: "2024 — Present",
    },
    { kind: "bullet", content: "Architect and ship revenue-generating SaaS spanning AI agents, automated security, mobile CI/CD, and edge-rendered SEO infrastructure." },
    { kind: "bullet", content: "Lead multi-model LLM routing (Anthropic · OpenAI · Gemini · xAI · NVIDIA NIM) with MCP tool integration and in-agent coding studio." },
    { kind: "bullet", content: "Shipped 4 flagship products across web, mobile, Electron desktop, embed widgets, and 13 messaging channels." },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Full-Stack Engineer",
      org: "SpinFlow AI",
      date: "2023 — 2024",
    },
    { kind: "bullet", content: "Designed and shipped multi-LLM SaaS for enterprise workflow automation; delivered Fortune-500 pilot." },
    { kind: "bullet", content: "Productionized RAG pipelines, background job orchestration, and role-based access for large-org tenants." },
    { kind: "blank" },
    {
      kind: "h3",
      title: "Freelance & Contract",
      org: "Independent",
      date: "2022 — 2024",
    },
    { kind: "bullet", content: "Shipped full-stack client builds across restaurant/hospitality, 3D e-commerce, mobile pet-health tracking, and social-impact platforms." },
    { kind: "bullet", content: "Three.js-led interactive commerce showcase; QR-based pet identity system; family-services discovery platform." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "highlights" },
    { kind: "blank" },
    { kind: "bullet", content: "17-module parallel recon engine producing pentest-grade reports in ~2 minutes." },
    { kind: "bullet", content: "27 Deno edge functions + 37-migration Postgres schema powering an AI SEO SaaS." },
    { kind: "bullet", content: "Multi-tenant mobile CI/CD with AES-256-GCM credential encryption and BullMQ queuing." },
    { kind: "bullet", content: "Prototype → customer-facing within a single sprint. Consistent production cadence." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "education" },
    { kind: "blank" },
    {
      kind: "h3",
      title: "BS, Computer Science",
      org: "University of Colorado, Boulder",
      date: "2020 — 2023",
    },
    { kind: "bullet", content: "Focus: distributed systems, ML systems design, HCI." },
    { kind: "bullet", content: "Former US Ski Team competitor balancing training schedule with accelerated CS coursework." },
    { kind: "blank" },
    { kind: "sep" },
    { kind: "h2", content: "stack" },
    { kind: "blank" },
    { kind: "meta", label: "lang", value: "TypeScript · Python · SQL · Go · Swift · Kotlin" },
    { kind: "meta", label: "web", value: "React 19 · Next.js · React Native · Expo · Electron · Three.js" },
    { kind: "meta", label: "infra", value: "Node · FastAPI · Postgres · Supabase · Redis · Docker · Cloudflare · Deno" },
    { kind: "meta", label: "ai", value: "Anthropic · OpenAI · Gemini · RAG · Agentic · MCP · Embeddings" },
    { kind: "meta", label: "tooling", value: "Playwright · BullMQ · Turborepo · AES-256-GCM · GSAP" },
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
     * bullets cascade faster. Total runtime ≈ 6–8s. */
    const kindDelay: Record<Line["kind"], number> = {
      prompt: 320,
      comment: 65,
      h1: 260,
      h2: 220,
      h3: 180,
      bullet: 90,
      meta: 70,
      blank: 55,
      success: 360,
      sep: 140,
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
          <span className={styles.h3}>{line.title}</span>{" "}
          <span className={styles.meta}>· {line.org}</span>
          <span className={styles.dateCol}>  {line.date}</span>
          {"\n"}
        </>
      );
    case "meta":
      return (
        <>
          <span className={styles.metaLabel}>{line.label.padEnd(8, " ")}</span>
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
