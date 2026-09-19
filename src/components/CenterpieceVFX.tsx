"use client";

import React from "react";

export default function CenterpieceVFX() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] pointer-events-none z-0 flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Central Ambient Core Glow */}
      <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-amber-500/25 via-amber-400/15 to-transparent blur-[65px] animate-pulse-glow" />
      <div className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full bg-purple-600/10 blur-[50px]" />

      {/* Outermost Segmented Orbit Ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 animate-rotate-slow scale-95" />

      {/* Middle Neon Ring with Gold Gradient */}
      <div className="absolute w-[82%] h-[82%] rounded-full border-[1.5px] border-amber-400/35 shadow-[0_0_25px_rgba(245,158,11,0.2)] animate-rotate-reverse">
        {/* Glowing Node Points along the Ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </div>

      {/* Inner Precision Ring with Hexagonal / Diamond Shards */}
      <div className="absolute w-[64%] h-[64%] rounded-full border border-amber-500/30 shadow-[inset_0_0_20px_rgba(245,158,11,0.15)] animate-rotate-slow">
        <div className="absolute top-1/4 right-0 w-2 h-2 rotate-45 bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
        <div className="absolute bottom-1/4 left-0 w-2 h-2 rotate-45 bg-amber-300 shadow-[0_0_10px_#fcd34d]" />
      </div>

      {/* Holographic Light Streaks */}
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent rotate-45" />
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/25 to-transparent -rotate-45" />

      {/* Center 777 Floating Glass Plate */}
      <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-amber-500/10 via-transparent to-black/40 backdrop-blur-[4px] border border-amber-400/20 flex items-center justify-center animate-float shadow-[0_0_30px_rgba(245,158,11,0.12)]">
        <div className="absolute inset-2 rounded-full border border-amber-300/15" />
        <span className="font-bold text-amber-300/20 text-5xl sm:text-7xl tracking-widest select-none font-outfit">
          777
        </span>
      </div>
    </div>
  );
}
