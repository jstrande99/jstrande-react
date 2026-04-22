import type { Project } from "@/lib/content";
import styles from "./ForgeScreen.module.css";

/* Forge phone-screen — renders inside an iPhone bezel. Dark gradient
 * background, structured repo dossier tuned to the narrow portrait
 * canvas. Used by the Work section (homepage sticky-phone reel) and
 * the ProjectModal. */
export default function ForgeScreen({ project }: { project: Project }) {
  const repo = project.repo!;
  return (
    <div className={styles.forgeScreen}>
      <div className={styles.forgeTop}>
        <span className={styles.forgeOwner}>
          {repo.owner}
          <span className={styles.forgeOwnerSlash}>/</span>
          <span className={styles.forgeOwnerName}>{repo.name}</span>
        </span>
        <span className={styles.forgeLicense}>{repo.license}</span>
      </div>

      <h4 className={styles.forgeTitle}>{project.title}</h4>
      <p className={styles.forgeTagline}>{project.italic}</p>

      <span className={styles.forgeLang}>
        <span className={styles.forgeLangDot} aria-hidden />
        {repo.language}
        <span className={styles.forgeLangPct}>{repo.languagePct}</span>
      </span>

      <div className={styles.forgeStatsGrid}>
        {(project.stats ?? []).slice(0, 4).map((s) => (
          <div key={s.label} className={styles.forgeStat}>
            <span className={styles.forgeStatValue}>{s.value}</span>
            <span className={styles.forgeStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <ul className={styles.forgeFeatures}>
        {repo.features.slice(0, 5).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <div className={styles.forgeFooter}>
        <span className={styles.forgeRelease}>{repo.release}</span>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.forgeCta}
        >
          <GhIcon /> repo
        </a>
      </div>
    </div>
  );
}

function GhIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.17c-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.81 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
