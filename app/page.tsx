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

  // Lock scrolling strictly when invitation is not yet opened
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
      className={`flex min-h-screen justify-center bg-[#dedad6] ${!opened ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : ""}`}
    >
      <main
        style={{ colorScheme: "only light" }}
        className={`relative w-full max-w-[480px] bg-[#efedea] shadow-[0_0_40px_rgba(0,0,0,.12)] ${!opened ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : ""}`}
      >
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
