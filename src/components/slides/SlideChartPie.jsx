"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import {
  fadeUp,
  listItem,
  staggerChildren,
  useReducedMotionPreference,
} from "@/lib/motion";

const COLORS = ["#005B96", "#0B79C2", "#1696D2", "#46A2AC", "#78BFB5", "#ABDBC2"];

function toPercent(value, total) {
  if (!total) return 0;
  return ((value / total) * 100).toFixed(1);
}

function PieTooltip({ active, payload, reducedMotion }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <motion.div
      className="glass-card border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-[0.72rem] text-[var(--text-1)]"
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div>{item.name}</div>
      <div className="mt-1">Value: {item.value}</div>
    </motion.div>
  );
}

function renderActiveShape(props) {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  const radian = Math.PI / 180;
  const offset = 8;
  const dx = Math.cos(-midAngle * radian) * offset;
  const dy = Math.sin(-midAngle * radian) * offset;

  return (
    <g>
      <Sector
        cx={cx + dx}
        cy={cy + dy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx + dx}
        cy={cy + dy}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.35}
      />
    </g>
  );
}

export default function SlideChartPie({ slide }) {
  const reducedMotion = useReducedMotionPreference();
  const [activeSliceIndex, setActiveSliceIndex] = useState(null);
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState(null);

  const total = (slide.data || []).reduce((sum, item) => sum + item.value, 0);

  const interactiveIndex = activeSliceIndex ?? (reducedMotion ? null : hoveredSliceIndex);

  const selectedItem = useMemo(() => {
    if (interactiveIndex == null) return null;
    return slide.data?.[interactiveIndex] || null;
  }, [interactiveIndex, slide.data]);

  const toggleSlice = (index) => {
    setActiveSliceIndex((prev) => (prev === index ? null : index));
  };

  const legendInteraction = reducedMotion
    ? "ui-focus"
    : "ui-focus ui-hover ui-press ui-underline";

  return (
    <div className="py-6">
      <header className="text-center">
        <div className="section-label text-[var(--text-1)]">{slide.section}</div>
        <h2
          className="slide-title mx-auto mt-3 max-w-5xl text-balance break-normal"
          style={{ overflowWrap: "normal", wordBreak: "normal" }}
        >
          {slide.title}
        </h2>
        {slide.question ? (
          <p className="mx-auto mt-2 max-w-3xl text-[0.8rem] text-[var(--text-2)]">{slide.question}</p>
        ) : null}
      </header>

      <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_320px]">
        <motion.div
          className="glass-card h-[380px] w-full border border-[var(--border)] bg-[var(--surface-1)] p-2"
          variants={reducedMotion ? undefined : fadeUp}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slide.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ value }) => `${toPercent(value, total)}%`}
                isAnimationActive={!reducedMotion}
                animationDuration={900}
                activeIndex={interactiveIndex ?? undefined}
                activeShape={renderActiveShape}
                onClick={(_, index) => toggleSlice(index)}
                onMouseEnter={(_, index) => setHoveredSliceIndex(index)}
                onMouseLeave={() => setHoveredSliceIndex(null)}
              >
                {(slide.data || []).map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      cursor: "pointer",
                      filter:
                        hoveredSliceIndex === index && activeSliceIndex == null
                          ? "brightness(1.1)"
                          : "none",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip reducedMotion={reducedMotion} />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.aside
          className="glass-card border border-[var(--border)] bg-[var(--surface-1)] p-5"
          variants={reducedMotion ? undefined : staggerChildren}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <div className="section-label text-[var(--text-1)]">Breakdown</div>

          <AnimatePresence>
            {selectedItem ? (
              <motion.div
                className="mt-2 ui-active ui-underline border px-2 py-1 text-[0.7rem] text-[var(--text-1)]"
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: 6 }}
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                Selected: {selectedItem.name} - {selectedItem.value} ({toPercent(selectedItem.value, total)}%)
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-3 space-y-2">
            {(slide.data || []).map((item, index) => {
              const isSelected = interactiveIndex === index;
              return (
                <motion.button
                  type="button"
                  key={item.name}
                  variants={reducedMotion ? undefined : listItem}
                  className={clsx(
                    "flex w-full items-center justify-between gap-2 border px-2 py-1 text-[0.72rem]",
                    legendInteraction,
                    isSelected && "ui-active"
                  )}
                  style={{
                    borderColor: isSelected ? "var(--accent-blue)" : "var(--border)",
                    background: isSelected ? "color-mix(in srgb, var(--accent-cyan) 6%, transparent)" : "transparent",
                    color: isSelected ? "var(--text-1)" : "var(--text-2)",
                  }}
                  onClick={() => toggleSlice(index)}
                  onMouseEnter={() => setHoveredSliceIndex(index)}
                  onMouseLeave={() => setHoveredSliceIndex(null)}
                >
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="inline-block h-3 w-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      whileHover={reducedMotion ? undefined : { scale: 1.08 }}
                      transition={{ duration: 0.16 }}
                    />
                    <span className="ui-underline">{item.name}</span>
                  </span>
                  <span className="ui-underline" style={{ color: "var(--text-1)" }}>
                    {item.value} ({toPercent(item.value, total)}%)
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="mt-4 text-[0.68rem] text-[var(--text-3)]">
            Total respondents: <span>{total}</span>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

