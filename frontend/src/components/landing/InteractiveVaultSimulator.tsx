"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Terminal,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  ArrowDownRight,
  GitBranch,
  FileCheck2,
  QrCode,
  Cpu,
} from "lucide-react";
import { IosTactileButton } from "@/components/ui/IosTactileButton";
import { BenchoSegmentedControl } from "@/components/ui/BenchoSegmentedControl";
import { AsciiTextSpinner } from "@/components/AsciiTextSpinner";
import {
  CRITERIA_PRESETS,
  CURRENCY_RATES_TO_ARS,
  NotionCriteriaBlock,
  OracleType,
  SupportedCurrency,
  VaultRecord,
} from "@/lib/mock-vaults-data";

export interface InteractiveVaultSimulatorProps {
  amount: string;
  currency: SupportedCurrency;
  onAmountChange: (val: string) => void;
  onCurrencyChange: (cur: SupportedCurrency) => void;
  onVaultCreated?: (vault: VaultRecord) => void;
}

const LOCKED_ASCII_ART = [
  "      . · : = + * # % @ % # * + = : · .      ",
  "    · : + # @ @ @ @ @ @ @ @ @ @ # + : ·    ",
  "   : + # @ @ ┌───────────────┐ @ @ # + :   ",
  "   + # @ @   │   ╭───────╮   │   @ @ # +   ",
  "   * # @ @   │   │  ███  │   │   @ @ # *   ",
  "   # @ @ ┌───┴───┴───────┴───┴───┐ @ @ #   ",
  "   % @ @ │  [ LOCKED ESCROW ]    │ @ @ %   ",
  "   @ @ @ │      ╭─────────╮      │ @ @ @   ",
  "   % @ @ │      │   (●)   │      │ @ @ %   ",
  "   # @ @ │      ╰───┬─┬───╯      │ @ @ #   ",
  "   * # @ └──────────┴─┴──────────┘ @ # *   ",
  "    · : + # % @ @ @ @ @ @ @ @ % # + : ·    ",
];

const UNLOCKED_ASCII_ART = [
  "    * + # @ ·   [ SHOCKWAVE ]   · @ # + *    ",
  "  + # @ ·         ╭───────╮         · @ # +  ",
  " : # @            │       │            @ # : ",
  " + @     ┌────────┘       │              @ + ",
  " * @     │                │              @ * ",
  " # @ ┌───┴────────────────┴──────┐       @ # ",
  " % @ │   [ UNLOCKED // SENT ]    │       @ % ",
  " @ @ │        ╭─────────╮        │       @ @ ",
  " % @ │        │   (✓)   │        │       @ % ",
  " # @ │        ╰─────────╯        │       @ # ",
  " * # └───────────────────────────┘       # * ",
  "   · : = + * # % @ @ @ @ @ % # * + = : ·   ",
];

export function InteractiveVaultSimulator({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  onVaultCreated,
}: InteractiveVaultSimulatorProps) {
  const [contractTitle, setContractTitle] = useState(
    "Desarrollo MVP E-Commerce + Liquidación ARGt"
  );
  const [beneficiaryName, setBeneficiaryName] = useState(
    "Estudio Binario (0x9f2c...31a0)"
  );
  const [customRuleTitle, setCustomRuleTitle] = useState("");
  const [customOracleType, setCustomOracleType] =
    useState<OracleType>("github-ci");

  const [criteria, setCriteria] = useState<NotionCriteriaBlock[]>([
    {
      id: "sim-c1",
      code: "RULE-01",
      title: "Suite de Tests E2E pasando al 100% (Coverage > 92%)",
      oracleType: "github-ci",
      oracleLabel: "GitHub Action CI",
      quorumProp: "Auto · PR #142",
      targetHash: "0x8f4a...c91e",
      status: "verified",
      verifiedBlock: "Bloque #49,201,182",
    },
    {
      id: "sim-c2",
      code: "RULE-02",
      title: "Auditoría estática Slither: 0 vulnerabilidades críticas",
      oracleType: "slither-audit",
      oracleLabel: "Slither AST Judge",
      quorumProp: "Zero-High-Risk",
      targetHash: "0x2d77...90a1",
      status: "verified",
      verifiedBlock: "Bloque #49,201,310",
    },
    {
      id: "sim-c3",
      code: "RULE-03",
      title: "Firma criptográfica 2/2 aprobando entrega en producción",
      oracleType: "multisig",
      oracleLabel: "Firma Multisig 2/2",
      quorumProp: "Quórum Cliente",
      targetHash: "0x5e19...b220",
      status: "pending",
    },
  ]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "> [CRITERIALOCK-VM] Contrato compilado en Avalanche C-Chain (ChainID 43114)",
    "> [CUSTODIA] Fondos inmovilizados sin posibilidad de retiro unilateral.",
  ]);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const verifiedCount = criteria.filter((c) => c.status === "verified").length;
  const totalCount = criteria.length;
  const isAllUnlocked = totalCount > 0 && verifiedCount === totalCount;

  // Equivalencia monetaria
  const rawNumeric = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const arsRate = CURRENCY_RATES_TO_ARS[currency] || 1;
  const arsTotal = rawNumeric * arsRate;
  const usdtEquivalent = arsTotal / 1180;

  // Alternar el estado de un bloque de criterio estilo Notion con un clic
  const handleToggleCriterion = (id: string) => {
    if (isVerifying) return;
    setCriteria((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus = c.status === "verified" ? "pending" : "verified";
        return {
          ...c,
          status: nextStatus,
          verifiedBlock:
            nextStatus === "verified" ? "Bloque #49,201,502" : undefined,
        };
      })
    );
  };

  // Eliminar un criterio
  const handleDeleteCriterion = (id: string) => {
    if (isVerifying) return;
    setCriteria((prev) =>
      prev
        .filter((c) => c.id !== id)
        .map((c, idx) => ({
          ...c,
          code: `RULE-0${idx + 1}`,
        }))
    );
  };

  // Añadir desde un Preset de 1 toque
  const handleAddPreset = (
    preset: Omit<NotionCriteriaBlock, "id" | "code">
  ) => {
    if (isVerifying) return;
    const nextNum = criteria.length + 1;
    const newBlock: NotionCriteriaBlock = {
      ...preset,
      id: `sim-c-${Date.now()}-${nextNum}`,
      code: `RULE-0${nextNum}`,
    };
    setCriteria((prev) => [...prev, newBlock]);
    setPublishedId(null);
  };

  // Añadir regla personalizada escrita por el usuario
  const handleAddCustomRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRuleTitle.trim() || isVerifying) return;

    const oracleMeta: Record<
      OracleType,
      { label: string; quorum: string; hash: string }
    > = {
      "github-ci": {
        label: "GitHub Action CI",
        quorum: "Auto · SHA-256",
        hash: "0x9a12...f401",
      },
      "figma-sign": {
        label: "Figma Sign-Off",
        quorum: "Multisig 2/2",
        hash: "0x4c88...e110",
      },
      "logistics-qr": {
        label: "Oráculo QR Belo",
        quorum: "Escaneo Físico",
        hash: "0x7d30...b902",
      },
      "ai-arbitrator": {
        label: "AI Judge Oracle",
        quorum: "Score >= 95%",
        hash: "0x3e11...a840",
      },
      multisig: {
        label: "Firma 2 de 2",
        quorum: "Doble Firma",
        hash: "0x6b55...c209",
      },
      "slither-audit": {
        label: "Slither AST",
        quorum: "0 Critical",
        hash: "0x1f90...d331",
      },
    };

    const meta = oracleMeta[customOracleType];
    const nextNum = criteria.length + 1;

    setCriteria((prev) => [
      ...prev,
      {
        id: `sim-custom-${Date.now()}`,
        code: `RULE-0${nextNum}`,
        title: customRuleTitle.trim(),
        oracleType: customOracleType,
        oracleLabel: meta.label,
        quorumProp: meta.quorum,
        targetHash: meta.hash,
        status: "pending",
      },
    ]);
    setCustomRuleTitle("");
    setPublishedId(null);
  };

  // Simular Ejecución Completa del Oráculo en Avalanche
  const handleRunOracleVerification = () => {
    if (isVerifying) return;
    if (criteria.length === 0) return;

    setIsVerifying(true);
    setTerminalLogs([
      `> [AVAX-RPC] Conectando a Avalanche C-Chain (Bloque #49,201,610)...`,
    ]);

    setCriteria((prev) =>
      prev.map((c) =>
        c.status === "pending" ? { ...c, status: "verifying" } : c
      )
    );

    const streamMessages = [
      `> [TWIN-ORACLE] Paridad verificada: ${amount} ${currency} en bóveda 0x794A...3e82`,
      `> [NOTION-RULES] Evaluando ${criteria.length} criterios anclados en SHA-256...`,
      `> [GITHUB-CI] Suite de pruebas y cobertura verificadas sin errores`,
      `> [MULTISIG-2/2] Firma criptográfica del cliente validada (Quórum 100%)`,
      `> [SMART-ESCROW] Condiciones cumplidas (${criteria.length}/${criteria.length}). Destrabando candado...`,
      `> [SETTLEMENT] ${amount} ${currency} transferidos a ${beneficiaryName} en 0.78s (TX: 0x9a71...e24d)`,
    ];

    streamMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, msg]);
      }, (idx + 1) * 260);
    });

    setTimeout(() => {
      setCriteria((prev) =>
        prev.map((c) => ({
          ...c,
          status: "verified",
          verifiedBlock: c.verifiedBlock || "Bloque #49,201,618",
        }))
      );
      setIsVerifying(false);

      if (ticketRef.current) {
        gsap.fromTo(
          ticketRef.current,
          { borderColor: "#ffffff" },
          { borderColor: "#27272a", duration: 1.4, ease: "power2.out" }
        );
      }
    }, streamMessages.length * 260 + 180);
  };

  // Reiniciar estado de prueba
  const handleResetSimulation = () => {
    if (isVerifying) return;
    setCriteria((prev) =>
      prev.map((c, i) => ({
        ...c,
        status: i === prev.length - 1 ? "pending" : "verified",
      }))
    );
    setTerminalLogs([
      "> [CRITERIALOCK-VM] Simulador reiniciado. Último hito en espera de firma.",
    ]);
    setPublishedId(null);
  };

  // Publicar esta bóveda en vivo en la Tabla «Pilar» (Sección 4)
  const handlePublishToExplorer = () => {
    const newId = `TW-${Math.floor(8850 + Math.random() * 140)}`;
    const newVault: VaultRecord = {
      id: newId,
      title: contractTitle || "Contrato de Custodia Personalizado",
      category: "Creado en Simulador",
      clientName: "Billetera Local (Vos)",
      clientAddress: "0x88a1...4f20",
      beneficiaryName: beneficiaryName || "Proveedor Onchain",
      beneficiaryAddress: "0x9f2c...31a0",
      amountNumeric: rawNumeric || 500000,
      amountFormatted: amount || "500,000",
      currency,
      criteriaPassed: verifiedCount,
      criteriaTotal: Math.max(1, totalCount),
      oracleEngine: criteria[0]?.oracleLabel || "GitHub CI + Multisig",
      status: isAllUnlocked ? "LIBERADO" : "CUSTODIA_ACTIVA",
      createdAt: "Recién creado",
      txHash: "0x9a71c402...e24d",
      blockNumber: "#49,201,618",
      asciiSeed: `Custom-${newId}`,
      summary: `Bóveda configurada en vivo desde el Simulador de CriteriaLock por ${amount} ${currency} con ${criteria.length} criterios estilo Notion.`,
      criteriaList: criteria.map((c) => ({ ...c })),
      activityTimeline: [
        {
          time: "Ahora mismo",
          title: isAllUnlocked
            ? `Bóveda creada y liberada (${amount} ${currency})`
            : `Fondos bloqueados en custodia (${amount} ${currency})`,
          detail: `Anclado en Avalanche C-Chain con ${criteria.length} reglas`,
          isHighlight: true,
        },
      ],
    };

    setPublishedId(newId);
    onVaultCreated?.(newVault);

    setTimeout(() => {
      document
        .getElementById("explorador-pilar")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  const getOracleIcon = (type: OracleType) => {
    switch (type) {
      case "github-ci":
        return <GitBranch className="w-3 h-3" />;
      case "figma-sign":
        return <FileCheck2 className="w-3 h-3" />;
      case "logistics-qr":
        return <QrCode className="w-3 h-3" />;
      default:
        return <Cpu className="w-3 h-3" />;
    }
  };

  return (
    <section
      id="simulador"
      aria-labelledby="simulator-heading"
      className="relative w-full py-16 sm:py-24 border-b border-[#18181b] bg-[#000000]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── Encabezado de Sección ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09090b] border border-[#27272a] font-mono text-[11px] text-zinc-400 mb-3">
              <span className="text-white font-bold">03</span>
              <span>//</span>
              <span>PLAYGROUND INTERACTIVO: TICKET LEMON × BLOQUES NOTION</span>
            </div>
            <h2
              id="simulator-heading"
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-white"
            >
              Armá tu bloqueo de plata{" "}
              <span className="text-zinc-500 font-normal">
                y destrabá el candado en vivo.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <IosTactileButton
              variant="carbon-matte"
              size="sm"
              onClick={handleResetSimulation}
              title="Restaurar estado de prueba"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Reiniciar Candado</span>
            </IosTactileButton>
          </div>
        </div>

        {/* ── Contenedor Dual de 12 Columnas ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA IZQUIERDA (5 COLS): TICKET DE CUSTODIA ESTILO LEMON + CANDADO ASCII
              ══════════════════════════════════════════════════════════════════ */}
          <div
            ref={ticketRef}
            className="lg:col-span-5 rounded-2xl bg-[#09090b] border border-[#27272a] p-6 ios-bevel-dark flex flex-col justify-between"
          >
            {/* Cabecera del Ticket */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-[#27272a]">
              <div className="flex items-center gap-2">
                {isAllUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-white" />
                )}
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  TICKET DE CUSTODIA // #TW-LIVE
                </span>
              </div>

              <span
                className={`font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  isAllUnlocked
                    ? "bg-white text-black border-white"
                    : isVerifying
                    ? "bg-amber-950/50 text-amber-300 border-amber-700/50"
                    : "bg-[#141418] text-zinc-200 border-[#27272a]"
                }`}
              >
                {isAllUnlocked
                  ? "✓ PLATA LIBERADA"
                  : isVerifying
                  ? "⠋ VALIDANDO..."
                  : "● PLATA BLOQUEADA"}
              </span>
            </div>

            {/* Matriz de Arte ASCII del Candado en Blanco y Negro */}
            <div className="relative rounded-xl bg-[#000000] border border-[#1f1f23] p-4 mb-5 flex flex-col items-center justify-center overflow-hidden">
              <pre
                aria-label={
                  isAllUnlocked
                    ? "Arte ASCII de candado abierto"
                    : "Arte ASCII de candado cerrado"
                }
                className={`font-mono text-[10px] sm:text-[11px] leading-[1.2] select-none transition-colors duration-300 ${
                  isAllUnlocked ? "text-white font-bold" : "text-zinc-300"
                }`}
              >
                {(isAllUnlocked ? UNLOCKED_ASCII_ART : LOCKED_ASCII_ART).join(
                  "\n"
                )}
              </pre>

              <div className="mt-3 w-full pt-2.5 border-t border-[#18181b] flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span>
                  ESTADO:{" "}
                  <strong className="text-zinc-200">
                    {isAllUnlocked ? "TRANSFERIDO AL RECEPTOR" : "INMOVILIZADO"}
                  </strong>
                </span>
                <span>
                  QUÓRUM: {verifiedCount}/{totalCount}
                </span>
              </div>
            </div>

            {/* Configuración del Monto y Moneda en el Ticket */}
            <div className="space-y-3.5 mb-5">
              <div>
                <label className="block font-mono text-[10px] uppercase text-zinc-500 mb-1">
                  MONEDA Y MONTO BLOQUEADO
                </label>
                <BenchoSegmentedControl<SupportedCurrency>
                  ariaLabel="Moneda del ticket de custodia"
                  value={currency}
                  onChange={onCurrencyChange}
                  variant="subtle-carbon"
                  size="sm"
                  className="mb-2"
                  options={[
                    { id: "ARGt", label: "ARGt" },
                    { id: "USDT", label: "USDT" },
                    { id: "USDC", label: "USDC" },
                    { id: "BRAt", label: "BRAt" },
                  ]}
                />
                <div className="flex items-center rounded-xl bg-[#000000] border border-[#27272a] focus-within:border-white px-3.5 py-2.5">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    aria-label="Monto bloqueado en la bóveda"
                    className="w-full bg-transparent font-mono text-2xl font-bold text-white focus:outline-none tabular-nums"
                  />
                  <span className="font-mono text-xs font-semibold text-zinc-300 px-2 py-0.5 rounded bg-[#141418] border border-[#27272a]">
                    {currency}
                  </span>
                </div>
              </div>

              {/* Concepto y Beneficiario Editables */}
              <div className="grid grid-cols-1 gap-2.5">
                <div>
                  <label
                    htmlFor="sim-title-input"
                    className="block font-mono text-[10px] uppercase text-zinc-500 mb-1"
                  >
                    CONCEPTO DEL ACUERDO / ENTREGABLE
                  </label>
                  <input
                    id="sim-title-input"
                    type="text"
                    value={contractTitle}
                    onChange={(e) => setContractTitle(e.target.value)}
                    className="w-full rounded-lg bg-[#0d0d10] border border-[#27272a] focus:border-white px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sim-beneficiary-input"
                    className="block font-mono text-[10px] uppercase text-zinc-500 mb-1"
                  >
                    BILLETERA / PROVEEDOR QUE COBRA AL CUMPLIR
                  </label>
                  <input
                    id="sim-beneficiary-input"
                    type="text"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="w-full rounded-lg bg-[#0d0d10] border border-[#27272a] focus:border-white px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Desglose Financiero con Línea Punteada de Ticket */}
            <div className="pt-4 border-t border-dashed border-[#27272a] space-y-2 font-mono text-xs tabular-nums">
              <div className="flex justify-between text-zinc-400">
                <span>Equivalencia estimada:</span>
                <span className="text-zinc-200">
                  {currency === "ARGt"
                    ? `≈ ${usdtEquivalent.toLocaleString("es-AR", {
                        maximumFractionDigits: 0,
                      })} USDT`
                    : `≈ $ ${arsTotal.toLocaleString("es-AR", {
                        maximumFractionDigits: 0,
                      })} ARGt`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Comisión de custodia:</span>
                <span className="text-emerald-400 font-semibold">
                  $ 0.00 (0%)
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Costo de red (Avalanche):</span>
                <span className="text-zinc-200">&lt; $0.004 USD</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA DERECHA (7 COLS): BLOQUES ESTILO NOTION + CONSOLA ORÁCULO
              ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Tarjeta de Base de Datos de Criterios Estilo Notion */}
            <div className="rounded-2xl bg-[#09090b] border border-[#27272a] p-6 ios-bevel-dark">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#18181b]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">
                    NOTION PROPERTY BLOCKS // CONDICIONES DE LIBERACIÓN
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">
                    Criterios de Aceptación del Contrato
                  </h3>
                </div>

                {/* Barra de Progreso en Caracteres ASCII */}
                <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#27272a] text-white tabular-nums">
                  [
                  {"■".repeat(verifiedCount) +
                    "□".repeat(Math.max(0, totalCount - verifiedCount))}
                  ] {verifiedCount}/{totalCount} OK
                </div>
              </div>

              {/* Chips de Presets de 1 Toque para Agregar Reglas */}
              <div className="mb-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                  + AGREGAR REGLA DE DESBLOQUEO CON 1 TOQUE:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CRITERIA_PRESETS.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddPreset(preset)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0d0d10] hover:bg-white hover:text-black text-zinc-300 border border-[#27272a] font-mono text-[11px] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{preset.oracleLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Bloques de Criterios Estilo Notion */}
              {criteria.length === 0 ? (
                <div className="rounded-xl bg-[#000000] border border-dashed border-[#27272a] p-8 text-center">
                  <p className="font-mono text-xs text-zinc-400 mb-3">
                    [ BÓVEDA SIN CRITERIOS CONFIGURADOS ]
                  </p>
                  <p className="text-xs text-zinc-500 mb-4">
                    Seleccioná cualquiera de las píldoras superiores para fijar al
                    menos una condición verificable antes de bloquear la plata.
                  </p>
                  <IosTactileButton
                    variant="carbon-matte"
                    size="sm"
                    onClick={() => handleAddPreset(CRITERIA_PRESETS[0])}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Regla de GitHub CI</span>
                  </IosTactileButton>
                </div>
              ) : (
                <div className="space-y-2.5 mb-5">
                  {criteria.map((item) => {
                    const isVerified = item.status === "verified";
                    const isProc = item.status === "verifying";
                    return (
                      <div
                        key={item.id}
                        className={`group rounded-xl p-3.5 border transition-all ${
                          isVerified
                            ? "bg-[#0d0d10] border-[#27272a]"
                            : "bg-[#070709] border-zinc-800/90 hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleCriterion(item.id)}
                            className="flex items-start gap-3 text-left flex-1 cursor-pointer focus-visible:outline-none"
                          >
                            <span
                              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                                isVerified
                                  ? "bg-white text-black border-white"
                                  : isProc
                                  ? "bg-amber-950 text-amber-300 border-amber-600"
                                  : "bg-[#141418] text-zinc-500 border-[#27272a] group-hover:border-white"
                              }`}
                            >
                              {isVerified ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : isProc ? (
                                <AsciiTextSpinner
                                  variant={0}
                                  className="text-amber-300 text-[10px]"
                                />
                              ) : (
                                <Clock className="w-3 h-3" />
                              )}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black border border-[#27272a] text-zinc-400">
                                  {item.code}
                                </span>
                                <span
                                  className={`text-xs sm:text-sm font-medium ${
                                    isVerified ? "text-white" : "text-zinc-300"
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </div>

                              {/* Píldoras de Propiedades Estilo Notion */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-2 font-mono text-[10px]">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#141418] border border-[#27272a] text-zinc-200">
                                  {getOracleIcon(item.oracleType)}
                                  <span>{item.oracleLabel}</span>
                                </span>
                                <span className="px-2 py-0.5 rounded bg-[#141418] border border-[#27272a] text-zinc-400">
                                  {item.quorumProp}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-black border border-[#1f1f23] text-zinc-500">
                                  SHA: {item.targetHash}
                                </span>
                                {item.verifiedBlock && (
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
                                    ✓ {item.verifiedBlock}
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCriterion(item.id)}
                            aria-label={`Eliminar criterio ${item.code}`}
                            className="p-1.5 rounded-lg text-zinc-600 hover:text-white hover:bg-[#18181b] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Formulario Rápido para Agregar Regla Personalizada */}
              <form
                onSubmit={handleAddCustomRule}
                className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#18181b]"
              >
                <input
                  type="text"
                  value={customRuleTitle}
                  onChange={(e) => setCustomRuleTitle(e.target.value)}
                  placeholder="Escribí un criterio propio (ej. Entrega de llaves / Deploy final)..."
                  className="flex-1 rounded-xl bg-[#000000] border border-[#27272a] focus:border-white px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                />
                <select
                  value={customOracleType}
                  onChange={(e) =>
                    setCustomOracleType(e.target.value as OracleType)
                  }
                  aria-label="Tipo de oráculo para la nueva regla"
                  className="rounded-xl bg-[#0d0d10] border border-[#27272a] px-3 py-2 font-mono text-xs text-zinc-200 focus:outline-none"
                >
                  <option value="github-ci">⚙ GitHub CI</option>
                  <option value="figma-sign">✍ Firma Figma 2/2</option>
                  <option value="logistics-qr">📦 QR Logístico Belo</option>
                  <option value="ai-arbitrator">🤖 AI Arbitrator</option>
                  <option value="slither-audit">🛡 Slither Audit</option>
                </select>
                <IosTactileButton
                  type="submit"
                  variant="carbon-matte"
                  size="md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </IosTactileButton>
              </form>
            </div>

            {/* ── Consola del Oráculo en Vivo + Botones Maestros ── */}
            <div className="rounded-2xl bg-[#09090b] border border-[#27272a] p-5 ios-bevel-dark">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <IosTactileButton
                  variant="primary-white"
                  size="lg"
                  isLoading={isVerifying}
                  loadingLabel="Verificando Oráculos en Avalanche..."
                  asciiPrefix="ORACLE"
                  showArrow
                  onClick={handleRunOracleVerification}
                  className="flex-1"
                >
                  {isAllUnlocked
                    ? "Volver a Ejecutar Validación de Oráculos"
                    : `Ejecutar Oráculo y Destrabar ${amount} ${currency}`}
                </IosTactileButton>

                <IosTactileButton
                  variant="carbon-matte"
                  size="lg"
                  onClick={handlePublishToExplorer}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Publicar en Tabla «Pilar»</span>
                  <ArrowDownRight className="w-4 h-4 text-zinc-400" />
                </IosTactileButton>
              </div>

              {publishedId && (
                <div className="mb-3 px-3.5 py-2 rounded-xl bg-white text-black font-mono text-xs font-semibold flex items-center justify-between">
                  <span>
                    ✓ Bóveda #{publishedId} agregada en vivo al Explorador «Pilar»
                    (Sección 04)
                  </span>
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                </div>
              )}

              {/* Terminal de Logs en Vivo */}
              <div
                aria-live="polite"
                className="rounded-xl bg-[#000000] border border-[#1f1f23] p-3.5 font-mono text-[11px] leading-relaxed"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#18181b] text-zinc-500 text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-white" />
                    <span>AVALANCHE ORACLE STREAM // STDOUT</span>
                  </span>
                  <span>GAS: 0.004 AVAX</span>
                </div>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {terminalLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes("SETTLEMENT") || log.includes("Destrabando")
                          ? "text-white font-semibold"
                          : "text-zinc-400"
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
