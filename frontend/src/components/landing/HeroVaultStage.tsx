"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Lock,
  ShieldCheck,
  Sparkles,
  Orbit,
  Box,
  Columns,
  MousePointer,
  CheckCircle2,
  ArrowDownRight,
} from "lucide-react";
import { IosTactileButton } from "@/components/ui/IosTactileButton";
import { BenchoSegmentedControl } from "@/components/ui/BenchoSegmentedControl";
import { AsciiTextSpinner } from "@/components/AsciiTextSpinner";
import { OrbMode } from "@/components/AsciiSphereOrb";
import {
  CURRENCY_RATES_TO_ARS,
  GlyphRampKey,
  SupportedCurrency,
} from "@/lib/mock-vaults-data";

const AsciiBlobOrb = dynamic(
  () => import("@/components/AsciiBlobOrb").then((mod) => mod.AsciiBlobOrb),
  { ssr: false }
);

const AsciiSphereOrb = dynamic(
  () => import("@/components/AsciiSphereOrb").then((mod) => mod.AsciiSphereOrb),
  { ssr: false }
);

const AsciiWake = dynamic(
  () => import("@/components/ASCIIWake").then((mod) => mod.AsciiWake),
  { ssr: false }
);

const CanonicalBlobatar = dynamic(
  () =>
    import("@/components/CanonicalBlobatar").then(
      (mod) => mod.CanonicalBlobatar
    ),
  { ssr: false }
);

export type GuardianVisualizerMode =
  | "blobatar"
  | "sphere-3d"
  | "cube-wake"
  | "compare";

export interface HeroVaultStageProps {
  activeCurrency: SupportedCurrency;
  onCurrencyChange: (currency: SupportedCurrency) => void;
  quickLockAmount: string;
  onQuickLockAmountChange: (amount: string) => void;
  onQuickLockSubmit: () => void;
  onExploreVaultsClick?: () => void;
  orbMode: OrbMode;
  glyphRamp: GlyphRampKey;
  seed?: string;
}

const QUICK_AMOUNTS_BY_CURRENCY: Record<SupportedCurrency, string[]> = {
  ARGt: ["500,000", "1,500,000", "2,450,000", "5,000,000"],
  USDT: ["500", "1,500", "3,200", "10,000"],
  USDC: ["500", "1,500", "6,500", "12,000"],
  BRAt: ["2,500", "10,000", "45,000", "100,000"],
};

export function HeroVaultStage({
  activeCurrency,
  onCurrencyChange,
  quickLockAmount,
  onQuickLockAmountChange,
  onQuickLockSubmit,
  onExploreVaultsClick,
  orbMode,
  glyphRamp,
  seed = "CriteriaLock-Agent-02",
}: HeroVaultStageProps) {
  const [guardianView, setGuardianView] =
    useState<GuardianVisualizerMode>("blobatar");

  // Cálculo de equivalencia instantánea estilo Lemon Cash
  const rawNumeric =
    parseFloat(quickLockAmount.replace(/[^0-9.]/g, "")) || 0;
  const arsRate = CURRENCY_RATES_TO_ARS[activeCurrency] || 1;
  const equivalentInArs = rawNumeric * arsRate;
  const equivalentInUsdt = equivalentInArs / 1180;

  const handleCurrencySwitch = (newCur: SupportedCurrency) => {
    onCurrencyChange(newCur);
    const defaultForCur = QUICK_AMOUNTS_BY_CURRENCY[newCur][1];
    onQuickLockAmountChange(defaultForCur);
  };

  return (
    <section
      id="boveda"
      aria-labelledby="hero-heading"
      className="relative w-full pt-20 pb-12 sm:pt-24 sm:pb-16 border-b border-[#18181b] bg-[#000000]"
    >
      {/* Líneas arquitectónicas verticales de guía */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch border border-[#1f1f23] rounded-2xl bg-[#050507] overflow-hidden shadow-2xl">
          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA IZQUIERDA (7 COLS): PROPUESTA DE VALOR + QUICK LOCK LEMON
              ══════════════════════════════════════════════════════════════════ */}
          <div
            data-anim="hero-copy"
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:border-r border-[#1f1f23]"
          >
            <div>
              {/* 1. Micro-Header Protocol Status */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#09090b] border border-[#27272a] text-[11px] font-mono text-zinc-300 mb-6">
                <AsciiTextSpinner
                  variant={0}
                  className="text-white font-mono text-xs"
                />
                <span>CUSTODIA INTELIGENTE ONCHAIN</span>
                <span className="text-zinc-600">//</span>
                <span className="text-emerald-400 font-semibold">
                  AVALANCHE C-CHAIN
                </span>
              </div>

              {/* 2. Titular Neo-Brutalista en Blanco y Negro */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-white leading-[1.04] mb-5"
              >
                Bloqueá la plata.{" "}
                <span className="text-zinc-400 font-normal block sm:inline">
                  Fijá las reglas.
                </span>{" "}
                <span className="underline decoration-zinc-700 decoration-2 underline-offset-8">
                  Cobrá al segundo.
                </span>
              </h1>

              {/* 3. Subtítulo Directo */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mb-8">
                El protocolo de <strong className="text-white">Smart Escrow</strong>{" "}
                para desarrolladores, estudios, exportadores y clientes en Argentina y
                LATAM. Inmovilizá fondos en{" "}
                <span className="font-mono text-white px-1.5 py-0.5 rounded bg-[#141418] border border-[#27272a] text-xs">
                  ARGt (1:1 ARS)
                </span>{" "}
                o{" "}
                <span className="font-mono text-white px-1.5 py-0.5 rounded bg-[#141418] border border-[#27272a] text-xs">
                  USDT
                </span>
                : nadie puede retirar la plata sin permiso y el pago se libera solo
                cuando el oráculo valida la entrega.
              </p>

              {/* 4. QUICK LOCK BAR (ESTÉTICA DE PAGOS Y STABLECOINS DE LEMON CASH EN B&W) */}
              <div className="rounded-2xl bg-[#09090b] border border-[#27272a] p-4 sm:p-5 mb-6 ios-bevel-dark">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#18181b]">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-white" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                      CONFIGURADOR RÁPIDO DE BÓVEDA
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded bg-[#141418] border border-[#27272a] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    SIN COMISIÓN DE INTERMEDIARIOS (0%)
                  </span>
                </div>

                {/* Selector de Stablecoin estilo iOS / Bencho */}
                <div className="mb-4">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
                    1. Elegí la moneda de custodia (Twin Finance / Tether)
                  </label>
                  <BenchoSegmentedControl<SupportedCurrency>
                    ariaLabel="Seleccionar moneda de bloqueo"
                    value={activeCurrency}
                    onChange={handleCurrencySwitch}
                    variant="white-pill"
                    size="sm"
                    options={[
                      { id: "ARGt", label: "ARGt", badge: "Peso 1:1" },
                      { id: "USDT", label: "USDT", badge: "Tether" },
                      { id: "USDC", label: "USDC", badge: "Circle" },
                      { id: "BRAt", label: "BRAt", badge: "Real 1:1" },
                    ]}
                  />
                </div>

                {/* Input de Monto + Chips de Montos Frecuentes */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="quick-lock-input"
                      className="font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                    >
                      2. Monto a inmovilizar en el contrato
                    </label>
                    <span className="font-mono text-[11px] text-zinc-400 tabular-nums">
                      {activeCurrency === "ARGt"
                        ? `≈ ${equivalentInUsdt.toLocaleString("es-AR", {
                            maximumFractionDigits: 0,
                          })} USDT`
                        : `≈ $ ${equivalentInArs.toLocaleString("es-AR", {
                            maximumFractionDigits: 0,
                          })} ARGt`}
                    </span>
                  </div>

                  <div className="relative flex items-center rounded-xl bg-[#000000] border border-[#27272a] focus-within:border-white px-4 py-3 transition-colors">
                    <span className="font-mono text-lg sm:text-2xl text-zinc-500 mr-2 select-none">
                      {activeCurrency === "ARGt"
                        ? "$"
                        : activeCurrency === "BRAt"
                        ? "R$"
                        : "US$"}
                    </span>
                    <input
                      id="quick-lock-input"
                      type="text"
                      value={quickLockAmount}
                      onChange={(e) => onQuickLockAmountChange(e.target.value)}
                      placeholder="1,500,000"
                      className="w-full bg-transparent font-mono text-xl sm:text-3xl font-bold text-white focus:outline-none tabular-nums tracking-tight"
                    />
                    <span className="font-mono text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-lg bg-[#141418] border border-[#27272a] text-white ml-2">
                      {activeCurrency}
                    </span>
                  </div>

                  {/* Presets de 1 Toque */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="font-mono text-[10px] text-zinc-500 mr-1">
                      RÁPIDO:
                    </span>
                    {QUICK_AMOUNTS_BY_CURRENCY[activeCurrency].map((preset) => {
                      const isSelected = quickLockAmount === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => onQuickLockAmountChange(preset)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] tabular-nums transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-white text-black font-semibold border-white"
                              : "bg-[#0d0d10] text-zinc-400 border-[#27272a] hover:border-zinc-500 hover:text-white"
                          }`}
                        >
                          {preset} {activeCurrency}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botones de Acción Táctil iOS */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <IosTactileButton
                    variant="primary-white"
                    size="lg"
                    asciiPrefix="LOCK"
                    showArrow
                    onClick={onQuickLockSubmit}
                    className="flex-1"
                  >
                    Fijar Criterios y Bloquear {quickLockAmount} {activeCurrency}
                  </IosTactileButton>

                  <IosTactileButton
                    variant="carbon-matte"
                    size="lg"
                    onClick={() => {
                      if (onExploreVaultsClick) {
                        onExploreVaultsClick();
                      } else {
                        document
                          .getElementById("explorador-pilar")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span>Ver Bóvedas en Vivo</span>
                    <ArrowDownRight className="w-4 h-4 text-zinc-400" />
                  </IosTactileButton>
                </div>
              </div>
            </div>

            {/* 5. Tira Inferior de Garantías Técnicas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#18181b]">
              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                  TVL EN CUSTODIA
                </span>
                <span className="font-mono text-sm font-semibold text-white tabular-nums">
                  $148.5M ARGt
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                  LIQUIDACIÓN ONCHAIN
                </span>
                <span className="font-mono text-sm font-semibold text-white tabular-nums">
                  0.78 Segundos
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                  ORÁCULOS SOPORTADOS
                </span>
                <span className="font-mono text-sm font-semibold text-zinc-200">
                  GitHub · Figma · QR
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                  RIELES MONETARIOS
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  Twin · Tether · AVAX
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA DERECHA (5 COLS): VISOR DEL GUARDIÁN ASCII EN BLANCO Y NEGRO
              ══════════════════════════════════════════════════════════════════ */}
          <div
            data-anim="hero-guardian"
            className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 bg-[#000000] relative"
          >
            {/* Crucetas de Precisión ASCII en las Esquinas */}
            <span
              aria-hidden="true"
              className="absolute top-2.5 left-3 font-mono text-xs text-zinc-700 select-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-3 font-mono text-xs text-zinc-700 select-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 left-3 font-mono text-xs text-zinc-700 select-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 right-3 font-mono text-xs text-zinc-700 select-none"
            >
              +
            </span>

            {/* Cabecera del Visor + Conmutador de los 4 Motores ASCII del Cerebro */}
            <div className="flex flex-col gap-3 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
                    GUARDIÁN DE BÓVEDA // {guardianView.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0d0d10] border border-[#27272a] text-zinc-400">
                  RAMPA: {glyphRamp.toUpperCase()}
                </span>
              </div>

              {/* Selector de Motor Visual (Blobatar ASCII / Esfera 3D / Cubo Wake / 1:1 SVG) */}
              <BenchoSegmentedControl<GuardianVisualizerMode>
                ariaLabel="Cambiar motor visual del guardián ASCII"
                value={guardianView}
                onChange={setGuardianView}
                variant="subtle-carbon"
                size="sm"
                options={[
                  {
                    id: "blobatar",
                    label: "Blobatar",
                    icon: <Sparkles className="w-3 h-3" />,
                  },
                  {
                    id: "sphere-3d",
                    label: "Esfera 3D",
                    icon: <Orbit className="w-3 h-3" />,
                  },
                  {
                    id: "cube-wake",
                    label: "Cubo Halftone",
                    icon: <Box className="w-3 h-3" />,
                  },
                  {
                    id: "compare",
                    label: "SVG vs ASCII",
                    icon: <Columns className="w-3 h-3" />,
                  },
                ]}
              />
            </div>

            {/* Lienzo Central Interactivo en Negro Puro (#000000) */}
            <div className="relative my-4 w-full aspect-square max-h-[410px] mx-auto rounded-xl bg-[#000000] border border-[#1f1f23] overflow-hidden flex items-center justify-center">
              {guardianView === "blobatar" && (
                <AsciiBlobOrb
                  mode={orbMode}
                  palette="monochrome"
                  glyphs={glyphRamp}
                  reach={82}
                  force={65}
                  trail={1.4}
                  pull={42}
                  showEyes={true}
                  className="w-full h-full"
                />
              )}

              {guardianView === "sphere-3d" && (
                <AsciiSphereOrb
                  seed={seed}
                  mode={orbMode}
                  paletteIndex={0}
                  showOrbitRing={true}
                  className="w-full h-full"
                />
              )}

              {guardianView === "cube-wake" && (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <AsciiWake
                    glyphs={glyphRamp}
                    size={10}
                    reach={58}
                    trail={1.35}
                    pull={45}
                  />
                </div>
              )}

              {guardianView === "compare" && (
                <div className="grid grid-cols-2 w-full h-full divide-x divide-[#1f1f23]">
                  <div className="relative flex flex-col items-center justify-center p-3 bg-[#050507]">
                    <span className="absolute top-2.5 left-2.5 font-mono text-[10px] text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                      SVG Oficial
                    </span>
                    <CanonicalBlobatar
                      seed={seed}
                      size={180}
                      className="w-full h-full max-h-[210px]"
                    />
                  </div>
                  <div className="relative flex flex-col items-center justify-center p-2 bg-black">
                    <span className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 z-10">
                      ASCII Hollow
                    </span>
                    <AsciiBlobOrb
                      mode={orbMode}
                      palette="monochrome"
                      glyphs={glyphRamp}
                      reach={75}
                      force={60}
                      trail={1.3}
                      pull={38}
                      showEyes={true}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Hint Táctil Flotante dentro del Visor */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-[#27272a] text-[10px] font-mono text-zinc-400 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <MousePointer className="w-3 h-3 text-white" />
                  <span>Pasa el cursor: despierta glifos ASCII</span>
                </span>
                <span className="text-zinc-500 hidden sm:inline">
                  Clic: onda de choque
                </span>
              </div>
            </div>

            {/* Tarjeta Inferior de Estado del Contrato en Vivo */}
            <div className="rounded-xl bg-[#09090b] border border-[#27272a] p-3.5 z-10">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CUSTODIA SIMULADA LISTA</span>
                </span>
                <span className="text-white font-bold tabular-nums">
                  {quickLockAmount} {activeCurrency}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#18181b] text-center font-mono">
                <div className="p-1.5 rounded bg-[#0d0d10] border border-[#1f1f23]">
                  <span className="text-[9px] text-zinc-500 block uppercase">
                    MIRADA
                  </span>
                  <span className="text-[11px] text-white font-semibold">
                    Ojos Hollow
                  </span>
                </div>
                <div className="p-1.5 rounded bg-[#0d0d10] border border-[#1f1f23]">
                  <span className="text-[9px] text-zinc-500 block uppercase">
                    FÍSICA
                  </span>
                  <span className="text-[11px] text-zinc-200 font-semibold">
                    Spring Euler
                  </span>
                </div>
                <div className="p-1.5 rounded bg-[#0d0d10] border border-[#1f1f23]">
                  <span className="text-[9px] text-zinc-500 block uppercase">
                    CUSTODIA
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 1:1 Onchain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
