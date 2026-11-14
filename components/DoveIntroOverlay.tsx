"use client";

import React, { useEffect, useId, useState } from "react";

interface DoveSvgProps {
  className?: string;
  withRibbon?: boolean;
  farWingOpacity?: number;
  wingDuration?: string;
  wingDelay?: string;
}

/**
 * Illustrated vintage engraved pearl-ivory dove with independently articulating
 * far wing, near wing, fanned tail, and optional trailing silk ribbon.
 */
function DoveSvg({
  className = "",
  withRibbon = false,
  farWingOpacity = 0.88,
  wingDuration = "0.42s",
  wingDelay = "0s",
}: DoveSvgProps) {
  const uid = useId().replace(/:/g, "");
  const bodyGradId = `doveBody-${uid}`;
  const nearWingGradId = `doveWingNear-${uid}`;
  const farWingGradId = `doveWingFar-${uid}`;
  const ribbonGradId = `doveRibbon-${uid}`;

  return (
    <svg viewBox="0 0 180 140" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={bodyGradId} x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="55%" stopColor="#f5ede3" />
          <stop offset="100%" stopColor="#dfd1c3" />
        </linearGradient>
        <linearGradient id={nearWingGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffefb" />
          <stop offset="65%" stopColor="#f4ece2" />
          <stop offset="100%" stopColor="#e2d4c7" />
        </linearGradient>
        <linearGradient id={farWingGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f0e7" />
          <stop offset="100%" stopColor="#d5c4b5" />
        </linearGradient>
        <linearGradient id={ribbonGradId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8b989" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#f7efe5" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#c7a67b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {withRibbon && (
        <g className="dove-ribbon">
          <path
            d="M142 52 C152 60, 144 74, 128 82 C108 92, 86 86, 62 100 C44 111, 28 118, 12 114"
            fill="none"
            stroke={`url(#${ribbonGradId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M142 52 C148 56, 138 69, 122 76 C103 84, 86 98, 66 112"
            fill="none"
            stroke={`url(#${ribbonGradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Far wing */}
      <g
        className="dove-wing-far"
        style={{
          transformOrigin: "92px 66px",
          opacity: farWingOpacity,
          ["--wdur" as string]: wingDuration,
          ["--wdelay" as string]: wingDelay,
        }}
      >
        <path
          d="M92 67 C84 44, 67 22, 46 11 C49 20, 53 28, 59 35 C52 28, 49 21, 56 17 C62 28, 66 37, 71 44 C66 31, 70 20, 77 21 C82 36, 87 52, 95 66 Z"
          fill={`url(#${farWingGradId})`}
          stroke="#755a4e"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M54 19 C64 33, 74 48, 86 63 M65 25 C73 38, 81 51, 89 64"
          fill="none"
          stroke="#8a6c5e"
          strokeOpacity="0.45"
          strokeWidth="0.7"
        />
      </g>

      {/* Fanned tail */}
      <g
        className="dove-tail"
        style={{
          transformOrigin: "72px 84px",
          ["--wdur" as string]: wingDuration,
          ["--wdelay" as string]: wingDelay,
        }}
      >
        <path
          d="M73 80 L23 94 C26 100, 35 101, 46 97 L28 106 C33 111, 43 110, 54 102 L40 113 C48 116, 58 110, 74 90 Z"
          fill={`url(#${bodyGradId})`}
          stroke="#6f5347"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M34 96 L69 83 M37 104 L71 86 M47 109 L73 88"
          fill="none"
          stroke="#8b6a56"
          strokeOpacity="0.4"
          strokeWidth="0.7"
        />
      </g>

      {/* Sculpted body & head */}
      <path
        d="M72 79 C81 69, 98 61, 108 50 C114 43, 123 41, 130 46 C133 48, 135 50, 143 51 C136 54, 134 56, 132 60 C128 66, 127 76, 118 85 C107 95, 89 95, 72 88 Z"
        fill={`url(#${bodyGradId})`}
        stroke="#6b5045"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path
        d="M119 67 C116 76, 108 84, 96 87 M111 69 C108 77, 100 83, 89 85"
        fill="none"
        stroke="#9b7b6b"
        strokeOpacity="0.35"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M76 89 C73 93, 69 95, 65 95 M73 91 C71 95, 68 97, 66 98"
        fill="none"
        stroke="#755a4e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="123" cy="50.2" r="1.8" fill="#3a2632" />
      <circle cx="123.5" cy="49.6" r="0.55" fill="#fffdf9" />

      {/* Near wing */}
      <g
        className="dove-wing-near"
        style={{
          transformOrigin: "93px 72px",
          ["--wdur" as string]: wingDuration,
          ["--wdelay" as string]: wingDelay,
        }}
      >
        <path
          d="M93 72 C80 48, 49 21, 17 14 C23 26, 29 35, 38 41 C28 36, 22 33, 18 35 C27 46, 37 53, 47 57 C36 54, 28 53, 27 57 C38 65, 51 70, 64 72 C75 74, 86 76, 95 75 Z"
          fill={`url(#${nearWingGradId})`}
          stroke="#6b5045"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M27 21 C46 37, 66 53, 89 69 M26 38 C45 49, 65 59, 87 70 M34 56 C52 63, 70 69, 88 72"
          fill="none"
          stroke="#8a6c5e"
          strokeOpacity="0.48"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M55 44 C64 52, 74 60, 86 67"
          fill="none"
          stroke="#b08f7c"
          strokeOpacity="0.45"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const SPARKLES = [
  { left: "48%", top: "36%", size: 16, delay: "0.18s", dur: "1.15s" },
  { left: "34%", top: "28%", size: 12, delay: "0.30s", dur: "1.20s" },
  { left: "64%", top: "30%", size: 14, delay: "0.34s", dur: "1.15s" },
  { left: "24%", top: "48%", size: 11, delay: "0.45s", dur: "1.10s" },
  { left: "75%", top: "46%", size: 13, delay: "0.48s", dur: "1.15s" },
  { left: "42%", top: "62%", size: 12, delay: "0.55s", dur: "1.10s" },
  { left: "58%", top: "68%", size: 14, delay: "0.62s", dur: "1.10s" },
  { left: "50%", top: "18%", size: 11, delay: "0.72s", dur: "1.05s" },
];

const PETALS = [
  { left: "28%", top: "22%", delay: "0.28s", dur: "1.45s", scale: 0.9, rot: -20 },
  { left: "68%", top: "20%", delay: "0.36s", dur: "1.40s", scale: 0.8, rot: 26 },
  { left: "46%", top: "32%", delay: "0.48s", dur: "1.35s", scale: 0.85, rot: -12 },
  { left: "20%", top: "54%", delay: "0.58s", dur: "1.25s", scale: 0.78, rot: 18 },
  { left: "78%", top: "50%", delay: "0.64s", dur: "1.25s", scale: 0.75, rot: -24 },
];

/**
 * 2-second transparent grand-reveal overlay triggered upon clicking "Buka Undangan":
 * parting sheer silk curtains + warm champagne light bloom + doves opening the veil
 * + twinkling gold sparkles directly over the emerging HeroCollage.
 */
export default function DoveIntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setExiting(true), 1650);
    const doneTimer = window.setTimeout(() => onCompleteRef.current(), 2000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-y-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 overflow-hidden select-none ${
        exiting ? "dove-intro-out" : ""
      }`}
      aria-hidden="true"
    >
      {/* Parting sheer silk curtains that glide open left & right to reveal HeroCollage */}
      <div className="veil-left absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(234,225,215,0.96) 0%, rgba(247,241,234,0.92) 55%, rgba(255,252,247,0.84) 94%, rgba(214,191,158,0.45) 100%)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow: "inset -1px 0 0 rgba(199,166,123,0.65), 8px 0 28px rgba(75,52,65,0.12)",
          }}
        />
      </div>
      <div className="veil-right absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(-90deg, rgba(234,225,215,0.96) 0%, rgba(247,241,234,0.92) 55%, rgba(255,252,247,0.84) 94%, rgba(214,191,158,0.45) 100%)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow: "inset 1px 0 0 rgba(199,166,123,0.65), -8px 0 28px rgba(75,52,65,0.12)",
          }}
        />
      </div>

      {/* Warm champagne golden sunbeam blooming outward from center seam */}
      <div
        className="veil-bloom absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,250,238,0.88) 0%, rgba(226,196,150,0.42) 34%, rgba(199,166,123,0.12) 60%, transparent 75%)",
        }}
      />

      {/* Twinkling 4-point champagne gold sparkles */}
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="gold-sparkle absolute opacity-0 drop-shadow-[0_0_6px_rgba(216,185,137,0.7)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            ["--sdelay" as string]: s.delay,
            ["--sdur" as string]: s.dur,
          }}
        >
          <path
            d="M12 1 C12.7 8.5, 15.5 11.3, 23 12 C15.5 12.7, 12.7 15.5, 12 23 C11.3 15.5, 8.5 12.7, 1 12 C8.5 11.3, 11.3 8.5, 12 1 Z"
            fill="#f4dfb8"
            stroke="#c7a67b"
            strokeWidth="0.6"
          />
        </svg>
      ))}

      {/* Drifting ivory feathers / silk petals */}
      {PETALS.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 36 18"
          className="dove-feather absolute h-3.5 w-7 opacity-0 drop-shadow-[0_3px_5px_rgba(60,40,35,0.16)]"
          style={{
            left: p.left,
            top: p.top,
            ["--fdelay" as string]: p.delay,
            ["--fdur" as string]: p.dur,
            ["--fscale" as string]: String(p.scale),
            ["--frot" as string]: `${p.rot}deg`,
          }}
        >
          <path
            d="M3 12 C11 5, 23 3, 33 6 C25 11, 15 14, 3 12 Z"
            fill="#fcf8f2"
            stroke="#8b6a56"
            strokeOpacity="0.45"
            strokeWidth="0.7"
          />
          <path d="M5 11 C15 8, 24 7, 32 6" stroke="#9b7a5e" strokeOpacity="0.45" strokeWidth="0.6" fill="none" />
        </svg>
      ))}

      {/* Doves parting the center veil + soaring over the unveiled invitation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero Dove Left: parts left curtain upward & left */}
        <div className="dove-open-pos-l absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[134px]">
            <div className="dove-open-bank-l">
              <div style={{ transform: "scaleX(-1)" }}>
                <DoveSvg withRibbon wingDuration="0.38s" wingDelay="0s" className="drop-shadow-[0_12px_16px_rgba(45,30,38,0.18)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Dove Right: parts right curtain upward & right */}
        <div className="dove-open-pos-r absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[134px]">
            <div className="dove-open-bank-r">
              <DoveSvg withRibbon wingDuration="0.38s" wingDelay="0.06s" className="drop-shadow-[0_12px_16px_rgba(45,30,38,0.18)]" />
            </div>
          </div>
        </div>

        {/* Soaring Flock 1: Lower-left to upper-right across unveiled HeroCollage */}
        <div className="dove-pos-1 absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[108px]">
            <div className="dove-bank-1">
              <DoveSvg wingDuration="0.42s" wingDelay="0.1s" className="drop-shadow-[0_10px_14px_rgba(45,30,38,0.16)]" />
            </div>
          </div>
        </div>

        {/* Soaring Flock 2: Lower-right to upper-left */}
        <div className="dove-pos-2 absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[104px]">
            <div className="dove-bank-2">
              <div style={{ transform: "scaleX(-1)" }}>
                <DoveSvg wingDuration="0.42s" wingDelay="0.18s" className="drop-shadow-[0_10px_14px_rgba(45,30,38,0.16)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Soaring Flock 3: Upper sky grace accent L -> R */}
        <div className="dove-pos-3 absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[82px]">
            <div className="dove-bank-3">
              <DoveSvg farWingOpacity={0.78} wingDuration="0.36s" wingDelay="0.08s" className="drop-shadow-[0_6px_10px_rgba(45,30,38,0.12)]" />
            </div>
          </div>
        </div>

        {/* Soaring Flock 4: Upper sky grace accent R -> L */}
        <div className="dove-pos-4 absolute inset-0">
          <div className="-translate-x-1/2 -translate-y-1/2 w-[78px]">
            <div className="dove-bank-4">
              <div style={{ transform: "scaleX(-1)" }}>
                <DoveSvg farWingOpacity={0.76} wingDuration="0.36s" wingDelay="0.14s" className="drop-shadow-[0_6px_10px_rgba(45,30,38,0.12)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
