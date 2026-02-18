"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fadeUp, useReducedMotionPreference } from "@/lib/motion";

function ValueLabel({ x, y, width, height, value, index, isMeanBars, data, total }) {
  const raw = Number(value) || 0;
  const freq = Number(data?.[index]?.frequency ?? raw) || 0;
  const percent = total > 0 ? ((freq / total) * 100).toFixed(1) : "0.0";
  const text = isMeanBars ? raw.toFixed(2) : `${freq} (${percent}%)`;

  return (
    <text
      x={(x || 0) + (width || 0) + 8}
      y={(y || 0) + (height || 0) / 2 + 4}
      textAnchor="start"
      fontSize={11}
      fill="#334155"
      fontWeight={600}
      style={{ pointerEvents: "none" }}
    >
      {text}
    </text>
  );
}

export default function SlideChartBars({ slide, mode }) {
  const reducedMotion = useReducedMotionPreference();
  const isMeanBars = mode === "meanBars" || slide.type === "meanBars";

  const chartData = isMeanBars
    ? (slide.data || []).map((item) => ({
        name: item.name,
        value: Number(item.mean) || 0,
        mean: Number(item.mean) || 0,
      }))
    : (slide.categories || []).map((category, index) => {
        const frequency = Number(slide.values?.[index]) || 0;
        return {
          name: category,
          value: frequency,
          frequency,
        };
      });

  const total = isMeanBars
    ? 0
    : chartData.reduce((sum, item) => sum + (Number(item.frequency) || 0), 0);

  const maxValue = chartData.reduce((max, item) => Math.max(max, Number(item.value) || 0), 0);

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
          <p className="mx-auto mt-2 max-w-4xl text-[0.8rem] text-[var(--text-2)]">{slide.question}</p>
        ) : null}
      </header>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
        <motion.div
          className="glass-card relative h-[440px] w-full border border-[var(--border)] bg-[var(--surface-1)] p-3"
          variants={reducedMotion ? undefined : fadeUp}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 140, left: 24, bottom: 20 }}
            >
              <CartesianGrid
                stroke="rgba(15,23,42,0.14)"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                domain={[0, (dataMax) => Math.ceil((Number(dataMax) || 0) * (isMeanBars ? 1.15 : 1.2))]}
                allowDecimals={isMeanBars}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#334155", fontWeight: 600 }}
                width={190}
              />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#0E84A2"
                radius={0}
                barSize={30}
                isAnimationActive={!reducedMotion}
              >
                <LabelList
                  dataKey="value"
                  content={(props) => (
                    <ValueLabel
                      {...props}
                      isMeanBars={isMeanBars}
                      data={chartData}
                      total={total}
                    />
                  )}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.aside
          className="glass-card border border-[var(--border)] bg-[var(--surface-1)] p-5"
          variants={reducedMotion ? undefined : fadeUp}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <div className="section-label text-[var(--text-1)]">Summary</div>

          {!isMeanBars && typeof slide.mean === "number" ? (
            <div className="mt-4">
              <div className="text-[0.78rem] text-[var(--text-2)]">Weighted Mean</div>
              <div className="mean-badge mt-2">
                <span className="text-[2rem] text-[var(--text-1)]">
                  <CountUp end={slide.mean} decimals={2} duration={0.9} preserveValue={false} />
                </span>
              </div>
              <div className="mt-2 text-[0.68rem] text-[var(--text-3)]">Animated on slide load.</div>
            </div>
          ) : (
            <div className="mt-4 text-[0.78rem] text-[var(--text-2)]">
              {isMeanBars
                ? `Highest mean: ${maxValue.toFixed(2)}`
                : `Total responses reflected: ${total}`}
            </div>
          )}

          <div className="mt-4 text-[0.68rem] text-[var(--text-3)]">Use the notes panel for detailed interpretation.</div>
        </motion.aside>
      </div>
    </div>
  );
}

