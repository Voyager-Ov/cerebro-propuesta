"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { HeaderNav } from "@/components/HeaderNav";
import { BenchoDock } from "@/components/BenchoDock";
import { AgentChatPanel } from "@/components/AgentChatPanel";
import { CriteriaLockCard } from "@/components/CriteriaLockCard";
import { AsciiTextSpinner } from "@/components/AsciiTextSpinner";
import { OrbMode, PALETTES } from "@/components/AsciiSphereOrb";
import { Shield, Sparkles, Activity, Orbit } from "lucide-react";
import gsap from "gsap";

const AsciiSphereOrb = dynamic(
  () => import("@/components/AsciiSphereOrb").then((mod) => mod.AsciiSphereOrb),
  { ssr: false }
);

const AsciiBlobOrb = dynamic(
  () => import("@/components/AsciiBlobOrb").then((mod) => mod.AsciiBlobOrb),
  { ssr: false }
);

const SAMPLE_SEEDS = [
  "HackaTwin-Sphere-01",
  "CriteriaLock-Agent-02",
  "TwinFinance-Avalanche-03",
  "BeloFlow-Stable-04",
  "Bencho-Minimal-05",
];

export default function Home() {
  const [mode, setMode] = useState<OrbMode>("idle");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<"hero" | "split">("split");
  const [seedIndex, setSeedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"escrow" | "chat">("escrow");
  const [showOrbitRing, setShowOrbitRing] = useState(true);
  const [orbType, setOrbType] = useState<"sphere" | "blob">("blob");

  const containerRef = useRef<HTMLDivElement>(null);
  const sphereStageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const currentSeed = SAMPLE_SEEDS[seedIndex % SAMPLE_SEEDS.length];

  // Check URL query param ?view=hero
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "hero") setLayoutMode("hero");
    }
  }, []);

  // Orchestrated GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { isDesktop: boolean; reduceMotion: boolean };
          if (reduceMotion) return;

          if (sphereStageRef.current) {
            gsap.from(sphereStageRef.current, {
              scale: 0.96,
              duration: 0.6,
              ease: "expo.out",
              clearProps: "all",
            });
          }

          if (rightPanelRef.current) {
            gsap.from(rightPanelRef.current, {
              y: 16,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "all",
            });
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [layoutMode]);

  // Tab switch animation
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

  const handleLayoutToggle = () => {
    setLayoutMode((prev) => (prev === "hero" ? "split" : "hero"));
  };

  const handleOrbitToggle = () => {
    setShowOrbitRing((prev) => !prev);
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#000000] text-zinc-100 overflow-x-hidden font-sans select-none"
    >
      {/* 1. Header Navigation */}
      <HeaderNav orbMode={mode} />

      {/* 2. Main Content Viewport */}
      {layoutMode === "hero" ? (
        /* HERO MODE: 3D ASCII Sphere Centered Dominant */
        <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Background Ambient Metadata (Pinterest Pin 1 & Pin 10) */}
          <div className="absolute top-24 left-8 z-20 hidden md:flex flex-col gap-1 text-[11px] font-mono text-zinc-500">
            <span className="text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              01 // BIOMORPHIC CELESTIAL SPHERE
            </span>
            <span>GEOMETRY: Fibonacci Celestial Lattice (480 nodes)</span>
            <span>ENVELOPE: Spherical Bubble Constellation</span>
            <span>EYES: 2x Negative Hollow Cavities (Blobatar Look-At)</span>
            <span className="text-zinc-400 mt-1 flex items-center gap-1">
              <Orbit className="w-3 h-3 text-blue-400" />
              <span>ORBITAL EQUATOR RING ACTIVE</span>
            </span>
          </div>

          <div className="absolute top-24 right-8 z-20 hidden md:flex flex-col items-end gap-1 text-[11px] font-mono text-zinc-500">
            <span className="text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              CRITERIALOCK PROTOCOL
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span>ESCROW_ID: #TW-8841</span>
            <span className="text-emerald-400 font-semibold font-mono">CUSTODY: 50,000 ARGt</span>
            <span>AVALANCHE C-CHAIN VALIDATED</span>
          </div>

          {/* Centered 3D ASCII Viewport */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-[85vw] h-[75vh] max-w-[750px] max-h-[750px] rounded-2xl overflow-hidden">
              {orbType === "blob" ? (
                <AsciiBlobOrb
                  mode={mode}
                  palette={paletteIndex === 0 ? "monochrome" : paletteIndex === 1 ? "cobalt" : paletteIndex === 2 ? "cyan" : paletteIndex === 3 ? "emerald" : "amber"}
                  glyphs="Classic"
                  reach={80}
                  force={60}
                  trail={1.4}
                  pull={40}
                  showEyes={true}
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
            </div>
          </div>

          {/* Floating Interaction Hint */}
          <div className="absolute bottom-24 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-400">
            <AsciiTextSpinner variant={2} className="text-blue-400" />
            <span>Mueve el cursor para dirigir la mirada • Toca para aplastar y parpadear</span>
          </div>

        </section>
      ) : (
        /* SPLIT AGENT MODE: 3D Assistant on Left, Smart Escrow & Chat on Right (Pinterest Pin 4 & Pin 1) */
        <section className="relative w-full min-h-screen pt-24 pb-28 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3D ASCII Sphere Stage */}
            <div ref={sphereStageRef} className="lg:col-span-6 flex flex-col gap-3">
              
              <div className="relative w-full aspect-square max-h-[500px] rounded-xl bg-[#09090b] border border-[#27272a] shadow-xl overflow-hidden flex items-center justify-center">
                
                {/* Badge top-left */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d0d10] border border-[#27272a] text-[11px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{orbType === "blob" ? "ASCII_BLOBTAR" : "ASCII_SPHERE"} // {mode.toUpperCase()}</span>
                </div>

                {/* Badge top-right */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2 py-0.8 rounded bg-[#0d0d10] border border-[#27272a] text-[10px] font-mono text-zinc-500">
                  <Orbit className="w-3 h-3 text-blue-400" />
                  <span>{orbType === "blob" ? "BLOB_STATUS_CALM" : showOrbitRing ? "ORBIT_ACTIVE" : "ORBIT_OFF"}</span>
                </div>

                {/* The 3D Orb Component (Blob or Sphere) */}
                {orbType === "blob" ? (
                  <AsciiBlobOrb
                    mode={mode}
                    palette={paletteIndex === 0 ? "monochrome" : paletteIndex === 1 ? "cobalt" : paletteIndex === 2 ? "cyan" : paletteIndex === 3 ? "emerald" : "amber"}
                    glyphs="Classic"
                    reach={80}
                    force={60}
                    trail={1.4}
                    pull={40}
                    showEyes={true}
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

                {/* Bottom interactive wave hint */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0d0d10] border border-[#1f1f23] text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-blue-400" />
                    <span>SURFACE HARMONIC WAVE ACTIVE</span>
                  </span>
                  <span className="text-zinc-600">HOVER TO SQUISH</span>
                </div>

              </div>

              {/* Sub-card: Mesh Specs (Disciplined architectural grid) */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-center">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Forma</div>
                  <div className="text-xs font-semibold text-zinc-200 mt-0.5">Pelota Esférica</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-center">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Mirada</div>
                  <div className="text-xs font-semibold text-blue-400 mt-0.5">Ojos Hollow 3D</div>
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

      {/* 3. Bencho Floating Glass Dock */}
      <BenchoDock
        mode={mode}
        onModeChange={setMode}
        paletteIndex={paletteIndex}
        onPaletteCycle={handlePaletteCycle}
        layoutMode={layoutMode}
        onLayoutToggle={handleLayoutToggle}
        seed={currentSeed}
        onSeedRandomize={handleSeedRandomize}
        showOrbitRing={showOrbitRing}
        onOrbitToggle={handleOrbitToggle}
        orbType={orbType}
        onOrbTypeToggle={() => setOrbType((prev) => (prev === "blob" ? "sphere" : "blob"))}
      />

    </main>
  );
}
