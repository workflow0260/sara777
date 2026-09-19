"use client";

import { useScrollReveal } from "@/components/useScrollReveal";

export default function HeroSection() {
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
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`hero glass reveal reveal-d2 ${visible ? "visible" : ""}`}
    >
      <div className="hero-title">
        <span className="hero-sara">SARA</span>
        <span className="hero-777">777</span>
      </div>
      <div className="hero-tagline">Premium Gaming Experience</div>
      <button className="hero-download btn-mustard" onClick={handleDownload}>
        <span className="dl-arrow">↓</span> DOWNLOAD NOW
      </button>
    </section>
  );
}
