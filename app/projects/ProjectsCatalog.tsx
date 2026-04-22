"use client";

import { useMemo, useState } from "react";
import { FLAGSHIP_PROJECTS, type Project } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { Button } from "@/components/ui/Button";
import ProjectModal from "@/components/sections/ProjectModal";
import styles from "./ProjectsCatalog.module.css";

/* Projects catalog page — flagship-only (OTHER_WORK removed).
 *
 *  Signature moves:
 *    1. Filter strip with search + tag chips; substring match so
 *       "Mobile CI/CD" still matches the Forge category.
 *    2. Each flagship row is an IO-driven cinematic reveal — gold rail
 *       draws down the left, number pops, title slides in, tagline
 *       fades, stack chips stagger, arrow settles. Reverses when the
 *       row leaves the viewport.
 *    3. Modal opens an iframe of the live site (GitHub-based projects
 *       fall back to the screenshot). */

type Row = {
  key: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  tags: string[];
  image?: string;
  link: string;
  project: Project;
};

const ALL_TAGS = [
  "All",
  "AI Agent Platform",
  "SEO & AI Visibility",
  "AI Red Team",
  "Mobile CI/CD",
] as const;

export default function ProjectsCatalog() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");

  const rows: Row[] = useMemo(
    () =>
      FLAGSHIP_PROJECTS.map((p) => ({
        key: `f-${p.num}`,
        title: p.title,
        subtitle: p.italic,
        category: p.category,
        year: p.year,
        tags: [p.category, ...p.stack],
        image: p.image,
        link: p.link,
        project: p,
      })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tl = tag.toLowerCase();
    return rows.filter((r) => {
      if (tag !== "All") {
        const matches = r.tags.some((t) => {
          const x = t.toLowerCase();
          return x === tl || x.includes(tl) || tl.includes(x);
        });
        if (!matches) return false;
      }
      if (!q) return true;
      const hay = `${r.title} ${r.subtitle} ${r.category} ${r.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query, tag]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <Reveal>
            <SectionLabel index="02">Selected Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>
              Products <em>shipped.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroMeta}>
              Flagship Lange Logic products — spanning AI agent platforms,
              edge infrastructure, automated security, and mobile CI/CD.
              Each one runs in production; each one has paying or active
              users.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Flagship</span>
            <span className={styles.metricValue}>{rows.length} products</span>
            <span className={styles.metricLabel}>Years active</span>
            <span className={styles.metricValue}>2022 → present</span>
            <span className={styles.metricLabel}>Current</span>
            <span className={styles.metricValue}>Lange Logic · shipping</span>
          </div>
        </Reveal>
      </div>

      <div className={styles.filters}>
        <label className={styles.searchWrap}>
          <span className={styles.searchPrompt}>λ</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter · title, stack, tag…"
            className={styles.searchInput}
            aria-label="Filter projects"
          />
        </label>
        <div className={styles.tagRow}>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tag} ${tag === t ? styles.tagActive : ""}`}
              onClick={() => setTag(t)}
              data-cursor="link"
            >
              {t}
            </button>
          ))}
        </div>
        <span className={styles.countBadge}>
          <strong>{filtered.length}</strong>/ {rows.length}
        </span>
      </div>

      <section className={styles.flagship}>
        <div className={styles.sectionHeader}>
          <Reveal>
            <SectionLabel index="—">Lange Logic · Flagship</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.sectionHeaderTitle}>Built in-house.</h2>
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>No projects match — clear filters</div>
        ) : (
          <div className={styles.flagshipList}>
            {filtered.map((r) => (
              <FlagshipRow
                key={r.key}
                row={r}
                onOpen={() => setSelected(r.project)}
              />
            ))}
          </div>
        )}
      </section>

      <div className={styles.outro}>
        <Reveal>
          <h2 className={styles.outroTitle}>
            Have a project worth <em>building</em>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/contact" variant="solid">
            Start a Conversation
          </Button>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FlagshipRow — owns its own IO so inner elements animate in a
 * staggered sequence (gold rail draw, number pop, title slide, chip
 * cascade, arrow settle) and reverse on scroll-up. */

function FlagshipRow({
  row,
  onOpen,
}: {
  row: Row;
  onOpen: () => void;
}) {
  const { ref, inView } = useInView<HTMLButtonElement>({
    amount: 0,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className={styles.row}
      data-inview={inView ? "true" : "false"}
      data-cursor="link"
    >
      <span className={styles.rowRail} aria-hidden="true" />
      <span className={styles.rowNum} style={{ "--i": 1 } as React.CSSProperties}>
        {row.project.num}
      </span>
      <div className={styles.rowBody}>
        <h3 className={styles.rowTitle} style={{ "--i": 2 } as React.CSSProperties}>
          {row.title}
        </h3>
        <span
          className={styles.rowItalic}
          style={{ "--i": 3 } as React.CSSProperties}
        >
          — {row.subtitle}
        </span>
        <p
          className={styles.rowTagline}
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {row.project.tagline}
        </p>
        <div className={styles.rowStack}>
          {row.project.stack.map((s, j) => (
            <span
              key={s}
              className={styles.chip}
              style={{ "--i": 5 + j * 0.4 } as React.CSSProperties}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div
        className={styles.rowMeta}
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <span className={styles.rowYear}>{row.year}</span>
        <span className={styles.rowArrow}>↗</span>
      </div>
    </button>
  );
}
