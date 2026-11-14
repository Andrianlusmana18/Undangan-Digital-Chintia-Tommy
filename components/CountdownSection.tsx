"use client";

import React, { useEffect, useState } from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import Magnet from "@/components/reactbits/Magnet";
import SplitText from "@/components/reactbits/SplitText";
import { EditorialDivider, EditorialFrame } from "@/components/LuxuryChrome";

export default function CountdownSection() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const target = new Date(WEDDING_DATA.general.targetDateIso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: t?.d ?? 0, l: "Days" },
    { v: t?.h ?? 0, l: "Hours" },
    { v: t?.m ?? 0, l: "Minutes" },
    { v: t?.s ?? 0, l: "Seconds" },
  ];

  return (
    <section className="paper relative overflow-hidden px-6 pb-14 pt-6 text-center">
      <EditorialFrame />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 52%, rgba(255,251,245,0.42) 0%, transparent 72%)",
        }}
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-2 z-0 w-[165px] -rotate-[32deg] opacity-[0.13] mix-blend-multiply"
      />
      <img src="/images/v2/dried_flower.png" alt="" className="absolute left-5 top-[48px] z-10 w-[50px] rotate-[18deg] drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />

      <div className="relative z-10">
        <EditorialDivider className="mb-8" />
        <Reveal>
          <h2 className="font-script text-[42px] leading-none text-[#3b2a31]"><SplitText text="Countdown" animationType="letter" delay={45} /></h2>
          <p className="font-playfair mt-3 text-[11.5px] uppercase tracking-[0.3em] text-[#4a3d40]">Until 28 November 2026</p>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto mt-9 grid max-w-[390px] grid-cols-4">
          {cells.map((c, i) => (
            <div key={c.l} className={`px-1 ${i > 0 ? "border-l border-[#8b6a56]/30" : ""}`}>
              <div className="font-script text-[38px] leading-none text-[#3b2a31]">{String(c.v).padStart(2, "0")}</div>
              <div className="font-playfair mt-3 text-[10px] uppercase tracking-[0.2em] text-[#4a3d40]">{c.l}</div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.3} className="mt-9">
          <Magnet magnetStrength={0.25} padding={24}>
            <a
              href={WEDDING_DATA.events.akad.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair inline-block rounded-full border border-[#8b6a56]/35 bg-[#f7f2eb]/85 px-7 py-[10px] text-[10.5px] font-medium uppercase tracking-[0.25em] text-[#3b2f33] shadow-[0_4px_12px_rgba(60,38,30,.10)] transition hover:bg-[#fbf8f3]"
            >
              Add to Calendar
            </a>
          </Magnet>
        </Reveal>
      </div>
    </section>
  );
}

