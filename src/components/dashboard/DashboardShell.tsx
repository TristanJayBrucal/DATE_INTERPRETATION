"use client";

import { motion, type Variants } from "framer-motion";
import ActivityGraph from "@/components/dashboard/ActivityGraph";
import LogFeed from "@/components/dashboard/LogFeed";
import MetricsStrip from "@/components/dashboard/MetricsStrip";
import SystemHeader from "@/components/dashboard/SystemHeader";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function DashboardShell() {
  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <motion.div
        className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-8 md:py-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="mb-6 border-b border-[var(--grey-dim)] pb-4 font-label text-xs uppercase tracking-[0.24em] text-[var(--grey-light)]">
          System Status Dashboard
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_1fr] md:grid-rows-[auto_auto_1fr]">
          <motion.section variants={item} className="md:col-start-1 md:row-start-1">
            <SystemHeader />
          </motion.section>

          <motion.section variants={item} className="md:col-start-1 md:row-start-2">
            <MetricsStrip />
          </motion.section>

          <motion.section variants={item} className="md:col-start-1 md:row-start-3">
            <ActivityGraph />
          </motion.section>

          <motion.section
            variants={item}
            className="md:col-start-2 md:row-start-1 md:row-span-3 md:-mt-6"
          >
            <LogFeed />
          </motion.section>
        </div>
      </motion.div>
    </main>
  );
}