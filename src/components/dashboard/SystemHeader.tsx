"use client";

import { useEffect, useMemo, useState } from "react";
import { systemIdentity } from "@/lib/mock-data";

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function SystemHeader() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const identityLine = useMemo(
    () => `${systemIdentity.os} / ${systemIdentity.shell}`,
    []
  );

  return (
    <div className="border border-[var(--grey-dim)] p-4 md:p-6">
      <div className="font-mono-data text-[54px] leading-none tracking-tight md:text-[92px]">
        {formatTime(now)}
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono-data text-xs text-[var(--grey-mid)] md:text-sm">
        <span>{identityLine}</span>
        <span className="cursor-block" aria-hidden="true" />
      </div>
    </div>
  );
}