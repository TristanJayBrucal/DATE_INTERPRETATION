"use client";

import { AnimatePresence, motion } from "framer-motion";
import SlideRenderer from "@/components/slides/SlideRenderer";
import { slideVariants, useReducedMotionPreference } from "@/lib/motion";

export default function SlideCanvas({ slide, direction = 1 }) {
  const reducedMotion = useReducedMotionPreference();

  const variants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : slideVariants(direction);

  return (
    <div className="flex h-full items-center justify-center overflow-auto bg-[var(--bg)] px-8 py-8">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={slide?.id}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-6xl"
        >
          <SlideRenderer slide={slide} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}