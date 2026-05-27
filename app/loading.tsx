"use client";

import { motion } from "framer-motion";
import React from "react";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`rounded-2xl ${className} border border-white/[0.04]`}
      style={{ backgroundColor: "rgba(13, 19, 38, 0.25)", ...style }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Loading() {
  return (
    <div className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Hero Tile skeleton */}
        <SkeletonBlock
          className="col-span-1 md:col-span-2 lg:col-span-2"
          style={{ minHeight: "220px" }}
        />
        
        {/* Stats Tile skeleton */}
        <SkeletonBlock
          className="col-span-1 md:col-span-2 lg:col-span-1"
          style={{ minHeight: "220px" }}
        />
        
        {/* Course tiles skeletons */}
        <SkeletonBlock
          className="col-span-1"
          style={{ minHeight: "170px" }}
        />
        <SkeletonBlock
          className="col-span-1"
          style={{ minHeight: "170px" }}
        />
        <SkeletonBlock
          className="col-span-1"
          style={{ minHeight: "170px" }}
        />
        
        {/* Activity Tile skeleton */}
        <SkeletonBlock
          className="col-span-1 md:col-span-2 lg:col-span-2"
          style={{ minHeight: "200px" }}
        />
        
        {/* 4th Course tile skeleton */}
        <SkeletonBlock
          className="col-span-1"
          style={{ minHeight: "170px" }}
        />
      </section>
    </div>
  );
}