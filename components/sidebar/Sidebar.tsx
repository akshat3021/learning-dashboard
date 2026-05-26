"use client";

import { BookOpen, Home, BarChart2, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard" },
  { icon: BookOpen, label: "Courses" },
  { icon: BarChart2, label: "Progress" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* Desktop + Tablet Sidebar */}
      <nav className="hidden md:flex flex-col bg-[#0d0d14] border-r border-white/5 p-4 gap-1 flex-shrink-0
        w-48 lg:w-48 xl:w-56 min-h-screen">

        {/* Logo — hidden on tablet */}
        <div className="mb-8 px-2 pt-2 hidden lg:block">
          <h1 className="text-lg font-bold" style={{ color: "#00d4aa" }}>LearnOS</h1>
          <p className="text-slate-600 text-xs mt-0.5">Student Dashboard</p>
        </div>

        {/* Logo icon only — tablet */}
        <div className="mb-8 px-2 pt-2 lg:hidden flex justify-center">
          <span className="text-xl font-black" style={{ color: "#00d4aa" }}>L</span>
        </div>

        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left
              lg:justify-start justify-center"
          >
            {active === label && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 rounded-xl border"
                style={{
                  backgroundColor: "rgba(0,212,170,0.1)",
                  borderColor: "rgba(0,212,170,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon
              size={17}
              className="relative z-10 flex-shrink-0"
              style={{ color: active === label ? "#00d4aa" : "#4a5568" }}
            />
            {/* Label hidden on tablet */}
            <span
              className="relative z-10 hidden lg:block"
              style={{ color: active === label ? "#00d4aa" : "#4a5568" }}
            >
              {label}
            </span>
          </button>
        ))}

        {/* User — desktop only */}
        <div className="mt-auto pt-4 border-t border-white/5 hidden lg:block">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00d4aa, #6366f1)" }}>
              A
            </div>
            <div>
              <p className="text-slate-300 text-xs font-medium">Akshat</p>
              <p className="text-slate-600 text-xs">Pro Plan</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 border-t"
        style={{ backgroundColor: "#0d0d14", borderColor: "rgba(255,255,255,0.05)" }}>
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className="flex flex-col items-center gap-1 px-3 py-1"
          >
            <Icon
              size={20}
              style={{ color: active === label ? "#00d4aa" : "#4a5568" }}
            />
            <span className="text-xs" style={{ color: active === label ? "#00d4aa" : "#4a5568" }}>
              {label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}