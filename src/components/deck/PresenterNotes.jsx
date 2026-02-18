"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function PresenterNotes({ show, text }) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface-1)]"
        >
          <div className="px-6 py-4">
            <div className="text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
              Interpretation / Notes
            </div>
            <p className="mt-2 whitespace-pre-wrap text-[0.78rem] leading-[1.8] text-[var(--text-2)]">
              {text || "No notes provided for this slide."}
            </p>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}