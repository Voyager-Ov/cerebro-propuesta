# HackaTwin 2026: Segundo Cerebro & Propuesta Técnica

Repositorio oficial con la investigación, arquitectura de conocimiento (**Segundo Cerebro**) y prototipos interactivos del asistente de inteligencia artificial y protocolo de custodia inteligente (**CriteriaLock Smart Escrow**) para la hackathon de **Twin Finance** (en alianza con **Avalanche**, **Belo** y **Tether**).

---

## 🧠 Cerebro Compartido de la Hackathon

> [!IMPORTANT]
> **Única fuente de verdad y memoria compartida del equipo:**
> - **Repositorio**: [`https://github.com/JMReader/hackatwin-brain`](https://github.com/JMReader/hackatwin-brain)
> - **Ruta local**: `C:\Users\pepep\SharedBrain-hackatwin`
> - **Participante**: `oky`
> - **Compañeros / Roles**: `mdf-angel` (Engel), `korita`, `nanoo17`, `oky`.
> 
> *Nota: La carpeta histórica local `docs/cerebro/` ha sido desactivada en favor del cerebro compartido.*

---

## 🧭 Estructura del Proyecto

```text
hacktwin/
├── docs/cerebro/            # Segundo Cerebro: 38 nodos de conocimiento en Markdown
│   ├── nodos/               # Nodos clasificados (Arquitectura, Ideas, Tendencias, Hackathons)
│   ├── indices/             # Índices por tipo y categoría
│   └── red-conocimiento.md  # Grafo interactivo en Mermaid (190 aristas)
├── demo/                    # Prototipos interactivos independientes (HTML5 / Three.js)
│   ├── index.html           # Prototipo 1: Primer orbe 3D ASCII reactivo por voz
│   ├── prototype2.html      # Prototipo 2: Cuencas oculares Blobatar y color directo
│   ├── prototype3.html      # Prototipo 3: Física de resorte (Hover Squish) y Click Blink
│   └── prototype4.html      # Prototipo 4: Estilo minimalista Bencho.dev (Dock de vidrio)
├── frontend/                # Aplicación de producción en Next.js 16 + React 19 + Tailwind v4
│   ├── src/
│   │   ├── app/             # App Router, layout y orquestador principal
│   │   └── components/      # Componentes UI, orbes procedurales y Smart Escrow
│   ├── package.json
│   └── tsconfig.json
└── scripts/                 # Generadores de grafos y herramientas de análisis
    └── generate_graph.py    # Parser de wikilinks y generador de grafos Mermaid
```

---

## 🧠 1. El Segundo Cerebro (`docs/cerebro/`)

El **Segundo Cerebro** es un grafo de conocimiento estructurado en Markdown con frontmatter YAML y enlaces bidireccionales (`[[ID]]`). Cuenta con **38 nodos indexados** y **190 conexiones**:

* **Arquitectura Visual (`AR01` - `AR12`)**:
  * `AR03`: Motor 3D ASCII reactivo por voz (ChatGPT Voice + Bencho + Blobatar).
  * `AR04`: Ojos Hollow de Blobatar y renderizado ASCII coloreado.
  * `AR05`: Física Spring-Damper (Hooke's Law) con deformación elástica.
  * `AR07`: Filosofía de diseño minimalista de Bencho.dev.
  * `AR08`: Arquitectura del Frontend en Next.js 16 y la esfera celestial de Fibonacci.
  * `AR12`: Fusión de Creative Coding para el nuevo **Orbe Blobtar Biomorphic ASCII** (`AsciiBlobOrb`).
* **Protocolos e Ideas de Producto (`ID01` - `ID10`)**:
  * `ID09`: **CriteriaLock Protocol** — Smart contract de custodia condicionada que bloquea fondos en stablecoins (`ARGt` / `USDT`) y solo libera el pago tras la validación de criterios por oráculos onchain en Avalanche C-Chain.
  * `ID06`: **TwinAgent** — Agente autónomo de arbitraje y clearing B2B inter-LATAM.
  * `ID07`: **BeloFlow** — Conciliador de cobros con QR interoperable.
* **Tendencias Fintech & Hackathons (`FN01` - `FN02`, `HK01` - `HK04`)**:
  * Análisis de tendencias globales en *Agentic Finance*, stablecoins en Latinoamérica y patrones ganadores en hackathons de Cal Hacks y Harvard.

Para regenerar o visualizar la red de conocimiento:
```bash
python scripts/generate_graph.py
```

---

## 🪐 2. Prototipos Interactivos del Orbe Asistente

### Prototipos Rápidos (`demo/`)
Pueden ejecutarse con cualquier servidor HTTP local:
```bash
# Desde la raíz del proyecto
python -m http.server 8080
```
* **Prototipo 1**: `http://localhost:8080/demo/index.html` (Orbe procedural Three.js).
* **Prototipo 2**: `http://localhost:8080/demo/prototype2.html` (Ojos Blobatar cyan/cobalto).
* **Prototipo 3**: `http://localhost:8080/demo/prototype3.html` (Física de rebote y click reaction).
* **Prototipo 4**: `http://localhost:8080/demo/prototype4.html` (Dock de vidrio estilo Bencho.dev).

---

## ⚡ 3. Frontend de Producción (`frontend/`)

Desarrollado con las tecnologías más modernas:
* **Next.js 16.4.5** (Turbopack, App Router).
* **React 19.3.0**.
* **Tailwind CSS v4** (puro en componentes, con tokens de diseño locales).
* **Three.js** + **Canvas 2D HiDPI** de alto refresco.
* **GSAP 3.15** (animaciones táctiles y micro-interacciones).

### Componentes Destacados:

1. **`AsciiBlobOrb.tsx` (Orbe Blobtar Biomorphic)**:
   * **Status Quo Tranquilo**: En reposo se mantiene en una calma zen sin auto-giro, con distribución de Fermat y halo suave.
   * **Reactividad por Acciones Externas**:
     * Al pasar el mouse, genera una **estela térmica continua** (`stampThermal`) que muta los puntos a caracteres ASCII con **shimmer de terminal a 14 Hz**.
     * **Atracción magnética** (`pull/lean`) y repulsión física de resortes elásticos (*Hooke's Law*).
     * **Deformación elíptica por velocidad** que conserva la densidad lumínica.
     * Al hacer clic, detona una **onda de choque radial (Shockwave)** que agita el fluido antes de retornar elásticamente.
2. **`AsciiSphereOrb.tsx` (Esfera 3D de Aros Concéntricos)**:
   * Inspirada en el pin de Pinterest [636063147423013793](https://ar.pinterest.com/pin/636063147423013793/) (*"The Solar System: Animated sphere, Circular motion graphics"*).
   * Retícula de Fibonacci en 3D con cúmulos de aros huecos concéntricos (`tangent rings`), nodos sólidos hiper-luminosos con corona y anillo orbital inclinado.
3. **`CriteriaLockCard.tsx` (Smart Escrow en Avalanche C-Chain)**:
   * Tarjeta con diseño sobrio y minimalista en negro mate (`#09090b` y borde `#27272a`).
   * Custodia de **50,000 ARGt**, oráculo automatizado simulado y checklist con badges verificados.
4. **`BenchoDock.tsx` (Dock Flotante en Píldora)**:
   * Vidrio escarchado (`backdrop-blur-2xl`), controles segmentados de estado (`Idle`, `Voice`, `Think`, `Speak`), selector de paletas cromáticas y alternador instantáneo entre `Blobtar` y `Sphere`.

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
* Node.js 18+ o 20+
* npm, pnpm o yarn
* Python 3 (opcional, para scripts del grafo)

### Instalación y Ejecución del Frontend
```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador:
* **Modo Split (Agente + Escrow)**: [http://localhost:3000](http://localhost:3000)
* **Modo Hero (Orbe en Pantalla Completa)**: [http://localhost:3000/?view=hero](http://localhost:3000/?view=hero)

---

## 👥 Equipo y Hackathon
* **Hackathon**: HackaTwin (7 de Noviembre, 2026).
* **Organizador**: Twin Finance.
* **Sponsors Clave**: Avalanche, Belo, Tether.
