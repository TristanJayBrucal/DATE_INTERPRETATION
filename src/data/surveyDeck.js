import {
  BLACKBOX_SCALE,
  LIKERT_SCALE,
  thesisData,
} from "./thesisData";

function buildPieSlide(section, item) {
  return {
    id: item.id,
    type: "pie",
    section,
    title: item.title,
    question: item.question,
    data: item.data,
    notes: item.notes,
  };
}

function buildLikertBarSlide(section, item) {
  return {
    id: item.id,
    type: "bars",
    section,
    title: item.title,
    question: item.question,
    categories: LIKERT_SCALE,
    values: item.values,
    mean: item.mean,
    notes: item.notes,
  };
}

function buildBlackboxBarSlide(section, groupTitle, indicator) {
  return {
    id: indicator.id,
    type: "bars",
    section,
    title: `${groupTitle}: ${indicator.title}`,
    question: indicator.title,
    categories: BLACKBOX_SCALE,
    values: indicator.values,
    mean: indicator.mean,
    notes: `Black-box ${groupTitle.toLowerCase()} interpretation for "${indicator.title}" based on the thesis table frequencies.`,
  };
}

function buildBlackboxSummarySlide(section, groupTitle, summaryMeans, summaryNotes, id) {
  return {
    id,
    type: "meanBars",
    section,
    title: `${groupTitle} Summary (Indicator Means)`,
    question: "Comparison of indicator weighted means.",
    data: summaryMeans,
    notes: summaryNotes,
  };
}

const blackBoxSection = "Black-box Testing";

const blackBoxSlides = [
  ...thesisData.blackBox.usability.indicators.map((indicator) =>
    buildBlackboxBarSlide(blackBoxSection, "Usability", indicator)
  ),
  buildBlackboxSummarySlide(
    blackBoxSection,
    "Usability",
    thesisData.blackBox.usability.summaryMeans,
    thesisData.blackBox.usability.summaryNotes,
    "bb_usability_summary"
  ),

  ...thesisData.blackBox.reliability.indicators.map((indicator) =>
    buildBlackboxBarSlide(blackBoxSection, "Reliability", indicator)
  ),
  buildBlackboxSummarySlide(
    blackBoxSection,
    "Reliability",
    thesisData.blackBox.reliability.summaryMeans,
    thesisData.blackBox.reliability.summaryNotes,
    "bb_reliability_summary"
  ),

  ...thesisData.blackBox.accessibility.indicators.map((indicator) =>
    buildBlackboxBarSlide(blackBoxSection, "Accessibility", indicator)
  ),
  buildBlackboxSummarySlide(
    blackBoxSection,
    "Accessibility",
    thesisData.blackBox.accessibility.summaryMeans,
    thesisData.blackBox.accessibility.summaryNotes,
    "bb_accessibility_summary"
  ),

  ...thesisData.blackBox.efficiency.indicators.map((indicator) =>
    buildBlackboxBarSlide(blackBoxSection, "Efficiency", indicator)
  ),
  buildBlackboxSummarySlide(
    blackBoxSection,
    "Efficiency",
    thesisData.blackBox.efficiency.summaryMeans,
    thesisData.blackBox.efficiency.summaryNotes,
    "bb_efficiency_summary"
  ),

  ...thesisData.blackBox.functionality.indicators.map((indicator) =>
    buildBlackboxBarSlide(blackBoxSection, "Functionality", indicator)
  ),
  buildBlackboxSummarySlide(
    blackBoxSection,
    "Functionality",
    thesisData.blackBox.functionality.summaryMeans,
    thesisData.blackBox.functionality.summaryNotes,
    "bb_functionality_summary"
  ),
];

export const deck = {
  title: thesisData.title,
  subtitle: thesisData.subtitle,
  meta: { respondents: thesisData.respondents },
  slides: [
    {
      id: "title",
      type: "title",
      section: "Overview",
      title: "Data Interpretation",
      subtitle: "ARVA.ai Survey Results (n=60)",
      notes: thesisData.overviewNotes,
    },

    ...thesisData.partI.map((item) =>
      buildPieSlide("Part I. Demographic Profile", item)
    ),

    ...thesisData.partII.map((item) =>
      buildLikertBarSlide("Part II. Challenges in Home Planning", item)
    ),

    ...thesisData.partIII.map((item) =>
      buildPieSlide("Part III. Existing Home Planning Practices", item)
    ),

    ...thesisData.partIV.map((item) =>
      buildPieSlide("Part IV. Openness to Digital Platforms", item)
    ),

    ...thesisData.partV.map((item) =>
      buildLikertBarSlide("Part V. Usability of ARVA.ai", item)
    ),

    ...thesisData.partVI.map((item) => ({
      id: item.id,
      type: "meanBars",
      section: "Part VI. Perceived Support in Planning Outcomes",
      title: item.title,
      question: item.question,
      data: [{ name: item.title, mean: item.mean }],
      notes: `${item.notes} (Total score: ${item.total}, n=${item.n})`,
    })),

    ...blackBoxSlides,

    {
      id: "key_findings",
      type: "keyFindings",
      section: "Summary",
      title: "Key Findings",
      bullets: thesisData.keyFindings,
      notes:
        "These findings summarize major patterns across demographic profile, planning challenges, AI openness, usability outcomes, and black-box testing.",
    },
  ],
};
