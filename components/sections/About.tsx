"use client";

import Image from "next/image";
import { BIO, STATS } from "@/lib/content";
import { useInView } from "@/components/motion/useInView";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import TiltCard from "@/components/motion/TiltCard";
import styles from "./About.module.css";

/* Curated stack strip for the About block. Full matrix lives in the
 * Toolkit/Skills section below; this is the "greatest hits" subset —
 * representative of every category in roughly 25 chips. */
const TAGS = [
  // Languages
  "TypeScript", "Python",
  // Frontend + Mobile
  "React 19", "Next.js 14", "React Native", "Expo", "Electron", "Three.js",
  // Backend + APIs
  "Node.js", "Fastify", "FastAPI", "GraphQL",
  // Data + Cloud
  "Postgres", "Supabase", "Cloudflare Workers", "AWS", "Docker",
  // AI & ML
  "Anthropic Claude", "OpenAI", "Gemini", "NVIDIA NIM", "xAI",
  "RAG", "Agentic Workflows", "MCP",
  // Security + Integrations
  "AES-256-GCM", "Stripe",
];

export default function About() {
  /* IO-driven — toggles each time the tag grid enters/leaves the
   * viewport. Staggered fade-in handled via CSS transition-delay on
   * the individual .tag elements (see About.module.css). */
  const { ref: tagsRef, inView: tagsInView } = useInView<HTMLDivElement>({
    amount: 0,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal>
            <SectionLabel index="01">About</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.display}>
              Building <em>at the edge</em> of code, AI, and craft.
            </h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <div className={styles.portraitHolder}>
            <div className={styles.portraitGlow} />
            <TiltCard max={8}>
              <div className={styles.frame}>
                <div className={styles.portraitImg}>
                  <Image
                    src="/Images/headShot.png"
                    alt="Jordan Strande"
                    fill
                    sizes="(max-width: 768px) 80vw, 380px"
                  />
                </div>
              </div>
            </TiltCard>
            <div className={styles.frameMeta}>
              <span>JS · 2026</span>
              <span>Denver, CO</span>
            </div>
          </div>

          <div className={styles.prose}>
            {BIO.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className={styles.bio}>{p}</p>
              </Reveal>
            ))}

            <div>
              <Reveal>
                <p className={styles.tagsTitle}>Stack</p>
              </Reveal>
              <div
                ref={tagsRef}
                className={`${styles.tags} ${tagsInView ? styles.tagsVisible : ""}`}
              >
                {TAGS.map((t, i) => (
                  <span
                    key={t}
                    className={styles.tag}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsBar}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>
                <em>
                  <CountUp to={s.value} suffix={s.suffix} />
                </em>
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
