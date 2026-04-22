"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import Contact from "@/components/sections/Contact";
import styles from "./ContactTerminal.module.css";

type Mode = "terminal" | "form";
type Step = "name" | "email" | "message" | "sending" | "sent";

/* Contact page with two interaction modes:
 *   1. Terminal composer — engineer-flavored. Prompts sequence through
 *      name / email / message; Enter advances, ⌘+Enter sends. Opens
 *      mailto: with body composed from the three inputs.
 *   2. Classic form — reuses the existing <Contact /> section component. */
export default function ContactTerminalPage() {
  const [mode, setMode] = useState<Mode>("terminal");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.breadcrumb}>
            <span className={styles.breadcrumbSlash}>λ</span>
            jstrande@portfolio
            <span className={styles.breadcrumbSlash}>:</span>
            ~/contact
          </span>
          <Reveal>
            <div style={{ marginBottom: "1rem" }}>
              <SectionLabel index="04">Get in Touch</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>
              Let&rsquo;s <em>build</em> something.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.lead}>
              LLM-powered products, edge SEO, pentest stacks, mobile CI/CD —
              all open for conversation. Response within one business day.
              Two ways to say hi below.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Email</span>
            <span className={styles.metricValue}>
              <a href={`mailto:${SITE.email}`} data-cursor="link">
                {SITE.email}
              </a>
            </span>
            <span className={styles.metricLabel}>Phone</span>
            <span className={styles.metricValue}>
              <a href="tel:+17203312995" data-cursor="link">
                {SITE.phone}
              </a>
            </span>
            <span className={styles.metricLabel}>Based</span>
            <span className={styles.metricValue}>Denver, CO · Remote-friendly</span>
            <span className={styles.metricLabel}>Response</span>
            <span className={styles.metricValue}>≤ 1 business day</span>
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.1}>
        <div className={styles.modeSwitch} role="tablist" aria-label="Contact mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "terminal"}
            className={`${styles.modeButton} ${mode === "terminal" ? styles.modeActive : ""}`}
            onClick={() => setMode("terminal")}
            data-cursor="link"
          >
            λ terminal
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "form"}
            className={`${styles.modeButton} ${mode === "form" ? styles.modeActive : ""}`}
            onClick={() => setMode("form")}
            data-cursor="link"
          >
            classic form
          </button>
        </div>
      </Reveal>

      {mode === "terminal" ? (
        <TerminalComposer />
      ) : (
        /* Reuse existing Contact section; inject a light wrapper for spacing. */
        <div style={{ marginTop: "-1rem" }}>
          <Contact />
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------- */

function TerminalComposer() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  /* Auto-focus the active input and auto-scroll to keep caret visible. */
  useEffect(() => {
    inputRef.current?.focus();
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [step]);

  const dispatch = () => {
    if (!name.trim() || !isValidEmail(email) || !message.trim()) return;
    setStep("sending");
    /* Give the eye a beat before firing the mailto. */
    window.setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
      const body = encodeURIComponent(
        `${message}\n\n—\n${name}\n${email}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStep("sent");
    }, 800);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStep("name");
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.termBar}>
        <span className={styles.lights} aria-hidden>
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.light} />
        </span>
        <span>compose.sh</span>
        <span className={styles.termPath}>~/strande/inbox</span>
      </div>

      <div ref={bodyRef} className={styles.termBody}>
        <span className={styles.line}>
          <span className={styles.prompt}>λ </span>
          <span className={styles.input}>./compose.sh --to &quot;{SITE.email}&quot;</span>
        </span>
        <span className={styles.line}>
          <span className={styles.comment}>// Enter advances. ⌘+Enter sends from the message step.</span>
        </span>
        <span className={styles.line}> </span>

        {/* Name */}
        <span className={styles.line}>
          <span className={styles.label}>[1/3] </span>
          <span className={styles.key}>name</span>
          <span className={styles.muted}> · who are you?</span>
        </span>
        <span className={styles.line}>
          <span className={styles.inputRow}>
            <span className={styles.prompt}>&gt;</span>
            {step === "name" ? (
              <input
                ref={(n) => {
                  if (step === "name") inputRef.current = n;
                }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    e.preventDefault();
                    setStep("email");
                  }
                }}
                placeholder="Jordan Strande"
                className={styles.inputField}
                spellCheck={false}
                autoCapitalize="words"
                autoComplete="name"
              />
            ) : (
              <span className={styles.input}>{name || "—"}</span>
            )}
            {step === "name" && <span className={styles.hint}>↵ next</span>}
          </span>
        </span>

        {/* Email */}
        {(step === "email" || step === "message" || step === "sending" || step === "sent") && (
          <>
            <span className={styles.line}> </span>
            <span className={styles.line}>
              <span className={styles.label}>[2/3] </span>
              <span className={styles.key}>email</span>
              <span className={styles.muted}> · where do I reply?</span>
            </span>
            <span className={styles.line}>
              <span className={styles.inputRow}>
                <span className={styles.prompt}>&gt;</span>
                {step === "email" ? (
                  <input
                    ref={(n) => {
                      if (step === "email") inputRef.current = n;
                    }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isValidEmail(email)) {
                        e.preventDefault();
                        setStep("message");
                      }
                    }}
                    placeholder="you@company.com"
                    className={styles.inputField}
                    spellCheck={false}
                    autoComplete="email"
                  />
                ) : (
                  <span className={styles.input}>{email || "—"}</span>
                )}
                {step === "email" && (
                  <span className={styles.hint}>
                    {isValidEmail(email) ? "↵ next" : "enter email"}
                  </span>
                )}
              </span>
            </span>
          </>
        )}

        {/* Message */}
        {(step === "message" || step === "sending" || step === "sent") && (
          <>
            <span className={styles.line}> </span>
            <span className={styles.line}>
              <span className={styles.label}>[3/3] </span>
              <span className={styles.key}>message</span>
              <span className={styles.muted}> · what are we building?</span>
            </span>
            <span className={styles.line}>
              <span className={styles.inputRow}>
                <span className={styles.prompt}>&gt;</span>
                {step === "message" ? (
                  <textarea
                    ref={(n) => {
                      if (step === "message") inputRef.current = n;
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        dispatch();
                      }
                    }}
                    placeholder="Describe the problem + any constraints…"
                    className={styles.textArea}
                    rows={4}
                  />
                ) : (
                  <span className={styles.input}>{message || "—"}</span>
                )}
              </span>
            </span>
          </>
        )}

        {/* Sending / Sent */}
        {step === "sending" && (
          <>
            <span className={styles.line}> </span>
            <span className={styles.line}>
              <span className={styles.muted}>→ composing mime envelope…</span>
            </span>
            <span className={styles.line}>
              <span className={styles.muted}>→ opening mail client on your device…</span>
            </span>
          </>
        )}

        {step === "sent" && (
          <>
            <span className={styles.line}> </span>
            <span className={styles.line}>
              <span className={styles.success}>✓ dispatched to {SITE.email}</span>
            </span>
            <span className={styles.line}>
              <span className={styles.muted}>
                If nothing opened, copy {SITE.email} and reach me directly.
              </span>
            </span>
          </>
        )}
      </div>

      <div className={styles.termFooter}>
        <span>
          {step === "sent" ? (
            <>
              sent · <strong>⌘R</strong> or click <strong>new</strong> to compose another
            </>
          ) : (
            <>
              <strong>↑↓</strong> edit · <strong>↵</strong> next · <strong>⌘↵</strong> send
            </>
          )}
        </span>
        {step === "sent" ? (
          <button
            type="button"
            className={styles.sendButton}
            onClick={reset}
            data-cursor="link"
          >
            new message ↺
          </button>
        ) : (
          <button
            type="button"
            className={styles.sendButton}
            onClick={dispatch}
            disabled={
              step === "sending" ||
              !name.trim() ||
              !isValidEmail(email) ||
              !message.trim()
            }
            data-cursor="link"
          >
            {step === "sending" ? "sending…" : "send ↵"}
          </button>
        )}
      </div>
    </div>
  );
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
