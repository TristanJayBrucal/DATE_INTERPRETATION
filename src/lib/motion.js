"use client";

import { useReducedMotion } from "framer-motion";

export function useReducedMotionPreference() {
  return Boolean(useReducedMotion());
}

export const springTransition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 0.95,
};

export const easeOutTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};

export function slideVariants(direction = 1) {
  return {
    initial: {
      opacity: 0,
      x: direction > 0 ? 24 : -24,
      scale: 1,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: springTransition,
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -24 : 24,
      scale: 1,
      transition: easeOutTransition,
    },
  };
}

export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: easeOutTransition,
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: easeOutTransition,
  },
};

export const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

export const listItem = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: easeOutTransition,
  },
};