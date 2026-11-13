"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playAudio: () => void;
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

  useEffect(() => {
    // Standard clean path for reliable hosting CDN delivery
    const audioSrc = "/audio/bgm.mp3";

    const audio = new Audio();
    audio.src = audioSrc;
    audio.loop = true;
    audio.preload = "none";

    // Auto-replay listener in case some browsers don't respect loop attribute
    const handleEnded = () => {
      try {
        audio.currentTime = 0;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } catch (err) {
        console.log("Audio loop retry error:", err);
      }
    };

    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
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
  }, []);

  const restartAndPlayAudio = useCallback(() => {
    if (audioRef.current) {
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
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stopAndResetAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      try {
        audioRef.current.currentTime = 0;
      } catch (e) {
        console.log("Audio reset:", e);
      }
      setIsPlaying(false);
    }
  }, []);

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
