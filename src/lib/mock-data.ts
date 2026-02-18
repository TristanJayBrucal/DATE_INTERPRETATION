export type ActivityPoint = {
  hour: string;
  load: number;
};

export type MetricId = "cpu" | "memory" | "uptime" | "processes";

export type Metric = {
  id: MetricId;
  label: string;
  value: number;
  unit?: string;
};

export type LogLine = {
  timestamp: string;
  message: string;
};

const seeded = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const rand = seeded(1974);

export const systemIdentity = {
  os: "WIN_NT 10.0.26200",
  shell: "POWERSHELL 5.1",
};

export const metrics: Metric[] = [
  { id: "cpu", label: "CPU Usage", value: 62, unit: "%" },
  { id: "memory", label: "Memory", value: 74, unit: "%" },
  { id: "uptime", label: "Uptime", value: 1942, unit: "h" },
  { id: "processes", label: "Processes", value: 187 },
];

export const metricSparklines: Record<MetricId, number[]> = {
  cpu: [41, 46, 55, 49, 61, 58, 62],
  memory: [63, 66, 68, 70, 71, 73, 74],
  uptime: [1882, 1894, 1909, 1918, 1929, 1937, 1942],
  processes: [165, 171, 176, 172, 181, 185, 187],
};

const hours = Array.from({ length: 24 }, (_, i) => i);

export const activityData: ActivityPoint[] = hours.map((hour) => {
  const base = 30 + Math.sin((hour / 24) * Math.PI * 2) * 20;
  const noise = rand() * 14;
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    load: Math.max(8, Math.round(base + noise)),
  };
});

const logMessages = [
  "Kernel trace buffer rotated",
  "Memory reclaim cycle complete",
  "Scheduler quantum normalized",
  "IPC channel heartbeat acknowledged",
  "Filesystem watcher synchronized",
  "Telemetry snapshot persisted",
  "Process table integrity verified",
  "Runtime cache checkpointed",
  "Auth session token renewed",
  "Network route metric recalculated",
  "Disk queue depth stabilized",
  "I/O arbitration pass complete",
];

export const logLines: LogLine[] = Array.from({ length: 48 }, (_, i) => {
  const minute = (12 + i) % 60;
  const second = (i * 7) % 60;
  const hh = 14 + Math.floor((12 + i) / 60);
  const message = logMessages[i % logMessages.length];

  return {
    timestamp: `${hh.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`,
    message,
  };
});