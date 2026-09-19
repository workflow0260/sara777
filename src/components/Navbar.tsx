"use client";

import { useScrollReveal } from "@/components/useScrollReveal";
import { useDownloadAction } from "@/components/useDownloadAction";

export default function Navbar() {
  const [ref, visible] = useScrollReveal(0.1);
  const { isDownloading, isCompleted, triggerDownload } = useDownloadAction();

  return (
    <nav
      ref={ref as React.RefObject<HTMLElement>}
      className={`navbar glass glass-nav reveal reveal-d1 ${visible ? "visible" : ""}`}
    >
      <div className="brand-group">
        <span className="brand-icon" aria-hidden="true">👑</span>
        <span className="brand">
          <span className="brand-sara">SARA</span>
          <span className="brand-777">777</span>
        </span>
      </div>

      <button
        className={`nav-download btn-mustard ${
          isCompleted ? "btn-completed" : isDownloading ? "btn-downloading" : ""
        }`}
        onClick={triggerDownload}
        aria-label="Download Sara777 APK"
      >
        <span className="dl-icon" aria-hidden="true">
          {isCompleted ? "✓" : isDownloading ? "⏳" : "↓"}
        </span>
        <span className="btn-text-full">
          {isCompleted ? "DOWNLOADED ✓" : isDownloading ? "SAVING..." : "DOWNLOAD NOW"}
        </span>
        <span className="btn-text-mobile">
          {isCompleted ? "SAVED ✓" : isDownloading ? "..." : "DOWNLOAD"}
        </span>
        <span className="cta-shine" aria-hidden="true" />
      </button>
    </nav>
  );
}
