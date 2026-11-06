"use client";

import React from "react";
import { Shield, ExternalLink, Zap } from "lucide-react";

interface HeaderNavProps {
  orbMode: string;
}

export function HeaderNav({ orbMode }: HeaderNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3.5 bg-black/90 border-b border-[#1f1f23] select-none">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#0e0e11] border border-[#27272a]">
          <span className="font-mono font-bold text-sm text-blue-500">TW</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-sans font-semibold text-sm tracking-tight text-white">twin finance</span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              agentic
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono hidden sm:block">
            3D ASCII Assistant • Avalanche C-Chain
          </p>
        </div>
      </div>

      {/* Network & Track Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d10] border border-[#27272a] text-xs text-zinc-300">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        <span className="font-mono text-zinc-500">NETWORK:</span>
        <span className="font-medium text-zinc-200">Avalanche C-Chain</span>
        <span className="text-zinc-700">|</span>
        <span className="font-mono text-zinc-500">STABLE:</span>
        <span className="text-emerald-400 font-semibold font-mono">ARGt / Tether</span>
      </div>

      {/* Right Stats & Status */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#0d0d10] border border-[#27272a] font-mono text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-500">STATE:</span>
          <span className="text-white font-semibold uppercase">{orbMode}</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0d0d10] hover:bg-zinc-800 border border-[#27272a] text-xs text-zinc-300 hover:text-white transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-sans">CriteriaLock</span>
          <ExternalLink className="w-3 h-3 text-zinc-600" />
        </a>
      </div>

    </header>
  );
}
