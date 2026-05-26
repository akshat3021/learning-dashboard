"use client";

import { useState, useEffect } from "react";

const WEEK_COUNT = 16;
const DAY_COUNT = 7;

const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(67,56,202,0.6)",
  "rgba(99,102,241,0.6)",
  "rgba(129,140,248,0.8)",
  "rgba(165,180,252,1)",
];

export default function ActivityTile() {
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    const generated = Array.from({ length: WEEK_COUNT }, () =>
      Array.from({ length: DAY_COUNT }, () => Math.floor(Math.random() * 5))
    );
    setGrid(generated);
  }, []);

  return (
    <article className="bg-[#16161f] rounded-2xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Learning Activity</h3>
          <p className="text-slate-500 text-xs mt-0.5">Last 16 weeks</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span className="mr-1">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} style={{ backgroundColor: color }} className="w-3 h-3 rounded-sm" />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>

<div className="flex gap-1 w-full min-h-[88px]">
  {grid.map((week, w) => (
    <div key={w} style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
      {week.map((level, d) => (
        <div
          key={d}
          style={{
            backgroundColor: LEVEL_COLORS[level],
            height: 12,
            width: "100%",
            borderRadius: 3,
          }}
        />
      ))}
    </div>
  ))}
</div>
    </article>
  );
}