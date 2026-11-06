"use client";

import React, { useEffect, useRef, useCallback } from "react";

/* ══ AsciiBlobOrb ═════════════════════════════════════════════════════════════
   Un Orbe Blobtar Biomorphic ASCII interactivo.
   
   Combina tres disciplinas de Creative Coding:
   1. Morfología Bio-Blob: masa fluida deformable en tiempo real mediante
      armónicos esféricos/polares y respiración orgánica.
   2. Física de Partículas Bencho (Particles.tsx): integración de resortes
      Euler normalizada por dt (Math.pow(damping, dt)), repulsión por puntero
      y deformación elíptica por velocidad que conserva la densidad óptica.
   3. Campo Térmico y Rampa ASCII (ASCIIWake.tsx): los puntos fríos en reposo
      se excitan ante el paso del cursor en una estela continua (sub-radio stamp),
      mutando a glifos ASCII con centelleo retro de terminal (hash shimmer a 14Hz)
      y atracción magnética hacia el cursor.
   4. Reacción al Clic: onda de choque radial expansiva que propaga una perturbación
      física y térmica simultánea a lo largo del orbe.
   ══════════════════════════════════════════════════════════════════════════════ */

export type BlobOrbMode = "idle" | "listening" | "voice" | "thinking" | "speaking";
export type GlyphRampName = "Classic" | "Matrix" | "Blocks" | "Dots" | "Binary";
export type BlobPaletteName = "monochrome" | "cobalt" | "cyan" | "emerald" | "amber";

export const GLYPH_RAMPS: Record<GlyphRampName, string[]> = {
  Classic: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"],
  Matrix: [" ", "·", "¦", "|", "!", "0", "1", "X", "#", "8"],
  Blocks: [" ", "·", "░", "▒", "▓", "█"],
  Dots: [" ", "·", "•", "●"],
  Binary: [" ", ".", ":", "0", "1"],
};

export const BLOB_PALETTES: Record<
  BlobPaletteName,
  { primary: string; secondary: string; coldInk: string; eyeAccent: string; halo: string }
> = {
  monochrome: {
    primary: "#FFFFFF",
    secondary: "#D4D4D8",
    coldInk: "#71717A",
    eyeAccent: "#FFFFFF",
    halo: "rgba(255, 255, 255, 0.18)",
  },
  cobalt: {
    primary: "#388BFD",
    secondary: "#1B3B6F",
    coldInk: "#0D2149",
    eyeAccent: "#93C5FD",
    halo: "rgba(0, 102, 255, 0.22)",
  },
  cyan: {
    primary: "#22D3EE",
    secondary: "#164E63",
    coldInk: "#083344",
    eyeAccent: "#A5F3FC",
    halo: "rgba(0, 240, 255, 0.22)",
  },
  emerald: {
    primary: "#34D399",
    secondary: "#065F46",
    coldInk: "#022C22",
    eyeAccent: "#A7F3D0",
    halo: "rgba(16, 185, 129, 0.22)",
  },
  amber: {
    primary: "#FBBF24",
    secondary: "#92400E",
    coldInk: "#451A03",
    eyeAccent: "#FDE68A",
    halo: "rgba(245, 158, 11, 0.22)",
  },
};

/* ── Tipografía para glifos: Monospace del sistema sin dependencias externas ── */
const MONO_FONT = `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace`;

/* ── Función de clamp numérico rápido ── */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ── Hash entero determinista para el centelleo (shimmer) a 14Hz ── */
function hash14Hz(k: number, deal: number): number {
  let h = (k * 374761393 + deal * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/* ── Constantes Físicas y Térmicas Fundamentales ── */
const THERMAL_COLD_THRESHOLD = 0.04; // Por debajo de este calor, el nodo es un punto frío
const SHOCKWAVE_DURATION = 1.8;      // Duración de la onda de choque en segundos
const SHIMMER_INTERVAL_S = 0.07;     // ~14 Hz de recambio para el parpadeo de terminal

export interface AsciiBlobOrbProps {
  mode?: BlobOrbMode;
  palette?: BlobPaletteName;
  glyphs?: GlyphRampName;
  particleDensity?: "fine" | "medium" | "coarse";
  reach?: number; // Radio de empuje del cursor (px)
  force?: number; // Fuerza de repulsión (0..100)
  trail?: number; // Duración del enfriamiento en segundos
  pull?: number;  // Atracción magnética hacia el cursor (0..100)
  showEyes?: boolean;
  className?: string;
  onBlobClick?: () => void;
}

export function AsciiBlobOrb({
  mode = "idle",
  palette = "monochrome",
  glyphs = "Classic",
  particleDensity = "medium",
  reach = 75,
  force = 55,
  trail = 1.2,
  pull = 35,
  showEyes = true,
  className = "w-full h-full",
  onBlobClick,
}: AsciiBlobOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parámetros reactivos mutables en ref para no recrear buffers innecesariamente
  const knobsRef = useRef({
    mode,
    palette,
    glyphs,
    reach,
    force,
    trail,
    pull,
    showEyes,
    particleDensity,
  });

  useEffect(() => {
    knobsRef.current = {
      mode,
      palette,
      glyphs,
      reach,
      force,
      trail,
      pull,
      showEyes,
      particleDensity,
    };
  }, [mode, palette, glyphs, reach, force, trail, pull, showEyes, particleDensity]);

  // Blink trigger para los ojos Blobatar
  const blinkStateRef = useRef({ progress: 1.0, isBlinking: false });

  const triggerBlink = useCallback(() => {
    if (blinkStateRef.current.isBlinking) return;
    blinkStateRef.current.isBlinking = true;
    const start = performance.now();
    const duration = 180;

    const stepBlink = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1.0, elapsed / duration);
      blinkStateRef.current.progress = Math.sin(p * Math.PI) > 0.4 ? 0.05 : 1.0;
      if (p < 1.0) {
        requestAnimationFrame(stepBlink);
      } else {
        blinkStateRef.current.progress = 1.0;
        blinkStateRef.current.isBlinking = false;
      }
    };
    requestAnimationFrame(stepBlink);
  }, []);

  // Parpadeo autónomo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = 3500 + Math.random() * 4000;
      timer = setTimeout(() => {
        triggerBlink();
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(timer);
  }, [triggerBlink]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    /* ── Dimensión y Soporte Retina / HiDPI (máx 2x) ── */
    let width = container.clientWidth || 480;
    let height = container.clientHeight || 400;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const updateSize = () => {
      width = container.clientWidth || 480;
      height = container.clientHeight || 400;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };
    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
      initParticles();
    });
    ro.observe(container);

    /* ── Detección de Accesibilidad (prefers-reduced-motion) ── */
    const isMotionReduced =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    /* ── Buffers de Partículas (Structure of Arrays) ── */
    let particleCount =
      particleDensity === "fine" ? 720 : particleDensity === "medium" ? 540 : 380;

    interface ParticleSOA {
      // Coordenadas base en el disco ideal
      baseRadius: Float32Array;
      baseAngle: Float32Array;
      phase: Float32Array;
      // Posición viva Home
      hx: Float32Array;
      hy: Float32Array;
      // Posición física actual
      x: Float32Array;
      y: Float32Array;
      // Velocidades
      vx: Float32Array;
      vy: Float32Array;
      // Campo térmico (estela ASCII)
      heat: Float32Array;
      // Tamaño nominal de reposo
      size: Float32Array;
    }

    let particles: ParticleSOA;

    const initParticles = () => {
      const N = particleCount;
      const baseR = Math.min(width, height) * 0.34;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 grados (Fermat spiral)

      const bRadius = new Float32Array(N);
      const bAngle = new Float32Array(N);
      const bPhase = new Float32Array(N);
      const hx = new Float32Array(N);
      const hy = new Float32Array(N);
      const px = new Float32Array(N);
      const py = new Float32Array(N);
      const vx = new Float32Array(N);
      const vy = new Float32Array(N);
      const heat = new Float32Array(N);
      const size = new Float32Array(N);

      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < N; i++) {
        // Distribución equitativa por área en disco (Vogel / Fermat spiral)
        const rNorm = Math.sqrt((i + 0.5) / N);
        const theta = i * goldenAngle;
        const r = rNorm * baseR;

        bRadius[i] = r;
        bAngle[i] = theta;
        bPhase[i] = Math.random() * Math.PI * 2;

        const initX = cx + Math.cos(theta) * r;
        const initY = cy + Math.sin(theta) * r;

        hx[i] = initX;
        hy[i] = initY;
        px[i] = initX;
        py[i] = initY;
        vx[i] = 0;
        vy[i] = 0;
        heat[i] = 0;
        size[i] = 1.8 + Math.random() * 1.6;
      }

      particles = {
        baseRadius: bRadius,
        baseAngle: bAngle,
        phase: bPhase,
        hx,
        hy,
        x: px,
        y: py,
        vx,
        vy,
        heat,
        size,
      };
    };

    initParticles();

    /* ── Estado Dinámico del Puntero y Ondas ── */
    const pointer = {
      x: -999,
      y: -999,
      lx: NaN,
      ly: NaN,
      velocity: 0,
      inside: false,
      near: 0,
      squishScaleY: 1.0,
      squishVelocity: 0.0,
    };

    const shockwaveRings: Array<{ x: number; y: number; t: number }> = [];

    // Estampado térmico continuo a lo largo del trazo
    const stampThermal = (
      x: number,
      y: number,
      radius: number,
      amount: number
    ) => {
      const R2 = radius * radius;
      for (let i = 0; i < particleCount; i++) {
        const dx = particles.x[i] - x;
        const dy = particles.y[i] - y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 >= R2) continue;
        const q = 1 - dist2 / R2;
        particles.heat[i] = Math.min(1.0, particles.heat[i] + amount * q * q);
      }
    };

    /* ── Listeners del Puntero ── */
    const getPointerPos = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handlePointerMove = (e: MouseEvent) => {
      const { x, y } = getPointerPos(e);
      const wakeRadius = 14 + (knobsRef.current.reach / 100) * 48;

      if (Number.isNaN(pointer.lx)) {
        pointer.lx = x;
        pointer.ly = y;
      }

      // Interpolación de sellos entre el cuadro previo y el actual para no dejar huecos
      const dist = Math.hypot(x - pointer.lx, y - pointer.ly);
      pointer.velocity = dist;
      const steps = Math.max(1, Math.ceil(dist / (wakeRadius * 0.35)));
      for (let k = 1; k <= steps; k++) {
        const f = k / steps;
        stampThermal(
          pointer.lx + (x - pointer.lx) * f,
          pointer.ly + (y - pointer.ly) * f,
          wakeRadius,
          0.45
        );
      }

      pointer.lx = x;
      pointer.ly = y;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;
    };

    const handlePointerEnter = (e: MouseEvent) => {
      pointer.lx = NaN;
      handlePointerMove(e);
    };

    const handlePointerLeave = () => {
      pointer.inside = false;
      pointer.lx = NaN;
    };

    const handlePointerDown = (e: MouseEvent) => {
      const { x, y } = getPointerPos(e);
      shockwaveRings.push({ x, y, t: 0 });
      pointer.squishVelocity -= 0.85;
      triggerBlink();

      // Dispersión física radial violenta de las partículas
      const S = 0.5 + (clamp(knobsRef.current.force, 0, 100) / 100) * 1.5;
      for (let i = 0; i < particleCount; i++) {
        const dx = particles.x[i] - x;
        const dy = particles.y[i] - y;
        const d = Math.hypot(dx, dy);
        if (d > 220 || d < 0.01) continue;
        const f = (1 - d / 220) * 38 * S;
        particles.vx[i] += (dx / d) * f;
        particles.vy[i] += (dy / d) * f;
        // Inyectar calor instantáneo en la zona de impacto
        particles.heat[i] = Math.min(1.0, particles.heat[i] + (1 - d / 220) * 0.8);
      }

      if (onBlobClick) onBlobClick();
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("mousedown", handlePointerDown);

    /* ── Ciclo de Animación (RAF Loop) ── */
    let animId = 0;
    let prevTime = performance.now();
    let tickShimmer = 0;
    let dealCounter = 0;
    let globalAngle = 0;

    const render = (currentTime: number) => {
      // Delta time normalizado en unidades de 1/60s (16.67ms)
      const rawDt = Math.min(0.05, (currentTime - prevTime) / 1000);
      const dtFrames = clamp((currentTime - prevTime) / 16.67, 0.1, 2.5);
      prevTime = currentTime;

      const knobs = knobsRef.current;
      const paletteDef = BLOB_PALETTES[knobs.palette] || BLOB_PALETTES.monochrome;
      const ramp = GLYPH_RAMPS[knobs.glyphs] || GLYPH_RAMPS.Classic;
      const topRampIndex = ramp.length - 1;

      // Actualizar temporizador de Shimmer de terminal (~14 Hz)
      tickShimmer += rawDt;
      if (tickShimmer > SHIMMER_INTERVAL_S) {
        tickShimmer = 0;
        dealCounter++;
      }

      // Cinemática de squish (Hooke's Spring)
      const targetSquish = pointer.inside ? 0.92 : 1.0;
      const springK = 180.0;
      const dampingC = 12.0;
      const disp = pointer.squishScaleY - targetSquish;
      const forceSpring = -springK * disp - dampingC * pointer.squishVelocity;
      pointer.squishVelocity += forceSpring * rawDt;
      pointer.squishScaleY += pointer.squishVelocity * rawDt;

      const squishY = pointer.squishScaleY;
      const squishX = 1.0 + (1.0 - squishY) * 0.5;

      // Inercia de proximidad del puntero (lean/pull)
      pointer.near +=
        ((pointer.inside ? 1 : 0) - pointer.near) *
        (1 - Math.pow(0.005, rawDt));

      pointer.velocity *= 0.88;

      // ── STATUS QUO TRANQUILO (Sin auto-giro ni agitación autónoma) ──
      // En reposo respira de forma zen casi imperceptible; muta por acciones externas
      let morphSpeed = 0.35;
      let morphAmp1 = 0.012; // Reposo muy sutil
      let morphAmp2 = 0.007;
      let morphAmp3 = 0.003;

      // ── ACCIÓN EXTERNA 1: Interacción del cursor / velocidad ──
      if (pointer.inside) {
        const pointerSpeed = Math.min(1.0, pointer.velocity / 18.0);
        morphAmp1 += 0.05 + pointerSpeed * 0.08;
        morphAmp2 += 0.03 + pointerSpeed * 0.05;
        morphAmp3 += 0.02 + pointerSpeed * 0.03;
        morphSpeed = 0.75 + pointerSpeed * 1.5;
      }

      // ── ACCIÓN EXTERNA 2: Modulación por audio / modo externo ──
      if (knobs.mode === "listening" || knobs.mode === "voice") {
        morphSpeed = 2.0;
        morphAmp1 = 0.12;
        morphAmp2 = 0.08;
        morphAmp3 = 0.05;
      } else if (knobs.mode === "thinking") {
        morphSpeed = 3.2;
        morphAmp1 = 0.15;
        morphAmp2 = 0.10;
        morphAmp3 = 0.07;
      } else if (knobs.mode === "speaking") {
        const speechPulse = Math.sin(currentTime * 0.012) * 0.5 + 0.5;
        morphSpeed = 1.5 + speechPulse * 1.4;
        morphAmp1 = 0.07 + speechPulse * 0.10;
        morphAmp2 = 0.04 + speechPulse * 0.06;
        morphAmp3 = 0.03;
      }

      // NO auto-girar: orientación fija hacia el frente con sutil paralaje reactivo al puntero
      const cx = width * 0.5;
      const cy = height * 0.5;
      const targetParallaxAngle = pointer.inside ? (pointer.x - cx) * 0.0003 : 0;
      globalAngle += (targetParallaxAngle - globalAngle) * 0.08;

      const baseR = Math.min(width, height) * 0.34;

      // Ojos Blobatar Look-At
      const eyeLookX = (pointer.x - cx) * 0.08;
      const eyeLookY = (pointer.y - cy) * 0.08;
      const eyeLX = cx - 36 + eyeLookX;
      const eyeRX = cx + 36 + eyeLookX;
      const eyeY = cy - 22 + eyeLookY;
      const eyeRadius = 24;

      // Anillos de onda de choque activos
      for (let rIdx = shockwaveRings.length - 1; rIdx >= 0; rIdx--) {
        shockwaveRings[rIdx].t += rawDt;
        if (shockwaveRings[rIdx].t >= SHOCKWAVE_DURATION) {
          shockwaveRings.splice(rIdx, 1);
        }
      }

      const activeRings = shockwaveRings.map((r) => {
        const p = r.t / SHOCKWAVE_DURATION;
        const easeOut = 1 - Math.pow(1 - p, 3);
        return {
          x: r.x,
          y: r.y,
          radius: 12 + easeOut * 260,
          amp: 0.8 * (1 - p) * (1 - p) * Math.min(1, p * 5),
        };
      });

      // Factor de enfriamiento continuo de la estela
      const keepHeat = Math.exp((-rawDt * 3.0) / Math.max(0.1, knobs.trail));

      /* ── Actualización de Partículas: Morfología + Resortes + Calor ── */
      const R_reach = clamp(knobs.reach, 30, 160);
      const pushForce = (clamp(knobs.force, 0, 100) / 100) * 11;
      const leanStrength = (clamp(knobs.pull, 0, 100) / 100) * pointer.near;
      const farDist = R_reach * 2;
      const farDist2 = farDist * farDist;

      for (let i = 0; i < particleCount; i++) {
        const angle = particles.baseAngle[i] + globalAngle;
        const phase = particles.phase[i];

        // Deformación armónica polar (Superficie Viva)
        const harm =
          Math.sin(angle * 2.0 + currentTime * 0.0015 * morphSpeed + phase) * morphAmp1 +
          Math.cos(angle * 3.0 - currentTime * 0.0018 * morphSpeed) * morphAmp2 +
          Math.sin(angle * 5.0 + currentTime * 0.0022 * morphSpeed) * morphAmp3;

        const dynamicR = particles.baseRadius[i] * (1.0 + harm);

        // Posición Home en el plano deformado con Squish
        let targetHx = cx + Math.cos(angle) * dynamicR * squishX;
        let targetHy = cy + Math.sin(angle) * dynamicR * squishY;

        // Blobatar Hollow Eye Cavity Check
        let insideEye = false;
        if (knobs.showEyes) {
          const blinkComp = Math.max(0.12, blinkStateRef.current.progress);
          const dL = Math.hypot(targetHx - eyeLX, (targetHy - eyeY) / blinkComp);
          const dR = Math.hypot(targetHx - eyeRX, (targetHy - eyeY) / blinkComp);

          if (dL < eyeRadius || dR < eyeRadius) {
            const minD = Math.min(dL, dR);
            if (minD < eyeRadius * 0.65) {
              // Vacío absoluto dentro de la cuenca
              insideEye = true;
            }
          }
        }

        particles.hx[i] = targetHx;
        particles.hy[i] = targetHy;

        // Repulsión por puntero
        if (pointer.inside) {
          const pdx = particles.x[i] - pointer.x;
          const pdy = particles.y[i] - pointer.y;
          const pdist = Math.hypot(pdx, pdy);
          if (pdist < R_reach && pdist > 0.01) {
            const f = Math.pow(1 - pdist / R_reach, 2) * pushForce;
            particles.vx[i] += (pdx / pdist) * f * dtFrames;
            particles.vy[i] += (pdy / pdist) * f * dtFrames;
          }
        }

        // Perturbación por ondas de choque activas
        for (const ring of activeRings) {
          const rdx = particles.x[i] - ring.x;
          const rdy = particles.y[i] - ring.y;
          const rDist = Math.hypot(rdx, rdy);
          const diff = (rDist - ring.radius) / 24;
          if (diff > -2.5 && diff < 2.5) {
            const ringFactor = ring.amp * Math.exp(-diff * diff);
            if (rDist > 0.01) {
              particles.vx[i] += (rdx / rDist) * ringFactor * 22 * dtFrames;
              particles.vy[i] += (rdy / rDist) * ringFactor * 22 * dtFrames;
            }
            particles.heat[i] = Math.min(1.0, particles.heat[i] + ringFactor * 0.9);
          }
        }

        // Integración de resorte Euler frame-independent (damping normalizado por dt)
        const springDamping = Math.pow(0.84, dtFrames);
        particles.vx[i] =
          (particles.vx[i] + (particles.hx[i] - particles.x[i]) * 0.05 * dtFrames) *
          springDamping;
        particles.vy[i] =
          (particles.vy[i] + (particles.hy[i] - particles.y[i]) * 0.05 * dtFrames) *
          springDamping;

        particles.x[i] += particles.vx[i] * dtFrames;
        particles.y[i] += particles.vy[i] * dtFrames;

        // Snap si se encuentra en reposo absoluto
        if (
          Math.abs(particles.hx[i] - particles.x[i]) < 0.05 &&
          Math.abs(particles.hy[i] - particles.y[i]) < 0.05 &&
          Math.abs(particles.vx[i]) < 0.02 &&
          Math.abs(particles.vy[i]) < 0.02
        ) {
          particles.x[i] = particles.hx[i];
          particles.y[i] = particles.hy[i];
          particles.vx[i] = 0;
          particles.vy[i] = 0;
        }

        // Enfriamiento térmico continuo
        particles.heat[i] *= keepHeat;
        if (particles.heat[i] < 0.003) particles.heat[i] = 0;
      }

      /* ── Renderizado Canvas 2D Puro ── */
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fondo negro puro (estricto Anti-Slop)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Halo sutil de fondo
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseR * 1.25);
      gradient.addColorStop(0, paletteDef.halo);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Configuración de texto para glifos ASCII
      ctx.font = `600 11px ${MONO_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      /* ── Dibujo de Partículas: Halftone Frío o Glifo Caliente ── */
      for (let i = 0; i < particleCount; i++) {
        // Culling si el nodo cae en la cavidad ocular pura
        if (knobs.showEyes) {
          const blinkComp = Math.max(0.12, blinkStateRef.current.progress);
          const dL = Math.hypot(particles.x[i] - eyeLX, (particles.y[i] - eyeY) / blinkComp);
          const dR = Math.hypot(particles.x[i] - eyeRX, (particles.y[i] - eyeY) / blinkComp);
          if (dL < eyeRadius * 0.65 || dR < eyeRadius * 0.65) continue;
        }

        let renderX = particles.x[i];
        let renderY = particles.y[i];
        let h = particles.heat[i];

        // Atracción magnética (Lean toward pointer)
        if (leanStrength > 0.002 && pointer.inside) {
          const mdx = pointer.x - renderX;
          const mdy = pointer.y - renderY;
          const md2 = mdx * mdx + mdy * mdy;
          if (md2 < farDist2) {
            const f = 1 - md2 / farDist2;
            const md = Math.sqrt(md2) || 1;
            const pullOffset = Math.min(md * 0.6, 14 * leanStrength * f * f);
            renderX += (mdx / md) * pullOffset;
            renderY += (mdy / md) * pullOffset;
          }
        }

        const sp = Math.hypot(particles.vx[i], particles.vy[i]);

        // FASE FRÍA: Micro-puntos / elipses Bencho
        if (h <= THERMAL_COLD_THRESHOLD) {
          ctx.fillStyle = paletteDef.coldInk;
          const r = particles.size[i];

          if (sp < 0.3) {
            ctx.beginPath();
            ctx.arc(renderX, renderY, r, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Estiramiento elíptico por velocidad (conservación de área óptica)
            const s = Math.min(2.6, 1 + sp * 0.12);
            const rot = Math.atan2(particles.vy[i], particles.vx[i]);
            ctx.beginPath();
            ctx.ellipse(renderX, renderY, r * s, r / Math.sqrt(s), rot, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // FASE CALIENTE: Rampa ASCII con Centelleo (Shimmer a 14Hz)
        let glyphIndexVal = h * topRampIndex + 0.5;
        // Perturbación terminal hash
        glyphIndexVal += (hash14Hz(i, dealCounter) - 0.5) * 1.6 * Math.min(1.0, h * 2);
        const glyphIdx = clamp(Math.floor(glyphIndexVal), 1, topRampIndex);

        // Color según intensidad de calor
        if (h > 0.7) {
          ctx.fillStyle = paletteDef.primary;
        } else {
          ctx.fillStyle = paletteDef.secondary;
        }

        ctx.fillText(ramp[glyphIdx], renderX, renderY);
      }

      // Parpadeo ocular: renderizar slits horizontales luminosos si está parpadeando
      if (knobs.showEyes && blinkStateRef.current.progress < 0.25) {
        ctx.strokeStyle = paletteDef.eyeAccent;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(eyeLX - 10, eyeY);
        ctx.lineTo(eyeLX + 10, eyeY);
        ctx.moveTo(eyeRX - 10, eyeY);
        ctx.lineTo(eyeRX + 10, eyeY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    if (!isMotionReduced) {
      animId = requestAnimationFrame(render);
    } else {
      // Si el usuario tiene prefers-reduced-motion, dibuja un cuadro estático
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseenter", handlePointerEnter);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("mousedown", handlePointerDown);
      ro.disconnect();
    };
  }, [particleDensity, triggerBlink]);

  return (
    <div
      ref={containerRef}
      className={`ascii-blob-orb relative w-full h-full select-none overflow-hidden bg-black ${className}`}
      role="img"
      aria-label="Orbe Blobtar Biomorphic ASCII interactivo"
    >
      <canvas ref={canvasRef} className="ascii-blob-canvas block w-full h-full" />
    </div>
  );
}
