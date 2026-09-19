"use client";

import { useScrollReveal } from "@/components/useScrollReveal";

export default function Navbar() {
  const [ref, visible] = useScrollReveal(0.1);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/api/download";
    a.download = "Sara777.apk";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 200);
  };

  return (
    <nav
      ref={ref as React.RefObject<HTMLElement>}
      className={`navbar glass-nav reveal reveal-d1 ${visible ? "visible" : ""}`}
    >
      <div className="brand-group">
        <span className="brand-icon" aria-hidden="true">👑</span>
        <span className="brand">
          <span className="brand-sara">SARA</span>
          <span className="brand-777">777</span>
        </span>
      </div>

      <button
        className="nav-download btn-mustard"
        onClick={handleDownload}
        aria-label="Download Sara777 APK"
      >
        <span className="dl-icon" aria-hidden="true">↓</span>
        <span className="btn-text-full">DOWNLOAD NOW</span>
        <span className="btn-text-mobile">DOWNLOAD</span>
      </button>
    </nav>
  );
}
