"use client";

import React, { useState } from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import ButterflySvg from "@/components/Butterfly";

export default function WeddingGiftSection() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (txt: string, i: number) => {
    navigator.clipboard?.writeText(txt.replace(/[^0-9]/g, ""));
    setCopied(i); setTimeout(() => setCopied(null), 2200);
  };

  return (
    <section className="paper relative overflow-hidden px-5 pb-16 pt-14 text-center">
      <div className="bfly absolute right-12 top-2 w-[40px]" style={{ ["--r" as string]: "10deg" }}>
        <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
      </div>
      <Reveal>
        <h2 className="font-script text-[48px] leading-none text-[#2f2226]">Wedding Gift</h2>
        <p className="font-corm mx-auto mt-5 max-w-[360px] text-[17px] font-medium leading-snug text-[#2f2528]">
          Kehadiran dan doa restu Anda sudah sangat berarti bagi kami. Dengan segala kerendahan hati, bagi Bapak/Ibu/Saudara/i yang berkenan memberikan kado pernikahan, dapat disalurkan melalui rekening berikut:
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-7 max-w-[330px] space-y-4 text-left">
        {WEDDING_DATA.bankAccounts.map((a, i) => (
          <div key={a.logo} className="relative overflow-hidden rounded-[18px] border border-[#c7a67b]/35 bg-gradient-to-br from-[#3a252d] via-[#2b1a20] to-[#1f1317] px-6 py-5 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[16px] font-bold tracking-wider text-[#f3e6d3]">{a.logo === "BCA" ? "BCA" : "DANA"}</p>
              <span className="font-pop rounded-full border border-[#c7a67b]/40 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-[#d9bc8c]">Wedding Gift</span>
            </div>
            <p className="font-corm mt-4 text-[14px] text-[#b8a5a1]">Nomor Rekening</p>
            <p className="mt-1 font-sans text-[19px] font-bold tracking-wide text-white">{a.accountNumber}</p>
            <p className="font-corm mt-4 text-[14px] text-[#b8a5a1]">Atas Nama</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="font-sans text-[17px] font-medium text-[#f5efe8]">{a.accountHolder}</p>
              <button
                onClick={() => copy(a.accountNumber, i)}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#c7a67b]/35 bg-[#6a5248] px-3.5 py-2 font-sans text-[12px] font-semibold text-white transition hover:bg-[#7d6256] active:scale-95"
              >
                {copied === i ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
                    Tersalin
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    Salin
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

