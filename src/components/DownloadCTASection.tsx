"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function DownloadCTASection() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="download" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10 overflow-hidden">
      {/* Cinematic Ambient Glow Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-600/10 rounded-full blur-[110px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Glassmorphism Container */}
      <div className="relative rounded-3xl glass-panel p-8 sm:p-12 md:p-16 border border-amber-500/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)]">
        {/* Interior Atmospheric Lighting */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold tracking-wider text-amber-300 uppercase">
                Direct Android APK V3.2
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-white leading-tight mb-4">
              ELEVATE YOUR <br />
              <span className="gold-text-gradient gold-text-glow">GAMING STANDARD</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Download the official SARA 777 mobile application now for lightning-fast live market charts, instant deposit and withdrawal processing, and unparalleled gameplay security.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              {[
                "Instant Auto-Credit Withdrawals",
                "Real-Time Panel & Jodi Charts",
                "Safe & Encrypted Transactions",
                "24/7 Dedicated Player Support",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Second Major CTA Button */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse" />

              <a
                href="/api/download"
                download="Sara777.apk"
                onClick={handleButtonClick}
                className="ripple-btn relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base sm:text-lg tracking-wider uppercase border border-amber-200/60 shadow-[0_0_30px_rgba(245,158,11,0.5),0_10px_25px_rgba(0,0,0,0.8)] hover:scale-[1.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                aria-label="Download Now SARA 777"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                <span className="font-outfit font-black tracking-wider drop-shadow-sm">
                  DOWNLOAD NOW
                </span>

                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/40 pointer-events-none animate-ping"
                    style={{
                      top: ripple.y - 20,
                      left: ripple.x - 20,
                      width: 40,
                      height: 40,
                    }}
                  />
                ))}
              </a>
            </div>

            {downloadSuccess && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold animate-fade-in mt-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Downloading official Sara777 APK...</span>
              </div>
            )}
          </div>

          {/* Right Visual / App Mockup Preview */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-sm flex items-center justify-center">
              {/* Glowing Halo around preview */}
              <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-2xl transform scale-90" />

              <div className="relative z-10 flex gap-4 items-center justify-center">
                {/* Screenshot 1 */}
                <div className="w-36 sm:w-44 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.2)] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/app-screenshot-results.webp"
                    alt="SARA 777 Live Results Screen"
                    width={200}
                    height={380}
                    className="object-cover w-full h-auto"
                  />
                </div>

                {/* Screenshot 2 */}
                <div className="w-36 sm:w-44 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.3)] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/app-screenshot-charts.webp"
                    alt="SARA 777 Game Charts Screen"
                    width={200}
                    height={380}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
