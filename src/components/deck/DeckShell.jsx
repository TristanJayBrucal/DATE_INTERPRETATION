"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SidebarThumbnails from "./SidebarThumbnails";
import SlideCanvas from "./SlideCanvas";
import PresenterNotes from "./PresenterNotes";
import SlideNav from "./SlideNav";
import KeyboardHelpOverlay from "./KeyboardHelpOverlay";
import SlideMiniMap from "./SlideMiniMap";
import { buildSections, injectSectionIntros } from "@/lib/deckUtils";
import { useReducedMotionPreference } from "@/lib/motion";

function formatElapsed(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function DeckShell({ deck }) {
  const enhancedSlides = useMemo(() => injectSectionIntros(deck.slides, deck), [deck]);
  const slides = enhancedSlides;
  const sections = useMemo(() => buildSections(slides), [slides]);
  const reducedMotion = useReducedMotionPreference();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNotes, setShowNotes] = useState(true);
  const [presenterMode, setPresenterMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [spotlightMode, setSpotlightMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeSlide = slides[activeIndex];

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((index) => Math.max(0, index - 1));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((index) => Math.min(slides.length - 1, index + 1));
  }, [slides.length]);

  const jumpTo = useCallback(
    (index) => {
      setDirection(index >= activeIndex ? 1 : -1);
      setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [activeIndex, slides.length]
  );

  const handleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fullscreen errors silently.
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  useEffect(() => {
    const onKeyDown = async (event) => {
      const key = event.key.toLowerCase();

      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (key === "n") {
        setShowNotes((prev) => !prev);
      }
      if (key === "p") {
        setPresenterMode((prev) => !prev);
      }
      if (key === "f") {
        await handleFullscreen();
      }
      if (event.key === "?") {
        event.preventDefault();
        setShowKeyboardHelp((prev) => !prev);
      }
      if (event.key === "Escape") {
        setShowKeyboardHelp(false);
        setSpotlightMode(false);
        if (document.fullscreenElement) {
          try {
            await document.exitFullscreen();
          } catch {
            // Ignore fullscreen errors silently.
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, handleFullscreen]);

  useEffect(() => {
    if (!presenterMode) return undefined;

    const timer = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [presenterMode]);

  useEffect(() => {
    if (!presenterMode) return undefined;

    const autoAdvance = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((index) => Math.min(slides.length - 1, index + 1));
    }, 8000);

    return () => window.clearInterval(autoAdvance);
  }, [presenterMode, slides.length]);

  return (
    <div className="h-screen w-screen bg-[var(--bg)]">
      <div
        className="h-full grid"
        style={{
          gridTemplateColumns: sidebarOpen ? "280px 1fr" : "0px 1fr",
          transition: reducedMotion ? "none" : "grid-template-columns 240ms ease",
        }}
      >
        <SidebarThumbnails
          open={sidebarOpen}
          deckTitle={deck.title}
          slides={slides}
          activeIndex={activeIndex}
          setActiveIndex={jumpTo}
          sections={sections}
        />

        <main className="relative h-full min-w-0 overflow-hidden">
          <div className="relative h-full flex flex-col">
            {!isFullscreen && (
              <SlideNav
                activeIndex={activeIndex}
                total={slides.length}
                sectionLabel={activeSlide?.section}
                onPrev={goPrev}
                onNext={goNext}
                showNotes={showNotes}
                setShowNotes={setShowNotes}
                presenterMode={presenterMode}
                setPresenterMode={setPresenterMode}
                onFullscreen={handleFullscreen}
                showKeyboardHelp={showKeyboardHelp}
                setShowKeyboardHelp={setShowKeyboardHelp}
                spotlightMode={spotlightMode}
                setSpotlightMode={setSpotlightMode}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            )}

            {presenterMode ? (
              <div className="no-print px-5 py-1 text-[0.68rem] text-[var(--text-2)]">
                Presenter Mode - Elapsed {formatElapsed(seconds)}
              </div>
            ) : null}

            <div className="flex-1 grid grid-rows-[1fr_auto] overflow-hidden">
              <div className="flex h-full flex-col overflow-hidden">
                <div className="relative flex-1 overflow-hidden">
                  {spotlightMode ? (
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.55) 72%)",
                      }}
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={reducedMotion ? undefined : { opacity: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0 }}
                    />
                  ) : null}
                  <motion.div
                    className="h-full"
                    animate={
                      spotlightMode
                        ? { scale: 1.01, filter: "brightness(1.06)" }
                        : { scale: 1, filter: "brightness(1)" }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 180, damping: 24 }
                    }
                  >
                    <SlideCanvas slide={activeSlide} direction={direction} />
                  </motion.div>
                </div>
                <div className="no-print px-8 pb-3 pt-1">
                  <SlideMiniMap
                    activeIndex={activeIndex}
                    total={slides.length}
                    onJump={jumpTo}
                  />
                </div>
              </div>
              <PresenterNotes show={showNotes} text={activeSlide?.notes} />
            </div>
          </div>

          {showKeyboardHelp ? (
            <KeyboardHelpOverlay
              show={showKeyboardHelp}
              onClose={() => setShowKeyboardHelp(false)}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
