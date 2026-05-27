"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Calendar, Activity } from "lucide-react";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.03)",
  "rgba(0, 212, 170, 0.18)",
  "rgba(0, 212, 170, 0.35)",
  "rgba(0, 212, 170, 0.6)",
  "rgba(0, 212, 170, 0.95)",
];

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

interface DayData {
  dayNum: number;
  level: number;
}

interface MonthData {
  name: string;
  weeks: DayData[][];
}

function generateMonths() {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const now = new Date();
  const months: MonthData[] = [];

  for (let m = 11; m >= 0; m--) {
    const date = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const recency = 1 - m / 12;

    // Shift Sunday (0) to index 6, Monday (1) to index 0...
    const firstDayOfWeek = (date.getDay() + 6) % 7;
    const totalCells = firstDayOfWeek + daysInMonth;
    const totalWeeks = Math.ceil(totalCells / 7);

    const weeks = Array.from({ length: totalWeeks }, (_, wi) =>
      Array.from({ length: 7 }, (_, di) => {
        const cellIndex = wi * 7 + di;
        const dayNum = cellIndex - firstDayOfWeek + 1;

        if (dayNum < 1 || dayNum > daysInMonth) {
          return { dayNum: -1, level: -1 };
        }

        const rand = Math.random();
        let level = 0;
        if (rand < 0.40) level = 0;
        else if (rand < 0.60) level = 1;
        else if (rand < 0.75) level = recency > 0.5 ? 3 : 2;
        else if (rand < 0.90) level = recency > 0.5 ? 4 : 3;
        else level = 4;

        return { dayNum, level };
      })
    );

    months.push({ name: monthNames[monthIndex], weeks });
  }
  return months;
}

export default function ActivityTile() {
  const [months, setMonths] = useState<MonthData[]>([]);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    setMonths(generateMonths());
  }, []);

  const totalContributions = months
    .flatMap((m) => m.weeks.flat())
    .filter((d) => d && d.level > 0).length * 3;

  const filters = ["All", "Lessons", "Coding"];

  // Helper to describe contributions in tooltips
  const getActivityText = (level: number) => {
    if (level === 0) return "No activity";
    if (level === 1) return "1 lesson completed";
    if (level === 2) return "3 tasks completed";
    if (level === 3) return "5 coding tasks";
    return "8+ contributions (Deep Work)";
  };

  return (
    <motion.article
      className="rounded-2xl p-4 sm:p-6 glass-panel relative overflow-hidden flex flex-col border transition-colors duration-300"
      whileHover={{
        borderColor: "rgba(0, 212, 170, 0.35)",
        boxShadow: "0 12px 40px -4px rgba(0, 212, 170, 0.18), 0 4px 12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 z-10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight flex items-center gap-1.5">
              Learning Activity
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              <span style={{ color: "#00d4aa" }} className="font-bold">
                {totalContributions}
              </span>{" "}
              contributions in the last year
            </p>
          </div>
        </div>

        {/* Filter and Legend Row */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Activity Category Filters */}
          <div className="flex gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/[0.04]">
            {filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide cursor-pointer z-10 transition-colors"
                  style={{ color: isActive ? "#00d4aa" : "#64748b" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activityFilterBg"
                      className="absolute inset-0 rounded-lg bg-teal-500/15 border border-teal-500/35 shadow-[0_0_8px_rgba(20,184,166,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-semibold uppercase tracking-wider bg-white/[0.01] border border-white/[0.03] px-2 py-1 rounded-lg">
            <span>Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  backgroundColor: color,
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Grid Heatmap with horizontal scrolling */}
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
        {/* Day labels (Mon, Wed, Fri, Sun) */}
        <div className="flex flex-col gap-[3px] mr-2 flex-shrink-0 pt-[24px]">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="text-slate-600 font-bold flex items-center flex-shrink-0"
              style={{ fontSize: 8, height: 9 }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Month columns */}
        <div className="flex gap-2">
          {months.map((month, mi) => (
            <motion.div
              key={mi}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: mi * 0.05 }}
              className="flex flex-col flex-shrink-0"
            >
              {/* Month Header */}
              <div
                className="text-slate-500 mb-1.5 font-bold tracking-wider uppercase"
                style={{ fontSize: 9 }}
              >
                {month.name}
              </div>

              {/* Weeks grid */}
              <div className="flex gap-[3px]">
                {month.weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => {
                      if (day.level === -1) {
                        return <div key={di} style={{ width: 9, height: 9, flexShrink: 0 }} />;
                      }
                      
                      const displayDate = `${month.name} ${day.dayNum}`;
                      const tooltipText = `${getActivityText(day.level)} on ${displayDate}`;

                      return (
                        <div key={di} className="relative group flex-shrink-0">
                          {/* Heatmap Block */}
                          <div
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2.2,
                              backgroundColor: LEVEL_COLORS[day.level],
                              border: "1px solid rgba(255,255,255,0.03)",
                              cursor: "pointer",
                              transition: "opacity 0.2s, transform 0.2s",
                            }}
                            className="hover:scale-[1.25] hover:opacity-85"
                          />

                          {/* CSS-Only Tooltip (Zero Repaints / Zero layout shifts) */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                            <div className="bg-slate-950/95 border border-white/[0.08] text-white text-[9px] font-bold py-1.5 px-2 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.5)] whitespace-nowrap leading-none tracking-wide">
                              {tooltipText}
                            </div>
                            <div className="w-1.5 h-1.5 bg-slate-950/95 border-r border-b border-white/[0.08] rotate-45 -mt-[4px]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}