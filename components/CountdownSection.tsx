"use client";

import React, { useEffect, useState } from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import Magnet from "@/components/reactbits/Magnet";
import SplitText from "@/components/reactbits/SplitText";

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
    <section className="paper relative px-6 pb-14 pt-16 text-center overflow-hidden">
      <img src="/images/v2/dried_flower.png" alt="" className="absolute left-4 top-[34px] w-[54px] rotate-[18deg] drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
      <Reveal>
        <h2 className="font-script text-[42px] leading-none text-[#3b2a31]"><SplitText text="Countdown" animationType="letter" delay={45} /></h2>
        <p className="font-playfair mt-3 text-[11.5px] uppercase tracking-[0.3em] text-[#4a3d40]">Until 28 November 2026</p>
      </Reveal>
      <Reveal delay={0.15} className="mx-auto mt-9 grid max-w-[400px] grid-cols-4">
        {cells.map((c, i) => (
          <div key={c.l} className={`px-1 ${i > 0 ? "border-l border-[#b9aeaa]" : ""}`}>
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
            className="font-playfair inline-block border border-[#c9c0bb] bg-[#e4dfdb] px-7 py-[9px] text-[11px] uppercase tracking-[0.25em] text-[#3b2f33] shadow-[0_2px_4px_rgba(0,0,0,.08)]"
          >
            Add to Calendar
          </a>
        </Magnet>
      </Reveal>
    </section>
  );
}

