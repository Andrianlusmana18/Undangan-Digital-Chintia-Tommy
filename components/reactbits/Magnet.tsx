"use client";

import React, { useRef, useState, useCallback } from "react";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
}

/**
 * React Bits - Magnet
 * Attracts elements smoothly toward the user's cursor.
 */
export default function Magnet({
  children,
  className = "",
  padding = 40,
  disabled = false,
  magnetStrength = 0.28,
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDist = Math.max(width, height) / 2 + padding;

      if (dist < maxDist) {
        const deltaX = (e.clientX - centerX) * magnetStrength;
        const deltaY = (e.clientY - centerY) * magnetStrength;
        setPosition({ x: deltaX, y: deltaY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [disabled, padding, magnetStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
