"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";

export default function AudioButton() {
  const { isPlaying, togglePlay } = useAudio();
  return (
    <button
      onClick={togglePlay}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      title={isPlaying ? "Jeda musik latar" : "Putar musik latar"}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#c7a67b]/45 bg-[#3a2632]/95 text-[#f7f2ec] shadow-[0_6px_18px_rgba(30,18,24,.38)] backdrop-blur-sm transition hover:scale-105 active:scale-95"
    >
      {isPlaying ? (
        <span className="flex h-4 items-end gap-[2.5px]">
          <span className="eq-bar h-3.5 w-[2.5px] rounded-full bg-[#e6cda5]" style={{ animationDelay: "0s" }} />
          <span className="eq-bar h-4 w-[2.5px] rounded-full bg-[#e6cda5]" style={{ animationDelay: ".2s" }} />
          <span className="eq-bar h-2.5 w-[2.5px] rounded-full bg-[#e6cda5]" style={{ animationDelay: ".4s" }} />
        </span>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]"><path d="M8 5v14l11-7z" /></svg>
      )}
    </button>
  );
}
