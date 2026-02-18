"use client";

import { motion } from "framer-motion";
import { listItem, staggerChildren, useReducedMotionPreference } from "@/lib/motion";

export default function SlideKeyFindings({ slide }) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className="py-16">
      <header className="text-center">
        <div className="section-label text-[var(--text-1)]">{slide.section}</div>
        <h2
          className="slide-title mx-auto mt-3 max-w-5xl text-balance break-normal"
          style={{ overflowWrap: "normal", wordBreak: "normal" }}
        >
          {slide.title}
        </h2>
      </header>

      <div className="glass-card mt-10 mx-auto max-w-4xl border border-[var(--border)] bg-[var(--surface-1)] p-8">
        <motion.ul
          className="space-y-4"
          variants={reducedMotion ? undefined : staggerChildren}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          {(slide.bullets || []).map((bullet, index) => (
            <motion.li
              key={`${bullet}-${index}`}
              className="flex gap-3"
              variants={reducedMotion ? undefined : listItem}
            >
              <span className="mt-2 h-2.5 w-2.5 bg-[var(--text-1)]" />
              <span className="text-[0.88rem] leading-[1.8] text-[var(--text-2)]">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
