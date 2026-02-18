"use client";

import MetricCard from "@/components/dashboard/MetricCard";
import { metricSparklines, metrics } from "@/lib/mock-data";

export default function MetricsStrip() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          sparkline={metricSparklines[metric.id]}
        />
      ))}
    </div>
  );
}