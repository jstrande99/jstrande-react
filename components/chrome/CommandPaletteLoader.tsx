"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./CommandPalette.module.css";

/* Dynamic loader for CommandPalette.
 *   The cmdk library weighs a few dozen KB — we defer its chunk entirely
 *   until the user signals intent (hovers the trigger chip, focuses input,
 *   or presses ⌘K / Ctrl+K).
 *   While the chunk is still unloaded we render only the tiny trigger chip
 *   and a placeholder; once loaded the real CommandPalette takes over. */
const CommandPalette = dynamic(() => import("./CommandPalette"), {
  ssr: false,
  loading: () => null,
});

export default function CommandPaletteLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    /* Any of these user signals triggers chunk load. */
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        setShouldLoad(true);
      }
    };
    /* Preload when the user is obviously idle + about to engage. */
    const onIdle = () => setShouldLoad(true);

    window.addEventListener("keydown", onKey);
    const idleId = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback?.(onIdle, { timeout: 3500 });
    const fallback = window.setTimeout(onIdle, 3500);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (idleId && (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      window.clearTimeout(fallback);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    /* Show only the trigger chip — minimal DOM, no cmdk dependency. */
    return (
      <button
        type="button"
        className={styles.triggerChip}
        onClick={() => setShouldLoad(true)}
        onPointerEnter={() => setShouldLoad(true)}
        aria-label="Open command palette (⌘K)"
        data-cursor="link"
      >
        <strong>⌘ K</strong>
        Commands
      </button>
    );
  }

  return <CommandPalette />;
}
