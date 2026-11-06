"use client";

import React, { useRef } from "react";
import { Mic, Brain, Volume2, Sparkles, LayoutTemplate, Columns, Palette, RefreshCw, Orbit, Flame } from "lucide-react";
import { OrbMode, PALETTES } from "./AsciiSphereOrb";
import gsap from "gsap";

interface BenchoDockProps {
  mode: OrbMode;
  onModeChange: (m: OrbMode) => void;
  paletteIndex: number;
  onPaletteCycle: () => void;
  layoutMode: "hero" | "split";
  onLayoutToggle: () => void;
  seed: string;
  onSeedRandomize: () => void;
  showOrbitRing: boolean;
  onOrbitToggle: () => void;
  orbType?: "sphere" | "blob";
  onOrbTypeToggle?: () => void;
  onReplayGenesis?: () => void;
}

export function BenchoDock({
  mode,
  onModeChange,
  paletteIndex,
  onPaletteCycle,
  layoutMode,
  onLayoutToggle,
  seed,
  onSeedRandomize,
  showOrbitRing,
  onOrbitToggle,
  orbType = "blob",
  onOrbTypeToggle,
  onReplayGenesis,
}: BenchoDockProps) {
  const currentPalette = PALETTES[paletteIndex % PALETTES.length];
  const dockRef = useRef<HTMLElement>(null);

  const modeOptions: { id: OrbMode; label: string; icon: React.ReactNode }[] = [
    { id: "idle", label: "Idle", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "voice", label: "Voice", icon: <Mic className="w-3.5 h-3.5" /> },
    { id: "thinking", label: "Think", icon: <Brain className="w-3.5 h-3.5" /> },
    { id: "speaking", label: "Speak", icon: <Volume2 className="w-3.5 h-3.5" /> },
  ];

  const handleModeClick = (id: OrbMode, e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.94 },
      { scale: 1.0, duration: 0.25, ease: "back.out(2.0)" }
    );
    onModeChange(id);
  };

  return (
    <nav
      ref={dockRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/95 max-w-[95vw] overflow-x-auto select-none"
    >
      {/* 1. Seed Chip */}
      <div className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-mono">
        <span className="text-zinc-500 hidden sm:inline">SEED:</span>
        <span className="font-semibold text-zinc-200 truncate max-w-[90px] sm:max-w-[130px]">{seed}</span>
        <button
          onClick={onSeedRandomize}
          title="Randomize Seed"
          className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

      {/* 2. Mode Segmented Controls */}
      <div className="flex items-center gap-1 bg-zinc-900/40 p-0.5 rounded-full border border-zinc-800/60">
        {modeOptions.map((opt) => {
          const isActive = mode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={(e) => handleModeClick(opt.id, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
              }`}
            >
              {opt.icon}
              <span className="font-sans">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

      {/* 3. Orbit Ring Toggle */}
      <button
        onClick={onOrbitToggle}
        title="Alternar Anillo Orbital"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
          showOrbitRing
            ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
            : "bg-zinc-900/60 border-zinc-800 text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <Orbit className="w-3 h-3" />
        <span className="hidden sm:inline font-sans text-[11px]">Orbit</span>
      </button>

      {/* 4. Palette Cycler */}
      <button
        onClick={onPaletteCycle}
        title={`Cambiar color (${currentPalette.name})`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-sm"
          style={{ backgroundColor: currentPalette.dotColor }}
        />
        <span className="hidden md:inline font-sans">{currentPalette.name}</span>
        <Palette className="w-3 h-3 text-zinc-400 md:hidden" />
      </button>

      {/* 5. Orb Type Switcher (Blob vs Sphere) */}
      {onOrbTypeToggle && (
        <button
          onClick={onOrbTypeToggle}
          title={orbType === "blob" ? "Cambiar a Esfera de Aros" : "Cambiar a Blobtar Biomorphic"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <Flame className={`w-3 h-3 ${orbType === "blob" ? "text-emerald-400" : "text-blue-400"}`} />
          <span className="font-sans text-[11px] font-medium">
            {orbType === "blob" ? "Blobtar" : "Sphere"}
          </span>
        </button>
      )}

      {/* 6. Replay Genesis Action */}
      {onReplayGenesis && (
        <button
          onClick={onReplayGenesis}
          title="Replay Génesis (Construcción con grafos 1→2→6)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs text-blue-200 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="font-sans text-[11px] font-semibold">Génesis</span>
        </button>
      )}

      {/* 6. Layout Switcher (Hero vs Split) */}
      <button
        onClick={onLayoutToggle}
        title={layoutMode === "hero" ? "Cambiar a Split Agent Mode" : "Cambiar a Hero Centrado"}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
          layoutMode === "split"
            ? "bg-blue-600/20 border-blue-500/50 text-blue-300 font-medium"
            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white"
        }`}
      >
        {layoutMode === "hero" ? (
          <>
            <Columns className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden lg:inline font-sans">Split Mode</span>
          </>
        ) : (
          <>
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline font-sans">Hero View</span>
          </>
        )}
      </button>
    </nav>
  );
}
