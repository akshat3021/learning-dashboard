"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Sparkles } from "lucide-react";

export default function HeroTile() {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [focusMode, setFocusMode] = useState<string>("Deep Work");

  useEffect(() => {
    // Prevent SSR hydration mismatch by only running clock on client
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const focusModes = ["Deep Work", "Relaxed Study", "Sprint Mode"];

  return (
    <motion.article
      className="rounded-2xl p-5 sm:p-8 relative overflow-hidden border border-white/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between"
      style={{
        backgroundImage:
          "linear-gradient(-45deg, #090b0f 0%, #11141e 35%, #0d1017 70%, #090b0f 100%)",
        backgroundSize: "400% 400%",
        minHeight: "180px",
        willChange: "transform",
      }}
      // Shifting background gradient animation
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Premium subtle light glow inside Hero card */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[200px] h-[200px] bg-indigo-500/[0.04] rounded-full blur-[60px] pointer-events-none" />

      {/* Row 1: Greeting & Monospace Clock */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 z-10">
        <div>
          <span
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex flex-wrap items-center gap-1.5 mb-2"
            style={{
              color: "#00d4aa",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            <Sparkles size={11} className="animate-pulse" />
            System Live / Active
            {time && (
              <>
                <span className="text-slate-600 font-normal mx-0.5">•</span>
                <span className="text-slate-300 font-semibold tracking-wider tabular-nums">
                  {time}
                </span>
                <span className="text-slate-600 font-normal mx-0.5 hidden sm:inline">•</span>
                <span className="text-slate-500 font-medium tracking-normal normal-case hidden sm:inline">
                  {dateStr}
                </span>
              </>
            )}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400">Akshat</span>.
          </h2>
        </div>
      </div>

      {/* Row 2: Streak badges + Focus selector */}
      <div className="flex flex-wrap items-end justify-between gap-4 mt-8 z-10">
        {/* Streak & Active Courses count */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Flame streak */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-xl px-3 py-2 border cursor-default shadow-md"
            style={{
              backgroundColor: "rgba(0, 212, 170, 0.06)",
              borderColor: "rgba(0, 212, 170, 0.15)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Flame size={15} className="text-orange-500 fill-orange-500/20" />
            </motion.div>
            <span
              className="text-xs font-semibold"
              style={{
                color: "#00d4aa",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              7 DAY STREAK
            </span>
          </motion.div>

          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 border border-white/[0.04] bg-slate-900/40 backdrop-blur-sm"
          >
            <span
              className="text-slate-400 text-xs font-medium"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              4 ACTIVE COURSES
            </span>
          </div>
        </div>

        {/* Focus Mode Selector */}
        <div className="flex gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-white/[0.04] relative">
          {focusModes.map((mode) => {
            const isActive = focusMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setFocusMode(mode)}
                className="relative px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide cursor-pointer z-10 transition-colors duration-300"
                style={{ color: isActive ? "#00d4aa" : "#64748b" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="heroFocusBg"
                    className="absolute inset-0 rounded-lg bg-teal-500/15 border border-teal-500/35 shadow-[0_0_8px_rgba(20,184,166,0.25)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {mode}
              </button>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}