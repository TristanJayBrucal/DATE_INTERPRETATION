"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

export default function KeyboardHelpOverlay({ show, onClose }) {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!show) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <motion.div
      className="no-print pointer-events-auto fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] px-4"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      onMouseDown={onClose}
    >
      <motion.div
        className="glass-card mx-auto mt-[14vh] max-w-lg border border-[var(--border)] bg-[var(--surface-1)] p-6"
        initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
      >
        <div className="section-label">Keyboard Shortcuts</div>
        <h3 className="mt-2 text-xl text-[var(--text-1)]" style={{ fontFamily: "var(--font-display), serif" }}>
          Deck Controls
        </h3>

        <div className="mt-4 space-y-2 text-[0.8rem] text-[var(--text-2)]">
          <div><strong className="text-[var(--text-1)]">Left / Right</strong> Navigate slides</div>
          <div><strong className="text-[var(--text-1)]">N</strong> Toggle notes</div>
          <div><strong className="text-[var(--text-1)]">P</strong> Toggle presenter mode</div>
          <div><strong className="text-[var(--text-1)]">F</strong> Toggle fullscreen</div>
          <div><strong className="text-[var(--text-1)]">?</strong> Toggle this help</div>
          <div><strong className="text-[var(--text-1)]">ESC</strong> Close help and exit fullscreen</div>
        </div>

        <div className="mt-5 flex justify-end">
          <button type="button" onClick={onClose} className="soft-btn">
            Close
          </button>
        </div>
      </motion.div>Data Interpretation of Survey Results
    </motion.div>
  );
}
