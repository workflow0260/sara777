"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/components/useScrollReveal";
import { useDownloadAction } from "@/components/useDownloadAction";

interface GameRate {
  id: string;
  name: string;
  rate: number;
  icon: string;
  isJackpot?: boolean;
  multiplierText?: string;
}

const GAME_RATES: GameRate[] = [
  { id: "single-digit", name: "Single Digit", rate: 10, icon: "🎲", multiplierText: "10x" },
  { id: "jodi-digits", name: "Jodi Digits", rate: 100, icon: "🎯", multiplierText: "100x" },
  { id: "red-brackets", name: "Red Brackets", rate: 100, icon: "🟥", multiplierText: "100x" },
  { id: "single-pana", name: "Single Pana", rate: 150, icon: "🃏", multiplierText: "150x" },
  { id: "double-pana", name: "Double Pana", rate: 300, icon: "🎴", multiplierText: "300x" },
  { id: "triple-pana", name: "Triple Pana", rate: 600, icon: "💎", multiplierText: "600x" },
  { id: "half-sangam-a", name: "Half Sangam A", rate: 1000, icon: "⚡", multiplierText: "1,000x" },
  { id: "half-sangam-b", name: "Half Sangam B", rate: 1000, icon: "🌟", multiplierText: "1,000x" },
  { id: "full-sangam", name: "Full Sangam", rate: 10000, icon: "🏆", isJackpot: true, multiplierText: "10,000x" },
];

export default function GameRatesSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const [rowsVisible, setRowsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const { isDownloading, isCompleted, triggerDownload } = useDownloadAction();

  useEffect(() => {
    if (!tableRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRowsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRowClick = (game: GameRate) => {
    setSelectedGame(game.id);
    setTimeout(() => {
      setSelectedGame((curr) => (curr === game.id ? null : curr));
    }, 1800);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`rates-section reveal reveal-d3 ${sectionVisible ? "visible" : ""}`}
    >
      {/* Section Header */}
      <div className="section-header">
        <div className="section-title-badge">
          <span className="badge-icon">📊</span>
          <span>BEST MARKET RATIOS</span>
        </div>
        <h2 className="section-title">Game Rates</h2>
        <p className="section-subtitle">Guaranteed 1 Rs Standard Winning Payouts</p>
      </div>

      {/* Rates Table Glass Card */}
      <div className="rates-table-card glass" ref={tableRef}>
        <div className="rates-card-glow" aria-hidden="true" />
        <table className="rates-table" role="table">
          <thead>
            <tr>
              <th scope="col" className="th-game">Game</th>
              <th scope="col" className="th-rate">Rate (1 Rs)</th>
            </tr>
          </thead>
          <tbody>
            {GAME_RATES.map((game, index) => (
              <tr
                key={game.id}
                onClick={() => handleRowClick(game)}
                className={`rate-row ${game.isJackpot ? "jackpot-row" : ""} ${
                  selectedGame === game.id ? "row-selected" : ""
                } ${rowsVisible ? "visible" : ""}`}
                style={{ transitionDelay: rowsVisible ? `${index * 0.05}s` : "0s" }}
                tabIndex={0}
                role="button"
                aria-label={`${game.name}: ${game.rate} payout per 1 Rs`}
              >
                <td className="td-game">
                  <div className="game-cell">
                    <span className="game-icon" aria-hidden="true">{game.icon}</span>
                    <span className="game-name">{game.name}</span>
                    {game.isJackpot && <span className="jackpot-tag">MEGA WIN</span>}
                  </div>
                </td>
                <td className="td-rate">
                  <div className="rate-badge-wrap">
                    <span className="rate-amount">{game.rate.toLocaleString()}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Luxury Gold Divider */}
      <div className="divider-wrap" aria-hidden="true">
        <div className="divider-line" />
        <div className="divider-diamond">✦</div>
        <div className="divider-line" />
      </div>

      {/* Bottom Download Card */}
      <div className="bottom-cta-card glass">
        <div className="bottom-cta-glow" aria-hidden="true" />
        <h3 className="bottom-cta-title">Ready To Experience SARA 777?</h3>
        <p className="bottom-cta-desc">
          Download the official app today for instant deposits, high win rates & 24/7 fast payouts.
        </p>
        <button
          className={`btn-bottom btn-mustard btn-hero-pulse ${
            isCompleted
              ? "btn-completed"
              : isDownloading
              ? "btn-downloading"
              : ""
          }`}
          onClick={triggerDownload}
          aria-label="Download Sara777 APK now"
        >
          <span className="dl-arrow" aria-hidden="true">
            {isCompleted ? "✓" : isDownloading ? "⏳" : "↓"}
          </span>
          <span>
            {isCompleted
              ? "DOWNLOAD COMPLETE! 🚀"
              : isDownloading
              ? "DOWNLOADING APK..."
              : "DOWNLOAD NOW"}
          </span>
          <span className="cta-shine" aria-hidden="true" />
        </button>
        <div className="trust-strip">
          <span className="trust-badge">🔒 100% Safe APK</span>
          <span className="trust-dot">•</span>
          <span className="trust-badge">⚡ Instant Withdrawals</span>
          <span className="trust-dot">•</span>
          <span className="trust-badge">🎯 24x7 Customer Support</span>
        </div>
      </div>

      {/* Footer Note */}
      <footer className="footer-wrap">
        <div className="footer-note glass">
          <span>© 2025 SARA777 · Official S2 Gaming Experience</span>
        </div>
      </footer>
    </section>
  );
}
