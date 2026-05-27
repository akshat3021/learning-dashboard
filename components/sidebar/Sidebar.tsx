"use client";

import { BookOpen, Home, BarChart2, Settings, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard" },
  { icon: BookOpen, label: "Courses" },
  { icon: BarChart2, label: "Progress" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Desktop + Tablet Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 76 : 220 }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
        className="hidden md:flex flex-col bg-[#090b0f] border-r border-white/[0.04] p-4 gap-2 flex-shrink-0 min-h-screen relative select-none shadow-[4px_0_24px_rgba(0,0,0,0.4)]"
        style={{ willChange: "transform" }}
      >
        {/* Subtle top-right glow decoration inside sidebar */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="mb-8 px-2 pt-2 flex items-center justify-between relative z-10">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                  LearnOS
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Workspace
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse toggle button: styled as a floating glass circle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-white/[0.08] bg-slate-900/60 backdrop-blur-md cursor-pointer hover:border-teal-500/40 transition-colors shadow-lg ml-auto"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <ChevronRight size={14} className="text-teal-400" />
            ) : (
              <ChevronLeft size={14} className="text-slate-400" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-1.5 relative z-10">
          {navItems.map(({ icon: Icon, label }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                onMouseEnter={() => setHoveredItem(label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full text-left cursor-pointer transition-all duration-300 group"
                style={{ justifyContent: collapsed ? "center" : "flex-start" }}
              >
                {/* Active highlight Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Left Active Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-5 rounded-r-md bg-teal-400 shadow-[0_0_8px_#00d4aa]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Icon wrapper */}
                <motion.div
                  animate={{
                    scale: hoveredItem === label || isActive ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon
                    size={18}
                    className="transition-colors duration-300"
                    style={{ color: isActive ? "#2dd4bf" : "#64748b" }}
                  />
                </motion.div>

                {/* Nav item label */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 whitespace-nowrap overflow-hidden text-[13px] tracking-wide"
                      style={{ color: isActive ? "#f8fafc" : "#64748b" }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* User Profile widget at bottom */}
        <div className="mt-auto pt-4 border-t border-white/[0.06] relative z-10">
          <div
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl bg-slate-950/20 border border-transparent hover:border-white/[0.04] transition-colors"
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            {/* Avatar Container with glowing status dot */}
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-md relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #00d4aa 0%, #6366f1 100%)",
                }}
              >
                <span className="relative z-10 text-[11px] tracking-wider">AK</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            </div>

            {/* Profile Info */}
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col min-w-0"
                >
                  <p className="text-slate-200 text-xs font-semibold truncate leading-none">
                    Akshat
                  </p>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Premium Active
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Floating Bottom Glass Dock for Mobile (< 768px) */}
      <nav
        className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-around w-[90%] max-w-[400px] h-16 px-6 rounded-2xl glass-panel shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/[0.08]"
      >
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveNav"
                  className="absolute inset-0 rounded-xl bg-teal-500/10 border border-teal-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon
                size={18}
                className="relative z-10 transition-colors duration-300"
                style={{ color: isActive ? "#2dd4bf" : "#64748b" }}
              />
              <span
                className="text-[9px] font-semibold mt-1 relative z-10 transition-colors duration-300"
                style={{ color: isActive ? "#f8fafc" : "#64748b" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}