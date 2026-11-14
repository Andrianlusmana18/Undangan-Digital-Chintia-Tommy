"use client";

import React, { useState } from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import { copyToClipboard } from "@/lib/clipboard";
import Reveal from "@/components/Reveal";
import ButterflySvg from "@/components/Butterfly";
import { EditorialFrame } from "@/components/LuxuryChrome";

export default function WeddingGiftSection() {
  const [copied, setCopied] = useState<number | null>(null);
  const copyTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const copy = async (txt: string, i: number) => {
    const ok = await copyToClipboard(txt.replace(/[^0-9]/g, ""));
    if (!ok) return;
    setCopied(i);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(null), 2200);
  };

  return (
    <section className="paper relative overflow-hidden px-6 pb-14 pt-16 text-center">
      <EditorialFrame topCorners topCap />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,251,245,0.4) 0%, transparent 74%)",
        }}
      />
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-6 z-0 w-[180px] rotate-[28deg] opacity-[0.14] mix-blend-multiply"
      />
      <div className="bfly absolute right-12 top-5 z-10 w-[40px]" style={{ ["--r" as string]: "10deg" }}>
        <ButterflySvg className="w-full drop-shadow-[0_3px_4px_rgba(0,0,0,.3)]" />
      </div>
      <Reveal className="relative z-10">
        <h2 className="font-script text-[48px] leading-none text-[#2f2226]">Wedding Gift</h2>
        <p className="font-corm mx-auto mt-5 max-w-[350px] text-[17px] font-medium leading-snug text-[#2f2528]">
          Kehadiran dan doa restu Anda sudah sangat berarti bagi kami. Dengan segala kerendahan hati, bagi Bapak/Ibu/Saudara/i yang berkenan memberikan kado pernikahan, dapat disalurkan melalui rekening berikut:
        </p>
      </Reveal>

      <Reveal delay={0.15} className="relative z-10 mx-auto mt-7 max-w-[330px] space-y-4 text-left">
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

