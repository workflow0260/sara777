"use client";

import { useEffect, useState } from "react";

export default function Toast({ message: initialMessage }: { message?: string | null }) {
  const [toastMessage, setToastMessage] = useState<string | null>(initialMessage || null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleDownloadEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail || "Sara777.apk downloading... Safe & Verified ⚡");
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      setTimeout(() => {
        setToastMessage(null);
      }, 3400);
    };

    window.addEventListener("sara-download-event", handleDownloadEvent);
    return () => window.removeEventListener("sara-download-event", handleDownloadEvent);
  }, []);

  if (!toastMessage) return null;

  return (
    <aside
      className={`vip-toast ${isVisible ? "toast-show" : "toast-hide"}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-content glass">
        <span className="toast-icon" aria-hidden="true">🚀</span>
        <div className="toast-text-wrap">
          <p className="toast-title">Download Initiated</p>
          <p className="toast-msg">{toastMessage}</p>
        </div>
        <span className="toast-badge">APK 100% SAFE</span>
      </div>
    </aside>
  );
}
