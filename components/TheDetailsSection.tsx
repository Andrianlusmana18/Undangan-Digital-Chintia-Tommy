"use client";

import React, { useEffect, useRef, useState } from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/reactbits/SplitText";
import Magnet from "@/components/reactbits/Magnet";
import { EditorialDivider, EditorialFrame } from "@/components/LuxuryChrome";

const Heart = ({ x, y }: { x: number; y: number }) => (
  <path transform={`translate(${x - 11} ${y - 10}) scale(.92)`} d="M11 20 C2 13 0 8 0 5.5 C0 2 2.6 0 5.5 0 C8 0 10 1.6 11 3.5 C12 1.6 14 0 16.5 0 C19.4 0 22 2 22 5.5 C22 8 20 13 11 20Z" fill="#5d4638" />
);

export default function TheDetailsSection() {
  const g = WEDDING_DATA.events;
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [len, setLen] = useState(2000);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLen(Math.ceil(pathRef.current.getTotalLength()));
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const label = "font-script text-[#3b2a31]";
  return (
    <section className="paper relative overflow-hidden pb-16 pt-4 text-center">
      <EditorialFrame />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 48%, rgba(255,251,245,0.34) 0%, transparent 75%)",
        }}
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 top-12 z-0 w-[170px] -rotate-[135deg] opacity-[0.13] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 bottom-10 z-0 w-[175px] rotate-[28deg] opacity-[0.13] mix-blend-multiply"
      />

      <EditorialDivider className="relative z-10 mb-5" />
      <Reveal className="relative z-10 mx-auto w-[56%] max-w-[260px]">
        <img src="/images/v2/doves.png" alt="" loading="lazy" decoding="async" className="w-full drop-shadow-[0_4px_10px_rgba(65,45,35,.10)]" />
      </Reveal>
      <Reveal delay={0.1} className="relative z-10"><h2 className="font-script -mt-1 text-[48px] leading-none text-[#3b2a31]"><SplitText text="The Details" animationType="word" delay={140} /></h2></Reveal>

      <div ref={wrapRef} className="relative z-10 mx-auto mt-10 w-full max-w-[420px]" style={{ aspectRatio: "480/820", containerType: "inline-size" }}>
        <svg viewBox="0 0 480 820" className="absolute inset-0 h-full w-full overflow-visible">
          <path
            ref={pathRef}
            d="M237 14 C352 44 362 158 304 244 S152 322 117 380 C86 432 176 516 296 540 S404 646 338 726 S300 770 290 800"
            fill="none" stroke="#5d4638" strokeWidth="3.2" strokeLinecap="round"
            className={`draw-path ${on ? "on" : ""}`} style={{ ["--len" as string]: len }}
          />
          <Heart x={237} y={10} /><Heart x={117} y={380} /><Heart x={290} y={800} />
        </svg>

        {/* Akad */}
        <Reveal className="absolute" style={{ left: "10%", top: "3.5%", width: "42%" }}>
          <img src="/images/v2/chairs.png" alt="" loading="lazy" decoding="async" className="mx-auto w-[64%]" />
          <p className={label} style={{ fontSize: "8.4cqw", lineHeight: 1.1, marginTop: "1.5cqw", whiteSpace: "nowrap" }}>Akad Nikah</p>
          <p className="font-corm font-medium text-[#3a2f31]" style={{ fontSize: "3.5cqw", marginTop: "3cqw" }}>{g.akad.date}</p>
          <p className="font-corm font-medium text-[#3a2f31]" style={{ fontSize: "3.5cqw" }}>{g.akad.time}</p>
        </Reveal>

        {/* Resepsi */}
        <Reveal className="absolute" style={{ left: "52%", top: "30%", width: "42%" }}>
          <img src="/images/v2/gazebo.png" alt="" loading="lazy" decoding="async" className="mx-auto w-[62%]" />
          <p className={label} style={{ fontSize: "8.4cqw", lineHeight: 1.1, marginTop: "1cqw" }}>Resepsi</p>
          <p className="font-corm font-medium text-[#3a2f31]" style={{ fontSize: "3.5cqw", marginTop: "5cqw" }}>{g.resepsi.date}</p>
          <p className="font-corm font-medium text-[#3a2f31]" style={{ fontSize: "3.5cqw" }}>{g.resepsi.time}</p>
        </Reveal>

        {/* Lokasi */}
        <Reveal className="absolute" style={{ left: "17%", top: "63%", width: "38%" }}>
          <img src="/images/v2/mansion.png" alt="" loading="lazy" decoding="async" className="mx-auto w-full" />
          <p className={label} style={{ fontSize: "8.4cqw", lineHeight: 1.1, marginTop: "1cqw" }}>Lokasi</p>
          <p className="font-corm font-medium leading-snug text-[#3a2f31]" style={{ fontSize: "3.6cqw", marginTop: "4cqw" }}>
            {g.akad.venueName}<br />Desa Lenggahjaya, Cabangbungin, Bekasi
          </p>
          <div style={{ marginTop: "5cqw" }}>
            <Magnet magnetStrength={0.25} padding={24}>
              <a
                href={g.akad.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="font-playfair inline-block rounded-full bg-[#6b4c3a] text-[#f4ece6] shadow-[0_3px_6px_rgba(60,35,25,.3)]"
                style={{ fontSize: "3.8cqw", padding: "2.4cqw 7cqw" }}
              >Google Maps</a>
            </Magnet>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

