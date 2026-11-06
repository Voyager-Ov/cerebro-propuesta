"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";
import {
  Coins,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Flame,
  Orbit,
  Cpu,
  RefreshCw,
  Sliders,
  Volume2,
  VolumeX,
} from "lucide-react";

// ============================================================================
// TIPOS Y MODELO DE DATOS
// ============================================================================

export type CryptoCategory = "all" | "crypto" | "stablecoin";
export type BoardLayout = "grid" | "list" | "threejs";

export interface CryptoToken {
  id: string;
  name: string;
  symbol: string;
  category: "crypto" | "stablecoin";
  chain: string;
  pegType?: "fiat" | "crypto-collateral" | "synthetic" | "latam-peso";
  price: string;
  change24h: string;
  isPositive: boolean;
  color: string;
  glowColor: string;
  contract: string;
  asciiArt: string[];
  heroAscii: string[];
  description: string;
  rings: number;
}

// ============================================================================
// CATÁLOGO DE ARTE ASCII PRECISO PARA CRIPTOS Y STABLECOINS
// ============================================================================

export const CRYPTO_REGISTRY: CryptoToken[] = [
  // --- CRIPTOMONEDAS L1 / L2 ---
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    category: "crypto",
    chain: "Bitcoin Core",
    price: "$98,420.00",
    change24h: "+3.42%",
    isPositive: true,
    color: "#F7931A",
    glowColor: "rgba(247, 147, 26, 0.35)",
    contract: "Native UTXO",
    rings: 3,
    description: "Moneda de reserva descentralizada global y protocolo base de prueba de trabajo.",
    asciiArt: [
      "  .-------.  ",
      " /  | | |  \\ ",
      "|  .-' '-.  |",
      "|  | (B) |  |",
      "|  | (B) |  |",
      "|  '-. .-'  |",
      " \\  | | |  / ",
      "  '-------'  ",
    ],
    heroAscii: [
      "       .---::============::---.       ",
      "     /          |  |  |          \\     ",
      "   /    .====================.     \\   ",
      "  |     |   |####|    |####\\  |     |  ",
      "  |     |   |####|    |####/  |     |  ",
      "  |     |   |####|====|####\\  |     |  ",
      "  |     |   |####|    |####/  |     |  ",
      "  |     '===================='     |  ",
      "   \\          |  |  |            /   ",
      "     \\          |  |  |          /     ",
      "       '---::============::---'       ",
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    category: "crypto",
    chain: "Ethereum Mainnet",
    price: "$3,410.50",
    change24h: "+5.18%",
    isPositive: true,
    color: "#627EEA",
    glowColor: "rgba(98, 126, 234, 0.35)",
    contract: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    rings: 4,
    description: "Computadora mundial de contratos inteligentes y estándar EVM.",
    asciiArt: [
      "     /\\     ",
      "    /  \\    ",
      "   /:/\\:\\   ",
      "  / /  \\ \\  ",
      "  \\ \\  / /  ",
      "   \\:\\/:/   ",
      "    \\  /    ",
      "     \\/     ",
    ],
    heroAscii: [
      "             /\\             ",
      "            /  \\            ",
      "           / /\\ \\           ",
      "          / /  \\ \\          ",
      "         / / /\\ \\ \\         ",
      "        / / /  \\ \\ \\        ",
      "        \\ \\ \\  / / /        ",
      "         \\ \\ \\/ / /         ",
      "          \\ \\  / /          ",
      "           \\ \\/ /           ",
      "            \\  /            ",
      "             \\/             ",
    ],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    category: "crypto",
    chain: "Solana Mainnet-Beta",
    price: "$212.80",
    change24h: "+8.91%",
    isPositive: true,
    color: "#14F195",
    glowColor: "rgba(20, 241, 149, 0.35)",
    contract: "So11111111111111111111111111111111111111112",
    rings: 2,
    description: "Capa 1 monolítica de ultra-alta velocidad y prueba de historia (PoH).",
    asciiArt: [
      " .=============//",
      "  \\\\============.",
      "                 ",
      " .=============//",
      "  \\\\============.",
      "                 ",
      " .=============//",
      "  \\\\============.",
    ],
    heroAscii: [
      "    .==================================//   ",
      "     \\\\================================.    ",
      "                                            ",
      "    .==================================//   ",
      "     \\\\================================.    ",
      "                                            ",
      "    .==================================//   ",
      "     \\\\================================.    ",
    ],
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    category: "crypto",
    chain: "Avalanche C-Chain",
    price: "$41.60",
    change24h: "+2.74%",
    isPositive: true,
    color: "#E84142",
    glowColor: "rgba(232, 65, 66, 0.35)",
    contract: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    rings: 3,
    description: "Plataforma multired sub-segundo con consenso Avalanche y arquitectura de subnets.",
    asciiArt: [
      "       /\\       ",
      "      /  \\      ",
      "     / /\\ \\     ",
      "    / /  \\ \\    ",
      "   / / /\\ \\ \\   ",
      "  /_/ /  \\ \\_\\  ",
      "     '    '     ",
      "                ",
    ],
    heroAscii: [
      "               /\\               ",
      "              /  \\              ",
      "             / /\\ \\             ",
      "            / /  \\ \\            ",
      "           / / /\\ \\ \\           ",
      "          / / /  \\ \\ \\          ",
      "         / / / /\\ \\ \\ \\         ",
      "        /_/_/ /  \\ \\_\\_\\        ",
    ],
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "POL",
    category: "crypto",
    chain: "Polygon PoS / zkEVM",
    price: "$0.58",
    change24h: "-1.12%",
    isPositive: false,
    color: "#8247E5",
    glowColor: "rgba(130, 71, 229, 0.35)",
    contract: "0x455e53CBB86018Ac2B8092DDcd39d8444aFFC3e6",
    rings: 2,
    description: "Suite de escalabilidad modular de Ethereum mediante rollups ZK y cadenas laterales.",
    asciiArt: [
      "  .---.     .---.  ",
      " /     \\   /     \\ ",
      "|   ()  \\ /  ()   |",
      " \\       X       / ",
      "  |  () / \\  () |  ",
      "   \\   /   \\   /   ",
      "    '-'     '-'    ",
      "                   ",
    ],
    heroAscii: [
      "      .=======.           .=======.      ",
      "     /   / \\   \\         /   / \\   \\     ",
      "    |   |   |   \\       /   |   |   |    ",
      "     \\   \\ /     \\     /     \\ /   /     ",
      "      \\   X       \\   /       X   /      ",
      "       \\ / \\       \\ /       / \\ /       ",
      "        '   '=======X======='   '        ",
    ],
  },
  {
    id: "ripple",
    name: "Ripple",
    symbol: "XRP",
    category: "crypto",
    chain: "XRP Ledger",
    price: "$1.48",
    change24h: "+14.30%",
    isPositive: true,
    color: "#00AAE4",
    glowColor: "rgba(0, 170, 228, 0.35)",
    contract: "Native Ledger",
    rings: 3,
    description: "Red de liquidación institucional y pagos transfronterizos en tiempo real.",
    asciiArt: [
      "  (o)       (o)  ",
      "   \\ \\     / /   ",
      "    \\ \\   / /    ",
      "     \\ (o) /     ",
      "      / / \\      ",
      "     / /   \\     ",
      "   (o)       (o) ",
      "                 ",
    ],
    heroAscii: [
      "    [###]                 [###]    ",
      "     \\   \\               /   /     ",
      "      \\   \\             /   /      ",
      "       \\   \\   [###]   /   /       ",
      "        \\   \\ /  |  \\ /   /        ",
      "         \\   '   |   '   /         ",
      "          \\     [#]     /          ",
      "         /   .   |   .   \\         ",
      "        /   / \\  |  / \\   \\        ",
      "    [###]                 [###]    ",
    ],
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    category: "crypto",
    chain: "Dogecoin Core",
    price: "$0.26",
    change24h: "+6.05%",
    isPositive: true,
    color: "#C2A633",
    glowColor: "rgba(194, 166, 51, 0.35)",
    contract: "Native PoW",
    rings: 2,
    description: "Pionero cultural de las monedas de internet con liquidez masiva y comunidad abierta.",
    asciiArt: [
      "  .-------.  ",
      " /  |===|  \\ ",
      "|   |---|   |",
      "|   |===|   |",
      "|   |---|   |",
      " \\  |      / ",
      "  '-------'  ",
      "             ",
    ],
    heroAscii: [
      "       .---=================---.       ",
      "     /    |#################|    \\     ",
      "    |     |                 |     |    ",
      "    |     |======[ Đ ]======|     |    ",
      "    |     |                 |     |    ",
      "    |     |#################|     |    ",
      "     \\    |                      /     ",
      "       '---=================---'       ",
    ],
  },

  // --- STABLECOINS ---
  {
    id: "usdt",
    name: "Tether USD",
    symbol: "USDT",
    category: "stablecoin",
    chain: "Multi-Chain (Omni/ERC/TRC/AVAX)",
    pegType: "fiat",
    price: "$1.000",
    change24h: "+0.02%",
    isPositive: true,
    color: "#26A17B",
    glowColor: "rgba(38, 161, 123, 0.4)",
    contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    rings: 4,
    description: "La stablecoin con mayor volumen de liquidez, respaldada por reservas del Tesoro estadounidense.",
    asciiArt: [
      " .-------------. ",
      "|  ===========  |",
      "|     |   |     |",
      "|   .-'   '-.   |",
      "|   |   T   |   |",
      "|   '-.   .-'   |",
      "|     |   |     |",
      " '-------------' ",
    ],
    heroAscii: [
      "      .===========================.      ",
      "     /  #########################  \\     ",
      "    |   #########################   |    ",
      "    |         |   | |   |           |    ",
      "    |      .--'   | |   '--.        |    ",
      "    |      |    [ USDT ]   |        |    ",
      "    |      '--.   | |   .--'        |    ",
      "    |         |   | |   |           |    ",
      "     \\        |   | |   |          /     ",
      "      '==========================='      ",
    ],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    category: "stablecoin",
    chain: "Ethereum / Avalanche / Base / Solana",
    pegType: "fiat",
    price: "$0.9999",
    change24h: "-0.01%",
    isPositive: false,
    color: "#2775CA",
    glowColor: "rgba(39, 117, 202, 0.4)",
    contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    rings: 4,
    description: "Dólar digital de estándar bancario emitido por Circle, auditado por firmas contables de primer nivel.",
    asciiArt: [
      "   .--------.   ",
      "  /  .----.  \\  ",
      " |  /  $$  \\  | ",
      " | |  ($$)  | | ",
      " |  \\  $$  /  | ",
      "  \\  '----'  /  ",
      "   '--------'   ",
      "                ",
    ],
    heroAscii: [
      "        .---====================---.        ",
      "      /    .--------------------.    \\      ",
      "     /   /       .========.       \\   \\     ",
      "    |   |       /   $$$$   \\       |   |    ",
      "    |   |      |   (USDC)   |      |   |    ",
      "    |   |       \\   $$$$   /       |   |    ",
      "     \\   \\       '========'       /   /     ",
      "      \\    '--------------------'    /      ",
      "        '---====================---'        ",
    ],
  },
  {
    id: "dai",
    name: "MakerDAO Dai",
    symbol: "DAI",
    category: "stablecoin",
    chain: "Ethereum / Arbitrum / Optimism",
    pegType: "crypto-collateral",
    price: "$1.0001",
    change24h: "+0.01%",
    isPositive: true,
    color: "#F5AC37",
    glowColor: "rgba(245, 172, 55, 0.4)",
    contract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    rings: 3,
    description: "Stablecoin descentralizada sobre-colateralizada respaldada por el protocolo Maker / Sky.",
    asciiArt: [
      "   .--------.   ",
      "  /  |====|  \\  ",
      " |   |====|   | ",
      " |   |----|   | ",
      " |   |====|   | ",
      "  \\  |====|  /  ",
      "   '--------'   ",
      "                ",
    ],
    heroAscii: [
      "       .---==================---.       ",
      "     /    |##################|    \\     ",
      "    |     |==================|     |    ",
      "    |     |                  |     |    ",
      "    |     |======[ DAI ]=====|     |    ",
      "    |     |                  |     |    ",
      "    |     |==================|     |    ",
      "     \\    |##################|    /     ",
      "       '---==================---'       ",
    ],
  },
  {
    id: "usde",
    name: "Ethena USDe",
    symbol: "USDe",
    category: "stablecoin",
    chain: "Ethereum / Mantle",
    pegType: "synthetic",
    price: "$1.0012",
    change24h: "+0.12%",
    isPositive: true,
    color: "#A3E635",
    glowColor: "rgba(163, 230, 53, 0.4)",
    contract: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    rings: 5,
    description: "Dólar sintético nativo de internet respaldado por posiciones delta-neutrales y staking de ETH.",
    asciiArt: [
      "   .---/\\---.   ",
      "  /   /  \\   \\  ",
      " |   < USDe > | ",
      "  \\   \\  /   /  ",
      "   '---\\/---'   ",
      "                ",
      "                ",
      "                ",
    ],
    heroAscii: [
      "             .---/\\---.             ",
      "          /             \\          ",
      "        /    .---/\\---.    \\        ",
      "       |    /   /  \\   \\    |       ",
      "       |   |  << USDe >> |  |       ",
      "       |    \\   \\  /   /    |       ",
      "        \\    '---\\/---'    /        ",
      "          \\             /          ",
      "             '---\\/---'             ",
    ],
  },
  {
    id: "argt",
    name: "ARGt Stablecoin",
    symbol: "ARGt",
    category: "stablecoin",
    chain: "Avalanche C-Chain / Belo Network",
    pegType: "latam-peso",
    price: "$0.00085",
    change24h: "+0.00%",
    isPositive: true,
    color: "#74ACDF",
    glowColor: "rgba(116, 172, 223, 0.45)",
    contract: "0x78923a9d45e56d7821cba1029487c02b89f2a4",
    rings: 6,
    description: "Moneda estable de liquidación instantánea indexada a peso argentino, utilizada en el Smart Escrow de HackTwin.",
    asciiArt: [
      "     \\  |  /     ",
      "   - .-(A)-. -   ",
      "    / | AR | \\   ",
      "   - '-($)-' -   ",
      "     /  |  \\     ",
      "                 ",
      "                 ",
      "                 ",
    ],
    heroAscii: [
      "            \\   \\   |   /   /            ",
      "          --  .---=====---.  --          ",
      "             /             \\             ",
      "        --- |    * SOL *    | ---        ",
      "            |   [ ARGt ]    |            ",
      "        --- |    * MAYO*    | ---        ",
      "             \\             /             ",
      "          --  '---=====---'  --          ",
      "            /   /   |   \\   \\            ",
    ],
  },
  {
    id: "pyusd",
    name: "PayPal USD",
    symbol: "PYUSD",
    category: "stablecoin",
    chain: "Ethereum / Solana",
    pegType: "fiat",
    price: "$1.000",
    change24h: "+0.00%",
    isPositive: true,
    color: "#0079C1",
    glowColor: "rgba(0, 121, 193, 0.4)",
    contract: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    rings: 2,
    description: "Dólar respaldado al 100% por depósitos en dólares estadounidenses y notas del Tesoro a corto plazo emitido por Paxos.",
    asciiArt: [
      "  .-------.  ",
      " |  |==\\   | ",
      " |  |--/   | ",
      " |  |==\\   | ",
      " |  |--/   | ",
      "  '-------'  ",
      "             ",
      "             ",
    ],
    heroAscii: [
      "        .====================.        ",
      "       /   |##############\\   \\       ",
      "      |    |              /    |      ",
      "      |    |==============     |      ",
      "      |    |##############\\    |      ",
      "      |    |              /    |      ",
      "       \\   |============='    /       ",
      "        '===================='        ",
    ],
  },
];

// Caracteres tipográficos de la rampa ASCII de luminancia (Bencho / terminal)
const GLYPH_RAMP = " .:-=+*#%@";

// Sintetizador de audio web ligero para micro-clicks hápticos al hacer hover
class SoundFx {
  private ctx: AudioContext | null = null;
  public enabled = true;

  playClick(pitch: number = 800) {
    if (!this.enabled || typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext bloqueado o no disponible
    }
  }
}

const sfx = new SoundFx();

// ============================================================================
// COMPONENTE: TARJETA ASCII CON FÍSICA DE INCLINACIÓN 3D Y DECODIFICACIÓN
// ============================================================================

interface TokenCardProps {
  token: CryptoToken;
  isSelected: boolean;
  onSelect: () => void;
  layout: BoardLayout;
}

function TokenCard({ token, isSelected, onSelect, layout }: TokenCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [displayLines, setDisplayLines] = useState<string[]>(token.asciiArt);

  // Efecto térmico de decodificación ASCII al posar el cursor
  useEffect(() => {
    let animId: number;
    if (isHovered) {
      sfx.playClick(token.category === "stablecoin" ? 920 : 680);
      let step = 0;
      const scramble = () => {
        if (step > 8) {
          setDisplayLines(token.asciiArt);
          return;
        }
        const mutated = token.asciiArt.map((line) =>
          line
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              if (Math.random() < 0.35) {
                return GLYPH_RAMP[Math.floor(Math.random() * GLYPH_RAMP.length)];
              }
              return char;
            })
            .join("")
        );
        setDisplayLines(mutated);
        step++;
        animId = requestAnimationFrame(scramble);
      };
      animId = requestAnimationFrame(scramble);
    } else {
      setDisplayLines(token.asciiArt);
      setTilt({ x: 0, y: 0 });
    }
    return () => cancelAnimationFrame(animId);
  }, [isHovered, token.asciiArt, token.category]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // [-0.5, 0.5]
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Inclinación 3D en grados
    setTilt({ x: -py * 16, y: px * 16 });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  if (layout === "list") {
    return (
      <div
        ref={cardRef}
        onClick={onSelect}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        className={`group relative flex items-center justify-between p-3.5 border transition-all duration-200 cursor-pointer rounded-lg select-none ${
          isSelected
            ? "border-zinc-300 bg-zinc-900/90 shadow-[0_0_24px_rgba(255,255,255,0.08)]"
            : "border-zinc-800/80 bg-[#09090b] hover:border-zinc-600 hover:bg-zinc-900/40"
        }`}
      >
        {/* Glow dinámico de fondo */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(ellipse at 15% 50%, ${token.glowColor} 0%, transparent 65%)`,
            opacity: isHovered || isSelected ? 0.35 : 0.05,
          }}
        />

        {/* Lado izquierdo: Mini-ASCII & Ticker */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 flex items-center justify-center font-mono text-[7px] leading-[8px] bg-black border border-zinc-800/90 rounded p-1 transition-transform group-hover:scale-105"
            style={{ color: token.color }}
          >
            <pre className="whitespace-pre overflow-hidden">
              {displayLines.slice(0, 5).map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white tracking-wider text-sm">
                {token.symbol}
              </span>
              <span className="text-zinc-400 text-xs font-sans">{token.name}</span>
              <span
                className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-mono ${
                  token.category === "stablecoin"
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                    : "border-indigo-500/40 text-indigo-400 bg-indigo-950/20"
                }`}
              >
                {token.category === "stablecoin" ? token.pegType || "STABLE" : "L1/L2"}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-2 mt-0.5">
              <span>{token.chain}</span>
              <span>•</span>
              <span className="truncate max-w-[140px] text-zinc-600">{token.contract}</span>
            </div>
          </div>
        </div>

        {/* Lado derecho: Precios & Acción */}
        <div className="text-right">
          <div className="font-mono text-sm font-semibold text-zinc-100">{token.price}</div>
          <div
            className={`font-mono text-xs flex items-center justify-end gap-1 ${
              token.isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            <span>{token.change24h}</span>
            <ArrowUpRight
              className={`w-3 h-3 ${token.isPositive ? "" : "rotate-90 text-rose-400"}`}
            />
          </div>
        </div>
      </div>
    );
  }

  // Layout: Grid Card Estilo Pinterest Neo-Brutalist
  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          isHovered ? "-4px" : "0px"
        })`,
      }}
      className={`group relative flex flex-col justify-between p-5 border rounded-xl transition-[border-color,background-color,box-shadow] duration-200 cursor-pointer select-none overflow-hidden ${
        isSelected
          ? "border-zinc-200 bg-[#0c0c0e] shadow-[0_0_35px_rgba(255,255,255,0.12)]"
          : "border-zinc-800 bg-[#09090b] hover:border-zinc-600 hover:bg-[#0d0d10]"
      }`}
    >
      {/* Halo radial de Pinterest en fondo */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none transition-all duration-300 blur-2xl -z-10"
        style={{
          backgroundColor: token.color,
          opacity: isHovered || isSelected ? 0.35 : 0.08,
          transform: isHovered ? "scale(1.2)" : "scale(1)",
        }}
      />

      {/* Aros Celestiales de Kepler tangentes (Inspiración Video Solar System Pinterest) */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
        {Array.from({ length: token.rings }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full border transition-all duration-300"
            style={{
              borderColor: token.color,
              backgroundColor: i === 0 && isHovered ? token.color : "transparent",
            }}
          />
        ))}
      </div>

      {/* Header del Card */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-base font-bold text-white tracking-wide">
              {token.symbol}
            </h3>
            <span
              className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-mono ${
                token.category === "stablecoin"
                  ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                  : "border-indigo-500/40 text-indigo-400 bg-indigo-950/20"
              }`}
            >
              {token.category === "stablecoin" ? token.pegType || "STABLE" : "L1/L2"}
            </span>
          </div>
          <div className="text-xs text-zinc-400 font-sans mt-0.5">{token.name}</div>
        </div>

        <div className="text-right">
          <div className="font-mono text-xs font-semibold text-zinc-200">{token.price}</div>
          <div
            className={`font-mono text-[10px] ${
              token.isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {token.change24h}
          </div>
        </div>
      </div>

      {/* Visor ASCII 3D Central */}
      <div className="my-4 py-4 flex items-center justify-center bg-black/70 border border-zinc-900 rounded-lg group-hover:border-zinc-800 transition-colors">
        <pre
          className="font-mono text-[10px] leading-[12px] tracking-tight text-center font-medium transition-colors duration-150"
          style={{
            color: isHovered || isSelected ? token.color : "#d4d4d8",
            textShadow:
              isHovered || isSelected
                ? `0 0 12px ${token.glowColor}, 0 0 24px ${token.glowColor}`
                : "none",
          }}
        >
          {displayLines.join("\n")}
        </pre>
      </div>

      {/* Footer del Card */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span className="truncate max-w-[130px]">{token.chain}</span>
        <span className="text-zinc-600 group-hover:text-zinc-400 flex items-center gap-1 transition-colors">
          <span>Detalles</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// THREE.JS 3D VIEWPORT CON MULTI-COIN ROTATION & RAYCASTER
// (Aplica threejs-fundamentals, threejs-geometry, threejs-interaction, threejs-lighting)
// ============================================================================

interface ThreeJsCoinStageProps {
  selectedToken: CryptoToken;
  tokens: CryptoToken[];
  onSelectToken: (token: CryptoToken) => void;
}

function ThreeJsCoinStage({ selectedToken, tokens, onSelectToken }: ThreeJsCoinStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coinMeshRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Fundamentals: Scene, Camera & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050505);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lighting: Directional & Ambient + Emissive PointLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(4, 6, 5);
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0xffffff, 3, 10);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Luz de aura del token
    const tokenGlowLight = new THREE.PointLight(new THREE.Color(selectedToken.color), 4, 8);
    tokenGlowLight.position.set(0, 0, 1.8);
    scene.add(tokenGlowLight);

    // 3. Geometry: 3D Coin Mesh & Anillos de Kepler
    const coinGroup = new THREE.Group();
    coinMeshRef.current = coinGroup;
    scene.add(coinGroup);

    // Moneda física cilíndrica con bisel
    const coinGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.18, 48);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color(selectedToken.color),
      emissiveIntensity: 0.15,
    });
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    coinMesh.rotation.x = Math.PI / 2;
    coinGroup.add(coinMesh);

    // Aro exterior de la moneda (Rim)
    const rimGeo = new THREE.TorusGeometry(1.22, 0.04, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedToken.color),
      metalness: 0.95,
      roughness: 0.1,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    coinGroup.add(rimMesh);

    // Anillos Orbitales Keplerianos inspirados en el Pinterest Board
    const ringsGroup = new THREE.Group();
    ringsRef.current = ringsGroup;
    scene.add(ringsGroup);

    for (let r = 1; r <= 3; r++) {
      const ringRadius = 1.6 + r * 0.45;
      const orbitalRingGeo = new THREE.RingGeometry(ringRadius, ringRadius + 0.012, 64);
      const orbitalRingMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(selectedToken.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25 / r,
      });
      const orbitalMesh = new THREE.Mesh(orbitalRingGeo, orbitalRingMat);
      orbitalMesh.rotation.x = Math.PI / 2.3 + (r * 0.15);
      orbitalMesh.rotation.y = r * 0.2;
      ringsGroup.add(orbitalMesh);

      // Satélite en órbita
      const satGeo = new THREE.SphereGeometry(0.04, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(ringRadius, 0, 0);
      orbitalMesh.add(satMesh);
    }

    // 4. Interaction: Raycasting & Pointer Tracking
    const pointer = new THREE.Vector2();
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotY = pointer.x * 0.8;
      targetRotX = -pointer.y * 0.6;
      tokenGlowLight.position.x = pointer.x * 2;
      tokenGlowLight.position.y = pointer.y * 2;
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);

    // 5. Animation Loop con THREE.Timer
    let animFrame: number;
    let angle = 0;

    const renderLoop = () => {
      angle += 0.015;
      if (coinGroup) {
        coinGroup.rotation.y += (targetRotY + Math.sin(angle * 0.5) * 0.3 - coinGroup.rotation.y) * 0.08;
        coinGroup.rotation.x += (targetRotX + Math.cos(angle * 0.4) * 0.2 - coinGroup.rotation.x) * 0.08;
      }
      if (ringsGroup) {
        ringsGroup.rotation.z += 0.006;
        ringsGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
      animFrame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
    };
  }, [selectedToken]);

  return (
    <div className="relative w-full h-[400px] bg-black border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Overlay Superior de Telemetría */}
      <div className="relative z-10 p-5 flex items-start justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-white tracking-widest">
              {selectedToken.symbol}
            </span>
            <span className="text-zinc-400 font-sans text-sm">{selectedToken.name}</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900/80 text-zinc-300">
              Three.js 3D Viewport
            </span>
          </div>
          <div className="text-xs font-mono text-zinc-500 mt-1">
            Red: {selectedToken.chain} • Contrato: {selectedToken.contract}
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-lg font-bold text-white">{selectedToken.price}</div>
          <div
            className={`font-mono text-xs ${
              selectedToken.isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {selectedToken.change24h} (24h)
          </div>
        </div>
      </div>

      {/* Overlay Inferior: Carrusel Rápido de Selección */}
      <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center gap-2 overflow-x-auto">
        {tokens.map((tok) => (
          <button
            key={tok.id}
            onClick={() => onSelectToken(tok)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all flex items-center gap-2 ${
              tok.id === selectedToken.id
                ? "border-zinc-200 bg-zinc-800 text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                : "border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: tok.color }}
            />
            <span>{tok.symbol}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: CRYPTO ASCII BOARD
// ============================================================================

export function CryptoAsciiBoard() {
  const [category, setCategory] = useState<CryptoCategory>("all");
  const [layout, setLayout] = useState<BoardLayout>("grid");
  const [selectedTokenId, setSelectedTokenId] = useState<string>("bitcoin");
  const [audioEnabled, setAudioEnabled] = useState(true);

  const filteredTokens = useMemo(() => {
    if (category === "all") return CRYPTO_REGISTRY;
    return CRYPTO_REGISTRY.filter((t) => t.category === category);
  }, [category]);

  const selectedToken = useMemo(() => {
    return (
      CRYPTO_REGISTRY.find((t) => t.id === selectedTokenId) || CRYPTO_REGISTRY[0]
    );
  }, [selectedTokenId]);

  const toggleAudio = () => {
    sfx.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 text-zinc-100">
      {/* ═══ Header de Control & Estética Pinterest ═══ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#09090b] border border-zinc-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Terminal Neo-Brutalist ASCII • Three.js Suite
            </span>
          </div>
          <h2 className="font-mono text-xl font-bold tracking-tight text-white mt-1">
            Tablero de Criptomonedas & Stablecoins ASCII
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5 max-w-xl">
            Inspirado en el tablero de Pinterest (*"The Solar System: Animated sphere, Circular motion graphics"*).
            Componentes ASCII puros con retroiluminación cromática, física de estela térmica Bencho y renderizador 3D Three.js.
          </p>
        </div>

        {/* Controles de Filtros y Vistas */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Selector de Categoría */}
          <div className="flex items-center bg-black border border-zinc-800 rounded-lg p-0.5 font-mono text-xs">
            <button
              onClick={() => setCategory("all")}
              className={`px-3 py-1.5 rounded transition-colors ${
                category === "all"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Todas ({CRYPTO_REGISTRY.length})
            </button>
            <button
              onClick={() => setCategory("crypto")}
              className={`px-3 py-1.5 rounded transition-colors ${
                category === "crypto"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Criptos L1/L2
            </button>
            <button
              onClick={() => setCategory("stablecoin")}
              className={`px-3 py-1.5 rounded transition-colors ${
                category === "stablecoin"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Stablecoins
            </button>
          </div>

          {/* Selector de Layout */}
          <div className="flex items-center bg-black border border-zinc-800 rounded-lg p-0.5 font-mono text-xs">
            <button
              onClick={() => setLayout("grid")}
              className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                layout === "grid"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                layout === "list"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
            <button
              onClick={() => setLayout("threejs")}
              className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                layout === "threejs"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Stage</span>
            </button>
          </div>

          {/* Mute / Audio Click FX */}
          <button
            onClick={toggleAudio}
            title={audioEnabled ? "Silenciar audio táctil" : "Activar audio táctil"}
            className="p-2 bg-black border border-zinc-800 hover:border-zinc-600 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ═══ MODO 3D STAGE (THREE.JS) ═══ */}
      {layout === "threejs" && (
        <ThreeJsCoinStage
          selectedToken={selectedToken}
          tokens={filteredTokens}
          onSelectToken={(t) => setSelectedTokenId(t.id)}
        />
      )}

      {/* ═══ MODO GRID O LISTA ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Principal: Grid o Lista de Tokens */}
        <div className={`lg:col-span-2 ${layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-2.5"}`}>
          {filteredTokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              isSelected={token.id === selectedTokenId}
              onSelect={() => setSelectedTokenId(token.id)}
              layout={layout}
            />
          ))}
        </div>

        {/* Panel Lateral: Inspector Hero ASCII & Telemetría Detallada */}
        <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-5 flex flex-col justify-between select-none">
          <div>
            {/* Header del Inspector */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedToken.color }}
                />
                <span className="font-mono text-sm font-bold text-white">
                  {selectedToken.symbol}
                </span>
                <span className="text-zinc-400 text-xs font-sans">
                  {selectedToken.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 uppercase">
                {selectedToken.category}
              </span>
            </div>

            {/* Display Hero ASCII */}
            <div className="my-5 p-4 bg-black border border-zinc-800/90 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
              {/* Back-glow de fondo */}
              <div
                className="absolute inset-0 pointer-events-none blur-3xl opacity-20"
                style={{ backgroundColor: selectedToken.color }}
              />
              <pre
                className="font-mono text-[9px] leading-[11px] text-center font-medium relative z-10 transition-colors"
                style={{
                  color: selectedToken.color,
                  textShadow: `0 0 15px ${selectedToken.glowColor}`,
                }}
              >
                {selectedToken.heroAscii.join("\n")}
              </pre>
            </div>

            {/* Descripción */}
            <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
              {selectedToken.description}
            </p>

            {/* Ficha Técnica de Telemetría */}
            <div className="flex flex-col gap-2 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
                <span className="text-zinc-500">Precio / Peg:</span>
                <span className="font-bold text-white">{selectedToken.price}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
                <span className="text-zinc-500">Variación 24h:</span>
                <span className={selectedToken.isPositive ? "text-emerald-400" : "text-rose-400"}>
                  {selectedToken.change24h}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
                <span className="text-zinc-500">Red Primaria:</span>
                <span className="text-zinc-300">{selectedToken.chain}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
                <span className="text-zinc-500">Colateral / Tipo:</span>
                <span className="text-zinc-300">
                  {selectedToken.category === "stablecoin"
                    ? selectedToken.pegType || "Fiat"
                    : "L1 Native PoW/PoS"}
                </span>
              </div>
              <div className="flex flex-col gap-1 py-1.5">
                <span className="text-zinc-500 text-[10px]">Contrato / Identificador:</span>
                <span className="text-[11px] text-zinc-400 bg-black p-2 rounded border border-zinc-900 break-all select-all">
                  {selectedToken.contract}
                </span>
              </div>
            </div>
          </div>

          {/* Footer del Inspector */}
          <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-600">
              Estética Pinterest #636063
            </span>
            <button
              onClick={() => setLayout("threejs")}
              className="text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-700 transition-colors"
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Ver en Three.js 3D</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
