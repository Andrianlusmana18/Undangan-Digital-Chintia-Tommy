"use client";

import React from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import { EditorialDivider, EditorialFrame } from "@/components/LuxuryChrome";

export default function OurStorySection() {
  const stories = WEDDING_DATA.stories;

  return (
    <section className="paper relative px-5 pb-8 pt-2">
      <EditorialFrame />
      <EditorialDivider className="relative z-10 mb-6" />
      <Reveal className="relative z-10 mx-auto w-full max-w-[410px]">
        <div className="relative" style={{ containerType: "inline-size" }}>
          <img src="/images/v2/frame_story.jpg" alt="" className="block w-full rounded-[3px] shadow-[0_8px_24px_rgba(40,30,30,.12)]" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-between text-center"
            style={{ padding: "22cqw 19.5cqw 23cqw" }}
          >
            {/* Header */}
            <div>
              <h2 className="font-alex text-[#2f1f26]" style={{ fontSize: "9.5cqw", lineHeight: 1 }}>
                Our Story
              </h2>
              <div className="flex items-center justify-center mt-[0.8cqw]">
                <span className="h-[1px] w-[24px] bg-[#8a6a56]/40" />
                <span className="mx-2 text-[#7d5b4a] text-[2cqw]">✦</span>
                <span className="h-[1px] w-[24px] bg-[#8a6a56]/40" />
              </div>
            </div>

            {/* 4 Stories evenly distributed inside the safe area */}
            {stories.map((s, idx) => (
              <React.Fragment key={s.title}>
                <div className="w-full flex flex-col items-center">
                  <span className="font-corm italic text-[#7d5b4a] block" style={{ fontSize: "2.8cqw", lineHeight: 1.1 }}>
                    {s.date}
                  </span>
                  <h3
                    className="font-cinzel font-semibold tracking-[0.14em] uppercase text-[#35242b]"
                    style={{ fontSize: "3.2cqw", lineHeight: 1.2, marginTop: "0.4cqw" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-corm font-medium text-[#3e3035]"
                    style={{
                      fontSize: "3.05cqw",
                      lineHeight: 1.42,
                      marginTop: "0.5cqw",
                      textWrap: "balance",
                      maxWidth: "96%",
                    }}
                  >
                    {s.description}
                  </p>
                </div>

                {idx < stories.length - 1 && (
                  <span className="text-[#a08a7e]/60 text-[1.8cqw] select-none block">✦</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
