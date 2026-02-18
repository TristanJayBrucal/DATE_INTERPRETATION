"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

function splitWords(title) {
  return String(title || "").trim().split(/\s+/).filter(Boolean);
}

export default function SlideSectionIntro({ slide }) {
  const reducedMotion = useReducedMotionPreference();
  const words = splitWords(slide?.title || "");
  const stagger = reducedMotion ? 0 : 0.02;
  let charIndex = 0;

  return (
    <div className="py-14">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.995 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card mx-auto max-w-4xl border border-[var(--border)] bg-[var(--surface-1)] px-8 py-14 text-center"
      >
        <div className="section-label text-[var(--text-1)]">Section</div>
        <h2
          className="mt-4 text-4xl text-[var(--text-1)] text-balance break-normal"
          style={{
            fontFamily: "var(--font-display), serif",
            overflowWrap: "normal",
            wordBreak: "normal",
          }}
        >
          {reducedMotion ? (
            slide?.title
          ) : (
            <span aria-label={slide?.title}>
              {words.map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-block whitespace-nowrap align-top"
                  style={{ marginRight: wordIndex === words.length - 1 ? 0 : "0.2em" }}
                >
                  {Array.from(word).map((char, innerIndex) => {
                    const delay = charIndex * stagger;
                    charIndex += 1;
                    return (
                      <motion.span
                        key={`${char}-${wordIndex}-${innerIndex}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut", delay }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          )}
        </h2>
        {slide.subtitle ? (
          <p className="mt-4 text-[0.78rem] text-[var(--text-1)]" style={{ fontFamily: "var(--font-mono), monospace" }}>
            {slide.subtitle}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
