"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // seconds
  variant?: "rv" | "rv-fade" | "rv-pop";
  rotate?: number;
  /** when true, reveal immediately (used for staged hero reveal after cover) */
  immediate?: boolean;
  as?: "div" | "span";
}

/** Staged scroll/mount reveal, mirrors the one-by-one appearance in the reference video. */
export default function Reveal({
  children, className = "", style, delay = 0, variant = "rv", rotate = 0, immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (immediate) { const t = setTimeout(() => setOn(true), 30); return () => clearTimeout(t); }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={`${variant} ${on ? "on" : ""} ${className}`}
      style={{ ["--d" as string]: `${delay}s`, ["--r" as string]: `${rotate}deg`, ...style }}
    >
      {children}
    </div>
  );
}
