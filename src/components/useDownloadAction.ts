"use client";

import { useState, useCallback } from "react";

export function useDownloadAction() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const triggerDownload = useCallback((e?: React.MouseEvent<HTMLElement>) => {
    // 1. Tactile water ripple effect from click coordinates
    if (e && e.currentTarget) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height) * 1.6;
      const radius = diameter / 2;

      circle.style.width = `${diameter}px`;
      circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("btn-ripple");

      const existing = btn.querySelector(".btn-ripple");
      if (existing) existing.remove();

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 750);
    }

    setIsDownloading(true);
    setIsCompleted(false);

    // 2. Execute direct APK file download
    const a = document.createElement("a");
    a.href = "/api/download";
    a.download = "Sara777.apk";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 200);

    // 3. After download initiates (1.2s), fire completion celebration VFX
    setTimeout(() => {
      setIsDownloading(false);
      setIsCompleted(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sara-download-completed"));
      }

      // Reset completed status after celebration (3.2s)
      setTimeout(() => {
        setIsCompleted(false);
      }, 3200);
    }, 1200);
  }, []);

  return { isDownloading, isCompleted, triggerDownload };
}
