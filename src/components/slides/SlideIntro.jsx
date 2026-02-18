"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

function splitWords(title) {
  return String(title || "").trim().split(/\s+/).filter(Boolean);
}

export default function SlideIntro({ slide }) {
  const reducedMotion = useReducedMotionPreference();
  const words = splitWords(slide?.title || "");
  const stagger = reducedMotion ? 0 : 0.022;
  const charCount = words.join("").length;
  const subtitleDelay = reducedMotion
    ? 0
    : Math.min(0.75, 0.45 + Math.min(charCount, 28) * 0.01);

  let charIndex = 0;

  return (
    <div className="relative py-24 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="h-[260px] w-[72%] max-w-3xl rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,121,194,0.22) 0%, rgba(70,162,172,0.12) 38%, rgba(0,0,0,0) 72%)",
          }}
        />
      </div>

      <div className="text-[0.74rem] font-bold uppercase tracking-[0.1em] text-[var(--text-1)]">
        {slide?.section || "Overview"}
      </div>

      <motion.h1
        className="mx-auto mt-5 max-w-5xl text-balance break-normal text-5xl font-bold tracking-tight md:text-6xl"
        style={{
          backgroundImage: "linear-gradient(90deg, #0B79C2, #46A2AC)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 10px 35px rgba(0,0,0,0.35)",
          overflowWrap: "normal",
          wordBreak: "normal",
        }}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.18 }}
      >
        {reducedMotion ? (
          slide?.title
        ) : (
          <span aria-label={slide?.title}>
            {words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block whitespace-nowrap align-top"
                style={{ marginRight: wordIndex === words.length - 1 ? 0 : "0.22em" }}
              >
                {Array.from(word).map((char, innerIndex) => {
                  const delay = charIndex * stagger;
                  charIndex += 1;
                  return (
                    <motion.span
                      key={`${char}-${wordIndex}-${innerIndex}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut", delay }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>
        )}
      </motion.h1>

      {slide?.subtitle ? (
        <motion.p
          className="mx-auto mt-6 max-w-3xl break-words text-xl font-medium text-[var(--text-1)] md:text-2xl"
          style={{ textShadow: "0 5px 14px rgba(0,0,0,0.2)" }}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { delay: subtitleDelay, duration: 0.35, ease: "easeOut" }}
        >
          {slide.subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
