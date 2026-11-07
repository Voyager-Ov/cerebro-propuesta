"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Lock,
  Cpu,
  Zap,
  CheckCircle2,
  CircleDot,
  MousePointerClick,
  ShieldAlert,
} from "lucide-react";
import { GlyphRampKey } from "@/lib/mock-vaults-data";
import { IosTactileButton } from "@/components/ui/IosTactileButton";
import { BenchoSegmentedControl } from "@/components/ui/BenchoSegmentedControl";

const AsciiWake = dynamic(
  () => import("@/components/ASCIIWake").then((mod) => mod.AsciiWake),
  { ssr: false }
);

const Particles = dynamic(
  () => import("@/components/Particles").then((mod) => mod.Particles),
  { ssr: false }
);

export interface AsciiWakeStepsBentoProps {
  glyphRamp: GlyphRampKey;
  onJumpToSimulator?: () => void;
}

type ParticleStageShape = "Circle" | "Square" | "Flower";

interface CircuitRuleNode {
  id: string;
  code: string;
  label: string;
  oracle: string;
  active: boolean;
}

export function AsciiWakeStepsBento({
  glyphRamp,
  onJumpToSimulator,
}: AsciiWakeStepsBentoProps) {
  // Estado para el Circuito Lógico ASCII Interactivo (Paso 02)
  const [circuitNodes, setCircuitNodes] = useState<CircuitRuleNode[]>([
    {
      id: "node-1",
      code: "IN_01",
      label: "PR #142 Merged & 84/84 Tests Pass",
      oracle: "GITHUB_CI",
      active: true,
    },
    {
      id: "node-2",
      code: "IN_02",
      label: "Slither Audit: 0 Critical Vulns",
      oracle: "AST_JUDGE",
      active: true,
    },
    {
      id: "node-3",
      code: "IN_03",
      label: "Firma de Conformidad en Figma / QR",
      oracle: "MULTISIG_2_2",
      active: false,
    },
  ]);

  // Estado para la forma del enjambre de partículas (Paso 03)
  const [particleShape, setParticleShape] =
    useState<ParticleStageShape>("Square");

  const activeCount = circuitNodes.filter((n) => n.active).length;
  const allVerified = activeCount === circuitNodes.length;

  const toggleCircuitNode = (id: string) => {
    setCircuitNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, active: !node.active } : node
      )
    );
  };

  const toggleAllCircuitNodes = () => {
    const targetState = !allVerified;
    setCircuitNodes((prev) =>
      prev.map((node) => ({ ...node, active: targetState }))
    );
  };

  return (
    <section
      id="como-funciona"
      aria-labelledby="bento-steps-heading"
      className="relative w-full py-16 sm:py-24 border-b border-[#18181b] bg-[#000000]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── Encabezado Editorial de la Sección ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09090b] border border-[#27272a] font-mono text-[11px] text-zinc-400 mb-3">
              <span className="text-white font-bold">02</span>
              <span>//</span>
              <span>ARQUITECTURA DE CUSTODIA EN 3 MOVIMIENTOS</span>
            </div>
            <h2
              id="bento-steps-heading"
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-white"
            >
              De la promesa en el aire{" "}
              <span className="text-zinc-500 font-normal">
                a la certeza matemática.
              </span>
            </h2>
          </div>

          <p className="font-mono text-xs text-zinc-400 max-w-md leading-relaxed">
            Interactuá con cada bloque: pasá el cursor sobre el cubo de semitono,
            conmutá las compuertas del oráculo o dispará la onda de liquidación.
          </p>
        </div>

        {/* ── Grilla Bento Asimétrica (12 Columnas) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ══════════════════════════════════════════════════════════════════
              TARJETA 01 (5 COLS): CUBO ISOMÉTRICO HALFTONE (ASCIIWAKE)
              ══════════════════════════════════════════════════════════════════ */}
          <article className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#09090b] border border-[#27272a] p-6 overflow-hidden ios-bevel-dark">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#18181b]">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white text-black">
                  PASO 01 // BLOQUEO
                </span>
                <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-white" />
                  <span>ASCII_WAKE FIELD</span>
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                Depositá y congelá la plata en una bóveda neutral
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                El cliente deposita{" "}
                <strong className="text-zinc-200">ARGt o USDT</strong> en el
                contrato inteligente. La plata queda visible e inmovilizada: el
                proveedor sabe que los fondos existen y el cliente sabe que nadie
                puede retirarlos sin entregar.
              </p>
            </div>

            {/* Lienzo Interactivo ASCIIWake (Cubo Halftone en Blanco sobre Negro) */}
            <div className="relative w-full rounded-xl bg-[#000000] border border-[#1f1f23] flex flex-col items-center justify-center overflow-hidden py-2 text-white">
              <AsciiWake
                glyphs={glyphRamp}
                size={10}
                reach={55}
                trail={1.3}
                pull={42}
              />
              <div className="w-full px-3.5 py-2 border-t border-[#18181b] bg-[#050507] flex items-center justify-between font-mono text-[10px] text-zinc-400">
                <span>Pasa el mouse: esculpe glifos ({glyphRamp})</span>
                <span className="text-white">Clic: onda radial</span>
              </div>
            </div>

            {/* Píldoras Técnicas Inferiores */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#18181b] font-mono text-[11px]">
              <div className="px-3 py-2 rounded-lg bg-[#0d0d10] border border-[#1f1f23]">
                <span className="text-[9px] text-zinc-500 block">
                  RETIRO UNILATERAL
                </span>
                <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <ShieldAlert className="w-3 h-3 text-zinc-400" /> Bloqueado por
                  Código
                </span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[#0d0d10] border border-[#1f1f23]">
                <span className="text-[9px] text-zinc-500 block">
                  COLATERAL ONCHAIN
                </span>
                <span className="text-emerald-400 font-semibold block mt-0.5">
                  100% Verificable
                </span>
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              TARJETA 02 (7 COLS): CIRCUITO LÓGICO ASCII DE ORÁCULOS EN VIVO
              ══════════════════════════════════════════════════════════════════ */}
          <article className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#09090b] border border-[#27272a] p-6 overflow-hidden ios-bevel-dark">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#18181b]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white text-black">
                    PASO 02 // CRITERIOS SHA-256
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#141418] border border-[#27272a] text-zinc-300">
                    QUÓRUM: {activeCount}/{circuitNodes.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleAllCircuitNodes}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-[#141418] hover:bg-white hover:text-black text-zinc-200 border border-[#27272a] transition-colors cursor-pointer"
                >
                  {allVerified
                    ? "[ Reiniciar Compuertas ]"
                    : "[ ✓ Aprobar 3/3 Criterios ]"}
                </button>
              </div>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                Reglas escritas en piedra digital, no en capturas de pantalla
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                Cada hito de aceptación se conecta a un oráculo objetivo (GitHub
                Actions, firma multisig 2/2 en Figma o escaneo QR logístico).{" "}
                <strong className="text-white">
                  Hacé clic en las reglas de abajo
                </strong>{" "}
                para abrir o cerrar el circuito de liberación:
              </p>
            </div>

            {/* Simulador de Compuertas Lógicas ASCII */}
            <div className="rounded-xl bg-[#000000] border border-[#1f1f23] p-4 sm:p-5 font-mono">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
                {/* Columna de Entradas (Nodos Criterios Clicables) */}
                <div className="xl:col-span-7 flex flex-col gap-2.5">
                  {circuitNodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => toggleCircuitNode(node.id)}
                      className={`group w-full flex items-center justify-between gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        node.active
                          ? "bg-[#0d0d10] border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                          : "bg-[#070709] border-[#27272a] text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                            node.active
                              ? "bg-white text-black"
                              : "bg-[#18181b] text-zinc-500 border border-[#27272a]"
                          }`}
                        >
                          {node.active ? "1" : "0"}
                        </span>
                        <div className="truncate">
                          <div className="text-xs font-semibold truncate">
                            {node.label}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            ORÁCULO: {node.oracle} · CLICK PARA CONMUTAR
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold shrink-0 ${
                          node.active
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-700/50"
                            : "bg-zinc-900 text-amber-400 border border-zinc-800"
                        }`}
                      >
                        {node.active ? "● PASS" : "○ WAIT"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Diagrama del Cableado ASCII + Compuerta AND + Salida */}
                <div className="xl:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-[#050507] border border-[#18181b]">
                  <pre className="text-[11px] leading-[1.35] select-none overflow-x-auto max-w-full text-center">
                    <code className="text-zinc-400">
                      <span
                        className={
                          circuitNodes[0].active
                            ? "text-white font-bold"
                            : "text-zinc-600"
                        }
                      >
                        {circuitNodes[0].active
                          ? "IN_01 [1] ══════╦"
                          : "IN_01 [0] ······┬"}
                      </span>
                      {"\n"}
                      <span
                        className={
                          circuitNodes[1].active
                            ? "text-white font-bold"
                            : "text-zinc-600"
                        }
                      >
                        {circuitNodes[1].active
                          ? "IN_02 [1] ══════╬══► "
                          : "IN_02 [0] ······┼──► "}
                      </span>
                      <span
                        className={
                          allVerified
                            ? "bg-white text-black px-1 font-bold"
                            : "text-zinc-300"
                        }
                      >
                        [AND {activeCount}/3]
                      </span>
                      {"\n"}
                      <span
                        className={
                          circuitNodes[2].active
                            ? "text-white font-bold"
                            : "text-zinc-600"
                        }
                      >
                        {circuitNodes[2].active
                          ? "IN_03 [1] ══════╩"
                          : "IN_03 [0] ······┴"}
                      </span>
                    </code>
                  </pre>

                  <div className="w-full my-3 border-t border-dashed border-[#27272a]" />

                  {/* Estado de Salida de la Compuerta */}
                  <div
                    className={`w-full p-3 rounded-lg border text-center transition-all ${
                      allVerified
                        ? "bg-white text-black border-white font-bold"
                        : "bg-[#0d0d10] text-zinc-400 border-[#27272a]"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider opacity-75">
                      SALIDA DEL CONTRATO
                    </div>
                    <div className="text-xs sm:text-sm font-mono mt-0.5 flex items-center justify-center gap-1.5">
                      {allVerified ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                          <span>[UNLOCK] PLATA LIBERADA</span>
                        </>
                      ) : (
                        <>
                          <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>[LOCKED] CUSTODIA RETENIDA</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Técnico */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-[#18181b] font-mono text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-white" />
                <span>EVALUACIÓN DETERMINISTA EN AVALANCHE C-CHAIN</span>
              </span>
              <span className="text-zinc-500">
                HASH REGLAS: 0x8F4A...C91E (INMUTABLE)
              </span>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              TARJETA 03 (12 COLS): LIQUIDACIÓN EN 0.78s CON ENJAMBRE PARTICLES
              ══════════════════════════════════════════════════════════════════ */}
          <article className="lg:col-span-12 rounded-2xl bg-[#09090b] border border-[#27272a] p-6 sm:p-8 overflow-hidden ios-bevel-dark">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Columna Izquierda (6 cols): Copy + Selector de Fase de Partículas */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white text-black">
                      PASO 03 // LIQUIDACIÓN ATÓMICA
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#141418] border border-[#27272a] text-emerald-400 flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      <span>FINALIDAD: 0.78 SEGUNDOS</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
                    Cuando el último criterio da{" "}
                    <span className="font-mono underline decoration-zinc-600">
                      [OK]
                    </span>
                    , la plata vuela directo a tu billetera.
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Olvidate de esperar 30 días una factura o perder el 20% en
                    plataformas intermediarias. El contrato transfiere los{" "}
                    <strong className="text-white">ARGt o USDT</strong> de forma
                    automática e irreversible en el mismo bloque en que se aprueba
                    la entrega.
                  </p>

                  {/* Selector de Geometría del Enjambre Físico (Particles.tsx) */}
                  <div className="mb-6">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                      FASE DE LA PLATA EN EL ENJAMBRE DE PARTÍCULAS (CLIC PARA
                      TRANSMUTAR):
                    </label>
                    <BenchoSegmentedControl<ParticleStageShape>
                      ariaLabel="Cambiar fase geométrica de las partículas"
                      value={particleShape}
                      onChange={setParticleShape}
                      variant="white-pill"
                      size="md"
                      options={[
                        {
                          id: "Circle",
                          label: "1. Orden Creada",
                          badge: "Circle",
                        },
                        {
                          id: "Square",
                          label: "2. Bóveda Sellada",
                          badge: "Vault",
                        },
                        {
                          id: "Flower",
                          label: "3. Pago Liberado",
                          badge: "Bloom",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#18181b]">
                  <IosTactileButton
                    variant="primary-white"
                    size="md"
                    asciiPrefix="SIM"
                    showArrow
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
                    Probar el Simulador de Bloqueo y Reglas Notion
                  </IosTactileButton>
                  <span className="font-mono text-[11px] text-zinc-500">
                    720 partículas con estiramiento elíptico por velocidad
                  </span>
                </div>
              </div>

              {/* Columna Derecha (6 cols): Lienzo Particles.tsx en Blanco y Negro */}
              <div className="lg:col-span-6">
                <div className="relative w-full rounded-xl bg-[#000000] border border-[#1f1f23] overflow-hidden flex flex-col items-center justify-center text-white">
                  <div className="w-full overflow-x-auto flex items-center justify-center py-2">
                    <Particles
                      shape={particleShape}
                      reach={95}
                      force={70}
                      grain="Coarse"
                    />
                  </div>

                  <div className="w-full px-4 py-2.5 border-t border-[#18181b] bg-[#050507] flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MousePointerClick className="w-3.5 h-3.5 text-white" />
                      <span>
                        Pasa el cursor para dispersar • Haz clic sobre el lienzo
                        para onda de choque
                      </span>
                    </span>
                    <span className="text-white font-semibold uppercase">
                      FORMA: {particleShape}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
