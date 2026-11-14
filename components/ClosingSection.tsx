"use client";

import React from "react";
import Link from "next/link";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import { AmbientMotes, EditorialDivider, EditorialFrame } from "@/components/LuxuryChrome";

export default function ClosingSection() {
  return (
    <section className="paper relative overflow-hidden px-6 pb-16 pt-4 text-center">
      <EditorialFrame bottomCorners bottomCap />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 82% 58% at 50% 45%, rgba(255,251,245,0.36) 0%, transparent 72%)",
        }}
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-14 z-0 w-[190px] -rotate-[25deg] opacity-[0.14] mix-blend-multiply"
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-14 z-0 w-[190px] -scale-x-100 rotate-[25deg] opacity-[0.14] mix-blend-multiply"
      />
      <AmbientMotes />

      <div className="relative z-10">
        <EditorialDivider className="mb-10" />
        <Reveal className="relative mx-auto w-[min(220px,54vw)]">
          <img src="/images/v2/env_closed.png" alt="" className="w-full drop-shadow-[0_10px_18px_rgba(40,25,35,.22)]" />
          <span className="absolute left-0 right-0 top-[11%] font-corm font-light text-[24px] tracking-[0.08em] emboss-w">CT</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-script mt-14 text-[38px] leading-tight text-[#2f2226]">Together With Our Families</h2>
          <p className="font-corm mx-auto mt-4 max-w-[340px] text-[17.5px] font-medium italic leading-snug text-[#2f2528]">
            Merupakan kehormatan serta kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.
          </p>
          <p className="font-script mt-6 text-[44px] leading-none text-[#2f2226]">{WEDDING_DATA.bride.name} &amp; {WEDDING_DATA.groom.name}</p>
        </Reveal>
        <div className="mt-14">
          <Link href="/tamu" className="font-pop inline-block text-[12px] text-[#6d6164] transition hover:text-[#2f2226]">
            © 2026 Chintia &amp; Tommy
          </Link>
        </div>
      </div>
    </section>
  );
}
