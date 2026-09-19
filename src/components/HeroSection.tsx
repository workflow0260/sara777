"use client";

import { useScrollReveal } from "@/components/useScrollReveal";
import { useDownloadAction } from "@/components/useDownloadAction";
import { Download, Check } from "lucide-react";

export default function HeroSection() {
  const [ref, visible] = useScrollReveal(0.1);
  const { isDownloading, isCompleted, triggerDownload } = useDownloadAction();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`hero glass glass-hero reveal reveal-d2 ${visible ? "visible" : ""}`}
    >
      {/* Ambient glowing radial backdrop */}
      <div className="hero-radial-glow" aria-hidden="true" />

      {/* Live status badge */}
      <div className="hero-status-badge">
        <span className="live-dot" />
        <span>OFFICIAL GAMING PORTAL</span>
      </div>

      {/* Main Brand Title - Simple Solid Logo */}
      <div className="hero-title-wrap">
        <h1 className="hero-title">
          <span className="hero-sara">SARA</span>
          <span className="hero-777">777</span>
        </h1>
      </div>

      {/* Tagline Pill */}
      <div className="hero-tagline-wrap">
        <div className="hero-tagline">
          <span className="tagline-icon">✨</span>
          <span>Premium Gaming Experience</span>
        </div>
      </div>

      {/* Trust Highlights Strip */}
      <div className="hero-features">
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <span className="feature-label">Instant Payouts</span>
        </div>
        <div className="feature-sep">•</div>
        <div className="feature-item">
          <span className="feature-icon">🛡️</span>
          <span className="feature-label">100% Safe APK</span>
        </div>
      </div>

      {/* Main Download CTA Button with Lucide Icon */}
      <div className="hero-cta-group">
        <button
          className={`hero-download btn-mustard btn-hero-pulse ${
            isCompleted
              ? "btn-completed"
              : isDownloading
              ? "btn-downloading"
              : ""
          }`}
          onClick={triggerDownload}
          aria-label="Download Sara777 Official App"
        >
          {isCompleted ? (
            <Check size={20} strokeWidth={2.5} className="dl-arrow" aria-hidden="true" />
          ) : (
            <Download size={20} strokeWidth={2.5} className="dl-arrow" aria-hidden="true" />
          )}
          <span>
            {isCompleted
              ? "DOWNLOAD COMPLETE! 🚀"
              : isDownloading
              ? "DOWNLOADING APK..."
              : "DOWNLOAD NOW"}
          </span>
          <span className="cta-shine" aria-hidden="true" />
        </button>
        <p className="cta-subtext">
          <span className="android-icon">🤖</span> Direct APK Download · Fast & Secure Installation
        </p>
      </div>
    </section>
  );
}
