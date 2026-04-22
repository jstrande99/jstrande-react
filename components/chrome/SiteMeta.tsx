import { SITE } from "@/lib/content";
import styles from "./SiteMeta.module.css";

/* Corner metadata rail. Fixed to the bottom-right; tiny, monospace,
 * subtle. Never intrudes on content. Pure server component now that the
 * route label is gone. */
export default function SiteMeta() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={`${styles.corner} ${styles.bottomRight}`}>
        {SITE.location.toUpperCase()} · 39.74° N
      </span>
    </div>
  );
}
