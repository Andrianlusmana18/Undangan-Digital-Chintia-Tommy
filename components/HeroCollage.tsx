"use client";

import React from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import ButterflySvg from "@/components/Butterfly";
import { AmbientMotes, EditorialFrame } from "@/components/LuxuryChrome";

const W = 480;
const H = 830;
const at = (x: number, y: number, w: number): React.CSSProperties => ({
  position: "absolute",
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
});
const cq = (n: number) => `${(n / W) * 100}cqw`; // design px -> container width units

function Butterfly({ x, y, w, r, d }: { x: number; y: number; w: number; r: number; d: number }) {
  return (
    <Reveal variant="rv-pop" immediate delay={d} rotate={r} style={{ ...at(x, y, w), zIndex: 40 }}>
      <div className="bfly" style={{ ["--r" as string]: `${r}deg` }}>
        <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
      </div>
    </Reveal>
  );
}

export default function HeroCollage() {
  const g = WEDDING_DATA;
  return (
    <section className="paper relative w-full overflow-hidden pb-3 pt-1">
      {/* Luxury background layers: soft champagne/mauve wash + top vignette fading cleanly to transparent at bottom */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 52% at 50% 24%, rgba(255,250,242,0.40) 0%, rgba(226,208,196,0.12) 52%, transparent 85%), linear-gradient(180deg, rgba(128,100,86,0.14) 0%, transparent 24%, transparent 100%), radial-gradient(circle at 16% 58%, rgba(150,110,120,0.11) 0%, transparent 42%), radial-gradient(circle at 86% 36%, rgba(196,162,120,0.13) 0%, transparent 40%)",
        }}
      />

      {/* Delicate blind-letterpress botanical arch watermark fading smoothly toward the bottom */}
      <svg
        viewBox="0 0 480 830"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.24]"
      >
        <defs>
          <linearGradient id="archFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b6a56" stopOpacity="0.48" />
            <stop offset="76%" stopColor="#8b6a56" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b6a56" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M52 820V232C52 128 136 44 240 44s188 84 188 188v588"
          stroke="url(#archFade)"
          strokeWidth="0.95"
          strokeDasharray="3 5"
        />
        <circle cx="240" cy="430" r="196" stroke="#8b6a56" strokeOpacity="0.22" strokeWidth="0.8" />
        <circle cx="240" cy="430" r="184" stroke="#8b6a56" strokeOpacity="0.16" strokeWidth="0.6" strokeDasharray="2 4" />
      </svg>

      {/* Pressed botanical corner watermarks flanking envelope & bottom corner */}
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-4 z-0 w-[185px] rotate-[28deg] opacity-[0.17] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 top-4 z-0 w-[185px] -scale-x-100 -rotate-[28deg] opacity-[0.17] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 bottom-6 z-0 w-[195px] -rotate-[24deg] opacity-[0.16] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 bottom-10 z-0 w-[170px] scale-x-[-1] rotate-[22deg] opacity-[0.13] mix-blend-multiply"
      />

      {/* Double letterpress border & top corner flourishes (underneath top envelope tip) */}
      <EditorialFrame topCorners topCap />

      <AmbientMotes />

      <div className="relative z-10 mx-auto w-full max-w-[460px]" style={{ containerType: "inline-size", aspectRatio: `${W}/${H}` }}>
        {/* opened envelope */}
        <Reveal immediate delay={0.2} style={{ ...at(112, -14, 258), zIndex: 1 }}>
          <img src="/images/v2/env_open.png" alt="" className="w-full drop-shadow-[0_8px_14px_rgba(40,25,35,.2)]" />
        </Reveal>

        {/* hands polaroid with vertical SAVE THE DATE */}
        <Reveal immediate delay={0.7} style={{ ...at(84, 266, 168), zIndex: 5 }}>
          <div className="relative bg-[#f6f2ed] drop-shadow-[0_5px_8px_rgba(40,25,35,.28)]" style={{ padding: `${cq(5)} ${cq(5)} ${cq(5)} ${cq(26)}` }}>
            <img src="/images/ring-exchange.jpg" alt="" className="block w-full object-cover sepia-[.55] brightness-[.72] contrast-[1.15]" style={{ aspectRatio: "1.45/1", objectPosition: "center 55%" }} />
            <span className="font-playfair absolute left-0 top-0 flex h-full items-center justify-center font-semibold uppercase text-[#2a2224]" style={{ width: cq(26), writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: cq(8.2), letterSpacing: "0.22em" }}>Save the date</span>
          </div>
        </Reveal>

        {/* save the date bracket card */}
        <Reveal immediate delay={1.0} style={{ ...at(246, 288, 208), zIndex: 6 }}>
          <div className="relative drop-shadow-[0_6px_10px_rgba(40,25,35,.25)]" style={{ aspectRatio: "208/262" }}>
            <svg viewBox="0 0 208 262" className="absolute inset-0 h-full w-full">
              <path d="M16 1.5H192A14.5 14.5 0 0 0 206.5 16V246A14.5 14.5 0 0 0 192 260.5H16A14.5 14.5 0 0 0 1.5 246V16A14.5 14.5 0 0 0 16 1.5Z" fill="#faf7f5" stroke="#5a3a47" strokeWidth="3" />
              <path d="M18 8H190A10 10 0 0 0 200 18V244A10 10 0 0 0 190 254H18A10 10 0 0 0 8 244V18A10 10 0 0 0 18 8Z" fill="none" stroke="#5a3a47" strokeWidth="0.9" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center text-center text-[#2b2023]" style={{ paddingTop: cq(18) }}>
              <span className="font-corm font-light" style={{ fontSize: cq(26), lineHeight: 1 }}>CT</span>
              <span className="font-playfair font-bold uppercase" style={{ fontSize: cq(10.5), letterSpacing: "0.14em", marginTop: cq(8) }}>Save the Date</span>
              <span className="font-playfair uppercase text-[#6b5a60]" style={{ fontSize: cq(5.4), letterSpacing: "0.2em", marginTop: cq(3) }}>For the wedding of</span>
              <span className="font-script" style={{ fontSize: cq(50), lineHeight: 0.95, marginTop: cq(20) }}>{g.bride.name}</span>
              <span className="font-script" style={{ fontSize: cq(50), lineHeight: 0.95, marginTop: cq(2) }}>{g.groom.name}</span>
              <span className="font-playfair font-bold uppercase" style={{ fontSize: cq(7.6), letterSpacing: "0.1em", marginTop: cq(26) }}>28 November 2026</span>
              <span className="font-playfair uppercase text-[#6b5a60]" style={{ fontSize: cq(4.4), letterSpacing: "0.12em", marginTop: cq(3) }}>Bekasi, Jawa Barat</span>
            </div>
          </div>
        </Reveal>

        {/* rococo quote label */}
        <Reveal immediate delay={1.3} style={{ ...at(44, 366, 240), zIndex: 8 }}>
          <div className="relative drop-shadow-[0_5px_8px_rgba(40,25,35,.25)]">
            <img src="/images/v2/rococo_frame.png" alt="" className="w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-corm font-semibold text-[#2a2124]" style={{ padding: `${cq(22)} ${cq(36)}`, fontSize: cq(7), lineHeight: 1.38 }}>
              <span>&ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antara kamu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;</span>
              <span className="mt-[3%] font-bold">(QS. Ar-Rum: 21)</span>
            </div>
          </div>
        </Reveal>
        <Reveal immediate delay={2.5} style={{ ...at(145, 528, 46), zIndex: 7 }}>
          <img src="/images/v2/tassel_charm.png" alt="" className="w-full drop-shadow-[0_4px_5px_rgba(0,0,0,.3)]" />
        </Reveal>

        {/* lace heart */}
        <Reveal immediate delay={1.9} style={{ ...at(198, 562, 176), zIndex: 9 }}>
          <div className="relative drop-shadow-[0_6px_8px_rgba(40,25,35,.3)]">
            <img src="/images/v2/lace_heart.png" alt="" className="w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f4eeea]" style={{ paddingTop: "4%" }}>
              <span className="font-playfair" style={{ fontSize: cq(24), lineHeight: 1.05 }}>28</span>
              <span className="font-script" style={{ fontSize: cq(30), lineHeight: 1 }}>November</span>
              <span className="font-playfair" style={{ fontSize: cq(22), lineHeight: 1.1 }}>2026</span>
            </div>
          </div>
        </Reveal>
        <Reveal immediate delay={2.2} style={{ ...at(246, 676, 60), zIndex: 10 }}>
          <img src="/images/v2/ribbon_bow.png" alt="" className="w-full drop-shadow-[0_5px_5px_rgba(0,0,0,.28)]" />
        </Reveal>

        {/* bride / groom polaroids */}
        <Reveal immediate delay={1.6} rotate={-6} style={{ ...at(30, 580, 104), zIndex: 11 }} variant="rv-pop">
          <Polaroid src="/images/vintage/bride_polaroid.jpg" label="Bride" />
        </Reveal>
        <Reveal immediate delay={1.75} rotate={3} style={{ ...at(112, 684, 98), zIndex: 12 }} variant="rv-pop">
          <Polaroid src="/images/vintage/groom_polaroid.jpg" label="Groom" />
        </Reveal>

        {/* botanicals */}
        <Reveal variant="rv-pop" immediate delay={2.7} rotate={-8} style={{ ...at(60, 120, 120), zIndex: 3 }}>
          <img src="/images/v2/botanical_sprig.png" alt="" className="w-full -rotate-[72deg] origin-center" style={{ transform: "rotate(-72deg) scale(.9)" }} />
        </Reveal>
        <Reveal variant="rv-pop" immediate delay={2.9} rotate={10} style={{ ...at(86, 200, 62), zIndex: 4 }}>
          <img src="/images/v2/dried_flower.png" alt="" className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
        </Reveal>
        <Reveal variant="rv-pop" immediate delay={3.0} rotate={-20} style={{ ...at(392, 500, 66), zIndex: 20 }}>
          <img src="/images/v2/dried_flower.png" alt="" className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
        </Reveal>

        <Butterfly x={340} y={232} w={52} r={18} d={3.1} />
        <Butterfly x={44} y={352} w={46} r={-28} d={3.3} />
        <Butterfly x={318} y={706} w={54} r={20} d={3.5} />
      </div>
    </section>
  );
}

function Polaroid({ src, label }: { src: string; label: string }) {
  return (
    <div className="bg-[#f7f3ee] drop-shadow-[0_5px_7px_rgba(40,25,35,.3)]" style={{ padding: `${cq(5)} ${cq(5)} ${cq(18)}` }}>
      <img src={src} alt={label} className="block w-full object-cover sepia-[.45] brightness-[.8] contrast-[1.1]" style={{ aspectRatio: "1/1" }} />
      <p className="font-script text-center text-[#4a3a40]" style={{ fontSize: cq(20), marginTop: cq(5), lineHeight: 1 }}>{label}</p>
    </div>
  );
}

