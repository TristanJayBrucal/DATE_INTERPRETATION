"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

function toSnippet(text) {
  if (!text) return "";
  return text.length > 88 ? `${text.slice(0, 88)}...` : text;
}

export default function SidebarThumbnails({
  open,
  deckTitle,
  slides,
  activeIndex,
  setActiveIndex,
  sections,
}) {
  const reducedMotion = useReducedMotionPreference();
  const itemRefs = useRef(new Map());
  const interactiveClasses = reducedMotion ? "ui-focus" : "ui-focus ui-hover ui-press";

  useEffect(() => {
    if (!open) return;
    const active = itemRefs.current.get(activeIndex);
    if (active) {
      active.scrollIntoView({
        block: "nearest",
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }, [activeIndex, open, reducedMotion]);

  return (
    <aside
      id="deck-sidebar"
      className={clsx(
        "no-print h-full border-r border-[var(--border)] bg-[var(--surface-1)] overflow-y-auto overflow-x-hidden transition-opacity",
        reducedMotion ? "duration-0" : "duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div className="border-b border-[var(--border)] p-4">
        <div className="text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-2)]">Deck</div>
        <div className="mt-1 text-[0.82rem] text-[var(--text-1)]">{deckTitle}</div>
      </div>

      <div className="px-3 py-4">
        {sections.map((section) => (
          <section key={section.name} className="mb-5">
            <h2 className="px-2 pb-2 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[var(--text-3)]">
              {section.name}
            </h2>

            <div className="space-y-2">
              {section.indexes.map((index) => {
                const slide = slides[index];
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={slide.id}
                    ref={(node) => {
                      if (node) itemRefs.current.set(index, node);
                      else itemRefs.current.delete(index);
                    }}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className={clsx(
                      "group relative w-full overflow-hidden border border-[var(--border)] bg-transparent p-3 text-left",
                      "transition-colors duration-[120ms]",
                      interactiveClasses,
                      isActive
                        ? "sidebar-active ui-active"
                        : "hover:bg-[var(--surface-2)] hover:border-[var(--border-hi)]"
                    )}
                  >
                    <span
                      className={clsx(
                        "pointer-events-none absolute inset-y-0 left-0 w-0 transition-all duration-200",
                        isActive
                          ? "w-[3px] bg-[var(--accent-blue)]"
                          : "group-hover:w-[2px] group-hover:bg-[var(--accent-cyan)]"
                      )}
                    />

                    <div className="flex items-center justify-between text-[0.62rem] text-[var(--text-3)]">
                      <span className="ui-underline">Slide {index + 1}</span>
                      <span className="text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-3)] ui-underline">
                        {slide.type}
                      </span>
                    </div>

                    <p className="mt-1 text-[0.78rem] leading-5 text-[var(--text-2)] group-hover:text-[var(--text-1)] ui-underline">
                      {slide.title}
                    </p>

                    {slide.question ? (
                      <p className="mt-1 text-[0.7rem] leading-4 text-[var(--text-3)] group-hover:text-[var(--text-2)] ui-underline">
                        {toSnippet(slide.question)}
                      </p>
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
