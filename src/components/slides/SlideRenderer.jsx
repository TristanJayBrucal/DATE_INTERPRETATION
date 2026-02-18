"use client";

import SlideIntro from "./SlideIntro";
import SlideChartPie from "./SlideChartPie";
import SlideChartBars from "./SlideChartBars";
import SlideKeyFindings from "./SlideKeyFindings";
import { validateSlide } from "@/lib/validateDeck";

const loggedValidationErrors = new Set();

function DataIntegrityNotice({ slide, error }) {
  const isMissing = String(error || "").toUpperCase().includes("MISSING");
  const badgeText = isMissing ? "DATA MISSING" : "DATA ERROR";

  return (
    <div className="py-8">
      <div className="glass-card mx-auto max-w-4xl border border-[var(--border)] bg-[var(--surface-1)] p-8 text-center">
        <div className="section-label text-[var(--text-1)]">{slide?.section || "Slide"}</div>
        <h2 className="slide-title mx-auto mt-3 max-w-4xl">{slide?.title || "Data Integrity Notice"}</h2>
        {slide?.question ? (
          <p className="mx-auto mt-2 max-w-3xl text-[0.8rem] text-[var(--text-2)]">{slide.question}</p>
        ) : null}

        <div className="mx-auto mt-6 inline-flex border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-[0.78rem] font-semibold text-[var(--text-1)]">
          {badgeText}: needs counts
        </div>

        <p className="mx-auto mt-3 max-w-3xl text-[0.78rem] text-[var(--text-2)]">{error}</p>

        <div className="mx-auto mt-6 max-w-3xl border border-[var(--border)] bg-[var(--surface-1)] p-4 text-left">
          <div className="section-label text-[var(--text-1)]">Interpretation / Notes</div>
          <p className="mt-2 whitespace-pre-wrap text-[0.8rem] leading-7 text-[var(--text-2)]">
            {slide?.notes || "No notes provided for this slide."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SlideRenderer({ slide }) {
  if (!slide) return null;

  const result = validateSlide(slide);
  if (!result.valid) {
    const key = `${slide.id}:${result.error}`;
    if (!loggedValidationErrors.has(key)) {
      loggedValidationErrors.add(key);
      console.error(`[Deck validation] slide=${slide.id} -> ${result.error}`);
    }
    return <DataIntegrityNotice slide={slide} error={result.error} />;
  }

  if (slide.type === "title" || slide.type === "sectionIntro") {
    return <SlideIntro slide={slide} />;
  }
  if (slide.type === "pie") return <SlideChartPie slide={slide} />;
  if (slide.type === "bars") return <SlideChartBars slide={slide} />;
  if (slide.type === "meanBars") return <SlideChartBars slide={slide} mode="meanBars" />;
  if (slide.type === "keyFindings") return <SlideKeyFindings slide={slide} />;

  return <div className="text-sm text-[var(--text-2)]">Unknown slide type: {slide.type}</div>;
}
