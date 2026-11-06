---
id: AR12
titulo: Orbe Blobtar Biomorphic ASCII (AsciiBlobOrb - Fusión Creative Coding)
tipo: arquitectura-visual
tags: [creative-coding, canvas-2d, react19, nextjs16, particles, ascii-wake, biomorphic, spring-physics, terminal-shimmer]
depende_de: [AR03, AR04, AR07, AR08]
conectado_con: [AR05, ID10, TW01]
---

# Orbe Blobtar Biomorphic ASCII (`AsciiBlobOrb.tsx`)

Este nodo documenta la arquitectura técnica y la síntesis de creative coding implementada en [`AsciiBlobOrb.tsx`](file:///c:/Users/pepep/hacktwin/frontend/src/components/AsciiBlobOrb.tsx), el cual fusiona la morfología bio-blob viva con la física de partículas frame-independent de Bencho ([`Particles.tsx`](file:///c:/Users/pepep/hacktwin/frontend/src/components/Particles.tsx)) y el campo térmico de estela ASCII ([`ASCIIWake.tsx`](file:///c:/Users/pepep/hacktwin/frontend/src/components/ASCIIWake.tsx)).

---

## 1. Principios Técnicos Fundamentales

1. **Morfología Bio-Blob Polar**:
   * En reposo, los anclajes de las partículas derivan de una espiral de Vogel / Fermat en un disco de radio $R_0$.
   * La superficie exterior se deforma continuamente con una serie de armónicos de Fourier polares modulados por el estado del orbe (`idle`, `listening/voice`, `thinking`, `speaking`).
   * Cuencas oculares negativas (*Hollow Eyes* estilo Blobatar) con seguimiento inercial al puntero y parpadeo de rendija (*blink slit*).

2. **Física de Partículas Bencho**:
   * Integración de resortes Euler con amortiguación frame-independent:
     $$v_{n+1} = \left(v_n + (H_n - P_n) \cdot k \cdot dt\right) \cdot \text{damping}^{dt}, \quad \text{damping} = 0.84$$
   * Estiramiento elíptico por velocidad: las partículas veloces se estiran en la dirección de su vector de velocidad conservando su área óptica ($\pi a b \approx \text{cte}$).
   * Repulsión radial suave al interactuar con el mouse.

3. **Campo Térmico Continuo & Rampa ASCII**:
   * En reposo / frío ($\Theta \le 0.04$), los elementos son micro-puntos o semitonos suaves.
   * El puntero estampa calor a lo largo de segmentos continuos sub-radio (`stampThermal`), haciendo que los puntos muten a glifos de la rampa ASCII (`Classic`, `Matrix`, `Blocks`, `Dots`, `Binary`).
   * Centelleo retro de terminal (*hash shimmer*) que permuta a 14 Hz mediante operaciones a nivel de bits en enteros de 32 bits (`hash14Hz`), sin sobrecargar la visión con parpadeo a 60 fps.
   * Atracción magnética (*lean/pull*) que atrae levemente los glifos excitados hacia el cursor.

4. **Reacción al Clic**:
   * Disparo de onda de choque radial expansiva con caída cúbica suave ($1 - (1-p)^3$), dispersión de partículas y excitación térmica coordinada.

5. **Rendimiento**:
   * Implementación en Canvas 2D puro con escalado HiDPI / Retina limitado a $2\times$.
   * Estructura de arreglos contiguos `Float32Array` (SoA) para eliminar asignación de memoria y recolección de basura por cuadro.
   * Soporte de tokens CSS `--ink` y `--fill-on` en [`globals.css`](file:///c:/Users/pepep/hacktwin/frontend/src/app/globals.css).
