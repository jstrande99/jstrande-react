"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FLAGSHIP_PROJECTS, type Project } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { Button } from "@/components/ui/Button";
import styles from "./ProjectsCatalog.module.css";

/* Lazy-load the modal chunk — only paid for if the user opens a
 * project. Preloaded on row hover and during browser idle so the first
 * open doesn't visibly fetch. */
const loadModalModule = () => import("@/components/sections/ProjectModal");
const ProjectModal = dynamic(loadModalModule, {
  ssr: false,
  loading: () => null,
});

type Row = {
  key: string;
  title: string;
  subtitle: string;
  year: string;
  project: Project;
};

export default function ProjectsCatalog() {
  const [selected, setSelected] = useState<Project | null>(null);
  /* Keeps the modal mounted after the first open so its close
   * transition plays out instead of snapping when selected goes null. */
  const [everOpened, setEverOpened] = useState(false);

  const rows: Row[] = useMemo(
    () =>
      FLAGSHIP_PROJECTS.map((p) => ({
        key: `f-${p.num}`,
        title: p.title,
        subtitle: p.italic,
        year: p.year,
        project: p,
      })),
    []
  );

  /* Preload the modal chunk exactly once. Called on row hover and
   * after idle so the first open feels instant across input modes. */
  const preloaded = useRef(false);
  const preloadModal = useCallback(() => {
    if (preloaded.current) return;
    preloaded.current = true;
    loadModalModule();
  }, []);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(preloadModal, { timeout: 3000 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(preloadModal, 3000);
    return () => window.clearTimeout(t);
  }, [preloadModal]);

  const openModal = useCallback((p: Project) => {
    setEverOpened(true);
    setSelected(p);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
  }, []);

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

      <section className={styles.flagship}>
        <div className={styles.sectionHeader}>
          <Reveal>
            <SectionLabel index="—">Lange Logic · Flagship</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.sectionHeaderTitle}>Built in-house.</h2>
          </Reveal>
        </div>

        <div className={styles.flagshipList}>
          {rows.map((r) => (
            <FlagshipRow
              key={r.key}
              row={r}
              onOpen={() => openModal(r.project)}
              onPreload={preloadModal}
            />
          ))}
        </div>
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

      {everOpened && (
        <ProjectModal project={selected} onClose={closeModal} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function FlagshipRow({
  row,
  onOpen,
  onPreload,
}: {
  row: Row;
  onOpen: () => void;
  onPreload: () => void;
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
      onPointerEnter={onPreload}
      onFocus={onPreload}
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
