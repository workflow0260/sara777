"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  twinkleSpeed: number;
  phase: number;
}

export default function GoldenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 60,
      radius: Math.random() * 2.2 + 0.4,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: 0,
      maxOpacity: Math.random() * 0.55 + 0.15,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      phase: Math.random() * Math.PI * 2,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 40 }, () => {
        const p = createParticle();
        // Spread initial particles across canvas
        p.y = Math.random() * canvas.height;
        p.opacity = Math.random() * p.maxOpacity;
        return p;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.phase * 0.5) * 0.08;
        p.phase += p.twinkleSpeed;
        p.opacity = p.maxOpacity * (0.4 + 0.6 * Math.sin(p.phase));

        if (p.y < -20) {
          Object.assign(p, createParticle());
        }

        // Main dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 178, 60, ${p.opacity})`;
        ctx.fill();

        // Soft outer glow for larger particles
        if (p.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(227, 178, 60, ${p.opacity * 0.1})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
