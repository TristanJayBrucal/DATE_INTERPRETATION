"use client";

import { logLines } from "@/lib/mock-data";

export default function LogFeed() {
  const duplicated = [...logLines, ...logLines];

  return (
    <div className="log-feed h-[420px] border border-[var(--grey-dim)] p-4 md:h-[100%]">
      <div className="mb-3 font-label text-xs uppercase tracking-[0.2em] text-[var(--grey-light)]">
        Log Feed
      </div>
      <div className="h-[calc(100%-1.5rem)] overflow-hidden border-l border-[var(--grey-dim)] pl-3">
        <div className="log-marquee">
          {duplicated.map((line, index) => (
            <div
              key={`${line.timestamp}-${line.message}-${index}`}
              className="py-1 font-mono-data text-[11px] leading-[1.2rem]"
            >
              <span className="text-[var(--grey-mid)]">[{line.timestamp}]</span>{" "}
              <span className="text-[var(--paper)]">{line.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}