"use client";

import React, { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import Magnet from "@/components/reactbits/Magnet";
import ButterflySvg from "@/components/Butterfly";
import { AmbientMotes } from "@/components/LuxuryChrome";

interface Props { guestName: string; onOpenInvitation: () => void }

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M2 46V16C2 8.268 8.268 2 16 2h30" stroke="#8b6a56" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M8 46V20C8 13.373 13.373 8 20 8h26" stroke="#8b6a56" strokeOpacity="0.25" strokeWidth="0.75" />
      <circle cx="14" cy="14" r="1.6" fill="#8b6a56" fillOpacity="0.45" />
    </svg>
  );
}

export default function CoverSection({ guestName, onOpenInvitation }: Props) {
  const [leaving, setLeaving] = useState(false);
  const { playAudio } = useAudio();

  const open = () => {
    if (leaving) return;
    playAudio();
    setLeaving(true);
    setTimeout(onOpenInvitation, 850);
  };

  return (
    <div className={`paper relative min-h-[100svh] w-full overflow-hidden text-center ${leaving ? "cover-out" : ""}`}>
      {/* Warm ivory spotlight + soft vintage vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,252,247,0.72) 0%, rgba(239,237,234,0.2) 55%, rgba(168,154,144,0.28) 100%)",
        }}
      />

      {/* Subtle botanical corner watermarks */}
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        className="pointer-events-none absolute -right-14 -top-6 w-[210px] rotate-[145deg] opacity-[0.14] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        className="pointer-events-none absolute -bottom-10 -left-14 w-[210px] -rotate-[25deg] opacity-[0.14] mix-blend-multiply"
      />

      {/* Letterpress double hairline border & corner flourishes */}
      <div className="pointer-events-none absolute inset-3.5 border border-[#8b6a56]/25" />
      <div className="pointer-events-none absolute inset-[19px] border border-[#8b6a56]/15" />
      <CornerFlourish className="pointer-events-none absolute left-3.5 top-3.5 h-10 w-10" />
      <CornerFlourish className="pointer-events-none absolute right-3.5 top-3.5 h-10 w-10 rotate-90" />
      <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 h-10 w-10 rotate-180" />
      <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 h-10 w-10 -rotate-90" />

      <AmbientMotes />

      {/* Top editorial wedding header */}
      <div className="absolute inset-x-0 top-[6.5svh] flex flex-col items-center">
        <p className="font-pop text-[9px] uppercase tracking-[0.38em] text-[#7a6b67]">The Wedding of</p>
        <p className="font-corm mt-1 text-[16px] italic tracking-wide text-[#3b2d31]">Chintia &amp; Tommy</p>
        <div className="mt-1.5 flex items-center gap-2.5 text-[#8b6a56]/70">
          <span className="h-px w-7 bg-[#8b6a56]/40" />
          <span className="font-playfair text-[10px] tracking-[0.22em]">28 . 11 . 2026</span>
          <span className="h-px w-7 bg-[#8b6a56]/40" />
        </div>
      </div>

      {/* Main title + fluttering butterfly accent */}
      <div className="absolute inset-x-0 top-[20.5svh] flex flex-col items-center">
        <div className="relative inline-flex flex-col items-center">
          <h2 className="font-playfair pl-[0.42em] text-[21px] font-normal tracking-[0.42em] text-[#1d1819]">YOU&apos;RE</h2>
          <h1 className="font-script -mt-3 translate-x-2 -rotate-[3deg] text-[64px] leading-none text-[#1d1819]">
            Invited
          </h1>
          <div className="bfly pointer-events-none absolute -right-10 -top-2 w-8" style={{ ["--r" as string]: "16deg" }}>
            <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.22)]" />
          </div>
        </div>
      </div>

      {/* Closed envelope + botanicals (clickable wax seal + float) */}
      <div
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
        aria-label="Buka amplop undangan"
        className="group absolute left-1/2 top-[36.5svh] w-[min(295px,66vw)] -translate-x-1/2 cursor-pointer"
      >
        <div className="env-float relative transition-transform duration-500 group-hover:scale-[1.02]">
          <img src="/images/v2/env_closed.png" alt="" className="w-full drop-shadow-[0_14px_22px_rgba(40,25,35,.22)]" />
          <span className="pointer-events-none absolute left-1/2 top-[67%] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7b67c]/60 animate-ping opacity-45" />
          <span className="emboss-w font-corm absolute left-0 right-0 top-[11%] text-[30px] font-light tracking-[0.08em]">CT</span>
          <img src="/images/v2/dried_flower.png" alt="" className="absolute -left-[12%] bottom-[-6%] w-[28%] rotate-[8deg] drop-shadow-[0_5px_6px_rgba(0,0,0,.28)]" />
          <img src="/images/v2/botanical_sprig.png" alt="" className="absolute -right-[12%] bottom-[-16%] w-[70%] -rotate-[6deg]" />
        </div>
      </div>

      {/* Guest name & CTA */}
      <div className="absolute inset-x-0 bottom-[7.5svh] flex flex-col items-center px-6">
        <p className="font-corm text-[14px] italic tracking-wide text-[#6d6461]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <div className="mt-2 border-y border-[#8b6a56]/25 px-6 py-1.5">
          <p className="font-playfair text-[19px] font-bold capitalize tracking-wide text-[#2a2224]">
            {guestName.trim() || "Tamu Undangan"}
          </p>
        </div>
        <div className="mt-5">
          <Magnet magnetStrength={0.3} padding={30}>
            <button
              onClick={open}
              className="font-pop inline-flex items-center gap-2 rounded-full border border-[#c7a67b]/40 bg-gradient-to-r from-[#5a3d49] via-[#7a5a4e] to-[#8b6a56] px-7 py-[11px] text-[12px] font-medium tracking-wider text-[#f8f2ec] shadow-[0_8px_20px_rgba(60,35,40,.35)] transition hover:brightness-110 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              Buka Undangan
            </button>
          </Magnet>
        </div>
        <p className="font-pop mt-2.5 text-[9.5px] tracking-widest text-[#8a7b73]">
          Ketuk segel lilin atau tombol di atas
        </p>
      </div>
    </div>
  );
}
