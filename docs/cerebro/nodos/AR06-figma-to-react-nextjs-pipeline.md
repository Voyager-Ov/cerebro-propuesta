---
id: AR06
titulo: Análisis de Extensión de Figma, Exportación a React y Pipeline para Next.js
tipo: arquitectura-visual
tags: [figma, export, react, nextjs, code-connect, tailwind, ui-architecture, tokens]
depende_de: [AR02, AR05]
conectado_con: [ID09, ID10, TW02]
---

# Pipeline: De Figma a Componentes de Producción en React / Next.js

Este nodo desglosa el rol exacto de Figma, el plugin de integración, qué se puede y qué no se puede diseñar allí, qué significa la "exportación" y cómo se ensambla con nuestro motor Three.js ASCII en Next.js.

---

## 1. ¿Qué se PUEDE diseñar en Figma?
Figma es el entorno óptimo para diseñar el **"Shell" (la estructura de interfaz y diseño visual)** de tu producto:
- **Estructura y Layout Responsive**: Toda la disposición de la pantalla (Navbar, Badges de estado, Cards de contratos, Modals, Menús laterales, Footer).
- **Auto-Layout (Flexbox Nativo)**: Marcos con padding y gap exactos que se mapean 1:1 a Flexbox en CSS/Tailwind.
- **Design Tokens**: Colores semánticos (`#000000`, `#09090B`, `#27272A`, `#00F0FF`), tipografías (`Geist Mono`, tamaños, interlineados) y estados de componentes (Default, Hover, Active, Disabled).
- **El Slot del Orbe 3D**: Un marco (*Frame*) contenedor de 500x500px o pantalla completa denominado `[ 3D ASCII Viewport Slot ]`.

---

## 2. ¿Qué NO se puede hacer en Figma?
- **El Motor 3D WebGL en Tiempo Real**: Figma no ejecuta Three.js, shaders GLSL ni ruido Simplex a 60 FPS.
- **La Reactividad a la Voz**: Figma no procesa la Web Audio API con el micrófono del dispositivo.
- **Lógica de Smart Contracts / Web3**: No conecta billeteras ni firma transacciones.
> **Regla de Oro**: En Figma diseñas la interfaz y la estética estática. La interactividad 3D procedural vive en el componente React de Next.js.

---

## 3. ¿Qué es la "Exportación" de Figma y Cómo Funciona?

Olvídate de la exportación obsoleta de "descargar imágenes PNG/SVG":
1. **Figma Dev Mode / Code Connect**:
   - Lee el árbol de nodos de Figma (AST).
   - Genera código **JSX real con clases de Tailwind CSS**.
   - Un marco con Auto-Layout vertical, fondo `#000000`, padding de 24px y bordes grises se convierte automáticamente en:
     ```tsx
     <div className="flex flex-col gap-3 p-6 bg-black border border-zinc-800 text-zinc-100 font-mono">
       ...
     </div>
     ```
2. **Plugin de Figma para Antigravity**:
   - Permite inspeccionar el lienzo infinito de tu archivo de Figma directamente dentro de tu entorno de desarrollo, extraer los tokens de color y generar la estructura de componentes React sin copiar y pegar a mano.

---

## 4. Ensamblaje en Next.js (App Router)

En un proyecto de Next.js (`app/page.tsx`), la arquitectura se divide en dos capas limpias:

```tsx
// app/page.tsx (Client Component)
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Cargar el canvas 3D sin SSR (Three.js requiere el objeto window)
const AsciiBlobatar = dynamic(() => import('@/components/AsciiBlobatar'), { ssr: false });

export default function Home() {
  const [seed, setSeed] = useState('TwinFinance-01');
  const [mode, setMode] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden flex flex-col justify-between">
      
      {/* 1. UI EXPORTADA DE FIGMA: Header y Status Badges */}
      <header className="z-10 flex justify-between p-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>VOICE_STATE: {mode.toUpperCase()}</span>
        </div>
      </header>

      {/* 2. EL MOTOR 3D ASCII INTERACTIVO (Prototipo 3) */}
      <div className="absolute inset-0 z-0">
        <AsciiBlobatar seed={seed} mode={mode} />
      </div>

      {/* 3. UI EXPORTADA DE FIGMA: Input de Semilla y Controles */}
      <footer className="z-10 flex flex-col items-center gap-3 p-6 max-w-xl mx-auto w-full">
        <div className="flex items-center w-full bg-zinc-950/80 border border-zinc-800 backdrop-blur p-2 font-mono text-sm">
          <span className="text-zinc-500 px-2">BLOBATAR_SEED:</span>
          <input 
            value={seed} 
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1 bg-transparent outline-none text-cyan-400"
          />
        </div>
      </footer>

    </main>
  );
}
```

---

## 5. Enlaces y Relaciones
- [[AR02-figma-code-connect-workflow]]: Convención de diseño en Figma.
- [[AR05-prototype3-hover-jiggle-physics]]: El motor Three.js interactivo que se monta dentro del componente.
- [[ID09-escrow-acceptance-criteria-smart-contract]]: Integración del orbe con los Smart Contracts.
