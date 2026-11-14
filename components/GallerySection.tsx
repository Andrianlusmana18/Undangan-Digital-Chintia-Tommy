"use client";

import React, { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { EditorialDivider, EditorialFrame } from "@/components/LuxuryChrome";

interface PhotoItem {
  src: string;
  label: string;
  aspect: string;
  rotate: string;
  tape?: "top-center" | "top-left" | "top-right";
  objectPosition?: string;
}

const PHOTOS: PhotoItem[] = [
  {
    src: "/images/couple-front.jpg",
    label: "Lamaran — Momen Bahagia",
    aspect: "4/5",
    rotate: "-1.2deg",
    tape: "top-center",
    objectPosition: "center 5%",
  },
  {
    src: "/images/couple-batik-1.jpg",
    label: "Kebersamaan",
    aspect: "3/4",
    rotate: "-2.5deg",
    tape: "top-left",
    objectPosition: "center 12%",
  },
  {
    src: "/images/couple-batik-2.jpg",
    label: "Senyum Bahagia",
    aspect: "3/4",
    rotate: "2.2deg",
    tape: "top-right",
    objectPosition: "center 12%",
  },
  {
    src: "/images/couple-flower.jpg",
    label: "Buket Bunga",
    aspect: "3/4",
    rotate: "1.8deg",
    tape: "top-left",
    objectPosition: "center 15%",
  },
  {
    src: "/images/couple.jpg",
    label: "Bergandengan Tangan",
    aspect: "3/4",
    rotate: "-2.2deg",
    tape: "top-right",
    objectPosition: "center 15%",
  },
  {
    src: "/images/ring-exchange.jpg",
    label: "Tukar Cincin — Ikatan Suci",
    aspect: "4/4.5",
    rotate: "1deg",
    tape: "top-center",
    objectPosition: "center 20%",
  },
];

function PolaroidCard({
  photo,
  idx,
  onClick,
  delay = 0,
  className = "",
}: {
  photo: PhotoItem;
  idx: number;
  onClick: () => void;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={`relative ${className}`}>
      <button
        type="button"
        onClick={onClick}
        style={{ transform: `rotate(${photo.rotate})` }}
        className="group relative block w-full rounded-[2px] bg-[#fbf9f5] p-[8px] pt-[14px] pb-[22px] text-left shadow-[0_10px_24px_-6px_rgba(45,30,25,0.25),0_2px_6px_rgba(45,30,25,0.12)] ring-1 ring-[#8a6a56]/15 transition-all duration-500 ease-out hover:z-20 hover:rotate-0 hover:scale-[1.03] hover:shadow-[0_18px_36px_-8px_rgba(45,30,25,0.32)]"
      >
        {/* Washi / Masking Tape Accent */}
        {photo.tape === "top-center" && (
          <span className="pointer-events-none absolute -top-[7px] left-1/2 z-10 h-[18px] w-[62px] -translate-x-1/2 -rotate-[1.5deg] bg-[#e6dcc8]/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
        )}
        {photo.tape === "top-left" && (
          <span className="pointer-events-none absolute -top-[6px] left-[14px] z-10 h-[16px] w-[44px] -rotate-[14deg] bg-[#e6dcc8]/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
        )}
        {photo.tape === "top-right" && (
          <span className="pointer-events-none absolute -top-[6px] right-[14px] z-10 h-[16px] w-[44px] rotate-[14deg] bg-[#e6dcc8]/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
        )}

        <div className="overflow-hidden bg-[#ece6dd] ring-1 ring-[#8a6a56]/10">
          <img
            src={photo.src}
            alt={photo.label}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{
              aspectRatio: photo.aspect,
              objectPosition: photo.objectPosition || "center 15%",
            }}
          />
        </div>

        <p className="font-corm mt-2 truncate text-center text-[13px] font-medium italic tracking-wide text-[#5a453e]">
          {photo.label}
        </p>
      </button>
    </Reveal>
  );
}

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      else if (e.key === "ArrowLeft") setActiveIdx((cur) => (cur === null ? null : (cur - 1 + PHOTOS.length) % PHOTOS.length));
      else if (e.key === "ArrowRight") setActiveIdx((cur) => (cur === null ? null : (cur + 1) % PHOTOS.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIdx !== null]);

  const step = (dir: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + dir + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <section className="paper relative overflow-hidden px-6 pb-16 pt-4">
      <EditorialFrame bottomCorners bottomCap />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 45%, rgba(255,251,245,0.32) 0%, transparent 74%)",
        }}
      />

      {/* Subtle botanical background accents */}
      <img
        src="/images/v2/botanical_sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-16 z-0 w-[135px] rotate-[24deg] opacity-[0.22] mix-blend-multiply"
      />
      <img
        src="/images/v2/dried_flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-12 z-0 w-[120px] -rotate-[18deg] opacity-35"
      />

      <EditorialDivider className="relative z-10 mb-7" />

      {/* Section Header */}
      <Reveal className="relative z-10 mx-auto max-w-[400px] text-center">
        <h2 className="font-alex text-[44px] leading-none text-[#332229]">Our Moments</h2>
        <p className="font-cinzel mt-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7a645a]">
          Potret Kebersamaan
        </p>
        <div className="mt-2.5 flex items-center justify-center">
          <span className="h-[1px] w-8 bg-[#8a6a56]/40" />
          <span className="mx-2 text-[11px] text-[#7d5b4a]">✦</span>
          <span className="h-[1px] w-8 bg-[#8a6a56]/40" />
        </div>
      </Reveal>

      {/* Editorial Scrapbook Collage */}
      <div className="relative z-10 mx-auto mt-8 max-w-[400px] space-y-6">
        {/* 1. Featured Opening Portrait */}
        <div className="px-2">
          <PolaroidCard
            photo={PHOTOS[0]}
            idx={0}
            onClick={() => setActiveIdx(0)}
            delay={0.05}
          />
        </div>

        {/* 2. Staggered Asymmetric Portrait Duo */}
        <div className="grid grid-cols-2 items-start gap-3.5 px-1">
          <PolaroidCard
            photo={PHOTOS[1]}
            idx={1}
            onClick={() => setActiveIdx(1)}
            delay={0.12}
          />
          <PolaroidCard
            photo={PHOTOS[2]}
            idx={2}
            onClick={() => setActiveIdx(2)}
            delay={0.2}
            className="mt-6"
          />
        </div>

        {/* 3. Staggered Opposite Duo */}
        <div className="grid grid-cols-2 items-start gap-3.5 px-1">
          <PolaroidCard
            photo={PHOTOS[3]}
            idx={3}
            onClick={() => setActiveIdx(3)}
            delay={0.12}
            className="mt-4"
          />
          <PolaroidCard
            photo={PHOTOS[4]}
            idx={4}
            onClick={() => setActiveIdx(4)}
            delay={0.2}
          />
        </div>

        {/* 4. Featured Closing Moment */}
        <div className="px-2 pt-1">
          <PolaroidCard
            photo={PHOTOS[5]}
            idx={5}
            onClick={() => setActiveIdx(5)}
            delay={0.15}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto galeri"
          onClick={() => setActiveIdx(null)}
          className="animate-fadeIn fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setActiveIdx(null)}
            aria-label="Tutup pratinjau"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <div className="relative flex max-w-[440px] items-center justify-center">
            <img
              src={PHOTOS[activeIdx].src}
              alt={PHOTOS[activeIdx].label}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-full rounded-[2px] border-[6px] border-[#fbf9f5] object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={(e) => step(-1, e)}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={(e) => step(1, e)}
              aria-label="Foto berikutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          <p className="font-corm mt-3 text-[15px] italic text-[#f5efe8]">
            {PHOTOS[activeIdx].label} &bull; {activeIdx + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  );
}
