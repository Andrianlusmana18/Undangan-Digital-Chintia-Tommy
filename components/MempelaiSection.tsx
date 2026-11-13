"use client";

import React from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import ButterflySvg from "@/components/Butterfly";

export default function MempelaiSection() {
  const g = WEDDING_DATA;
  return (
    <section className="paper relative px-3 pb-10 pt-4">
      <Reveal className="relative mx-auto w-full max-w-[430px]">
        <div className="relative" style={{ containerType: "inline-size" }}>
          <img src="/images/v2/frame_short.jpg" alt="" className="block w-full rounded-[3px] shadow-[0_8px_24px_rgba(40,30,30,.12)]" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-between text-center text-[#2d2326]"
            style={{ padding: "23.5cqw 19cqw 23cqw" }}
          >
            {/* Header: Basmalah & Salam */}
            <div className="flex flex-col items-center w-full">
              <p
                dir="rtl"
                lang="ar"
                className="font-amiri select-none text-[#2d1f24]"
                style={{
                  fontSize: "7.2cqw",
                  lineHeight: 1.25,
                  fontFeatureSettings: '"liga" 1, "calt" 1, "kern" 1',
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <p className="font-playfair font-semibold tracking-wide text-[#2e1f25]" style={{ fontSize: "3.4cqw", marginTop: "1.4cqw" }}>
                Assalamu&apos;alaikum Wr. Wb.
              </p>

              <p
                className="font-corm font-medium text-[#46373d]"
                style={{
                  fontSize: "3.1cqw",
                  lineHeight: 1.38,
                  marginTop: "0.8cqw",
                  maxWidth: "92%",
                  textWrap: "balance",
                }}
              >
                Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:
              </p>
            </div>

            {/* Mempelai Wanita */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-alex text-[#2b1b22]" style={{ fontSize: "9.6cqw", lineHeight: 1 }}>
                {g.bride.fullName}
              </h3>
              <p className="font-cinzel font-semibold uppercase text-[#735e65]" style={{ fontSize: "2.3cqw", letterSpacing: "0.22em", marginTop: "1.2cqw" }}>
                Putri dari
              </p>
              <p className="font-corm font-semibold italic text-[#2e2025]" style={{ fontSize: "3.8cqw", marginTop: "0.6cqw" }}>
                {g.bride.father} &amp; {g.bride.mother}
              </p>
            </div>

            {/* Divider & Ampersand */}
            <div className="flex items-center justify-center w-full" style={{ gap: "3cqw" }}>
              <span className="h-[1px] w-[20%] bg-gradient-to-r from-transparent to-[#8a6a56]/40" />
              <span className="font-corm italic text-[#684b3d] select-none" style={{ fontSize: "6.5cqw", lineHeight: 1 }}>
                &amp;
              </span>
              <span className="h-[1px] w-[20%] bg-gradient-to-l from-transparent to-[#8a6a56]/40" />
            </div>

            {/* Mempelai Pria */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-alex text-[#2b1b22]" style={{ fontSize: "9.6cqw", lineHeight: 1 }}>
                {g.groom.fullName}
              </h3>
              <p className="font-cinzel font-semibold uppercase text-[#735e65]" style={{ fontSize: "2.3cqw", letterSpacing: "0.22em", marginTop: "1.2cqw" }}>
                Putra dari
              </p>
              <p className="font-corm font-semibold italic text-[#2e2025]" style={{ fontSize: "3.8cqw", marginTop: "0.6cqw" }}>
                {g.groom.father} &amp; {g.groom.mother}
              </p>
            </div>
          </div>

          <div className="bfly absolute" style={{ right: "-2%", top: "-2.5%", width: "14%", ["--r" as string]: "14deg" }}>
            <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
