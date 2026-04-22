"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import ForgeScreen from "./ForgeScreen";
import styles from "./ProjectModal.module.css";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = Boolean(project);

  /* Gallery for the active project. Falls back to [image] if no gallery
   * array. Forge has neither gallery nor image — the iPhone screen
   * shows the ForgeScreen repo card instead. */
  const images = useMemo(() => {
    if (!project) return [];
    if (project.gallery?.length) return project.gallery;
    if (project.image) return [project.image];
    return [];
  }, [project]);

  const [index, setIndex] = useState(0);

  /* Reset the active slide every time the project changes. */
  useEffect(() => {
    setIndex(0);
  }, [project?.num]);

  /* Lock body scroll while open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Keyboard — Escape closes, arrows navigate gallery. */
  useEffect(() => {
    if (!open) return;
    const len = images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (len <= 1) return;
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + len) % len);
      } else if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % len);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  const multiple = images.length > 1;
  const isForge = Boolean(project?.repo);

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.dialog} ${open ? styles.dialogOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={project?.title || "Project details"}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={styles.close}
          data-cursor="link"
        >
          ×
        </button>
        {project && (
          <div className={styles.inner}>
            <div className={styles.prose}>
              <p className={styles.num}>
                {project.num} · {project.category} · {project.year}
              </p>
              <h2 className={styles.title}>{project.title}</h2>
              <p className={styles.italicLine}>{project.italic}</p>
              <p className={styles.tagline}>{project.tagline}</p>
              <div className={styles.meta}>
                <div>
                  <span className={styles.metaLabel}>Year</span>
                  <span className={styles.metaValue}>{project.year}</span>
                </div>
                <div>
                  <span className={styles.metaLabel}>Category</span>
                  <span className={styles.metaValue}>{project.category}</span>
                </div>
              </div>
              <div className={styles.stack}>
                {project.stack.map((s) => (
                  <span key={s} className={styles.stackChip}>
                    {s}
                  </span>
                ))}
              </div>
              <Button
                href={project.link}
                variant="solid"
                {...{ target: "_blank", rel: "noopener noreferrer" }}
              >
                {isForge ? "View on GitHub" : "Open Live Site"}
              </Button>
            </div>

            <div className={styles.phoneCol}>
              <div className={styles.phoneStage}>
                <div className={styles.phoneGlow} aria-hidden="true" />
                <div className={styles.phone}>
                  <div className={styles.phoneScreen}>
                    {isForge ? (
                      <ForgeScreen project={project} />
                    ) : (
                      images.map((src, i) => (
                        <div
                          key={src}
                          className={`${styles.screenImg} ${i === index ? styles.screenImgActive : ""}`}
                          aria-hidden={i !== index}
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screenshot ${i + 1}`}
                            fill
                            sizes="(max-width: 900px) 70vw, 340px"
                          />
                        </div>
                      ))
                    )}
                  </div>
                  {/* iPhone hardware overlay */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/iphone-14-pro.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width="1180"
                    height="2264"
                    className={styles.phoneFrame}
                  />
                </div>

                {multiple && !isForge && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous screenshot"
                      onClick={() =>
                        setIndex(
                          (i) => (i - 1 + images.length) % images.length
                        )
                      }
                      className={`${styles.arrow} ${styles.arrowPrev}`}
                      data-cursor="link"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next screenshot"
                      onClick={() =>
                        setIndex((i) => (i + 1) % images.length)
                      }
                      className={`${styles.arrow} ${styles.arrowNext}`}
                      data-cursor="link"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {multiple && !isForge && (
                <div
                  className={styles.dots}
                  role="tablist"
                  aria-label="Screenshots"
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Screenshot ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                      data-cursor="link"
                    />
                  ))}
                  <span className={styles.counter}>
                    {String(index + 1).padStart(2, "0")}
                    <span className={styles.counterSep}>/</span>
                    {String(images.length).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
