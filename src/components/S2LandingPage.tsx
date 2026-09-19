"use client";

import GoldenParticles from "@/components/GoldenParticles";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GameRatesSection from "@/components/GameRatesSection";
import Toast from "@/components/Toast";
import DownloadCelebrationVFX from "@/components/DownloadCelebrationVFX";

export default function S2LandingPage() {
  return (
    <>
      {/* Floating golden particles VFX */}
      <GoldenParticles />

      {/* Animated ambient background orbs */}
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Celebratory golden confetti, coins & starburst VFX on download complete */}
      <DownloadCelebrationVFX />

      {/* Floating toast notification for smooth action feedback */}
      <Toast />

      {/* Main content */}
      <div className="page-wrapper">
        <Navbar />
        <HeroSection />
        <GameRatesSection />
      </div>
    </>
  );
}
