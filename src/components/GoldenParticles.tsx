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
  type: "dot" | "star" | "ember";
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
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const rand = Math.random();
      const type: "dot" | "star" | "ember" =
        rand < 0.25 ? "star" : rand < 0.7 ? "ember" : "dot";

      const radius =
        type === "star"
          ? Math.random() * 3.5 + 2.2
          : type === "ember"
          ? Math.random() * 3.2 + 1.2
          : Math.random() * 1.8 + 0.8;

      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 80,
        radius,
        speedY: -(Math.random() * 0.6 + 0.25),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0,
        maxOpacity:
          type === "star"
            ? Math.random() * 0.85 + 0.35
            : Math.random() * 0.75 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
        type,
      };
    };

    const init = () => {
      resize();
      // 75 particles for visible, vibrant atmosphere
      particles = Array.from({ length: 75 }, () => {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        p.opacity = Math.random() * p.maxOpacity;
        return p;
      });
    };

    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      color: string
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Floating motion
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.phase * 0.8) * 0.2;
        p.phase += p.twinkleSpeed;
        p.opacity = p.maxOpacity * (0.4 + 0.6 * Math.sin(p.phase));

        // Interactive mouse push
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Recycle if out of view
        if (p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
          Object.assign(p, createParticle());
        }

        const alpha = Math.max(0, Math.min(1, p.opacity));

        if (p.type === "star") {
          // Rich golden 4-point star
          drawStar(
            ctx,
            p.x,
            p.y,
            4,
            p.radius * 2.4,
            p.radius * 0.7,
            `rgba(218, 165, 32, ${alpha * 0.9})`
          );

          // Star bright white-gold center
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          // Ambient warm halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(227, 178, 60, ${alpha * 0.2})`;
          ctx.fill();
        } else if (p.type === "ember") {
          // Warm golden glowing ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(227, 178, 60, ${alpha * 0.22})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 134, 11, ${alpha * 0.85})`;
          ctx.fill();
        } else {
          // Rich gold dust mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 134, 11, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
