"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

/* Contact
 *  Left:  display title + info block + social icons
 *  Right: card with floating-label form and morphing submit button
 *         (pill → check on success). The card carries a mouse-tracked
 *         radial glare driven via CSS custom properties. */
export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = formRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${Math.max(0, Math.min(100, px))}%`);
    el.style.setProperty("--my", `${Math.max(0, Math.min(100, py))}%`);
  };

  const onLeave = () => {
    const el = formRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "30%");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio inquiry — ${form.name || "Untitled"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    /* Reset the morph after a beat so the user can send another. */
    setTimeout(() => setSent(false), 2800);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Reveal>
            <SectionLabel index="04">Get in Touch</SectionLabel>
          </Reveal>
          <h2 className={styles.display}>
            <Reveal delay={0.05}>Let&rsquo;s</Reveal>
            <Reveal delay={0.15}>
              <em>build</em>
            </Reveal>
            <Reveal delay={0.25}>something.</Reveal>
          </h2>

          <Reveal delay={0.2}>
            <p className={styles.leadCopy}>
              Whether it&rsquo;s an LLM-powered product, an edge-SEO rollout, a
              pentest stack, or a mobile CI/CD migration — I&rsquo;m open to
              conversations about ambitious work. Expect a response within one
              business day.
            </p>
          </Reveal>

          <div className={styles.infoBlock}>
            <Reveal>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>
                  <a href={`mailto:${SITE.email}`} data-cursor="link">
                    {SITE.email}
                  </a>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>
                  <a href={`tel:+17203312995`} data-cursor="link">
                    {SITE.phone}
                  </a>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Based</span>
                <span className={styles.infoValue}>
                  Denver, CO · Remote-friendly
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Elsewhere</span>
                <span className={styles.infoValue}>
                  <div className={styles.socials}>
                    <a
                      href={SITE.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className={styles.social}
                      data-cursor="link"
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href={SITE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className={styles.social}
                      data-cursor="link"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      href={SITE.socials.langelogic}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lange Logic"
                      className={styles.social}
                      data-cursor="link"
                    >
                      <GlobeIcon />
                    </a>
                  </div>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div
          ref={formRef}
          className={styles.formWrap}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div className={styles.formGlow} aria-hidden />
          <div className={styles.formContent}>
            <h3 className={styles.formTitle}>Send a note.</h3>
            <p className={styles.formSub}>Opens your mail client · ~1 min</p>
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                  className={styles.input}
                />
                <label htmlFor="c-name" className={styles.label}>
                  Your name
                </label>
              </div>
              <div className={styles.field}>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className={styles.input}
                />
                <label htmlFor="c-email" className={styles.label}>
                  Email address
                </label>
              </div>
              <div className={styles.field}>
                <textarea
                  id="c-message"
                  name="message"
                  placeholder=" "
                  value={form.message}
                  onChange={onChange}
                  required
                  className={styles.textarea}
                />
                <label htmlFor="c-message" className={styles.label}>
                  Tell me about the project
                </label>
              </div>

              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={`${styles.submit} ${sent ? styles.submitSuccess : ""}`}
                  data-cursor="link"
                  aria-live="polite"
                >
                  <span className={styles.submitLabel}>
                    Send Message <span aria-hidden>→</span>
                  </span>
                  <svg
                    className={styles.checkSvg}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.17c-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.81 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z" />
    </svg>
  );
}
