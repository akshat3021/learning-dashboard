"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Course } from "@/types";
import { Code2, Layers, Paintbrush, FileCode, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2, Layers, Paintbrush, FileCode, BookOpen,
};

const CARD_ACCENTS = [
  { bg: "rgba(0, 212, 170, 0.06)", border: "rgba(0, 212, 170, 0.15)", text: "#00d4aa" },
  { bg: "rgba(99, 102, 241, 0.06)", border: "rgba(99, 102, 241, 0.15)", text: "#818cf8" },
  { bg: "rgba(245, 158, 11, 0.06)", border: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" },
  { bg: "rgba(236, 72, 153, 0.06)", border: "rgba(236, 72, 153, 0.15)", text: "#f472b6" },
];

export default function CourseTile({ course, index = 0 }: { course: Course; index?: number }) {
  const Icon = iconMap[course.icon_name] || BookOpen;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  useEffect(() => {
    if (inView) controls.start({ width: `${course.progress}%` });
  }, [inView, controls, course.progress]);

  return (
    <article
      ref={ref}
      className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border"
      style={{
        background: "#0f1318",
        borderColor: accent.border,
        minHeight: "160px",
      }}
    >
      {/* Watermark number */}
      <div
        className="absolute -right-3 -top-2 font-black select-none pointer-events-none"
        style={{
          fontSize: "6rem",
          lineHeight: 1,
          color: accent.text,
          opacity: 0.06,
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        {course.progress}
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: accent.bg, border: `1px solid ${accent.border}` }}
        >
          <Icon size={16} style={{ color: accent.text }} />
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            color: accent.text,
            backgroundColor: accent.bg,
            border: `1px solid ${accent.border}`,
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          {course.progress}%
        </span>
      </div>

      {/* Title + Progress */}
      <div className="relative z-10 mt-4">
        <h3 className="text-white font-semibold text-sm leading-snug mb-4">
          {course.title}
        </h3>
        <div className="h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accent.text }}
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </div>
    </article>
  );
}