---
id: AR14
titulo: Catálogo de Componentes Frontend Reutilizables (Clean UI, Blobatar ASCII Gigante y Monedas 3D Libres)
tipo: arquitectura
estado: Activo
fecha: 2026-11-07
tags: [frontend, nextjs, ascii-3d, blobatar, stablecoins, pinterest-palette, clean-ui, reusable-kit]
depende_de: [AR01, AR04, AR07, AR08, AR12, AR13]
conectado_con: [AR01, AR04, AR07, AR08, AR12, AR13, ID09, TW01]
archivos_front:
  - frontend/src/app/page.tsx
  - frontend/src/app/globals.css
  - frontend/src/lib/mock-vaults-data.ts
  - frontend/src/components/AsciiBlobOrb.tsx
  - frontend/src/components/AsciiSphereOrb.tsx
  - frontend/src/components/ASCIIWake.tsx
  - frontend/src/components/Particles.tsx
  - frontend/src/components/HeaderNav.tsx
  - frontend/src/components/BenchoDock.tsx
  - frontend/src/components/landing/HeroVaultStage.tsx
  - frontend/src/components/landing/StablecoinAsciiBoard.tsx
  - frontend/src/components/landing/AsciiWakeStepsBento.tsx
  - frontend/src/components/landing/InteractiveVaultSimulator.tsx
  - frontend/src/components/landing/PilarCostadoExplorer.tsx
  - frontend/src/components/landing/LemonVsTraditionalMatrix.tsx
---

# [AR14] Catálogo de Componentes Frontend Reutilizables (Clean UI, Blobatar ASCII Gigante y Monedas 3D Libres)

## 1. Resumen Ejecutivo para el Equipo

El directorio [`frontend/`](file:///c:/Users/pepep/hacktwin/frontend) de este repositorio (`https://github.com/Voyager-Ov/cerebro-propuesta`) contiene la implementación completa, limpia y modular del **Kit Frontend de CriteriaLock / HackaTwin** en **Next.js 16 + React 19 + Tailwind CSS v4 + GSAP**.

Todos los motores visuales y componentes UI fueron depurados bajo una dirección **Clean Sculptural UI** (cero contenedores anidados, cero ruido visual, contrastes verificados WCAG AA/AAA y colores principales extraídos del tablero de Pinterest `"twin"`). Cualquier integrante del equipo puede copiar los componentes directamente hacia **`JMReader/contractAR` (`escrow-argt`)** o **`JMReader/localito` (`moneda-local`)**.

---

## 2. Sistema de Color Principal Extraído de Pinterest (`"twin"`)

Definido en [`frontend/src/lib/mock-vaults-data.ts`](file:///c:/Users/pepep/hacktwin/frontend/src/lib/mock-vaults-data.ts) y [`frontend/src/app/globals.css`](file:///c:/Users/pepep/hacktwin/frontend/src/app/globals.css):

- **Color Principal por Defecto (`cobalt`)**: **Segmint Electric Cobalt (`#0047FF`)** con brillo `#3B82F6` e iluminación `#93C5FD` sobre negro puro `#000000`.
- **Color Secundario Onchain (`emerald`)**: **Signal Acid Green (`#1FE05A`)**.
- **5 Temas Reactivos (`data-pinterest-theme` en `<main>`)**:
  - `cobalt` (`#0047FF` — Pin #1 Segmint 2023)
  - `emerald` (`#1FE05A` — Pin #4 Signal Acid Green)
  - `cyan` (`#00D8EC` — Pin #12 Blobatar Phosphor Cyan)
  - `amber` (`#F59E0B` — Pin #14 Industrial Sol Gold)
  - `monochrome` (`#FFFFFF` — Pin #7 Bencho Raw Silver B&W)

---

## 3. Mapa de Componentes Listos para Copiar

### A. Esculturas Gráficas en Canvas 2D / 3D ASCII (Sin Contenedores)
1. **`AsciiBlobOrb.tsx`** (`frontend/src/components/AsciiBlobOrb.tsx`):
   - El **Blobatar ASCII** con las 10 siluetas oficiales de `blobatar` (`capsule`, `round`, `organic`, `boxy`, `cloud`, `sun`, `droplet`, `hexagon`, `triangle`, `nub`), ojos negativos huecos que siguen el cursor, física de resortes Euler y onda de choque radial al clic.
   - En [`HeroVaultStage.tsx`](file:///c:/Users/pepep/hacktwin/frontend/src/components/landing/HeroVaultStage.tsx) se renderiza en escala gigante (`560 × 560px`) flotando libre sobre `#000000` únicamente con el título principal.
2. **`StablecoinAsciiBoard.tsx` (`AsciiCoinMedallion`)** (`frontend/src/components/landing/StablecoinAsciiBoard.tsx`):
   - Galería abierta de **Monedas 3D en caracteres ASCII (`300 × 250px`)** sin tarjetas ni bordes alrededor.
   - Incluye medallones configurados para **`ARGt`**, **`USDT`**, **`USDC`**, **`BRAt`**, **`DAI`** y **`AVAX`**, con inclinación 3D al cursor y estela térmica.
3. **`ASCIIWake.tsx`** (`frontend/src/components/ASCIIWake.tsx`):
   - Cubo isométrico halftone 3D que transforma puntos en caracteres ASCII al paso del cursor.
4. **`Particles.tsx`** (`frontend/src/components/Particles.tsx`):
   - Enjambre físico de 720 partículas con transición entre `Circle`, `Square` y `Flower`.
5. **`AsciiSphereOrb.tsx`** (`frontend/src/components/AsciiSphereOrb.tsx`):
   - Esfera 3D raymarched en caracteres ASCII con anillo orbital.

### B. Secciones Interactivas y Primitivas de Interfaz
6. **`AsciiWakeStepsBento.tsx`** (`frontend/src/components/landing/AsciiWakeStepsBento.tsx`):
   - Secciones abiertas combinando tipografía gigante (`01.`, `02.`) con el cubo `AsciiWake` y el enjambre `Particles` libres de bordes.
7. **`InteractiveVaultSimulator.tsx`** (`frontend/src/components/landing/InteractiveVaultSimulator.tsx`):
   - Simulador limpio en 2 columnas: Candado ASCII reactivo + input de monto gigante (`$ 1,500,000 ARGt`) + checklist de condiciones de liberación.
8. **`PilarCostadoExplorer.tsx`** (`frontend/src/components/landing/PilarCostadoExplorer.tsx`):
   - Tabla dinámica **«Pilar»** (resize de columnas, pin sticky, densidad en ola) + inspector lateral **«Costado»** con huella ASCII determinista y sincronización URL (`?vault=TW-8841`).
9. **`HeaderNav.tsx` & `BenchoDock.tsx`** (`frontend/src/components/`):
   - Barra superior minimalista y dock inferior flotante con selector de paleta Pinterest, rampa ASCII global (`Classic`, `Blocks`, `Dots`, `Binary`) y modos del guardián.
10. **`IosTactileButton.tsx` & `BenchoSegmentedControl.tsx`** (`frontend/src/components/ui/`):
    - Botones táctiles con biselado especular (`variant="primary-accent"`) y segmented control animado con curva de resorte.

---

## 4. Relaciones en el Grafo

- Conecta con [[AR01-estetica-ascii-3d-dark]], [[AR04-blobatar-eyes-colored-ascii]], [[AR07-prototype4-bencho-minimalism]], [[AR08-nextjs-twin-frontend]], [[AR12-ascii-blob-orb-creative-coding]], [[AR13-threejs-crypto-ascii-board]], [[ID09-escrow-contratos-criterios-aceptacion]] y [[TW01-twin-finance-stablecoins]].
