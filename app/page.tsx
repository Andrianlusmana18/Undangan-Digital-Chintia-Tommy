"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AudioProvider } from "@/context/AudioContext";
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
  const [guest, setGuest] = useState("");
  const [opened, setOpened] = useState(false);

  useEffect(() => { if (q) setGuest(q); }, [q]);
  useEffect(() => { if (sp.get("open") === "1") setOpened(true); }, [sp]);

  return (
    <div className="flex min-h-screen justify-center bg-[#dedad6]">
      <main className="relative w-full max-w-[480px] bg-[#efedea] shadow-[0_0_40px_rgba(0,0,0,.12)]">
        {!opened ? (
          <CoverSection guestName={guest} onOpenInvitation={() => { setOpened(true); window.scrollTo({ top: 0 }); }} />
        ) : (
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
      </main>
      {opened && (
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
      <Suspense fallback={<div className="min-h-screen bg-[#efedea]" />}>
        <App />
      </Suspense>
    </AudioProvider>
  );
}
