"use client";

import { useEffect, useRef, useState } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: "coin" | "confetti" | "star";
  tilt: number;
  tiltSpeed: number;
}

export default function DownloadCelebrationVFX() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleTrigger = () => {
      setActive(true);
    };

    window.addEventListener("sara-download-completed", handleTrigger);
    return () => window.removeEventListener("sara-download-completed", handleTrigger);
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#ffd700", // Bright Gold
      "#e3b23c", // Mustard Gold
      "#fbe38f", // Light Champagne
      "#fff2b8", // White Gold
      "#b8860b", // Deep Gold
      "#ffffff", // Pure Sparkle
    ];

    const pieces: ConfettiPiece[] = [];
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.45;

    // Generate burst of 90 luxury golden confetti & coin particles
    for (let i = 0; i < 90; i++) {
      const angle = (Math.PI * 2 * i) / 90 + (Math.random() - 0.5) * 0.5;
      const velocity = Math.random() * 12 + 6;
      const randType = Math.random();
      const type: "coin" | "confetti" | "star" =
        randType < 0.35 ? "coin" : randType < 0.75 ? "confetti" : "star";

      pieces.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY + (Math.random() - 0.5) * 40,
        size: type === "coin" ? Math.random() * 8 + 6 : Math.random() * 9 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity - Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        opacity: 1,
        type,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.1 + 0.05,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.28; // Gravity
        p.speedX *= 0.985; // Air drag
        p.rotation += p.rotSpeed;
        p.tilt += p.tiltSpeed;

        if (elapsed > 2.2) {
          p.opacity -= 0.02;
        }

        if (p.opacity <= 0) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.type === "coin") {
          // 3D Spinning Gold Coin
          const coinWidth = p.size * Math.cos(p.tilt);
          ctx.beginPath();
          ctx.ellipse(0, 0, Math.abs(coinWidth), p.size, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = "rgba(227, 178, 60, 0.6)";
          ctx.shadowBlur = 8;
          ctx.fill();

          // Coin rim
          ctx.strokeStyle = "#8c6000";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === "star") {
          // 4-point glittering star
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size * 0.4, -p.size * 0.4);
          ctx.lineTo(p.size * 1.5, 0);
          ctx.lineTo(p.size * 0.4, p.size * 0.4);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size * 0.4, p.size * 0.4);
          ctx.lineTo(-p.size * 1.5, 0);
          ctx.lineTo(-p.size * 0.4, -p.size * 0.4);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 10;
          ctx.fill();
        } else {
          // Fluttering Ribbon Confetti
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();
      }

      if (elapsed < 3.8) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setActive(false);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="celebration-canvas"
        aria-hidden="true"
      />
      {/* Celebration Success Card */}
      <div className="celebration-banner-wrap" role="alert">
        <div className="celebration-card glass">
          <div className="celebration-glow" aria-hidden="true" />
          <span className="celebration-trophy" aria-hidden="true">🏆</span>
          <div className="celebration-text">
            <h4 className="celebration-title">Download Started Successfully!</h4>
            <p className="celebration-desc">
              Sara777.apk is downloading. Open your notifications to install.
            </p>
          </div>
          <span className="celebration-tag">100% VERIFIED</span>
        </div>
      </div>
    </>
  );
}
