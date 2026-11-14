"use client";

import React, { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import Magnet from "@/components/reactbits/Magnet";
import ShinyText from "@/components/reactbits/ShinyText";
import ButterflySvg from "@/components/Butterfly";
import { AmbientMotes, EditorialFrame } from "@/components/LuxuryChrome";

interface Props { guestName: string; onOpenInvitation: () => void }

const YOURE_CHARS = ["Y", "O", "U", "'", "R", "E"];

export default function CoverSection({ guestName, onOpenInvitation }: Props) {
  const [leaving, setLeaving] = useState(false);
  const { playAudio } = useAudio();

  const open = () => {
    if (leaving) return;
    playAudio();
    setLeaving(true);
    onOpenInvitation();
  };

  return (
    <div className={`paper relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden text-center select-none touch-none overscroll-none ${leaving ? "cover-out" : ""}`}>
      {/* Warm ivory-gold spotlight + soft vintage vignette */}
      <div
        className="cover-halo pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, rgba(255,250,240,0.46) 0%, rgba(234,225,215,0.12) 56%, rgba(146,120,106,0.24) 100%)",
        }}
      />

      {/* Subtle botanical corner watermarks */}
      <div
        className="cover-fade-rise pointer-events-none absolute inset-0"
        style={{ ["--cd" as string]: "0.14s", ["--cdur" as string]: "1.05s" }}
      >
        <img
          src="/images/v2/botanical_sprig.png"
          alt=""
          className="absolute -right-14 -top-6 w-[210px] rotate-[145deg] opacity-[0.15] mix-blend-multiply"
        />
        <img
          src="/images/v2/botanical_sprig.png"
          alt=""
          className="absolute -bottom-10 -left-14 w-[210px] -rotate-[25deg] opacity-[0.15] mix-blend-multiply"
        />
      </div>

      {/* Letterpress double hairline border & corner flourishes */}
      <div className="cover-frame-in pointer-events-none absolute inset-0">
        <EditorialFrame topCorners bottomCorners topCap bottomCap />
      </div>

      <AmbientMotes />

      {/* Top editorial wedding header */}
      <div className="absolute inset-x-0 top-[6.5svh] flex flex-col items-center">
        <p
          className="cover-tracking-in font-pop text-[9px] uppercase tracking-[0.38em] text-[#7a6b67]"
          style={{ ["--cd" as string]: "0.08s" }}
        >
          The Wedding of
        </p>
        <p
          className="cover-fade-rise font-corm mt-1 px-2 text-[16px] italic tracking-wide text-[#3b2d31]"
          style={{ ["--cd" as string]: "0.2s", ["--cdur" as string]: "0.85s" }}
        >
          <ShinyText
            baseColor="#3b2d31"
            shimmerColor="rgba(196, 152, 86, 0.96)"
            speed={5.2}
            delay={1.1}
            className="px-1 italic"
          >
            Chintia &amp; Tommy
          </ShinyText>
        </p>
        <div className="mt-1.5 flex items-center gap-2.5 text-[#8b6a56]/70">
          <span className="cover-line-r h-px w-7 bg-[#8b6a56]/45" style={{ ["--cd" as string]: "0.34s" }} />
          <span
            className="cover-fade-rise font-playfair text-[10px] tracking-[0.22em]"
            style={{ ["--cd" as string]: "0.3s", ["--cdur" as string]: "0.75s" }}
          >
            28 . 11 . 2026
          </span>
          <span className="cover-line-l h-px w-7 bg-[#8b6a56]/45" style={{ ["--cd" as string]: "0.34s" }} />
        </div>
      </div>

      {/* Main title + calligraphic brush reveal + fluttering butterfly accent */}
      <div className="absolute inset-x-0 top-[20.5svh] flex flex-col items-center">
        <div className="relative inline-flex flex-col items-center">
          <h2
            aria-label="YOU'RE"
            className="font-playfair pl-[0.42em] text-[21px] font-normal tracking-[0.42em] text-[#1d1819]"
          >
            {YOURE_CHARS.map((ch, idx) => (
              <span
                key={idx}
                className="cover-char-in inline-block"
                style={{ ["--cd" as string]: `${0.24 + idx * 0.048}s` }}
              >
                {ch}
              </span>
            ))}
          </h2>
          <h1 className="font-script -mt-3 translate-x-2 -rotate-[3deg] px-4 text-[64px] leading-none text-[#1d1819]">
            <span className="cover-script-in inline-block px-3 -mx-3" style={{ ["--cd" as string]: "0.42s" }}>
              <ShinyText
                baseColor="#1d1819"
                shimmerColor="rgba(182, 134, 68, 0.95)"
                speed={5.8}
                delay={1.35}
                className="px-2 -mx-2"
              >
                Invited
              </ShinyText>
            </span>
          </h1>

          {/* Subtle champagne-gold twinkle accent */}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="cover-glint pointer-events-none absolute -left-5 bottom-3 h-3 w-3 text-[#c7a67b]"
            style={{ ["--cd" as string]: "1.05s" }}
          >
            <path
              d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z"
              fill="currentColor"
            />
          </svg>

          {/* Fluttering butterfly arriving on entrance */}
          <div
            className="cover-bfly-in pointer-events-none absolute -right-10 -top-2 w-8"
            style={{ ["--cd" as string]: "0.48s" }}
          >
            <div className="bfly w-full" style={{ ["--r" as string]: "16deg" }}>
              <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.22)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Closed envelope + botanicals (clickable wax seal + float + gold foil monogram) */}
      <div
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
        aria-label="Buka amplop undangan"
        className="group absolute left-1/2 top-[36.5svh] w-[min(295px,66vw)] -translate-x-1/2 cursor-pointer"
      >
        <div className="cover-env-in" style={{ ["--cd" as string]: "0.28s" }}>
          <div className="env-float relative transition-transform duration-500 group-hover:scale-[1.02]">
            <img src="/images/v2/env_closed.png" alt="" className="w-full drop-shadow-[0_14px_22px_rgba(40,25,35,.22)]" />
            {/* Refined double golden invitation pulse around wax seal */}
            <span className="cover-wax-ring pointer-events-none absolute left-1/2 top-[67%] h-14 w-14 rounded-full border border-[#d7b67c]/70" />
            <span
              className="cover-wax-ring pointer-events-none absolute left-1/2 top-[67%] h-14 w-14 rounded-full border border-[#f2d69f]/55"
              style={{ animationDelay: "1.95s" }}
            />
            <span className="emboss-w font-corm absolute left-0 right-0 top-[11%] text-[30px] font-light tracking-[0.08em]">
              <ShinyText
                baseColor="#f3efec"
                shimmerColor="#fff5d4"
                speed={4.6}
                delay={1.0}
                className="px-1"
              >
                CT
              </ShinyText>
            </span>
            <div className="pointer-events-none absolute -left-[12%] bottom-[-6%] w-[28%] rotate-[8deg]">
              <img
                src="/images/v2/dried_flower.png"
                alt=""
                className="cover-pop-in w-full drop-shadow-[0_5px_6px_rgba(0,0,0,.28)]"
                style={{ ["--cd" as string]: "0.6s", ["--cr0" as string]: "-14deg" }}
              />
            </div>
            <div className="pointer-events-none absolute -right-[12%] bottom-[-16%] w-[70%] -rotate-[6deg]">
              <img
                src="/images/v2/botanical_sprig.png"
                alt=""
                className="cover-pop-in w-full"
                style={{ ["--cd" as string]: "0.7s", ["--cr0" as string]: "10deg" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guest name & CTA */}
      <div className="absolute inset-x-0 bottom-[7.5svh] flex flex-col items-center px-6">
        <p
          className="cover-fade-rise font-corm text-[14px] italic tracking-wide text-[#6d6461]"
          style={{ ["--cd" as string]: "0.56s", ["--cdur" as string]: "0.75s" }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <div className="mt-2 flex flex-col items-center px-2">
          <span
            className="cover-line-x h-px w-full min-w-[200px] bg-gradient-to-r from-transparent via-[#8b6a56]/40 to-transparent"
            style={{ ["--cd" as string]: "0.62s" }}
          />
          <p
            className="cover-fade-rise font-playfair px-5 py-1.5 text-[19px] font-bold capitalize tracking-wide text-[#2a2224]"
            style={{ ["--cd" as string]: "0.66s", ["--cdur" as string]: "0.8s" }}
          >
            <ShinyText
              baseColor="#2a2224"
              shimmerColor="rgba(184, 138, 72, 0.96)"
              speed={5.4}
              delay={1.45}
              className="capitalize px-1"
            >
              {guestName.trim() || "Tamu Undangan"}
            </ShinyText>
          </p>
          <span
            className="cover-line-x h-px w-full min-w-[200px] bg-gradient-to-r from-transparent via-[#8b6a56]/40 to-transparent"
            style={{ ["--cd" as string]: "0.62s" }}
          />
        </div>
        <div className="cover-fade-rise mt-5" style={{ ["--cd" as string]: "0.8s", ["--cdur" as string]: "0.8s" }}>
          <Magnet magnetStrength={0.3} padding={30}>
            <button
              onClick={open}
              className="font-pop relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#d7b67c]/50 bg-gradient-to-r from-[#5a3d49] via-[#7a5a4e] to-[#8b6a56] px-7 py-[11px] text-[12px] font-medium tracking-wider text-[#f8f2ec] shadow-[0_10px_24px_rgba(60,35,40,.35)] transition hover:brightness-110 active:scale-95"
            >
              <span
                aria-hidden="true"
                className="cover-btn-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-[#fff3d6]/35 to-transparent"
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              <span className="relative z-10">Buka Undangan</span>
            </button>
          </Magnet>
        </div>
        <div className="cover-fade-rise mt-2.5" style={{ ["--cd" as string]: "0.94s", ["--cdur" as string]: "0.75s" }}>
          <p className="cover-whisper font-pop text-[9.5px] tracking-widest text-[#8a7b73]">
            Ketuk segel lilin atau tombol di atas
          </p>
        </div>
      </div>
    </div>
  );
}
