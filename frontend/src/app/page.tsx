"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { HeaderNav } from "@/components/HeaderNav";
import { BenchoDock } from "@/components/BenchoDock";
import { AgentChatPanel } from "@/components/AgentChatPanel";
import { CriteriaLockCard } from "@/components/CriteriaLockCard";
import { AsciiTextSpinner } from "@/components/AsciiTextSpinner";
import { OrbMode, PALETTES } from "@/components/AsciiSphereOrb";
import {
  Shield,
  Sparkles,
  Activity,
  Orbit,
  Eye,
  Layers,
  MousePointer,
  Zap,
  Coins,
  Network,
  RefreshCw,
} from "lucide-react";
import gsap from "gsap";

const AsciiSphereOrb = dynamic(
  () => import("@/components/AsciiSphereOrb").then((mod) => mod.AsciiSphereOrb),
  { ssr: false }
);

const AsciiBlobOrb = dynamic(
  () => import("@/components/AsciiBlobOrb").then((mod) => mod.AsciiBlobOrb),
  { ssr: false }
);

const CanonicalBlobatar = dynamic(
  () => import("@/components/CanonicalBlobatar").then((mod) => mod.CanonicalBlobatar),
  { ssr: false }
);

const CryptoAsciiBoard = dynamic(
  () => import("@/components/CryptoAsciiBoard").then((mod) => mod.CryptoAsciiBoard),
  { ssr: false }
);

const SAMPLE_SEEDS = [
  "HackaTwin-Sphere-01",
  "CriteriaLock-Agent-02",
  "TwinFinance-Avalanche-03",
  "BeloFlow-Stable-04",
  "Bencho-Minimal-05",
];

export type PrototypeView = "compare" | "ascii-blob" | "sphere-3d" | "escrow" | "crypto-board";

const PROTOTYPE_OPTIONS: Array<{
  id: PrototypeView;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "compare",
    label: "Lado a Lado",
    badge: "SVG vs ASCII",
    icon: Sparkles,
  },
  {
    id: "ascii-blob",
    label: "ASCII Blobatar",
    badge: "Ojos Hollow",
    icon: Activity,
  },
  {
    id: "sphere-3d",
    label: "Esfera 3D",
    badge: "Fibonacci Lattice",
    icon: Orbit,
  },
  {
    id: "escrow",
    label: "Smart Escrow",
    badge: "CriteriaLock",
    icon: Shield,
  },
  {
    id: "crypto-board",
    label: "Crypto ASCII",
    badge: "Three.js & Stables",
    icon: Coins,
  },
];

export default function Home() {
  const [protoView, setProtoView] = useState<PrototypeView>("compare");
  const [mode, setMode] = useState<OrbMode>("idle");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [seedIndex, setSeedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"escrow" | "chat">("escrow");
  const [showOrbitRing, setShowOrbitRing] = useState(true);
  const [orbType, setOrbType] = useState<"sphere" | "blob">("blob");
  const [genesisType, setGenesisType] = useState<"graph" | "fibonacci" | "quantum">("graph");
  const [genesisKey, setGenesisKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleReplayGenesis = () => {
    setGenesisKey((prev) => prev + 1);
  };

  const handleGenesisSelect = (type: "graph" | "fibonacci" | "quantum") => {
    setGenesisType(type);
    setGenesisKey((prev) => prev + 1);
  };

  const currentSeed = SAMPLE_SEEDS[seedIndex % SAMPLE_SEEDS.length];
  const paletteName =
    paletteIndex === 0
      ? "monochrome"
      : paletteIndex === 1
      ? "cobalt"
      : paletteIndex === 2
      ? "cyan"
      : paletteIndex === 3
      ? "emerald"
      : "amber";

  // Check URL query param ?proto=compare|ascii-blob|sphere-3d|escrow
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const protoParam = params.get("proto") as PrototypeView | null;
      if (
        protoParam &&
        ["compare", "ascii-blob", "sphere-3d", "escrow"].includes(protoParam)
      ) {
        setProtoView(protoParam);
      }
    }
  }, []);

  // GSAP Viewport Transition on prototype change
  const handleProtoChange = (newView: PrototypeView) => {
    if (newView === protoView) return;
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { autoAlpha: 0.25, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
    setProtoView(newView);
  };

  // Tab switch animation in escrow mode
  const handleTabChange = (tab: "escrow" | "chat") => {
    if (tab === activeTab) return;
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { autoAlpha: 0.3, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
    setActiveTab(tab);
  };

  const handlePaletteCycle = () => {
    setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
  };

  const handleSeedRandomize = () => {
    setSeedIndex((prev) => prev + 1);
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#000000] text-zinc-100 overflow-x-hidden font-sans select-none"
    >
      {/* 1. Header Navigation */}
      <HeaderNav orbMode={mode} />

      {/* 2. Floating Prototype Switcher Dock (en un lado: lateral izquierdo en desktop) */}
      <aside
        aria-label="Selector de prototipos"
        className="fixed top-20 left-4 sm:left-6 z-40 flex flex-row xl:flex-col gap-1.5 p-1.5 rounded-2xl bg-[#09090b]/90 backdrop-blur-2xl border border-[#27272a] shadow-2xl max-w-[calc(100vw-2rem)] overflow-x-auto"
      >
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
          <Layers className="w-3 h-3 text-blue-400" />
          <span>Prototipos</span>
        </div>

        {PROTOTYPE_OPTIONS.map((opt) => {
          const isActive = protoView === opt.id;
          const IconComponent = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => handleProtoChange(opt.id)}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#18181b] text-white shadow-sm border border-zinc-700/80"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121215] border border-transparent"
              }`}
            >
              <div
                className={`p-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-zinc-800/60 text-zinc-400 group-hover:text-zinc-200"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-tight">
                  {opt.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 leading-tight">
                  {opt.badge}
                </span>
              </div>
              {isActive && (
                <span className="hidden xl:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              )}
            </button>
          );
        })}
      </aside>

      {/* 3. Main Stage Content Viewport */}
      <div ref={stageRef} className="w-full xl:pl-52 transition-all duration-300">
        {/* VIEW 1: LADO A LADO (Comparativa Blobatar SVG vs ASCII Blobatar) */}
        {protoView === "compare" && (
          <section className="relative w-full min-h-screen pt-28 pb-32 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center">
            {/* Headline Header */}
            <div className="text-center max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-400 mb-3">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>COMPARATIVA 1:1 // SEGUIMIENTO OCULAR SINCRONIZADO</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                Blobatar Oficial <span className="text-zinc-500 font-normal">vs</span> Blobatar ASCII
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Mueve el cursor por la pantalla: ambos orbes giran su mirada juntos.
                Los ojos del orbe ASCII son <strong className="text-zinc-200 font-semibold">cavidades negativas vacías (sin nada adentro)</strong>,
                con parpadeo y deformación elástica.
              </p>

              {/* Selector interactivo de Génesis del Orbe */}
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-[#09090b]/90 border border-zinc-800/80 backdrop-blur-xl">
                <span className="text-[10px] font-mono uppercase text-zinc-500 px-2.5 py-1 flex items-center gap-1.5">
                  <Network className="w-3 h-3 text-blue-400" />
                  <span>Génesis:</span>
                </span>
                <button
                  onClick={() => handleGenesisSelect("graph")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    genesisType === "graph"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <span>☍ Grafo 1→2→6</span>
                </button>
                <button
                  onClick={() => handleGenesisSelect("fibonacci")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    genesisType === "fibonacci"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <span>🌀 Fibonacci</span>
                </button>
                <button
                  onClick={() => handleGenesisSelect("quantum")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    genesisType === "quantum"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <span>💥 Big Bang</span>
                </button>
                <div className="w-[1px] h-4 bg-zinc-800 mx-1" />
                <button
                  onClick={handleReplayGenesis}
                  title="Reiniciar ensamblado del orbe"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Replay Génesis</span>
                </button>
              </div>
            </div>

            {/* Side-by-Side Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* Left Card: Canonical Blobatar SVG */}
              <div className="relative flex flex-col rounded-2xl bg-[#09090b] border border-[#27272a] shadow-2xl overflow-hidden p-6">
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-mono text-xs font-semibold uppercase text-zinc-200">
                      Blobatar Oficial (SVG)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    @blobatar/react
                  </span>
                </div>

                {/* SVG Blobatar Viewport */}
                <div className="relative w-full aspect-square max-h-[380px] flex items-center justify-center bg-black/40 rounded-xl border border-zinc-900 overflow-hidden">
                  <CanonicalBlobatar
                    seed={currentSeed}
                    size={300}
                    className="w-full h-full"
                  />
                </div>

                {/* Technical Specs Footer */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-800/80 text-center">
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Ojos</span>
                    <span className="text-xs font-semibold text-zinc-300">Cápsulas Sólidas</span>
                  </div>
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Mirada</span>
                    <span className="text-xs font-semibold text-blue-400">blobatar/gaze</span>
                  </div>
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Motor</span>
                    <span className="text-xs font-semibold text-amber-400">Vector SVG Path</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Interactive ASCII Blobatar */}
              <div className="relative flex flex-col rounded-2xl bg-[#09090b] border border-[#27272a] shadow-2xl overflow-hidden p-6">
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs font-semibold uppercase text-zinc-200">
                      Blobatar ASCII (Biomórfico)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                    Hollow Eyes (Sin Nada)
                  </span>
                </div>

                {/* ASCII Blobatar Viewport */}
                <div className="relative w-full aspect-square max-h-[380px] flex items-center justify-center bg-black rounded-xl border border-zinc-900 overflow-hidden cursor-crosshair group">
                  <AsciiBlobOrb
                    mode={mode}
                    palette={paletteName}
                    glyphs="Classic"
                    reach={80}
                    force={65}
                    trail={1.4}
                    pull={40}
                    showEyes={true}
                    genesisType={genesisType}
                    genesisKey={genesisKey}
                    className="w-full h-full"
                  />

                  {/* Hover interaction hint */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-800/70 text-[10px] font-mono text-zinc-400 pointer-events-none">
                    <span className="flex items-center gap-1.5">
                      <MousePointer className="w-3 h-3 text-emerald-400" />
                      <span>Pasa el cursor: despierta y dispersa</span>
                    </span>
                    <span className="text-zinc-500">Clic: onda de choque</span>
                  </div>
                </div>

                {/* Technical Specs Footer */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-800/80 text-center">
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Ojos</span>
                    <span className="text-xs font-semibold text-emerald-400">Huecos Negativos</span>
                  </div>
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Física</span>
                    <span className="text-xs font-semibold text-blue-400">Spring-Damper Euler</span>
                  </div>
                  <div className="p-2 rounded bg-[#0d0d10] border border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Estela</span>
                    <span className="text-xs font-semibold text-zinc-300">Thermal Halftone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Hint */}
            <div className="mt-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-400">
              <AsciiTextSpinner variant={2} className="text-blue-400" />
              <span>Sincronización de cursor activa en ambos visores • Prueba los botones de prototipo a la izquierda</span>
            </div>
          </section>
        )}

        {/* VIEW 2: ASCII BLOBATAR HERO (Enfocado en solitario) */}
        {protoView === "ascii-blob" && (
          <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Top Left Metadata */}
            <div className="absolute top-24 left-8 z-20 hidden md:flex flex-col gap-1 text-[11px] font-mono text-zinc-500">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ASCII BLOBATAR // HERO STAGE
              </span>
              <span>OJOS: 2x Cavidades Hollow Negativas (Sin Nada Adentro)</span>
              <span>MIRADA: Look-at inercial continuo + Parpadeo procedural</span>
              <span>SUPERFICIE: Halftone Euler con estela térmica ASCII</span>
            </div>

            {/* Genesis Selector Pill Top Center */}
            <div className="absolute top-24 z-30 hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-[#09090b]/90 border border-zinc-800/80 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-zinc-500 px-2.5 py-1 flex items-center gap-1.5">
                <Network className="w-3 h-3 text-blue-400" />
                <span>Génesis:</span>
              </span>
              <button
                onClick={() => handleGenesisSelect("graph")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  genesisType === "graph"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                }`}
              >
                <span>☍ Grafo 1→2→6</span>
              </button>
              <button
                onClick={() => handleGenesisSelect("fibonacci")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  genesisType === "fibonacci"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                }`}
              >
                <span>🌀 Fibonacci</span>
              </button>
              <button
                onClick={() => handleGenesisSelect("quantum")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  genesisType === "quantum"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                }`}
              >
                <span>💥 Big Bang</span>
              </button>
              <div className="w-[1px] h-4 bg-zinc-800 mx-1" />
              <button
                onClick={handleReplayGenesis}
                title="Reiniciar ensamblado del orbe"
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replay</span>
              </button>
            </div>

            {/* Centered Canvas */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-[85vw] h-[75vh] max-w-[760px] max-h-[760px] rounded-2xl overflow-hidden cursor-crosshair">
                <AsciiBlobOrb
                  mode={mode}
                  palette={paletteName}
                  glyphs="Classic"
                  reach={85}
                  force={65}
                  trail={1.4}
                  pull={40}
                  showEyes={true}
                  genesisType={genesisType}
                  genesisKey={genesisKey}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Floating Interaction Hint */}
            <div className="absolute bottom-24 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-400">
              <AsciiTextSpinner variant={1} className="text-emerald-400" />
              <span>Pasa el cursor para dispersar • Toca o haz clic para onda expansiva elástica</span>
            </div>
          </section>
        )}

        {/* VIEW 3: ESFERA 3D CELESTIAL HERO (Pinterest Pin 1 & Pin 10) */}
        {protoView === "sphere-3d" && (
          <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Top Left Metadata */}
            <div className="absolute top-24 left-8 z-20 hidden md:flex flex-col gap-1 text-[11px] font-mono text-zinc-500">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                ESFERA 3D CELESTIAL // FIBONACCI
              </span>
              <span>NODOS: 480 partículas en celosía esférica de Fibonacci</span>
              <span>RUIDO: Simplex Noise 3D procedural</span>
              <span className="text-zinc-400 mt-1 flex items-center gap-1">
                <Orbit className="w-3 h-3 text-blue-400" />
                <span>ANILLO ECUATORIAL {showOrbitRing ? "ACTIVO" : "INACTIVO"}</span>
              </span>
            </div>

            {/* Centered 3D Sphere */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-[85vw] h-[75vh] max-w-[750px] max-h-[750px] rounded-2xl overflow-hidden">
                <AsciiSphereOrb
                  seed={currentSeed}
                  mode={mode}
                  paletteIndex={paletteIndex}
                  showOrbitRing={showOrbitRing}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Floating Interaction Hint */}
            <div className="absolute bottom-24 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-400">
              <AsciiTextSpinner variant={2} className="text-blue-400" />
              <span>Gira la esfera 3D arrastrando con el cursor • Modos en el dock inferior</span>
            </div>
          </section>
        )}

        {/* VIEW 4: SMART ESCROW (CriteriaLock + Conversational Agent Split) */}
        {protoView === "escrow" && (
          <section className="relative w-full min-h-screen pt-24 pb-28 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Assistant / Blobatar Stage */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <div className="relative w-full aspect-square max-h-[500px] rounded-xl bg-[#09090b] border border-[#27272a] shadow-xl overflow-hidden flex items-center justify-center">
                  {/* Badge top-left */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {orbType === "blob" ? "ASCII_BLOBATAR" : "ASCII_SPHERE"} // {mode.toUpperCase()}
                    </span>
                  </div>

                  {/* The Orb Component */}
                  {orbType === "blob" ? (
                    <AsciiBlobOrb
                      mode={mode}
                      palette={paletteName}
                      glyphs="Classic"
                      reach={80}
                      force={60}
                      trail={1.4}
                      pull={40}
                      showEyes={true}
                      genesisType={genesisType}
                      genesisKey={genesisKey}
                      className="w-full h-full"
                    />
                  ) : (
                    <AsciiSphereOrb
                      seed={currentSeed}
                      mode={mode}
                      paletteIndex={paletteIndex}
                      showOrbitRing={showOrbitRing}
                      className="w-full h-full"
                    />
                  )}

                  {/* Bottom wave hint */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0d0d10] border border-[#1f1f23] text-[10px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-blue-400" />
                      <span>SURFACE HARMONIC WAVE ACTIVE</span>
                    </span>
                    <span className="text-zinc-600">HOVER TO DISPERSE</span>
                  </div>
                </div>

                {/* Sub-card: Mesh Specs */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Forma</div>
                    <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                      {orbType === "blob" ? "Blobtar Fluido" : "Esfera 3D"}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Mirada</div>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">Ojos Hollow</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Física</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">Spring-Damper</div>
                  </div>
                </div>
              </div>

              {/* Right Column: CriteriaLock & Agent Chat Cards */}
              <div ref={rightPanelRef} className="lg:col-span-6 flex flex-col gap-3">
                {/* Tab Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#09090b] border border-[#27272a] w-fit">
                  <button
                    onClick={() => handleTabChange("escrow")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === "escrow"
                        ? "bg-[#18181b] text-white shadow-sm border border-zinc-700/60"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>Smart Escrow (CriteriaLock)</span>
                  </button>
                  <button
                    onClick={() => handleTabChange("chat")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === "chat"
                        ? "bg-[#18181b] text-white shadow-sm border border-zinc-700/60"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Agent Conversacional</span>
                  </button>
                </div>

                {/* Active Tab Card with GSAP Transition */}
                <div ref={tabContentRef}>
                  {activeTab === "escrow" ? (
                    <CriteriaLockCard />
                  ) : (
                    <AgentChatPanel onModeChange={setMode} />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 5: CRYPTO & STABLECOINS ASCII BOARD (Pinterest Aesthetics & Three.js r186) */}
        {protoView === "crypto-board" && (
          <section className="relative w-full min-h-screen pt-24 pb-36 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
            <CryptoAsciiBoard />
          </section>
        )}
      </div>

      {/* 4. Bencho Floating Glass Dock */}
      <BenchoDock
        mode={mode}
        onModeChange={setMode}
        paletteIndex={paletteIndex}
        onPaletteCycle={handlePaletteCycle}
        layoutMode="split"
        onLayoutToggle={() => {}}
        seed={currentSeed}
        onSeedRandomize={handleSeedRandomize}
        showOrbitRing={showOrbitRing}
        onOrbitToggle={() => setShowOrbitRing((prev) => !prev)}
        orbType={orbType}
        onOrbTypeToggle={() => setOrbType((prev) => (prev === "blob" ? "sphere" : "blob"))}
        onReplayGenesis={handleReplayGenesis}
      />
    </main>
  );
}
