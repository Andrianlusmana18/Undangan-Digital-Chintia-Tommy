"use client";

import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "sec-hero", label: "Awal" },
  { id: "sec-mempelai", label: "Mempelai" },
  { id: "sec-details", label: "Acara" },
  { id: "sec-story", label: "Kisah" },
  { id: "sec-gallery", label: "Galeri" },
  { id: "sec-rsvp", label: "RSVP" },
  { id: "sec-gift", label: "Hadiah" },
];

export function ScrollProgressAndNav() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("sec-hero");
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0);
      setShowNav(scrollTop > 260);

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top scroll progress hairline */}
      <div className="pointer-events-none fixed left-1/2 top-0 z-50 h-[2.5px] w-full max-w-[480px] -translate-x-1/2 bg-black/5">
        <div
          className="h-full bg-gradient-to-r from-[#4b3441] via-[#8b6a56] to-[#c7a67b] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating frosted quick-navigation pill */}
      <nav
        aria-label="Navigasi bagian undangan"
        className={`fixed bottom-5 left-4 z-40 flex max-w-[calc(100vw-88px)] items-center gap-0.5 overflow-x-auto rounded-full border border-[#8b6a56]/25 bg-[#f7f4f0]/88 px-2 py-1.5 shadow-[0_6px_20px_rgba(40,25,30,.14)] backdrop-blur-md transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => jump(item.id)}
              className={`font-pop shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide transition ${
                isActive
                  ? "bg-[#4b3441] text-[#f8f4ef] shadow-sm"
                  : "text-[#5a4a4e] hover:bg-[#4b3441]/10"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

const MOTES = [
  { left: "12%", top: "18%", size: 5, dur: "6.5s", delay: "0s" },
  { left: "84%", top: "24%", size: 4, dur: "8s", delay: "1.2s" },
  { left: "22%", top: "62%", size: 6, dur: "7.5s", delay: "0.6s" },
  { left: "76%", top: "70%", size: 4, dur: "6s", delay: "2s" },
  { left: "48%", top: "12%", size: 3.5, dur: "9s", delay: "1.5s" },
];

export function AmbientMotes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m, idx) => (
        <span
          key={idx}
          className="mote absolute rounded-full bg-gradient-to-br from-[#d9bc8c] to-[#9b7a5e] blur-[0.4px]"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            ["--dur" as string]: m.dur,
            ["--delay" as string]: m.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Delicate vintage letterpress corner flourish shared across cover and paper sections. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M2 46V16C2 8.268 8.268 2 16 2h30" stroke="#8b6a56" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M8 46V20C8 13.373 13.373 8 20 8h26" stroke="#8b6a56" strokeOpacity="0.25" strokeWidth="0.75" />
      <circle cx="14" cy="14" r="1.6" fill="#8b6a56" fillOpacity="0.45" />
    </svg>
  );
}

/** Continuous double-hairline stationery border with optional corner flourishes. */
export function EditorialFrame({
  topCorners = false,
  bottomCorners = false,
  topCap = false,
  bottomCap = false,
}: {
  topCorners?: boolean;
  bottomCorners?: boolean;
  topCap?: boolean;
  bottomCap?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-x-3.5 inset-y-0 border-x border-[#8b6a56]/22 ${
          topCap ? "top-3.5 border-t" : ""
        } ${bottomCap ? "bottom-3.5 border-b" : ""}`}
      />
      <div
        className={`absolute inset-x-[19px] inset-y-0 border-x border-[#8b6a56]/12 ${
          topCap ? "top-[19px] border-t" : ""
        } ${bottomCap ? "bottom-[19px] border-b" : ""}`}
      />
      {topCorners && (
        <>
          <CornerFlourish className="absolute left-3.5 top-3.5 h-9 w-9" />
          <CornerFlourish className="absolute right-3.5 top-3.5 h-9 w-9 rotate-90" />
        </>
      )}
      {bottomCorners && (
        <>
          <CornerFlourish className="absolute bottom-3.5 right-3.5 h-9 w-9 rotate-180" />
          <CornerFlourish className="absolute bottom-3.5 left-3.5 h-9 w-9 -rotate-90" />
        </>
      )}
    </div>
  );
}

/** Refined antique bronze & gold ornamental section divider. */
export function EditorialDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex items-center justify-center gap-2.5 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#8b6a56]/45 to-[#8b6a56]/60" />
      <span className="text-[9px] text-[#9b7a5e]/75">✦</span>
      <span className="h-1.5 w-1.5 rotate-45 border border-[#8b6a56]/60 bg-[#c7a67b]/35" />
      <span className="text-[9px] text-[#9b7a5e]/75">✦</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-[#8b6a56]/45 to-[#8b6a56]/60" />
    </div>
  );
}

