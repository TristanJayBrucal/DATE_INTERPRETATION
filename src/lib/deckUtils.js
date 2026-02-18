export function buildSections(slides) {
  const map = new Map();

  slides.forEach((slide, index) => {
    const key = slide.section || "Slides";
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(index);
  });

  return Array.from(map.entries()).map(([name, indexes]) => ({
    name,
    indexes,
  }));
}

function slugify(value) {
  return (
    String(value || "section")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-") || "section"
  );
}

export function injectSectionIntros(slides, deckMeta) {
  const result = [];
  const insertedSections = new Set();
  const usedIds = new Set((slides || []).map((slide) => slide.id));

  (slides || []).forEach((slide) => {
    const section = slide.section || "Slides";
    const normalized = section.trim().toLowerCase();
    const shouldSkip = normalized === "overview" || normalized === "summary";

    if (!shouldSkip && !insertedSections.has(section)) {
      insertedSections.add(section);

      const baseId = `section_intro_${slugify(section)}`;
      let introId = baseId;
      let suffix = 2;
      while (usedIds.has(introId)) {
        introId = `${baseId}_${suffix}`;
        suffix += 1;
      }
      usedIds.add(introId);

      result.push({
        id: introId,
        type: "title",
        isSectionIntro: true,
        section,
        title: section,
        subtitle: deckMeta?.subtitle || "",
        notes: `Section overview: ${section}.`,
      });
    }

    result.push(slide);
  });

  return result;
}
