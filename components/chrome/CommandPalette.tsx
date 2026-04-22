"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FLAGSHIP_PROJECTS, OTHER_WORK, SITE } from "@/lib/content";
import styles from "./CommandPalette.module.css";

/* Global command palette. ⌘K / Ctrl+K toggles it.
 * Actions:
 *   - Navigate to sections (hash links on home, route pushes elsewhere)
 *   - Open a flagship project or other work (external link)
 *   - Copy email to clipboard
 *   - Jump to socials
 *   - Easter eggs (toggle cursor, konami, etc.)
 * Engineer-focused UX: mono typography, caps labels, shell-prompt style. */
/* Returns the OS modifier key used in ⌘/Ctrl keyboard shortcuts. SSR
 * defaults to ⌘; hydration re-detects. */
function useModKey(): string {
  const [mod, setMod] = useState("⌘");
  useEffect(() => {
    const ua =
      (navigator as Navigator & { platform?: string }).platform ||
      navigator.userAgent ||
      "";
    const isMac = /Mac|iPhone|iPod|iPad/i.test(ua);
    if (!isMac) setMod("Ctrl");
  }, []);
  return mod;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const mod = useModKey();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  const run = useCallback(
    (fn: () => void) => {
      fn();
      setOpen(false);
    },
    []
  );

  const go = useCallback(
    (href: string) => run(() => router.push(href)),
    [run, router]
  );

  const scrollTo = useCallback(
    (id: string) =>
      run(() => {
        if (window.location.pathname !== "/") {
          router.push(`/#${id}`);
          return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }),
    [run, router]
  );

  const external = useCallback(
    (url: string) =>
      run(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }),
    [run]
  );

  const copy = useCallback(
    (text: string) =>
      run(() => {
        navigator.clipboard?.writeText(text);
      }),
    [run]
  );

  const toggleCursor = useCallback(
    () =>
      run(() => {
        document.documentElement.classList.toggle("has-custom-cursor");
      }),
    [run]
  );

  return (
    <>
      <button
        type="button"
        className={styles.triggerChip}
        onClick={() => setOpen(true)}
        aria-label={`Open command palette (${mod}+K)`}
        data-cursor="link"
      >
        <strong>{mod} K</strong>
      </button>

      <div
        className={`${styles.root} ${open ? styles.rootOpen : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <Command
          label="Command Menu"
          className={styles.dialog}
          shouldFilter
        >
          <div className={styles.inputWrap}>
            <span className={styles.prompt}>λ</span>
            <Command.Input
              placeholder="Type a command or search…"
              className={styles.input}
              value={value}
              onValueChange={setValue}
              autoFocus
            />
            <span className={styles.kbdHint}>ESC</span>
          </div>

          <Command.List className={styles.list}>
            <Command.Empty className={styles.empty}>
              No match — try a project name
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className={styles.group}
              /* cmdk renders the heading into a child element automatically;
               * we style it with a custom class via the data attribute. */
            >
              <Command.Item
                className={styles.item}
                onSelect={() => scrollTo("home")}
                value="home hero top"
              >
                <span className={styles.itemIcon}>⌂</span>
                <span className={styles.itemText}>Go to Hero</span>
                <span className={styles.itemSub}>01 · Home</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => scrollTo("about")}
                value="about bio intro story"
              >
                <span className={styles.itemIcon}>✦</span>
                <span className={styles.itemText}>About</span>
                <span className={styles.itemSub}>02 · Section</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => scrollTo("work")}
                value="work projects portfolio"
              >
                <span className={styles.itemIcon}>◆</span>
                <span className={styles.itemText}>Selected Work</span>
                <span className={styles.itemSub}>03 · Section</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => scrollTo("skills")}
                value="skills stack toolkit tools"
              >
                <span className={styles.itemIcon}>◇</span>
                <span className={styles.itemText}>Toolkit</span>
                <span className={styles.itemSub}>04 · Section</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => scrollTo("contact")}
                value="contact email message reach"
              >
                <span className={styles.itemIcon}>✉</span>
                <span className={styles.itemText}>Get in Touch</span>
                <span className={styles.itemSub}>05 · Section</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => go("/projects")}
                value="projects catalog full"
              >
                <span className={styles.itemIcon}>▤</span>
                <span className={styles.itemText}>Full Project Catalog</span>
                <span className={styles.itemSub}>Page · /projects</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => go("/resume")}
                value="resume cv experience"
              >
                <span className={styles.itemIcon}>☰</span>
                <span className={styles.itemText}>Resume</span>
                <span className={styles.itemSub}>Page · /resume</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => go("/contact")}
                value="contact page"
              >
                <span className={styles.itemIcon}>→</span>
                <span className={styles.itemText}>Contact Page</span>
                <span className={styles.itemSub}>Page · /contact</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className={styles.group}>
              {FLAGSHIP_PROJECTS.map((p) => (
                <Command.Item
                  key={p.num}
                  className={styles.item}
                  onSelect={() => external(p.link)}
                  value={`${p.title} ${p.italic} ${p.stack.join(" ")}`}
                >
                  <span className={styles.itemIcon}>◆</span>
                  <span className={styles.itemText}>{p.title}</span>
                  <span className={styles.itemSub}>
                    {p.category} · {p.year}
                  </span>
                </Command.Item>
              ))}
              {OTHER_WORK.map((p) => (
                <Command.Item
                  key={p.title}
                  className={styles.item}
                  onSelect={() => external(p.link)}
                  value={`${p.title} ${p.sub} ${p.tag}`}
                >
                  <span className={styles.itemIcon}>◇</span>
                  <span className={styles.itemText}>{p.title}</span>
                  <span className={styles.itemSub}>
                    {p.tag} · {p.year}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className={styles.group}>
              <Command.Item
                className={styles.item}
                onSelect={() => copy(SITE.email)}
                value="copy email clipboard"
              >
                <span className={styles.itemIcon}>⎘</span>
                <span className={styles.itemText}>Copy email to clipboard</span>
                <span className={styles.itemSub}>{SITE.email}</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() =>
                  run(() => {
                    window.location.href = `mailto:${SITE.email}`;
                  })
                }
                value="send email mailto"
              >
                <span className={styles.itemIcon}>✎</span>
                <span className={styles.itemText}>Send me an email</span>
                <span className={styles.itemSub}>mailto://</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={toggleCursor}
                value="toggle custom cursor"
              >
                <span className={styles.itemIcon}>⊕</span>
                <span className={styles.itemText}>Toggle custom cursor</span>
                <span className={styles.itemSub}>Easter egg</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() =>
                  external(`${SITE.socials.github.replace(/\/$/, "")}`)
                }
                value="view source github repo"
              >
                <span className={styles.itemIcon}>{"{ }"}</span>
                <span className={styles.itemText}>View source on GitHub</span>
                <span className={styles.itemSub}>↗ External</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Elsewhere" className={styles.group}>
              <Command.Item
                className={styles.item}
                onSelect={() => external(SITE.socials.github)}
                value="github profile"
              >
                <span className={styles.itemIcon}>⎈</span>
                <span className={styles.itemText}>GitHub</span>
                <span className={styles.itemSub}>@jstrande99</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => external(SITE.socials.linkedin)}
                value="linkedin profile"
              >
                <span className={styles.itemIcon}>in</span>
                <span className={styles.itemText}>LinkedIn</span>
                <span className={styles.itemSub}>↗ External</span>
              </Command.Item>
              <Command.Item
                className={styles.item}
                onSelect={() => external(SITE.socials.langelogic)}
                value="lange logic company"
              >
                <span className={styles.itemIcon}>◉</span>
                <span className={styles.itemText}>Lange Logic</span>
                <span className={styles.itemSub}>↗ Company</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className={styles.footer}>
            <span>
              <strong>↑↓</strong> navigate <strong>↵</strong> select{" "}
              <strong>ESC</strong> close
            </span>
            <span>λ {SITE.name.split(" ")[0].toLowerCase()}@portfolio</span>
          </div>
        </Command>
      </div>
    </>
  );
}
