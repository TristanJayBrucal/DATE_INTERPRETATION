"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/motion";

export default function SlideNav({
  activeIndex,
  total,
  sectionLabel,
  onPrev,
  onNext,
  showNotes,
  setShowNotes,
  presenterMode,
  setPresenterMode,
  onFullscreen,
  showKeyboardHelp,
  setShowKeyboardHelp,
  spotlightMode,
  setSpotlightMode,
  sidebarOpen,
  setSidebarOpen,
}) {
  const reducedMotion = useReducedMotionPreference();
  const progress = total > 0 ? ((activeIndex + 1) / total) * 100 : 0;
  const interactiveClasses = reducedMotion
    ? "ui-focus"
    : "ui-focus ui-hover ui-press ui-underline";

  return (
    <div className="no-print border-b border-[var(--border)] bg-[var(--surface-1)] px-4 py-2.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-expanded={sidebarOpen}
            aria-controls="deck-sidebar"
            className={clsx("soft-btn", interactiveClasses, sidebarOpen && "ui-active")}
          >
            {sidebarOpen ? "Hide Slides" : "Show Slides"}
          </button>

          <div>
            <div className="section-label">{sectionLabel || "Slides"}</div>
            <div className="text-[0.72rem] text-[var(--text-2)]">
              Slide <span className="text-[var(--text-1)]">{activeIndex + 1}</span> / {total}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            aria-pressed={showNotes}
            className={clsx("soft-btn", interactiveClasses, showNotes && "ui-active")}
          >
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
          <button type="button" onClick={onFullscreen} className={clsx("soft-btn", interactiveClasses)}>
            Fullscreen
          </button>
          <button
            type="button"
            onClick={() => setSpotlightMode(!spotlightMode)}
            aria-pressed={spotlightMode}
            className={clsx("soft-btn", interactiveClasses, spotlightMode && "ui-active")}
          >
            {spotlightMode ? "Spotlight Off" : "Spotlight"}
          </button>
          <button
            type="button"
            onClick={() => setPresenterMode(!presenterMode)}
            aria-pressed={presenterMode}
            className={clsx("soft-btn", interactiveClasses, presenterMode && "ui-active")}
          >
            {presenterMode ? "Stop Presenter" : "Presenter Mode"}
          </button>
          <button
            type="button"
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            aria-pressed={showKeyboardHelp}
            className={clsx("soft-btn", interactiveClasses, showKeyboardHelp && "ui-active")}
            aria-label="Keyboard shortcuts"
          >
            ?
          </button>
          <button
            type="button"
            onClick={onPrev}
            disabled={activeIndex <= 0}
            className={clsx("soft-btn", interactiveClasses)}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex >= total - 1}
            className={clsx("soft-btn", interactiveClasses)}
          >
            Next
          </button>
        </div>
      </div>

      {showKeyboardHelp ? (
        <div className="mt-2 flex flex-wrap gap-1.5 text-[0.68rem] text-[var(--text-2)]">
          <span className="border border-[var(--border)] bg-transparent px-2 py-0.5">Left/Right navigate</span>
          <span className="border border-[var(--border)] bg-transparent px-2 py-0.5">N notes</span>
          <span className="border border-[var(--border)] bg-transparent px-2 py-0.5">P presenter</span>
          <span className="border border-[var(--border)] bg-transparent px-2 py-0.5">F fullscreen</span>
          <span className="border border-[var(--border)] bg-transparent px-2 py-0.5">? help</span>
        </div>
      ) : null}

      <div className="mt-2 h-px w-full overflow-hidden bg-[var(--surface-2)] pointer-events-none">
        <motion.div
          className="h-full bg-[var(--accent)]"
          animate={{ width: `${progress}%` }}
          transition={
            reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }
          }
        />
      </div>
    </div>
  );
}
