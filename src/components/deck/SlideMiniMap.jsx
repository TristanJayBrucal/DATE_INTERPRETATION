"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useReducedMotionPreference } from "@/lib/motion";

function buildIndexes(total, maxDots) {
  if (total <= maxDots) return Array.from({ length: total }, (_, i) => i);

  const indexes = [];
  const step = (total - 1) / (maxDots - 1);
  for (let i = 0; i < maxDots; i += 1) {
    indexes.push(Math.round(i * step));
  }

  return Array.from(new Set(indexes));
}

export default function SlideMiniMap({ activeIndex, total, onJump }) {
  const reducedMotion = useReducedMotionPreference();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const indexes = buildIndexes(total, 40);

  return (
    <div className="flex items-center justify-center gap-1.5 py-1">
      {indexes.map((index) => {
        const isActive = index === activeIndex;
        const isHovered = hoveredIndex === index;

        return (
          <motion.button
            key={index}
            type="button"
            onClick={() => onJump(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={clsx(
              "ui-focus ui-press relative h-2.5 w-2.5 border border-[var(--border)] bg-[var(--surface-2)]",
              "transition-colors duration-[120ms]",
              isActive
                ? "ui-active border-[var(--text-1)] bg-[var(--text-1)]"
                : "ui-hover hover:border-[var(--border-hi)]"
            )}
            animate={{
              opacity: isActive ? 1 : 0.45,
              scale: reducedMotion ? 1 : isActive ? 1.12 : isHovered ? 1.06 : 1,
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 20, mass: 0.6 }
            }
            aria-label={`Jump to slide ${index + 1}`}
            title={`Slide ${index + 1}`}
          />
        );
      })}
    </div>
  );
}
