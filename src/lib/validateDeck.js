import {
  BLACKBOX_SCALE,
  LIKERT_SCALE,
  YES_NO_SCALE,
  thesisData,
} from "@/data/thesisData";

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function arrayEquals(a, b) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function sum(values) {
  return values.reduce((acc, value) => acc + value, 0);
}

export function validateSlide(slide, options = {}) {
  const respondents = options.respondents ?? thesisData.respondents ?? 60;

  if (!slide || typeof slide !== "object") {
    return { valid: false, error: "Invalid slide object." };
  }

  if (slide.type === "title" || slide.type === "sectionIntro" || slide.type === "keyFindings") {
    return { valid: true };
  }

  if (slide.type === "pie") {
    if (!Array.isArray(slide.data) || slide.data.length === 0) {
      return { valid: false, error: "DATA MISSING: pie data[] is required." };
    }

    for (const entry of slide.data) {
      if (!entry || typeof entry.name !== "string" || !entry.name.trim()) {
        return { valid: false, error: "DATA ERROR: pie category name is invalid." };
      }
      if (!isFiniteNumber(entry.value) || entry.value < 0) {
        return { valid: false, error: `DATA ERROR: pie value for "${entry.name}" is invalid.` };
      }
    }

    if (String(slide.section || "").startsWith("Part IV")) {
      const names = slide.data.map((d) => d.name);
      if (!arrayEquals(names, YES_NO_SCALE)) {
        return {
          valid: false,
          error: `DATA ERROR: Part IV must use EXACT categories: ${YES_NO_SCALE.join(", ")}.`,
        };
      }
    }

    const total = sum(slide.data.map((d) => d.value));
    if (total !== respondents) {
      return {
        valid: false,
        error: `DATA MISSING: pie totals must equal ${respondents}; got ${total}.`,
      };
    }

    return { valid: true };
  }

  if (slide.type === "bars") {
    if (!Array.isArray(slide.categories) || !Array.isArray(slide.values)) {
      return { valid: false, error: "DATA MISSING: bars requires categories[] and values[] arrays." };
    }

    if (slide.categories.length === 0 || slide.values.length === 0) {
      return { valid: false, error: "DATA MISSING: bars categories/values cannot be empty." };
    }

    if (slide.categories.length !== slide.values.length) {
      return { valid: false, error: "DATA ERROR: bars categories and values length mismatch." };
    }

    if (slide.values.some((value) => !isFiniteNumber(value) || value < 0)) {
      return { valid: false, error: "DATA ERROR: bars values must be non-negative numbers." };
    }

    const section = String(slide.section || "");

    if (section.startsWith("Part II") || section.startsWith("Part V")) {
      if (!arrayEquals(slide.categories, LIKERT_SCALE)) {
        return {
          valid: false,
          error: `DATA ERROR: Likert categories must be EXACTLY ${LIKERT_SCALE.join(" | ")}.`,
        };
      }
    }

    if (section.startsWith("Black-box")) {
      if (!arrayEquals(slide.categories, BLACKBOX_SCALE)) {
        return {
          valid: false,
          error: `DATA ERROR: Black-box categories must be EXACTLY ${BLACKBOX_SCALE.join(" | ")}.`,
        };
      }
    }

    const total = sum(slide.values);
    if (total !== respondents) {
      return {
        valid: false,
        error: `DATA MISSING: bars totals must equal ${respondents}; got ${total}.`,
      };
    }

    if (slide.mean != null && !isFiniteNumber(slide.mean)) {
      return { valid: false, error: "DATA ERROR: weighted mean must be a finite number." };
    }

    return { valid: true };
  }

  if (slide.type === "meanBars") {
    if (!Array.isArray(slide.data) || slide.data.length === 0) {
      return { valid: false, error: "DATA MISSING: meanBars requires non-empty data[]." };
    }

    for (const entry of slide.data) {
      if (!entry || typeof entry.name !== "string" || !entry.name.trim()) {
        return { valid: false, error: "DATA ERROR: meanBars entry name is invalid." };
      }
      if (!isFiniteNumber(entry.mean)) {
        return { valid: false, error: `DATA ERROR: meanBars value for "${entry.name}" is invalid.` };
      }
    }

    return { valid: true };
  }

  return { valid: false, error: `Unknown slide type "${slide.type}".` };
}
