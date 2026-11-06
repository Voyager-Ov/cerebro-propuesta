"use client";

import React, { useEffect, useRef, useCallback } from "react";

/* ══ AsciiBlobOrb ═════════════════════════════════════════════════════════════
   Orbe Blobtar Biomorphic ASCII interactivo.
   
   Características clave refinadas:
   1. Reposo Zen (Status Quo Calm):
      - Cero auto-giro y cero ruido autónomo en reposo ("no se mueve porque sí").
      - Geometría circular armónica en calma.
   2. Transición Suave y Animada (Smooth Excitation):
      - Al entrar el cursor en la zona del orbe, la turbulencia y el movimiento
        general despiertan con una rampa asintótica suave y gradual (sin saltos bruscos).
      - Al retirar el cursor, la masa retorna fluidamente al reposo absoluto.
   3. Puntos y Caracteres Más Grandes:
      - Nodos semitono en reposo con radio sustancial (~3.6 a 5.8px).
      - Tipografía ASCII a 15px monospace en negrita para alta legibilidad.
   4. Ojos Blobatar Expresivos:
      - Cuencas oculares con contorno nítido, vacío interno y pupilas con
        seguimiento inercial de alta fidelidad hacia el cursor.
      - Parpadeo reactivo y autónomo en hendidura (*blink slit*).
   5. Física de Resortes Bencho (Particles.tsx) + Estela Térmica (ASCIIWake.tsx):
      - Resortes Euler frame-independent con amortiguación Math.pow(0.84, dt).
      - Deformación elíptica por velocidad que preserva el volumen óptico.
      - Rampa de caracteres ASCII con centelleo terminal a 14Hz.
      - Onda de choque radial expansiva (Shockwave) al hacer clic.
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
    coldInk: "#8E8E93",
    eyeAccent: "#FFFFFF",
    halo: "rgba(255, 255, 255, 0.16)",
  },
  cobalt: {
    primary: "#388BFD",
    secondary: "#1B3B6F",
    coldInk: "#1D3557",
    eyeAccent: "#93C5FD",
    halo: "rgba(0, 102, 255, 0.20)",
  },
  cyan: {
    primary: "#22D3EE",
    secondary: "#164E63",
    coldInk: "#0E4A5E",
    eyeAccent: "#A5F3FC",
    halo: "rgba(0, 240, 255, 0.20)",
  },
  emerald: {
    primary: "#34D399",
    secondary: "#065F46",
    coldInk: "#064E3B",
    eyeAccent: "#A7F3D0",
    halo: "rgba(16, 185, 129, 0.20)",
  },
  amber: {
    primary: "#FBBF24",
    secondary: "#92400E",
    coldInk: "#78350F",
    eyeAccent: "#FDE68A",
    halo: "rgba(245, 158, 11, 0.20)",
  },
};

const MONO_FONT = `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace`;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function hash14Hz(k: number, deal: number): number {
  let h = (k * 374761393 + deal * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const THERMAL_COLD_THRESHOLD = 0.04;
const SHOCKWAVE_DURATION = 1.8;
const SHIMMER_INTERVAL_S = 0.07;

export interface AsciiBlobOrbProps {
  mode?: BlobOrbMode;
  palette?: BlobPaletteName;
  glyphs?: GlyphRampName;
  particleDensity?: "fine" | "medium" | "coarse";
  reach?: number; // Radio de interacción del cursor en px
  force?: number; // Fuerza de repulsión elástica (0..100)
  trail?: number; // Duración de la estela térmica en segundos
  pull?: number;  // Atracción magnética de glifos hacia el mouse (0..100)
  showEyes?: boolean;
  className?: string;
  onBlobClick?: () => void;
}

export function AsciiBlobOrb({
  mode = "idle",
  palette = "monochrome",
  glyphs = "Classic",
  particleDensity = "medium",
  reach = 85,
  force = 55,
  trail = 1.3,
  pull = 35,
  showEyes = true,
  className = "w-full h-full",
  onBlobClick,
}: AsciiBlobOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Parpadeo de ojos Blobatar orgánico
  const blinkStateRef = useRef({ progress: 1.0, isBlinking: false });

  const triggerBlink = useCallback(() => {
    if (blinkStateRef.current.isBlinking) return;
    blinkStateRef.current.isBlinking = true;
    const start = performance.now();
    const duration = 160;

    const stepBlink = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1.0, elapsed / duration);
      // Suave curva de parpadeo biológico (hasta 0.08 en el punto de máximo cierre)
      const closeAmount = Math.sin(p * Math.PI);
      blinkStateRef.current.progress = 1.0 - 0.92 * Math.pow(closeAmount, 1.8);
      if (p < 1.0) {
        requestAnimationFrame(stepBlink);
      } else {
        blinkStateRef.current.progress = 1.0;
        blinkStateRef.current.isBlinking = false;
      }
    };
    requestAnimationFrame(stepBlink);
  }, []);

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

    const isMotionReduced =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Con puntos más grandes, ajustamos la cuenta para mantener el espaciado armónico
    let particleCount =
      particleDensity === "fine" ? 540 : particleDensity === "medium" ? 400 : 280;

    interface ParticleSOA {
      baseRadius: Float32Array;
      baseAngle: Float32Array;
      phase: Float32Array;
      hx: Float32Array;
      hy: Float32Array;
      x: Float32Array;
      y: Float32Array;
      vx: Float32Array;
      vy: Float32Array;
      heat: Float32Array;
      size: Float32Array;
    }

    let particles: ParticleSOA;

    const initParticles = () => {
      const N = particleCount;
      const baseR = Math.min(width, height) * 0.35;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 grados

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

        // Puntos más grandes (radio entre 3.6 y 5.6 px para presencia nítida)
        size[i] = 3.6 + Math.random() * 2.0;
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
      const wakeRadius = 18 + (knobsRef.current.reach / 100) * 54;

      if (Number.isNaN(pointer.lx)) {
        pointer.lx = x;
        pointer.ly = y;
      }

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

      const S = 0.5 + (clamp(knobsRef.current.force, 0, 100) / 100) * 1.5;
      for (let i = 0; i < particleCount; i++) {
        const dx = particles.x[i] - x;
        const dy = particles.y[i] - y;
        const d = Math.hypot(dx, dy);
        if (d > 230 || d < 0.01) continue;
        const f = (1 - d / 230) * 36 * S;
        particles.vx[i] += (dx / d) * f;
        particles.vy[i] += (dy / d) * f;
        particles.heat[i] = Math.min(1.0, particles.heat[i] + (1 - d / 230) * 0.85);
      }

      if (onBlobClick) onBlobClick();
    };

    const globalMouse = { x: NaN, y: NaN };
    const handleGlobalMouseMove = (e: MouseEvent) => {
      globalMouse.x = e.clientX;
      globalMouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("mousedown", handlePointerDown);

    /* ── Ciclo de Animación ── */
    let animId = 0;
    let prevTime = performance.now();
    let tickShimmer = 0;
    let dealCounter = 0;
    let globalAngle = 0;

    // Transición suave y animada al entrar el mouse (Smooth Excitation)
    let smoothExcitation = 0.0;
    // Ojos Blobatar con inercia suave
    let smoothEyeX = 0.0;
    let smoothEyeY = 0.0;

    const render = (currentTime: number) => {
      const rawDt = Math.min(0.05, (currentTime - prevTime) / 1000);
      const dtFrames = clamp((currentTime - prevTime) / 16.67, 0.1, 2.5);
      prevTime = currentTime;

      const knobs = knobsRef.current;
      const paletteDef = BLOB_PALETTES[knobs.palette] || BLOB_PALETTES.monochrome;
      const ramp = GLYPH_RAMPS[knobs.glyphs] || GLYPH_RAMPS.Classic;
      const topRampIndex = ramp.length - 1;

      // Actualizar Shimmer de terminal a ~14 Hz
      tickShimmer += rawDt;
      if (tickShimmer > SHIMMER_INTERVAL_S) {
        tickShimmer = 0;
        dealCounter++;
      }

      // Física de squish (Hooke)
      const targetSquish = pointer.inside ? 0.93 : 1.0;
      const springK = 180.0;
      const dampingC = 12.0;
      const disp = pointer.squishScaleY - targetSquish;
      const forceSpring = -springK * disp - dampingC * pointer.squishVelocity;
      pointer.squishVelocity += forceSpring * rawDt;
      pointer.squishScaleY += pointer.squishVelocity * rawDt;

      const squishY = pointer.squishScaleY;
      const squishX = 1.0 + (1.0 - squishY) * 0.5;

      // Inercia de proximidad
      pointer.near +=
        ((pointer.inside ? 1 : 0) - pointer.near) *
        (1 - Math.pow(0.005, rawDt));

      pointer.velocity *= 0.88;

      /* ── 1. TRANSICIÓN SUAVE Y ANIMADA DEL MOVIMIENTO GENERAL (SMOOTH EXCITATION) ── */
      // Cuando el mouse entra al orbe, smoothExcitation sube suavemente de 0.0 a 1.0 sin saltos bruscos.
      // Cuando sale, se apaga gradualmente retornando al reposo zen ("no se mueve porque sí").
      const targetExcitation = pointer.inside ? 1.0 : 0.0;
      smoothExcitation += (targetExcitation - smoothExcitation) * (1.0 - Math.pow(0.03, rawDt));

      const pointerSpeed = Math.min(1.0, pointer.velocity / 18.0);
      const activeIntensity = smoothExcitation * (0.85 + pointerSpeed * 0.65);

      // En reposo (status quo): smoothExcitation = 0 -> morphAmp = 0 (cero movimiento autónomo)
      let morphSpeed = 0.35 + activeIntensity * 1.5;
      let morphAmp1 = activeIntensity * 0.075;
      let morphAmp2 = activeIntensity * 0.045;
      let morphAmp3 = activeIntensity * 0.025;

      // Modos externos (voz, audio, pensamiento)
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
        morphAmp1 = 0.07 + speechPulse * 0.09;
        morphAmp2 = 0.04 + speechPulse * 0.06;
        morphAmp3 = 0.03;
      }

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Paralaje sutil únicamente reactivo al mouse (0 auto-giro)
      const targetParallaxAngle = pointer.inside ? (pointer.x - cx) * 0.0003 : 0;
      globalAngle += (targetParallaxAngle - globalAngle) * 0.08;

      const baseR = Math.min(width, height) * 0.35;

      /* ── 2. OJOS BLOBATAR EXPRESIVOS (LOOK-AT INERCIAL GLOBAL) ── */
      // Sigue el puntero en toda la ventana de forma análoga a blobatar/gaze
      let targetEyeX = 0;
      let targetEyeY = 0;

      if (!Number.isNaN(globalMouse.x)) {
        const rect = container.getBoundingClientRect();
        const screenCenterX = rect.left + width * 0.5;
        const screenCenterY = rect.top + height * 0.5;
        const screenDx = globalMouse.x - screenCenterX;
        const screenDy = globalMouse.y - screenCenterY;
        const maxRange = Math.max(window.innerWidth, window.innerHeight) * 0.45;
        targetEyeX = clamp(screenDx / maxRange, -1, 1) * (baseR * 0.16);
        targetEyeY = clamp(screenDy / maxRange, -1, 1) * (baseR * 0.12);
      }

      smoothEyeX += (targetEyeX - smoothEyeX) * (1.0 - Math.pow(0.04, rawDt));
      smoothEyeY += (targetEyeY - smoothEyeY) * (1.0 - Math.pow(0.04, rawDt));

      // Proporciones canónicas idénticas a las cápsulas de Blobatar
      const eyeSpread = baseR * 0.21;
      const eyeElevation = baseR * 0.08;
      const eyeLX = cx - eyeSpread + smoothEyeX;
      const eyeRX = cx + eyeSpread + smoothEyeX;
      const eyeY = cy - eyeElevation + smoothEyeY;
      const eyeRadiusX = baseR * 0.095;
      const eyeRadiusY = baseR * 0.22;

      // Ondas de choque
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

      const keepHeat = Math.exp((-rawDt * 3.0) / Math.max(0.1, knobs.trail));

      /* ── Actualización de Partículas ── */
      const R_reach = clamp(knobs.reach, 30, 160);
      const pushForce = (clamp(knobs.force, 0, 100) / 100) * 11;
      const leanStrength = (clamp(knobs.pull, 0, 100) / 100) * pointer.near;
      const farDist = R_reach * 2;
      const farDist2 = farDist * farDist;

      for (let i = 0; i < particleCount; i++) {
        const angle = particles.baseAngle[i] + globalAngle;
        const phase = particles.phase[i];

        // Deformación armónica polar (solo activa ante interacción)
        const harm =
          Math.sin(angle * 2.0 + currentTime * 0.0015 * morphSpeed + phase) * morphAmp1 +
          Math.cos(angle * 3.0 - currentTime * 0.0018 * morphSpeed) * morphAmp2 +
          Math.sin(angle * 5.0 + currentTime * 0.0022 * morphSpeed) * morphAmp3;

        const dynamicR = particles.baseRadius[i] * (1.0 + harm);

        let targetHx = cx + Math.cos(angle) * dynamicR * squishX;
        let targetHy = cy + Math.sin(angle) * dynamicR * squishY;

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

        // Perturbación por ondas de choque
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

        // Resorte Euler frame-independent
        const springDamping = Math.pow(0.84, dtFrames);
        particles.vx[i] =
          (particles.vx[i] + (particles.hx[i] - particles.x[i]) * 0.05 * dtFrames) *
          springDamping;
        particles.vy[i] =
          (particles.vy[i] + (particles.hy[i] - particles.y[i]) * 0.05 * dtFrames) *
          springDamping;

        particles.x[i] += particles.vx[i] * dtFrames;
        particles.y[i] += particles.vy[i] * dtFrames;

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

        particles.heat[i] *= keepHeat;
        if (particles.heat[i] < 0.003) particles.heat[i] = 0;
      }

      /* ── Renderizado Canvas 2D ── */
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fondo negro estricto
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Halo sutil de fondo
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseR * 1.3);
      gradient.addColorStop(0, paletteDef.halo);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Tipografía más grande y nítida para los glifos ASCII (15px)
      ctx.font = `600 15px ${MONO_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const blinkComp = Math.max(0.10, blinkStateRef.current.progress);

      /* ── Dibujo de Partículas: Halftone Frío o Glifo Caliente ── */
      for (let i = 0; i < particleCount; i++) {
        let renderX = particles.x[i];
        let renderY = particles.y[i];

        // 1. Atracción magnética hacia el cursor
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

        // 2. OJOS BLOBATAR: DOS HUECOS VACÍOS PUROS (100% SIN NADA)
        // Se ejecuta DESPUÉS de cualquier atracción magnética para garantizar
        // que la cavidad permanezca completamente pura y limpia.
        if (knobs.showEyes) {
          const dL = Math.hypot(
            (renderX - eyeLX) / eyeRadiusX,
            (renderY - eyeY) / (eyeRadiusY * blinkComp)
          );
          const dR = Math.hypot(
            (renderX - eyeRX) / eyeRadiusX,
            (renderY - eyeY) / (eyeRadiusY * blinkComp)
          );

          // Si el punto cae dentro de la cápsula (con margen para el radio del punto): purga total
          if (dL < 1.15 || dR < 1.15) continue;

          // Si está en el borde perimetral inmediato, se empuja suavemente creando el contorno orgánico
          if (dL < 1.35) {
            const push = (1.35 - dL) * 0.6;
            const ang = Math.atan2(
              (renderY - eyeY) / (eyeRadiusY * blinkComp),
              (renderX - eyeLX) / eyeRadiusX
            );
            renderX += Math.cos(ang) * eyeRadiusX * push;
            renderY += Math.sin(ang) * (eyeRadiusY * blinkComp) * push;
          } else if (dR < 1.35) {
            const push = (1.35 - dR) * 0.6;
            const ang = Math.atan2(
              (renderY - eyeY) / (eyeRadiusY * blinkComp),
              (renderX - eyeRX) / eyeRadiusX
            );
            renderX += Math.cos(ang) * eyeRadiusX * push;
            renderY += Math.sin(ang) * (eyeRadiusY * blinkComp) * push;
          }
        }

        let h = particles.heat[i];

        const sp = Math.hypot(particles.vx[i], particles.vy[i]);

        // FASE FRÍA: Puntos / Elipses grandes de semitono
        if (h <= THERMAL_COLD_THRESHOLD) {
          ctx.fillStyle = paletteDef.coldInk;
          const r = particles.size[i];

          if (sp < 0.3) {
            ctx.beginPath();
            ctx.arc(renderX, renderY, r, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const s = Math.min(2.5, 1 + sp * 0.12);
            const rot = Math.atan2(particles.vy[i], particles.vx[i]);
            ctx.beginPath();
            ctx.ellipse(renderX, renderY, r * s, r / Math.sqrt(s), rot, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // FASE CALIENTE: Rampa ASCII con Shimmer a 14Hz
        let glyphIndexVal = h * topRampIndex + 0.5;
        glyphIndexVal += (hash14Hz(i, dealCounter) - 0.5) * 1.6 * Math.min(1.0, h * 2);
        const glyphIdx = clamp(Math.floor(glyphIndexVal), 1, topRampIndex);

        if (h > 0.65) {
          ctx.fillStyle = paletteDef.primary;
        } else {
          ctx.fillStyle = paletteDef.secondary;
        }

        ctx.fillText(ramp[glyphIdx], renderX, renderY);
      }

      /* ── 3. OJOS BLOBATAR PUROS: 100% HUECOS VACÍOS NEGATIVOS (SIN NADA) ── */
      // No se dibuja NADA adentro de los ojos ni al estar abiertos ni cerrados.
      // Las partículas dentro de la elipse se omiten, y al parpadear la elipse
      // se aplasta verticalmente a una rendija negra natural, idéntico a Blobatar.

      animId = requestAnimationFrame(render);
    };

    if (!isMotionReduced) {
      animId = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
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
