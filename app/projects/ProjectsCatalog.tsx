"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  FLAGSHIP_PROJECTS,
  OTHER_WORK,
  type Project,
} from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import ProjectModal from "@/components/sections/ProjectModal";
import styles from "./ProjectsCatalog.module.css";

/* Full projects catalog page.
 *
 *  Signature moves:
 *    1. Filter strip with search + tag chips behaves like an inline palette.
 *    2. Each flagship row, on hover, summons a small preview that follows
 *       the cursor (Vercel/rauno style). Disabled on touch.
 *    3. Modal (reused) for deep case-study view.
 */

type Row = {
  kind: "flagship" | "other";
  key: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  tags: string[];
  image?: string;
  link: string;
  /* Only flagship have a Project object for the modal */
  project?: Project;
};

const ALL_TAGS = [
  "All",
  "AI Agent Platform",
  "AI Red Team",
  "SEO & AI Visibility",
  "Client Work",
  "F500 Pilot",
  "Three.js",
  "Mobile-First",
  "Social Impact",
] as const;

export default function ProjectsCatalog() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");
  const [hovered, setHovered] = useState<Row | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  /* Merge flagship + other into a unified row list for filtering. */
  const rows: Row[] = useMemo(() => {
    const fs: Row[] = FLAGSHIP_PROJECTS.map((p) => ({
      kind: "flagship" as const,
      key: `f-${p.num}`,
      title: p.title,
      subtitle: p.italic,
      category: p.category,
      year: p.year,
      tags: [p.category, ...p.stack],
      image: p.image,
      link: p.link,
      project: p,
    }));
    const other: Row[] = OTHER_WORK.map((p) => ({
      kind: "other" as const,
      key: `o-${p.title}`,
      title: p.title,
      subtitle: p.sub,
      category: p.tag,
      year: p.year,
      tags: [p.tag],
      image: p.image,
      link: p.link,
    }));
    return [...fs, ...other];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tag !== "All" && !r.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        return false;
      }
      if (!q) return true;
      const hay = `${r.title} ${r.subtitle} ${r.category} ${r.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query, tag]);

  const flagshipFiltered = filtered.filter((r) => r.kind === "flagship");
  const otherFiltered = filtered.filter((r) => r.kind === "other");

  /* Cursor preview positioning — write via CSS custom props so we dodge React
   * state thrash on mousemove. */
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX + 24;
      y = e.clientY + 24;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          /* Keep preview on-screen at right/bottom edges. */
          const maxX = window.innerWidth - el.offsetWidth - 16;
          const maxY = window.innerHeight - el.offsetHeight - 16;
          el.style.transform = `translate3d(${Math.min(x, maxX)}px, ${Math.min(y, maxY)}px, 0)`;
        });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const flagshipCount = rows.filter((r) => r.kind === "flagship").length;
  const otherCount = rows.filter((r) => r.kind === "other").length;

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
              Flagship Lange Logic products plus selected client and earlier
              work — spanning AI agent platforms, edge infrastructure,
              automated security, mobile CI/CD, and full-stack builds.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Flagship</span>
            <span className={styles.metricValue}>{flagshipCount} products</span>
            <span className={styles.metricLabel}>Other</span>
            <span className={styles.metricValue}>{otherCount} projects</span>
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

        {flagshipFiltered.length === 0 ? (
          <div className={styles.empty}>No flagship match — clear filters</div>
        ) : (
          <div className={styles.flagshipList}>
            {flagshipFiltered.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => r.project && setSelected(r.project)}
                onPointerEnter={() => setHovered(r)}
                onPointerLeave={() => setHovered((prev) => (prev === r ? null : prev))}
                className={styles.row}
                data-cursor="link"
              >
                <span className={styles.rowNum}>
                  {r.project?.num ?? "—"}
                </span>
                <div>
                  <h3 className={styles.rowTitle}>{r.title}</h3>
                  <span className={styles.rowItalic}>— {r.subtitle}</span>
                  <p className={styles.rowTagline}>
                    {r.project?.tagline}
                  </p>
                  <div className={styles.rowStack}>
                    {r.project?.stack.map((s) => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.rowMeta}>
                  <span className={styles.rowYear}>{r.year}</span>
                  <span className={styles.rowArrow}>↗</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className={styles.other}>
        <div className={styles.sectionHeader}>
          <Reveal>
            <SectionLabel index="—">Other Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.sectionHeaderTitle}>
              Client &amp; early projects.
            </h2>
          </Reveal>
        </div>

        {otherFiltered.length === 0 ? (
          <div className={styles.empty}>No other projects match</div>
        ) : (
          <div className={styles.otherGrid}>
            {otherFiltered.map((r) => (
              <Reveal key={r.key}>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.otherCard}
                  onPointerEnter={() => setHovered(r)}
                  onPointerLeave={() => setHovered((prev) => (prev === r ? null : prev))}
                  data-cursor="image"
                >
                  <div className={styles.otherImage}>
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 680px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className={styles.otherOverlay}>
                    <span className={styles.otherTag}>✦ {r.category}</span>
                    <div>
                      <h3 className={styles.otherTitle}>{r.title}</h3>
                      <p className={styles.otherSub}>{r.subtitle}</p>
                    </div>
                  </div>
                </a>
              </Reveal>
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

      {/* Floating cursor preview */}
      <div
        ref={previewRef}
        className={`${styles.preview} ${hovered?.image ? styles.previewActive : ""}`}
        aria-hidden="true"
      >
        {hovered?.image && (
          <div className={styles.previewImg}>
            <Image
              src={hovered.image}
              alt=""
              fill
              sizes="260px"
            />
          </div>
        )}
        {hovered && (
          <div className={styles.previewLabel}>
            <span>{hovered.title}</span>
            <em>{hovered.year}</em>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
