"use client";

import React from "react";
import Link from "next/link";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";

export default function ClosingSection() {
  return (
    <section className="paper relative px-6 pb-12 pt-16 text-center">
      <Reveal className="relative mx-auto w-[min(230px,56vw)]">
        <img src="/images/v2/env_closed.png" alt="" className="w-full drop-shadow-[0_8px_14px_rgba(40,25,35,.18)]" />
        <span className="absolute left-0 right-0 top-[11%] font-corm font-light text-[24px] tracking-[0.08em] emboss-w">CT</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-script mt-20 text-[38px] leading-tight text-[#2f2226]">Together With Our Families</h2>
        <p className="font-corm mx-auto mt-4 max-w-[360px] text-[18px] font-medium italic leading-snug text-[#2f2528]">
          Merupakan kehormatan serta kebahagiaan bagi kami apabila Saudara berkenan hadir untuk memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restunya kami ucapkan terima kasih.
        </p>
        <p className="font-script mt-6 text-[44px] leading-none text-[#2f2226]">{WEDDING_DATA.bride.name} &amp; {WEDDING_DATA.groom.name}</p>
      </Reveal>
      <div className="mt-16">
        <Link href="/tamu" className="font-pop inline-block text-[12px] text-[#6d6164] transition hover:text-[#2f2226]">
          © 2026 Chintia &amp; Tommy
        </Link>
      </div>
    </section>
  );
}
