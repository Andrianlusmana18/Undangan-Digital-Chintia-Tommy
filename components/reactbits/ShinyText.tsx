"use client";

import React from "react";

interface ShinyTextProps {
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  shimmerColor?: string;
}

/**
 * React Bits - ShinyText
 * A subtle, elegant light sweep across royal typography.
 */
export default function ShinyText({
  children,
  text,
  disabled = false,
  speed = 4.5,
  className = "",
  shimmerColor = "rgba(255, 235, 185, 0.95)",
}: ShinyTextProps) {
  const content = text || children;

  if (disabled) {
    return <span className={className}>{content}</span>;
  }

  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent select-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, currentColor 0%, currentColor 36%, ${shimmerColor} 50%, currentColor 64%, currentColor 100%)`,
        backgroundSize: "220% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-sweep ${speed}s ease-in-out infinite`,
      }}
    >
      {content}
    </span>
  );
}
