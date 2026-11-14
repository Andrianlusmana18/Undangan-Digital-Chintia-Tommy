"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playAudio: () => void;
  playAudioWithFade: (delayMs?: number, fadeDurationMs?: number) => void;
  pauseAudio: () => void;
  restartAndPlayAudio: () => void;
  stopAndResetAudio: () => void;
  hasInteracted: boolean;
  setHasInteracted: (val: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  const cancelFade = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (fadeRafRef.current !== null) {
      window.cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Standard clean path for reliable hosting CDN delivery
    const audioSrc = "/audio/bgm.mp3";

    const audio = new Audio();
    audio.src = audioSrc;
    audio.loop = true;
    audio.preload = "none";

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Auto-replay listener in case some browsers don't respect loop attribute
    const handleEnded = () => {
      try {
        audio.currentTime = 0;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } catch (err) {
        console.log("Audio loop retry error:", err);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;

    return () => {
      cancelFade();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, [cancelFade]);

  const playAudio = useCallback(() => {
    cancelFade();
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented by browser:", err);
        });
    }
  }, [cancelFade]);

  const playAudioWithFade = useCallback(
    (delayMs = 550, fadeDurationMs = 2000) => {
      cancelFade();
      const audio = audioRef.current;
      if (!audio) return;

      // Unlock playback inside user click gesture at zero volume, then swell softly
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented by browser:", err);
        });

      fadeTimerRef.current = window.setTimeout(() => {
        fadeTimerRef.current = null;
        const start = performance.now();
        const step = (now: number) => {
          const target = audioRef.current;
          if (!target || target.paused) {
            fadeRafRef.current = null;
            return;
          }
          const progress = Math.min(1, (now - start) / Math.max(1, fadeDurationMs));
          // Smooth gentle swell curve
          target.volume = Math.min(1, 1 - Math.pow(1 - progress, 2.2));
          if (progress < 1) {
            fadeRafRef.current = window.requestAnimationFrame(step);
          } else {
            target.volume = 1;
            fadeRafRef.current = null;
          }
        };
        fadeRafRef.current = window.requestAnimationFrame(step);
      }, delayMs);
    },
    [cancelFade]
  );

  const restartAndPlayAudio = useCallback(() => {
    cancelFade();
    if (audioRef.current) {
      audioRef.current.volume = 1;
      try {
        audioRef.current.currentTime = 0;
      } catch (e) {
        console.log("Audio seek reset:", e);
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented by browser:", err);
        });
    }
  }, [cancelFade]);

  const pauseAudio = useCallback(() => {
    cancelFade();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.volume = 1;
      setIsPlaying(false);
    }
  }, [cancelFade]);

  const stopAndResetAudio = useCallback(() => {
    cancelFade();
    if (audioRef.current) {
      audioRef.current.pause();
      try {
        audioRef.current.currentTime = 0;
      } catch (e) {
        console.log("Audio reset:", e);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.volume = 1;
      }
      setIsPlaying(false);
    }
  }, [cancelFade]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        playAudio,
        playAudioWithFade,
        pauseAudio,
        restartAndPlayAudio,
        stopAndResetAudio,
        hasInteracted,
        setHasInteracted,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
