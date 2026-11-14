"use client";

import React from "react";

interface ShinyTextProps {
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  delay?: number; // optional initial animation delay in seconds
  className?: string;
  baseColor?: string;
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
  delay = 0,
  className = "",
  baseColor = "currentColor",
  shimmerColor = "rgba(212, 168, 96, 0.98)",
}: ShinyTextProps) {
  const content = text || children;

  if (disabled) {
    return <span className={className}>{content}</span>;
  }

  return (
    <span
      className={`inline-block bg-clip-text select-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 42%, ${shimmerColor} 50%, ${baseColor} 58%, ${baseColor} 100%)`,
        backgroundSize: "250% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-sweep ${speed}s ease-in-out ${delay}s infinite`,
      }}
    >
      {content}
    </span>
  );
}
