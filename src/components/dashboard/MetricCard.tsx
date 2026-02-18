"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { Metric } from "@/lib/mock-data";

type MetricCardProps = {
  metric: Metric;
  sparkline: number[];
};

function CpuArc({ value }: { value: number }) {
  const normalized = Math.max(0, Math.min(100, value)) / 100;

  return (
    <div className="h-12 w-12">
      <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
        <circle cx="21" cy="21" r="16" fill="none" stroke="var(--grey-dim)" strokeWidth="2" />
        <motion.circle
          cx="21"
          cy="21"
          r="16"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2"
          strokeLinecap="square"
          strokeDasharray="100"
          strokeDashoffset={100 - normalized * 100}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          pathLength={normalized}
        />
      </svg>
    </div>
  );
}

function MemoryBar({ value }: { value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div className="h-12 w-9 border border-[var(--grey-dim)] p-1">
      <div className="relative h-full w-full">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[var(--paper)]"
          initial={{ height: 0 }}
          animate={{ height: `${normalized}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function MetricCard({ metric, sparkline }: MetricCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const sparkData = useMemo(
    () => sparkline.map((value, index) => ({ x: index + 1, y: value })),
    [sparkline]
  );

  return (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      className={clsx(
        "group border border-[var(--grey-dim)] p-3 text-left transition-colors duration-200",
        "hover:border-[var(--paper)]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--grey-light)] transition-opacity group-hover:opacity-70">
            {metric.label}
          </div>
          <div className="mt-2 font-mono-data text-2xl leading-none md:text-3xl">
            <CountUp
              end={metric.value}
              decimals={metric.id === "uptime" ? 0 : 0}
              duration={0.4}
            />
            {metric.unit ? <span className="ml-1 text-base text-[var(--grey-light)]">{metric.unit}</span> : null}
          </div>
        </div>

        {metric.id === "cpu" ? <CpuArc value={metric.value} /> : null}
        {metric.id === "memory" ? <MemoryBar value={metric.value} /> : null}
      </div>

            <motion.div
        initial={false}
        animate={{ height: expanded ? 64 : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="overflow-hidden"
      >
        {expanded ? (
          <div className="mt-3 h-16 border-t border-[var(--grey-dim)] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="var(--paper)"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </motion.div>
    </button>
  );
}