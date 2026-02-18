"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ActivityPoint } from "@/lib/mock-data";
import { activityData } from "@/lib/mock-data";

type TooltipPayload = {
  value: number;
  payload: ActivityPoint;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="border border-[var(--paper)] bg-[var(--ink)] px-3 py-2 font-mono-data text-xs text-[var(--paper)]">
      <div>{item.payload.hour}</div>
      <div className="mt-1">LOAD {item.value}%</div>
    </div>
  );
}

export default function ActivityGraph() {
  return (
    <div className="h-[340px] border border-[var(--grey-dim)] p-3 md:h-[420px] md:p-4">
      <div className="mb-3 font-label text-xs uppercase tracking-[0.2em] text-[var(--grey-light)]">
        Activity Graph
      </div>
      <div className="h-[calc(100%-1.5rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="hour"
              tick={{ fill: "#b8b8b8", fontSize: 9, fontFamily: "var(--font-ibm-plex-mono)" }}
              tickLine={{ stroke: "#b8b8b8" }}
              axisLine={false}
              interval={5}
            />
            <YAxis
              tick={{ fill: "#b8b8b8", fontSize: 9, fontFamily: "var(--font-ibm-plex-mono)" }}
              tickLine={{ stroke: "#b8b8b8" }}
              axisLine={false}
              width={24}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#b8b8b8", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="load"
              stroke="#f5f5f3"
              strokeWidth={1.5}
              fill="#1a1a1a"
              fillOpacity={1}
              isAnimationActive={true}
              animationDuration={400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}