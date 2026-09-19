"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-500/15 bg-[#030306] pt-14 pb-10 px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Col */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center">
                  <Image
                    src="/logo.webp"
                    alt="SARA 777 Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-wider gold-text-gradient font-outfit">
                SARA 777
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Premium Gaming Experience. Fastest live results, guaranteed rate transparency, and 24/7 dedicated support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-300">
            <Link href="#home" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link href="#rates" className="hover:text-amber-400 transition-colors">
              Game Rates
            </Link>
            <Link href="#download" className="hover:text-amber-400 transition-colors">
              Download App
            </Link>
          </div>

          {/* 18+ Responsible Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>18+ Play Responsibly</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <p>© 2026 SARA 777. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            Designed for high speed & premium entertainment
          </p>
        </div>
      </div>
    </footer>
  );
}
