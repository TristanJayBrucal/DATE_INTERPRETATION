"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

function splitWords(title) {
  return String(title || "").trim().split(/\s+/).filter(Boolean);
}

export default function SlideTitle({ slide }) {
  const reducedMotion = useReducedMotionPreference();
  const words = splitWords(slide?.title || "");
  const stagger = reducedMotion ? 0 : 0.02;
  let charIndex = 0;

  return (
    <div className="py-24 text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-1)]">{slide.section}</div>
      <h1
        className="mt-4 text-5xl font-semibold tracking-tight text-[var(--text-1)] text-balance break-normal"
        style={{ overflowWrap: "normal", wordBreak: "normal" }}
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
      </h1>
      {slide.subtitle ? <p className="mt-5 text-lg text-[var(--text-1)]">{slide.subtitle}</p> : null}
    </div>
  );
}
