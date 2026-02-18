"use client";

import SlideIntro from "./SlideIntro";
import SlideChartPie from "./SlideChartPie";
import SlideChartBars from "./SlideChartBars";
import SlideKeyFindings from "./SlideKeyFindings";

export default function SlideRenderer({ slide }) {
  if (!slide) return null;

  if (slide.type === "title" || slide.type === "sectionIntro") {
    return <SlideIntro slide={slide} />;
  }
  if (slide.type === "pie") return <SlideChartPie slide={slide} />;
  if (slide.type === "bars") return <SlideChartBars slide={slide} />;
  if (slide.type === "meanBars") return <SlideChartBars slide={slide} mode="meanBars" />;
  if (slide.type === "keyFindings") return <SlideKeyFindings slide={slide} />;

  return <div className="text-sm text-[var(--text-2)]">Unknown slide type: {slide.type}</div>;
}
