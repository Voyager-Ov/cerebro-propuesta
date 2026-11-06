---
id: AR08
titulo: Frontend Next.js 15 - Esfera 3D ASCII y Dashboard Twin Finance (Inspiración Pinterest)
tipo: arquitectura-visual
tags: [nextjs, react19, typescript, tailwind, ascii-sphere, agent-mode, criteria-lock, bencho-minimalism]
depende_de: [AR06, AR07]
conectado_con: [ID09, ID10, TW01, TW02, TW03]
---

# Frontend Next.js 16: Esfera 3D ASCII & Dashboard Twin Finance (Anti-Slop Refinado)

Este nodo documenta la arquitectura técnica y el diseño del frontend de producción implementado en `frontend/`, integrando los patrones visuales del tablero de Pinterest (*"twin"* de Octavio Velo), la estética minimalista de **Bencho.dev**, y los filtros de diseño de **`/frontend-design`**, **`/gsap-core`** y **`/antislop-ui`**.

---

## 1. Principios Anti-Slop y Craft Visual Aplicados

1. **Eliminación del Glassmorphism Indiscriminado**:
   * Las tarjetas funcionales (`CriteriaLockCard`, `AgentChatPanel`) son **superficies sólidas negro carbón mate (`bg-[#09090b]`)** con bordes milimétricos `border-[#27272a]`, aportando solidez, peso y seriedad técnica de software financiero real.
   * El efecto translúcido con desenfoque (`backdrop-blur-2xl`) queda estrictamente dosificado y reservado para el **dock flotante inferior** estilo Bencho.dev.
2. **Jerarquía Tipográfica y de Radios**:
   * Fin de la homogeneidad de píldoras: las cards usan radios sutiles y disciplinados (`rounded-xl` y `rounded-lg`), reservando el `rounded-full` únicamente para los botones de estado del dock y el switch de paleta.
   * Contraste tipográfico entre monoespaciado técnico (`Geist Mono`, `JetBrains Mono`) para bloques de código, hashes de contratos y telemetría, y sans-serif pura para lectura editorial.
3. **Orquestación con GSAP (`/gsap-core`)**:
   * Micro-animaciones táctiles en botones y switch de solapas con `gsap.fromTo()`.
   * Validación interactiva paso a paso de los hitos del contrato inteligente con animación de borde verde esmeralda y feedback háptico/visual.
   * Soporte para `prefers-reduced-motion` mediante `gsap.matchMedia()`.
4. **Esfera Celestial de Anillos y Cúmulos (Pin 636063147423013793)**:
   * Inspirado directamente en el video de Pinterest *"The Solar System: Animated sphere, Circular motion graphics"*:
   * Retícula de 360 nodos con distribución de Fibonacci en 3D.
   * 6 centros de racimos de aros concéntricos tangentes (`tangent hollow ring clusters`).
   * Puntos blancos sólidos hiper-luminosos con halos exteriores suaves.
   * Dos ojos huecos negativos estilo Blobatar que siguen al cursor con inercia y parpadean al hacer clic o de forma autónoma.
   * Anillo orbital elíptico inclinado (Kepleriano) con cuentas satelitales en traslación continua.
   * Física Spring-Damper elástica (Ley de Hooke) al posar el cursor, y onda de choque kinética al cliquear.

---

## 2. Componentes Principales

* `AsciiSphereOrb.tsx`: Renderizador Canvas 2D/3D con proyección ortogonal/perspectiva y Z-sorting. Modula 4 tipos de nodos (sólidos, aros huecos, dobles concéntricos y micro-satélites), deformación armónica esférica de baja frecuencia, y cuencas oculares negativas inerciales.
* `BenchoDock.tsx`: Dock flotante en píldora con efecto de vidrio (`backdrop-filter: blur(24px)`), segmented controls y micro-iconos SVG.
* `CriteriaLockCard.tsx`: Panel de Smart Escrow sobre Avalanche C-Chain con fondos en `ARGt` y validación de criterios de aceptación automatizados.
* `AsciiTextSpinner.tsx`: Micro-indicadores de carga procedimentales en caracteres ASCII.
