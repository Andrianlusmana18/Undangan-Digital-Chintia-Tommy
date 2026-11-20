"use client";

import React from "react";
import { WEDDING_DATA } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import { EditorialDivider, EditorialFrame, PaperBackdrop, inkStyle } from "@/components/LuxuryChrome";

export default function OurStorySection() {
  const stories = WEDDING_DATA.stories;

  return (
    <section className="paper relative px-5 pb-8 pt-2">
      <PaperBackdrop />
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
              <h2 className="font-alex ink ink-script" style={{ fontSize: "9.5cqw", lineHeight: 1, ...inkStyle("#2f1f26") }}>
                Our Story
              </h2>
              <div className="flex items-center justify-center mt-[0.8cqw]">
                <span className="h-[1px] w-[24px] bg-[#8a6a56]/40" />
                <span className="ink mx-2 text-[2cqw]" style={inkStyle("#7d5b4a")}>✦</span>
                <span className="h-[1px] w-[24px] bg-[#8a6a56]/40" />
              </div>
            </div>

            {/* 4 Stories evenly distributed inside the safe area */}
            {stories.map((s, idx) => (
              <React.Fragment key={s.title}>
                <div className="w-full flex flex-col items-center">
                  <span className="font-corm ink ink-script italic block" style={{ fontSize: "2.8cqw", lineHeight: 1.1, ...inkStyle("#7d5b4a") }}>
                    {s.date}
                  </span>
                  <h3
                    className="font-cinzel ink font-semibold tracking-[0.14em] uppercase"
                    style={{ fontSize: "3.2cqw", lineHeight: 1.2, marginTop: "0.4cqw", ...inkStyle("#35242b") }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-corm ink font-medium"
                    style={{
                      fontSize: "3.05cqw",
                      lineHeight: 1.42,
                      marginTop: "0.5cqw",
                      textWrap: "balance",
                      maxWidth: "96%",
                      ...inkStyle("#3e3035"),
                    }}
                  >
                    {s.description}
                  </p>
                </div>

                {idx < stories.length - 1 && (
                  <span className="ink text-[1.8cqw] select-none block opacity-60" style={inkStyle("#a08a7e")}>✦</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
