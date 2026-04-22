"use client";

import { SKILL_GROUPS } from "@/lib/content";
import { useInView } from "@/components/motion/useInView";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import styles from "./Skills.module.css";

/* The Toolkit section's item pop-in is driven entirely by CSS via a
 * parent .itemsVisible class toggled by an IntersectionObserver. Each
 * item's transition-delay is index-based (via --i inline) for the
 * stagger. Reversible on scroll-up by design. */
export default function Skills() {
  const { ref: rootRef, inView } = useInView<HTMLDivElement>({
    amount: 0,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <section id="skills" className={styles.section}>
      <div
        ref={rootRef}
        className={`${styles.inner} ${inView ? styles.itemsVisible : ""}`}
      >
        <div className={styles.header}>
          <Reveal>
            <SectionLabel index="03">Toolkit</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.title}>
              The <em>stack</em> behind the work.
            </h2>
          </Reveal>
        </div>

        <div className={styles.groups}>
          {SKILL_GROUPS.map((g, gi) => {
            /* Compute a running index so stagger cascades across groups. */
            const before = SKILL_GROUPS.slice(0, gi).reduce(
              (sum, gg) => sum + gg.items.length,
              0
            );
            return (
              <Reveal
                key={g.title}
                delay={gi * 0.05}
                className={styles.groupWrap}
              >
                <div className={styles.group}>
                  <h3 className={styles.groupTitle}>{g.title}</h3>
                  <ul className={styles.items}>
                    {g.items.map((s, i) => (
                      <li
                        key={s}
                        className={styles.item}
                        style={{ "--i": before + i } as React.CSSProperties}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
