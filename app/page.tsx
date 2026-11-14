"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AudioProvider } from "@/context/AudioContext";
import DoveIntroOverlay from "@/components/DoveIntroOverlay";
import CoverSection from "@/components/CoverSection";
import HeroCollage from "@/components/HeroCollage";
import CountdownSection from "@/components/CountdownSection";
import MempelaiSection from "@/components/MempelaiSection";
import TheDetailsSection from "@/components/TheDetailsSection";
import OurStorySection from "@/components/OurStorySection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";
import WeddingGiftSection from "@/components/WeddingGiftSection";
import ClosingSection from "@/components/ClosingSection";
import AudioButton from "@/components/AudioButton";
import { ScrollProgressAndNav } from "@/components/LuxuryChrome";

function App() {
  const sp = useSearchParams();
  const q = sp.get("to") || sp.get("u") || sp.get("guest") || "";
  const openParam = sp.get("open") === "1";
  const [guest, setGuest] = useState("");
  const [stage, setStage] = useState<"cover" | "doves" | "open">(openParam ? "open" : "cover");
  const [keepCover, setKeepCover] = useState(!openParam);
  const coverTimerRef = React.useRef<number | null>(null);
  const opened = stage === "open";

  useEffect(() => { if (q) setGuest(q); }, [q]);
  useEffect(() => {
    if (openParam) {
      setStage("open");
      setKeepCover(false);
    }
  }, [openParam]);

  useEffect(() => {
    return () => {
      if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current);
    };
  }, []);

  const handleOpenInvitation = () => {
    setStage("doves");
    if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current);
    coverTimerRef.current = window.setTimeout(() => setKeepCover(false), 450);
  };

  const handleDovesComplete = () => {
    if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current);
    setKeepCover(false);
    setStage("open");
  };

  // Lock scrolling strictly on cover and during the 2s grand-reveal transition
  useEffect(() => {
    if (!opened) {
      document.documentElement.classList.add("lock-scroll");
      document.body.classList.add("lock-scroll");
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
      document.body.style.left = "0";
    } else {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
    }
    return () => {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
    };
  }, [opened]);

  return (
    <div
      style={{ colorScheme: "only light" }}
      className={`flex min-h-screen justify-center bg-gradient-to-b from-[#d8cfc5] via-[#cfc3b7] to-[#c4b7aa] ${!opened ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : ""}`}
    >
      <main
        style={{ colorScheme: "only light" }}
        className={`relative w-full max-w-[480px] bg-[#eae1d7] shadow-[0_0_50px_rgba(38,24,28,.18)] ${!opened ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : ""}`}
      >
        {/* Invitation content mounts immediately when clicked so doves & silk curtains unveil HeroCollage directly */}
        {stage !== "cover" && (
          <>
            <div id="sec-hero"><HeroCollage /></div>
            <CountdownSection />
            <div id="sec-mempelai"><MempelaiSection /></div>
            <div id="sec-details"><TheDetailsSection /></div>
            <div id="sec-story"><OurStorySection /></div>
            <div id="sec-gallery"><GallerySection /></div>
            <div id="sec-rsvp"><RsvpSection initialGuestName={guest} /></div>
            <div id="sec-gift"><WeddingGiftSection /></div>
            <ClosingSection />
          </>
        )}

        {/* Envelope cover layer (full interactive on cover stage, softly fades out over 0.42s when opened) */}
        {keepCover && (
          <div className={stage === "cover" ? "relative h-[100dvh] w-full overflow-hidden" : "pointer-events-none absolute inset-0 z-20 h-[100dvh] w-full overflow-hidden"}>
            <CoverSection guestName={guest} onOpenInvitation={handleOpenInvitation} />
          </div>
        )}

        {/* Transparent 2-second silk veil + parting doves + golden sparkles unveiling HeroCollage */}
        {stage === "doves" && (
          <DoveIntroOverlay onComplete={handleDovesComplete} />
        )}
      </main>
      {stage !== "cover" && (
        <>
          <ScrollProgressAndNav />
          <AudioButton />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#eae1d7]" />}>
        <App />
      </Suspense>
    </AudioProvider>
  );
}
