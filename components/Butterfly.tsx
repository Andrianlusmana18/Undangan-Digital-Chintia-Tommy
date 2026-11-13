"use client";

import React from "react";

/** Vector butterfly (no raster artefacts): chestnut wings with cream-spotted margin, wings flap by scaling X. */
export default function Butterfly({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const wing = (
    <g>
      <path d="M0 -2 C6 -34 40 -56 72 -48 C88 -43 84 -22 66 -8 C50 4 20 8 0 2Z" fill="url(#fw)" stroke="#2a170f" strokeWidth="1.2" />
      <path d="M2 4 C26 8 56 12 64 28 C70 44 50 56 34 48 C18 40 8 24 2 8Z" fill="url(#hw)" stroke="#2a170f" strokeWidth="1.2" />
      <path d="M10 -6 C28 -26 52 -38 68 -40" stroke="#c9a27c" strokeWidth=".7" fill="none" opacity=".55" />
      <path d="M8 6 C26 12 46 24 52 38" stroke="#c9a27c" strokeWidth=".7" fill="none" opacity=".5" />
      {[[74,-40],[78,-30],[75,-20],[66,-10],[60,34],[50,44],[40,48]].map(([x, y], i) => (
        <circle key={i} cx={x - 4} cy={y} r={i < 4 ? 2.6 : 2.2} fill="#f1e1c8" opacity=".92" />
      ))}
    </g>
  );
  return (
    <svg viewBox="-92 -62 184 124" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="fw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#24130d" /><stop offset=".45" stopColor="#5a3523" /><stop offset="1" stopColor="#8a5a3a" />
        </linearGradient>
        <linearGradient id="hw" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24130d" /><stop offset=".6" stopColor="#4b2c1e" /><stop offset="1" stopColor="#7a4d33" />
        </linearGradient>
      </defs>
      <g className="bf-wing bf-l" style={{ transformOrigin: "0 0" }}><g transform="scale(-1 1)">{wing}</g></g>
      <g className="bf-wing bf-r" style={{ transformOrigin: "0 0" }}>{wing}</g>
      <ellipse cx="0" cy="-2" rx="3" ry="22" fill="#1b0f0a" />
      <path d="M0 -22 C-6 -38 -14 -44 -22 -46 M0 -22 C6 -38 14 -44 22 -46" stroke="#1b0f0a" strokeWidth="1.1" fill="none" />
    </svg>
  );
}
