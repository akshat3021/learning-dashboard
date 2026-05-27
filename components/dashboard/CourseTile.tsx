"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Course } from "@/types";
import { Code2, Layers, Paintbrush, FileCode, BookOpen, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Paintbrush,
  FileCode,
  BookOpen,
};

const CARD_ACCENTS = [
  {
    bg: "rgba(0, 212, 170, 0.05)",
    border: "rgba(0, 212, 170, 0.15)",
    glow: "rgba(0, 212, 170, 0.14)",
    text: "#00d4aa",
    shadow: "shadow-[0_8px_30px_-6px_rgba(0,212,170,0.14),0_4px_12px_rgba(0,0,0,0.4)]",
  },
  {
    bg: "rgba(99, 102, 241, 0.05)",
    border: "rgba(99, 102, 241, 0.15)",
    glow: "rgba(99, 102, 241, 0.14)",
    text: "#818cf8",
    shadow: "shadow-[0_8px_30px_-6px_rgba(99,102,241,0.14),0_4px_12px_rgba(0,0,0,0.4)]",
  },
  {
    bg: "rgba(245, 158, 11, 0.05)",
    border: "rgba(245, 158, 11, 0.15)",
    glow: "rgba(245, 158, 11, 0.14)",
    text: "#fbbf24",
    shadow: "shadow-[0_8px_30px_-6px_rgba(245,158,11,0.14),0_4px_12px_rgba(0,0,0,0.4)]",
  },
  {
    bg: "rgba(236, 72, 153, 0.05)",
    border: "rgba(236, 72, 153, 0.15)",
    glow: "rgba(236, 72, 153, 0.14)",
    text: "#f472b6",
    shadow: "shadow-[0_8px_30px_-6px_rgba(236,72,153,0.14),0_4px_12px_rgba(0,0,0,0.4)]",
  },
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`;

export default function CourseTile({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  const Icon = iconMap[course.icon_name] || BookOpen;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${course.progress}%` });
    }
  }, [inView, controls, course.progress]);

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 ${accent.shadow} cursor-pointer`}
      style={{
        background: "rgba(12, 16, 23, 0.82)",
        backdropFilter: "blur(8px)",
        borderColor: accent.border,
        minHeight: "170px",
        willChange: "transform",
      }}
      whileHover={{
        scale: 1.025,
        borderColor: accent.text,
        boxShadow: `0 12px 40px -4px ${accent.text}35, 0 4px 12px rgba(0,0,0,0.5)`,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at center, ${accent.glow} 0%, transparent 65%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: GRAIN,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Radial Gradient Mesh in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 10% 10%, ${accent.bg} 0%, transparent 50%)`,
        }}
      />

      {/* Watermark number in background */}
      <div
        className="absolute -right-2 -top-1 font-black select-none pointer-events-none"
        style={{
          fontSize: "6.5rem",
          lineHeight: 1,
          color: accent.text,
          opacity: 0.025,
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        {course.progress}
      </div>

      {/* Card Header Row */}
      <div className="flex items-center justify-between relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
          style={{
            backgroundColor: accent.bg,
            borderColor: accent.border,
          }}
        >
          <Icon size={18} style={{ color: accent.text }} />
        </div>
        
        {/* Progress badge or floating arrow on hover */}
        <div className="relative w-12 h-6 flex items-center justify-end overflow-hidden">
          <AnimatePresence mode="popLayout">
            {!hovered ? (
              <motion.span
                key="progress-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wider"
                style={{
                  color: accent.text,
                  backgroundColor: accent.bg,
                  border: `1px solid ${accent.border}`,
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                {course.progress}%
              </motion.span>
            ) : (
              <motion.div
                key="resume-arrow"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: accent.text,
                  boxShadow: `0 0 10px ${accent.text}60`,
                }}
              >
                <ArrowRight size={12} className="text-slate-950 font-bold" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Card Bottom Row: Title + Progress Bar */}
      <div className="relative z-10 mt-6">
        <h3 className="text-white font-bold text-sm tracking-wide leading-snug mb-3 group-hover:text-teal-400 transition-colors">
          {course.title}
        </h3>
        
        {/* Progress Track */}
        <div
          className="h-2 rounded-full overflow-hidden relative"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          {/* Progress bar track indicator */}
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: `linear-gradient(90deg, ${accent.text} 0%, ${accent.text} 100%)`,
            }}
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
          >
            {/* Glowing bead at tip of bar */}
            <motion.div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white ${accent.shadow}`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}