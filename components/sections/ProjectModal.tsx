"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Project } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import styles from "./ProjectModal.module.css";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = Boolean(project);

  /* Lock body scroll while open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape key closes. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
            <div>
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
                Live Site
              </Button>
            </div>
            <div className={styles.mediaWrap}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100%",
                  }}
                >
                  <span className={styles.plate}>{project.stat}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
