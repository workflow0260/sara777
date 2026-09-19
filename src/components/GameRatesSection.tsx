"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/components/useScrollReveal";

const GAME_RATES = [
  { id: "single-digit", name: "Single Digit", rate: 10 },
  { id: "jodi-digits", name: "Jodi Digits", rate: 100 },
  { id: "red-brackets", name: "Red Brackets", rate: 100 },
  { id: "single-pana", name: "Single Pana", rate: 150 },
  { id: "double-pana", name: "Double Pana", rate: 300 },
  { id: "triple-pana", name: "Triple Pana", rate: 600 },
  { id: "half-sangam-a", name: "Half Sangam A", rate: 1000 },
  { id: "half-sangam-b", name: "Half Sangam B", rate: 1000 },
  { id: "full-sangam", name: "Full Sangam", rate: 10000, isJackpot: true },
];

export default function GameRatesSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const [rowsVisible, setRowsVisible] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Stagger row animations when the table comes into view
  useEffect(() => {
    if (!tableRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRowsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/api/download";
    a.download = "Sara777.apk";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 200);
  };

  return (
    <>
      {/* GAME RATES */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`reveal reveal-d3 ${sectionVisible ? "visible" : ""}`}
      >
        <div className="section-title">Game Rates</div>
        <div className="rates-table-wrap glass" ref={tableRef}>
          <table className="rates-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Rate (1 Rs)</th>
              </tr>
            </thead>
            <tbody>
              {GAME_RATES.map((game, index) => (
                <tr
                  key={game.id}
                  className={`rate-row ${game.isJackpot ? "rate-jackpot" : ""} ${
                    rowsVisible ? "visible" : ""
                  }`}
                  style={{ transitionDelay: rowsVisible ? `${index * 0.06}s` : "0s" }}
                >
                  <td>{game.name}</td>
                  <td className="rate-amount">{game.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GOLD SEPARATOR */}
      <hr className="gold-separator" style={{ marginTop: 28 }} />

      {/* BOTTOM DOWNLOAD */}
      <div className="bottom-download-wrap">
        <button className="btn-bottom btn-mustard" onClick={handleDownload}>
          <span className="dl-arrow">↓</span> DOWNLOAD NOW
        </button>
      </div>

      {/* FOOTER */}
      <div className="footer-wrap">
        <span className="footer-note">© 2025 SARA777 · Premium Gaming</span>
      </div>
    </>
  );
}
