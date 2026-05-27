"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Award, Zap } from "lucide-react";

export default function StatsTile() {
  const stats = [
    { label: "Hours this week", value: "12.4", unit: "hrs", icon: Zap, color: "#00d4aa" },
    { label: "Lessons completed", value: "38", unit: "", icon: Award, color: "#818cf8" },
    { label: "Streak average", value: "94", unit: "%", icon: TrendingUp, color: "#fbbf24" },
  ];

  // Coordinates for our SVG weekly hours sparkline
  const chartPath = "M 10 55 C 35 40, 55 75, 80 30 C 105 10, 130 65, 155 35 C 180 15, 205 45, 230 15";

  return (
    <motion.article
      className="rounded-2xl p-5 sm:p-6 h-full flex flex-col glass-panel relative overflow-hidden justify-between border transition-colors duration-300"
      style={{
        minHeight: "220px",
        willChange: "transform",
      }}
      whileHover={{
        borderColor: "rgba(0, 212, 170, 0.35)",
        boxShadow: "0 12px 40px -4px rgba(0, 212, 170, 0.18), 0 4px 12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(0,212,170,0.06) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Header row */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span
          className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
          style={{
            color: "#00d4aa",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          <BarChart2 size={12} />
          Activity Analytics
        </span>
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-white/[0.03] border border-white/[0.04] px-2 py-0.5 rounded-md">
          Weekly view
        </span>
      </div>

      {/* Row 2: Sparkline Chart & Metrics Side-by-Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center relative z-10 mt-2">
        
        {/* Interactive SVG Sparkline */}
        <div className="flex flex-col gap-1 bg-slate-950/40 border border-white/[0.04] p-3 rounded-xl relative overflow-hidden">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Study hours distribution
          </span>
          <div className="h-16 w-full flex items-end justify-center relative">
            <svg
              viewBox="0 0 240 70"
              className="w-full h-full overflow-visible"
              fill="none"
            >
              {/* Grid line guidelines */}
              <line x1="0" y1="55" x2="240" y2="55" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <line x1="0" y1="35" x2="240" y2="35" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <line x1="0" y1="15" x2="240" y2="15" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

              {/* Area fill under the chart */}
              <path
                d="M 10 55 C 35 40, 55 75, 80 30 C 105 10, 130 65, 155 35 C 180 15, 205 45, 230 15 L 230 65 L 10 65 Z"
                fill="url(#sparklineFill)"
                opacity={0.15}
              />

              {/* Glowing chart path */}
              <motion.path
                d={chartPath}
                stroke="url(#sparklineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
              />

              {/* Define gradients */}
              <defs>
                <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00d4aa" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Day indicators */}
          <div className="flex justify-between text-[8px] text-slate-600 font-bold tracking-wider mt-1 px-1">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>

        {/* Metrics Grid list */}
        <div className="flex flex-col gap-2">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900/20 border border-white/[0.02] hover:border-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center border border-white/[0.04]"
                    style={{ backgroundColor: `${s.color}08` }}
                  >
                    <Icon size={12} style={{ color: s.color }} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {s.label}
                  </span>
                </div>
                <span
                  className="text-xs font-bold text-slate-200"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {s.value}
                  <span className="text-[9px] font-semibold ml-0.5" style={{ color: s.color }}>
                    {s.unit}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}