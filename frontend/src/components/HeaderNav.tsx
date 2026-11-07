"use client";

import React from "react";
import { Shield, Lock, Terminal, ArrowUpRight } from "lucide-react";
import { IosTactileButton } from "@/components/ui/IosTactileButton";
import { GlyphRampKey, SupportedCurrency } from "@/lib/mock-vaults-data";

export interface HeaderNavProps {
  orbMode?: string;
  activeCurrency?: SupportedCurrency;
  glyphRamp?: GlyphRampKey;
  onJumpToSimulator?: () => void;
}

export function HeaderNav({
  orbMode = "idle",
  activeCurrency = "ARGt",
  glyphRamp = "Classic",
  onJumpToSimulator,
}: HeaderNavProps) {
  return (
    <header
      data-anim="header"
      role="banner"
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 h-14 bg-black/92 backdrop-blur-md border-b border-[#18181b] select-none"
    >
      {/* 1. Identidad de Marca en Blanco y Negro ASCII */}
      <div className="flex items-center gap-3">
        <a
          href="#boveda"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#09090b] border border-[#27272a] group-hover:border-white transition-colors">
            <span className="font-mono font-bold text-xs tracking-tighter text-white">
              [TW]
            </span>
            <span
              title="Avalanche C-Chain Activo"
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sans font-semibold text-sm tracking-tight text-white">
                CriteriaLock
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#141418] text-zinc-300 border border-[#27272a]">
                twin finance
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:block">
              BLOQUEO DE PLATA // SMART ESCROW ONCHAIN
            </span>
          </div>
        </a>
      </div>

      {/* 2. Navegación Editorial por Secciones + Ticker de Paridad */}
      <nav
        aria-label="Secciones principales"
        className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-[#09090b] border border-[#1f1f23]"
      >
        {[
          { href: "#boveda", label: "01. Bóveda" },
          { href: "#como-funciona", label: "02. 3 Pasos ASCII" },
          { href: "#simulador", label: "03. Simulador Notion" },
          { href: "#explorador-pilar", label: "04. Explorador Pilar" },
          { href: "#stablecoins", label: "05. Monedas 3D" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-[#141418] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* 3. Telemetría en Vivo & Acción Rápida */}
      <div className="flex items-center gap-2.5">
        {/* Píldora de Paridad Estilo Lemon Cash */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#09090b] border border-[#27272a] text-[11px] font-mono text-zinc-300 tabular-nums">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-500">PEG:</span>
          <span className="text-white font-semibold">1 ARGt = 1.00 ARS</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">ACTIVA: {activeCurrency}</span>
        </div>

        {/* Indicador de Rampa ASCII / Estado */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-[11px]">
          <Terminal className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-500">ASCII:</span>
          <span className="text-white font-semibold uppercase">
            {glyphRamp} · {orbMode}
          </span>
        </div>

        {/* Botón Primario Táctil iOS Blanco */}
        <IosTactileButton
          variant="primary-white"
          size="sm"
          onClick={() => {
            if (onJumpToSimulator) {
              onJumpToSimulator();
            } else {
              document
                .getElementById("simulador")
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Lock className="w-3 h-3" />
          <span>Bloquear Plata</span>
          <ArrowUpRight className="w-3 h-3" />
        </IosTactileButton>
      </div>
    </header>
  );
}
