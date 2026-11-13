"use client";

import React, { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms delay between each word/letter
  animationType?: "letter" | "word";
  threshold?: number;
}

/**
 * React Bits - SplitText
 * Splits text into words or letters that gracefully ascend into view when scrolled to.
 */
export default function SplitText({
  text,
  className = "",
  delay = 35,
  animationType = "letter",
  threshold = 0.15,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const items = animationType === "letter" ? text.split("") : text.split(" ");

  return (
    <span
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      aria-label={text}
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: `${index * delay}ms`,
            whiteSpace: item === " " ? "pre" : "normal",
          }}
        >
          {item}
          {animationType === "word" && index < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
