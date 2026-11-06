---
id: AR01
titulo: Arquitectura Visual - Estética Neo-Brutalist ASCII 3D sobre Fondo Negro
tipo: arquitectura-visual
tags: [ascii, 3d, threejs, webgl, dark-mode, neo-brutalismo, monospace, shaders]
depende_de: []
conectado_con: [AR02, ID09, ID10, TW02]
---

# Arquitectura Visual: Neo-Brutalist ASCII 3D

## 1. El Concepto Estético
Frente a la saturación de interfaces fintech genéricas (fondos blancos, sombras difusas pastel y esquinas redondeadas exageradas), la estética **ASCII 3D Neo-Brutalist** genera un impacto visual inmediato y memorable para el jurado:
- **Elegancia Técnica Cruda**: Evoca terminales de servidores, interfaces de ciberseguridad y arte generativo de los años 80/90 refinado para 2026.
- **Rendimiento y Contraste**: Fondo negro profundo (`#000000`), bordes milimétricos (`#1F1F23`) y acentos de alto contraste (verde fósforo `#00FF66`, cian técnico `#00F0FF` o blanco tiza `#F4F4F5`).

## 2. Componentes de la Experiencia Visual
1. **Lienzo 3D ASCII Reactivo**:
   - Modelos tridimensionales (geometrías abstractas, cubos de datos, llaves de contrato o nodos de red) que giran en el centro de la pantalla.
   - En lugar de píxeles texturizados, la superficie se proyecta como una malla de caracteres ASCII (`. : - = + * # % @`) calculados en tiempo real según la incidencia de la luz.
   - Reacción al cursor del ratón (inclinación giroscópica / *parallax*).
2. **Tipografía Monospace Estricta**:
   - `Geist Mono` o `JetBrains Mono` con tabulación tabular para cifras y estados.
   - Glifos y separadores de caracteres mecánicos: `[OK]`, `[PENDING]`, `[ERR]`, `├──`, `└──`.
3. **Micro-Animaciones Táctiles**:
   - Efecto de tipeo instantáneo (*typewriter effect*) en títulos.
   - Efecto de escaneo CRT o ruido sutil dithered en el fondo.

## 3. Implementación Frontend
- **Librería Core**: Three.js + `AsciiEffect.js`.
- **Compatibilidad**: 100% web estándar en React/Next.js o Vanilla JavaScript, sin plugins pesados.
- **Consumo de Recursos**: Menos de 15 MB de RAM y 60 FPS estables.

## 4. Enlaces y Relaciones
- [[AR02-figma-code-connect-workflow]]: Mapeo de los componentes visuales en Figma.
- [[ID09-escrow-acceptance-criteria-smart-contract]]: Aplicación visual para el Smart Contract Escrow.
- [[ID10-vibe-brand-os-personal-presence]]: Aplicación visual para el Portafolio 3D VibeOS.
