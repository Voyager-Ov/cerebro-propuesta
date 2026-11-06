# Especificación de Diseño y Sistema Visual: Neo-Brutalist ASCII 3D

Este documento define la arquitectura para modelar pantallas en **Figma**, el estándar para estructurar el archivo `design.md`, la herramienta de mapeo bidireccional Figma-Código y las directrices técnicas para la estética **ASCII 3D sobre fondo negro**.

---

## 1. Guía de Modelado en Figma para `design.md`

Para que un diseño en Figma sea directamente traducible a código y documentable en Markdown, el archivo de Figma debe seguir una jerarquía estricta en su lienzo infinito:

### A. Estructura de Páginas en Figma
```
📁 Proyecto Hackathon (Figma File)
 ├── 🎨 00_Tokens & Foundations (Colores, Tipografía, Grillas, Iconografía)
 ├── 🧩 01_Components & Atoms (Botones, Inputs, Cards, Badges, 3D Canvas Box)
 ├── 📱 02_Screens & User Flows (Lienzo infinito con el recorrido completo)
 └── 🧪 03_Playground & ASCII Prototypes
```

### B. Convención de Nomenclatura de Frames y Pantallas
En la página `02_Screens & User Flows`, organiza los frames horizontalmente por flujo y verticalmente por estado, usando nombres normalizados:
* `[Plataforma] / [Flujo] / [Pantalla] / [Estado]`
* Ejemplos:
  * `Web / Escrow / 01-CreateContract / Default`
  * `Web / Escrow / 01-CreateContract / WithCriteria`
  * `Web / VibeOS / 02-Dashboard / Connected`
  * `Mobile / Portfolio / 03-PublicVibe / 3D-Interactive`

### C. Uso Estricto de Auto-Layout y Tokens Semánticos
1. **Zero Absolute Positioning**: Todo componente debe usar Auto-Layout (Flexbox) con padding y gap consistentes (múltiplos de 4px: 8px, 16px, 24px, 32px).
2. **Tokens de Color Semánticos** (en Figma Variables):
   * `bg-void`: `#050505` (Fondo principal)
   * `bg-surface`: `#0D0D0E` (Tarjetas y contenedores)
   * `border-subtle`: `#1F1F23` (Bordes monolineales)
   * `text-primary`: `#F4F4F5` (Texto principal de alto contraste)
   * `text-muted`: `#71717A` (Etiquetas y subtextos)
   * `accent-ascii`: `#00FF66` (Verde fósforo terminal) o `#00F0FF` (Cian cibernético)

---

## 2. Herramientas para Mapear Diseños de Figma a Código

Para visualizar el lienzo infinito de Figma, inspeccionar propiedades y mantener sincronizado el código sin duplicar trabajo manual, la herramienta recomendada es:

### A. Plugin Oficial de Figma para Antigravity
Permite leer archivos de Figma, inspeccionar árboles de nodos y convertir frames directamente en componentes de código dentro del workspace:
<plugin-card catalog-id="antigravity-plugins-partners/plugin/figma"></plugin-card>

### B. Figma Code Connect
**Figma Code Connect** vincula los componentes de Figma directamente con tus archivos de código (React, Tailwind):
* Al hacer clic en un botón o card en Figma Dev Mode, el desarrollador ve el snippet exacto con las props de React ya tipadas (`<Button variant="ascii-ghost" size="md">`).
* Permite incrustar enlaces profundos del lienzo de Figma directamente en tu archivo `design.md`:
  `[Ver pantalla en Figma](https://www.figma.com/file/KEY?node-id=123:456)`

---

## 3. Dirección de Arte: Estética ASCII 3D Dark & Voice Blobatar

Inspirada en el minimalismo retro-futurista, el brutalismo tipográfico, los experimentos de **Bencho.dev (`ascii-wake`, `particles`)**, la morfología determinista de **Blobatar (`blobatar.dev`)** y la interfaz conversacional de orbe biomorfo de **ChatGPT Voice Mode**:

```
+-------------------------------------------------------------+
|  [ VIBE_OS // VOICE_BLOBATAR ]            [ 0x8F...3B / ON ]|
|                                                             |
|                . : - = + * # % @ # * + = - : .              |
|            . : = + * # % @ @ @ @ @ % # * + = : .            |
|          : = + * # % @ @ @ @ @ @ @ @ @ % # * + = :          |
|        - = * # % @ @ @ @ @ @ @ @ @ @ @ @ @ % # * = -        |
|       + * # % @ @ @ [ AURA: COBALT BLUE ] @ @ % # * +       |
|        - = * # % @ @ @ @ @ @ @ @ @ @ @ @ @ % # * = -        |
|          : = + * # % @ @ @ @ @ @ @ @ @ % # * + = :          |
|            . : = + * # % @ @ @ @ @ % # * + = : .            |
|                . : - = + * # % @ # * + = - : .              |
|                                                             |
|  [BLOBATAR_SEED]: "TwinFinance-0x8F" ──► MUTACIÓN PROCEDURAL |
|  [VOICE_ANALYSIS]: FFT_BASS: 82% ──► VÉRTICES DILATADOS     |
|  [STATUS]: LISTENING (MIC ACTIVE) // COLOR: COBALT_BLUE     |
+-------------------------------------------------------------+
```

### Principios Visuales:
1. **Fondo Negro Puro (`#000000`)**: Sin gradientes invasivos en la superficie, solo oscuridad absoluta.
2. **Orbe 3D ASCII en Primer Plano**: Malla 3D deformada por ruido Simplex y renderizada en caracteres monoespaciados (` .:-=+*#%@`).
3. **Aura Difusa Trasera (Back-Glow)**: Resplandor radial dinámico posicionado detrás de la burbuja ASCII (Cobalt Blue `#0055FF`, Cyber Cyan `#00F0FF`, Purple `#B000FF` o Solar Amber `#FF7800`) que pulsa al ritmo de la voz y cambia de tonalidad según el estado de la IA (Idle, Listening, Thinking, Speaking).
4. **Morfología Determinista por Semilla (Estilo Blobatar)**: Cualquier texto (ej. el nombre de usuario, el ID de un Smart Contract o un prompt) actúa como semilla matemática (`seed`) para fijar la forma biomorfa del orbe.

---

## 4. Implementación Técnica del 3D ASCII en Código

El código completo y ejecutable está disponible en [`demo/index.html`](../demo/index.html). El motor combina:
* **Three.js** con `IcosahedronGeometry` de alta densidad (subdivisión 5).
* **Deformador Simplex Noise 3D**: Desplaza radialmente cada vértice en tiempo real:
  $$P' = P + \hat{N} \cdot (\text{snoise}(P \cdot f + t \cdot s) \cdot A + V_{\text{voice}})$$
* **Web Audio API**: Conexión directa al micrófono (`AnalyserNode`) para extraer las frecuencias de la voz humana y expandir las ondas de la burbuja.
* **Canvas Offscreen Luminance Shading**: Mapea los valores RGB de luminosidad calculados por Three.js directamente a caracteres ASCII legibles y ultra-livianos.
