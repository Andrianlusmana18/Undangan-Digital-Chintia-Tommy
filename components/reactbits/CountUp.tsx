"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // duration in seconds
  className?: string;
  padZero?: boolean;
}

/**
 * React Bits - CountUp
 * Smoothly interpolates numbers with easing.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  className = "",
  padZero = true,
}: CountUpProps) {
  const [current, setCurrent] = useState(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(from + (to - from) * easeProgress);
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrent(to);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, to, from, duration]);

  const displayValue = padZero ? String(current).padStart(2, "0") : String(current);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}
