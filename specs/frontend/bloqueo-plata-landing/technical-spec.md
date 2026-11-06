# Especificación Técnica Exhaustiva: Landing Page "CriteriaLock" (El Bloqueo de Plata)

---

## 1. Sistema de Tokens de Diseño & Arquitectura CSS (`globals.css`)

### 1.1. Variables Maestras: Estética Blanco y Negro ASCII + Adaptación Monocroma de «Pilar» y «Costado»
Todo el sistema visual vive bajo una paleta **Monocroma de Alto Contraste (`#000000` / `#09090b` / `#27272a` / `#FFFFFF`)**. Los componentes heredados del cerebro (`Pilar` y `Costado` de Moxen, `ASCIIWake` y `Particles` de Bencho, bloques de propiedades de `Notion` y botones de `iOS`) se unifican bajo estas variables en `frontend/src/app/globals.css`:

```css
:root {
  /* ── 1. Superficies Sólidas (Cero Glassmorphism Indiscriminado) ── */
  --bg-void: #000000;              /* Lienzo principal y fondo de todos los Canvas 2D/3D ASCII */
  --surface-carbon: #09090b;       /* Tarjetas primarias (Bóveda, Bento, Tabla Pilar, Panel Costado) */
  --surface-elevated: #0d0d10;     /* Cabeceras de tabla, bloques de criterios Notion y terminales */
  --surface-sticky: #101014;       /* Columnas fijadas con chincheta en Pilar (position: sticky) */
  --surface-hover: #141418;        /* Fila bajo el cursor y estado hover de controles secundarios */
  --surface-selected: #1c1c22;     /* Fila activa en Costado (aria-current="true") */
  --surface-dock: rgba(9, 9, 11, 0.85); /* Único elemento con backdrop-filter: blur(24px) */

  /* ── 2. Bordes Hairline de 1px & Líneas Arquitectónicas ── */
  --border-grid: #18181b;          /* Grilla estructural que cruza la landing de arriba a abajo */
  --border-hairline: #27272a;      /* Contorno de tarjetas, celdas, píldoras e inputs */
  --border-focus: #52525b;         /* Hover en botones secundarios y bordes de columnas */
  --border-pure: #ffffff;          /* Guía de redimensión en Pilar, foco activo y columna CriteriaLock */

  /* ── 3. Tinta Tipográfica y Rampa de Luminancia ASCII ── */
  --ink-pure: #ffffff;             /* Titulares, botones iOS primarios y glifos ASCII calientes (@ # %) */
  --ink-primary: #f4f4f5;          /* Montos de bóveda en ARGt/USDT y texto principal */
  --ink-secondary: #a1a1aa;        /* Subtítulos, propiedades Notion y glifos medios (* + =) */
  --ink-muted: #52525b;            /* Coordenadas de bloque, hashes pasivos y semitonos fríos (· .) */
  --ink-on-white: #000000;         /* Texto sobre pastillas blancas activas (#FFFFFF) */

  /* ── 4. Micro-Indicadores Semánticos Quirúrgicos (Dots de 6px y Badges de Oráculo) ── */
  --status-verified: #10b981;      /* Criterio verificado onchain / Paridad 1:1 activa */
  --status-pending: #f59e0b;       /* Esperando firma o ejecución de oráculo */
  --status-locked: #ffffff;        /* Plata inmovilizada en custodia inteligente */

  /* ── 5. Curvas Físicas de Resorte y Ola (Heredadas de Pilar, Costado y Bencho) ── */
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);     /* Rebote táctil para chinchetas, menús y pulgares */
  --ease-wave: cubic-bezier(0.34, 1.25, 0.64, 1);      /* Transición de densidad de filas en cascada */

  /* ── 6. Biseles Especulares Estilo Hardware / iOS ── */
  --bevel-ios-white: inset 0 1px 0 0 rgba(255, 255, 255, 0.95), 0 6px 24px -4px rgba(255, 255, 255, 0.22);
  --bevel-ios-dark: inset 0 1px 0 0 rgba(255, 255, 255, 0.09), 0 10px 20px -10px rgba(0, 0, 0, 0.85);

  /* ── 7. Parámetros Dinámicos de Tabla Pilar y Panel Costado ── */
  --pi-row-h: 46px;                /* Cambia entre 34px (compacta), 46px (normal) y 60px (cómoda) */
  --co-panel-w: 440px;             /* Ancho persistente del panel lateral Costado (340px..620px) */
}
```

### 1.2. Tipografía y Reglas Ópticas
- **Display & UI (`--font-geist-sans`)**:
  - Titulares con `letter-spacing: -0.04em`, `line-height: 1.04` y `text-wrap: balance`.
  - Etiquetas de sección tipo expediente (`co-ojo` / `pi-etq`): `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.14em`, `text-transform: uppercase`.
- **Finanzas, Hashes y Arte ASCII (`--font-geist-mono`)**:
  - Obligatorio `font-variant-numeric: tabular-nums` en todos los saldos (`50,000.00 ARGt`), anchos de columna en píxeles (`184 px`), contadores de bloques (`#49,201,455`) y porcentajes para impedir vibraciones horizontales durante animaciones numéricas.

---

## 2. Especificación Técnica Componente por Componente

---

### 2.1. `IosTactileButton.tsx` & `BenchoSegmentedControl.tsx` (Primitivos Táctiles)
* **Ubicación**: `frontend/src/components/ui/IosTactileButton.tsx` y `BenchoSegmentedControl.tsx`.
* **Mecánica Visual y Física**:
  1. **Variante `primary-white` (Botón Principal de Conversión / Bloqueo)**:
     - Estética: Pastilla o squircle (`rounded-xl` o `rounded-full`) en blanco puro `#FFFFFF` con texto `#000000` en `font-semibold`, `box-shadow: var(--bevel-ios-white)`.
     - Incluye un prefijo monoespaciado opcional (ej. `[●]` o `AsciiTextSpinner` cuando `isLoading={true}`) y un glifo direccional `──►` que en `:hover` se traslada `translateX(4px)` con `var(--ease-spring)`.
     - Física de clic con GSAP:
       - `onPointerDown`: `gsap.to(el, { scale: 0.96, duration: 0.08, ease: "power2.out" })`
       - `onPointerUp` / `onPointerLeave`: `gsap.to(el, { scale: 1, duration: 0.35, ease: "back.out(2.6)" })`
  2. **Variante `carbon-matte` (Controles de Herramientas, Presets y Acciones Secundarias)**:
     - Estética: Fondo `#0d0d10`, borde `1px solid #27272a`, `box-shadow: var(--bevel-ios-dark)`, texto `#f4f4f5`. En `:hover` cambia borde a `#52525b` y eleva `translateY(-1px)`.
  3. **`BenchoSegmentedControl` (Selector con Pulgar Blanco Deslizante)**:
     - Basado en `.pi-seg` de **Pilar** y `BenchoDock`: un contenedor con `display: grid; grid-template-columns: repeat(N, minmax(0, 1fr)); padding: 4px; background: #0d0d10; border: 1px solid #27272a`.
     - Un indicador absoluto (`.seg-thumb`) de ancho `calc((100% - 8px) / N)` en blanco puro `#FFFFFF` (o `#27272a` en variante sutil) se traslada mediante `transform: translateX(calc(var(--active-idx) * 100%))` con `transition: transform 0.5s var(--ease-spring)`.

---

### 2.2. `HeroVaultStage.tsx` (Sección 1: Escenario de Bloqueo + Guardián 3D ASCII)
* **Ubicación**: `frontend/src/components/landing/HeroVaultStage.tsx`.
* **Layout Arquitectónico**:
  - Grilla de 12 columnas con divisor vertical de `1px solid #18181b`.
  - **Izquierda (7 cols)**:
    - Badge superior con punto pulsante y `AsciiTextSpinner` variante `0` (`⠋`).
    - Titular con contraste tipográfico: `"Bloqueá la plata."` en blanco puro `#FFFFFF` + `"Fijá las reglas. Cobrá al segundo."` en gradiente tipográfico de blanco a `zinc-400`.
    - **Componente Interno `LemonQuickLockBar`**:
      - Tarjeta compacta en `#09090b` con borde `#27272a` y esquinas `rounded-2xl` inspirada en la pantalla de envío/custodia de Lemon Cash.
      - Input numérico de alto impacto (`tabular-nums`) + `BenchoSegmentedControl` para alternar instantáneamente entre `ARGt` (Peso Argentino Digital 1:1), `USDT` (Tether) y `USDC`.
      - Fila inferior de telemetría en vivo: `PARIDAD: 1 ARGt = 1.00 ARS · RED: AVALANCHE C-CHAIN (GAS < $0.005) · CUSTODIA: NO-CUSTODIAL ESCROW`.
      - Botón `IosTactileButton` (`variant="primary-white"`): **`[ Bloquear Plata en Bóveda ──► ]`** que transfiere el monto y moneda al simulador y ejecuta scroll suave.
  - **Derecha (5 cols — Visor del Guardián Criptográfico en Blanco y Negro)**:
    - Marco cuadrado `aspect-square` en `#000000` con crucetas de precisión ASCII en las 4 esquinas (`+`) y cabecera de telemetría.
    - Conmutador superior de 4 vistas interactivas para que el usuario explore todos nuestros motores visuales sin salir del Hero:
      1. **`Blobatar ASCII` (`AsciiBlobOrb.tsx`)**: En reposo zen muestra puntos blancos de semitono (`3.6px–5.6px`) con las **2 cavidades oculares negativas (*Hollow Eyes*)** siguiendo al cursor; al pasar el mouse despierta la estela térmica con glifos de la rampa activa y centelleo a 14 Hz.
      2. **`Esfera 3D` (`AsciiSphereOrb.tsx`)**: Retícula esférica de Fibonacci de 480 nodos con racimos de aros concéntricos tangentes y anillo orbital de Kepler.
      3. **`Cubo Bóveda` (`ASCIIWake.tsx`)**: Cubo isométrico iluminado en semitonos donde el cursor esculpe caracteres ASCII que se inclinan hacia la mano.
      4. **`1:1 SVG vs ASCII`**: Vista dividida sincronizando el Blobatar vectorial con el Blobatar ASCII.

---

### 2.3. `AsciiWakeStepsBento.tsx` (Sección 2: Bento Asimétrico de 3 Pasos con Canvas 2D)
* **Ubicación**: `frontend/src/components/landing/AsciiWakeStepsBento.tsx`.
* **Arquitectura de Grilla**:
  - `grid-cols-1 lg:grid-cols-12 gap-4` con tarjetas en `#09090b` y borde `#27272a`.
* **Especificación de los 3 Lienzos Interactivos en Blanco y Negro**:
  1. **Card 01 (`lg:col-span-5` — "01 // DEPOSITÁ Y CONGELÁ EN BÓVEDA")**:
     - Integra `AsciiWake` renderizando el cubo isométrico de custodia en blanco sobre negro (`--ink: #ffffff`).
     - Debajo del canvas incluye una tira de metadatos estilo ticket: `[ DEPÓSITO: BLOQUEADO ] ──► [ RETIRO UNILATERAL: DESHABILITADO ]`.
  2. **Card 02 (`lg:col-span-7` — "02 // REGLAS EN CÓDIGO Y ORÁCULOS, CERO DISCUSIONES")**:
     - Contiene un **Simulador de Circuito Lógico ASCII Interactivo**:
       ```text
       [ HITO 1: PR #142 MERGED ] ───( ● VERIFICADO )───┐
                                                        ├──► [ QUÓRUM 3/3 ] ──► [ DESTRABAR BÓVEDA ]
       [ HITO 2: TESTS 94% PASS ] ───( ● VERIFICADO )───┤
       [ HITO 3: FIRMA CLIENTE  ] ───( ○ PENDIENTE  )───┘
       ```
     - El usuario puede hacer clic en cualquier nodo del diagrama ASCII para conmutar su estado en vivo y ver cómo los caracteres del cableado cambian de línea punteada `. . .` a trazo doble `════►` blanco brillante.
  3. **Card 03 (`lg:col-span-12` — "03 // LIQUIDACIÓN ATÓMICA EN 0.8 SEGUNDOS")**:
     - Layout horizontal dividido: a la izquierda la explicación y métricas de liquidación sobre Avalanche; a la derecha el lienzo de **`Particles.tsx`** en blanco puro donde hacer clic dispara una onda de choque elástica que transforma la nube de puntos entre `Circle` (Orden Creada), `Square` (Fondos en Custodia) y `Flower` (Pago Liquidado).

---

### 2.4. `InteractiveVaultSimulator.tsx` (Sección 3: Simulador de Bloqueo + Bloques Notion + Terminal Oráculo)
* **Ubicación**: `frontend/src/components/landing/InteractiveVaultSimulator.tsx`.
* **Diseño Dual (12 Columnas)**:
  - **Panel Izquierdo (5 cols — Ticket de Custodia Estilo Lemon Cash en Blanco y Negro)**:
    - Cabecera con sello `[ COMPROBANTE DE BLOQUEO ONCHAIN // #TW-8841 ]`.
    - Visualizador de **Candado 3D en Matriz ASCII**: una cuadrícula monoespaciada de `28x14` caracteres que dibuja un candado cerrado cuando los criterios están pendientes y anima la apertura del arco superior con partículas `@ # * ·` cuando se verifican todos los hitos.
    - Desglose financiero con precisión `tabular-nums`:
      - **Plata Bloqueada**: Input editable o sincronizado con el Hero (`$ 500,000.00 ARGt` / `1,500.00 USDT`).
      - **Comisión Bancaria / Intermediarios**: `$ 0.00 (0%)`.
      - **Costo de Gas en Avalanche**: `~0.004 USDT`.
      - **Garantía de Custodia**: `100% Colateralizado 1:1`.
  - **Panel Derecho (7 cols — Constructor de Criterios de Aceptación Estilo Notion + Consola de Oráculo)**:
    - **Cabecera tipo Base de Datos de Notion**: Título `"Criterios de Aceptación del Contrato"`, contador `[ 2 / 3 VERIFICADOS ]` y barra de presets rápidos para añadir nuevas reglas con un clic:
      - `[ + Merge PR GitHub ]` · `[ + Entrega Figma ]` · `[ + Guía Correo / QR ]` · `[ + Auditoría Slither ]`.
    - **Filas de Bloques Notion (`NotionCriteriaRow`)**:
      - Cada criterio muestra:
        1. Checkbox / Estado interactivo (`[✓]` en verde esmeralda `#10b981` o `[○]` en ámbar `#f59e0b`).
        2. Título del entregable editable o seleccionable.
        3. **Píldoras de Propiedades de Notion** en `#141418` con borde `#27272a`:
           - Propiedad `Oráculo`: `[ ⚙ GitHub CI ]`, `[ ✍ Firma 2/2 ]`, `[ 🤖 AI Judge ]`, `[ 📦 Webhook Logístico ]`.
           - Propiedad `Hash`: `[ 0x8f4a...c91e ]`.
           - Propiedad `Bloque`: `[ #49,201,182 ]`.
    - **Consola del Oráculo en Vivo (`OracleTerminalDrawer`)**:
      - Al pulsar **`[ Ejecutar Oráculo y Destrabar Plata ──► ]`**, se despliega una terminal en `#000000` que transmite en vivo los pasos de verificación cada `280ms` con `AsciiTextSpinner` y habilita el botón **`[ Crear y Agregar esta Bóveda al Explorador En Vivo ]`** (que inserta el contrato directamente en la tabla **Pilar** de la Sección 4).

---

### 2.5. `PilarCostadoExplorer.tsx` (Sección 4: Fusión Nativa de Tabla «Pilar» `UI-01` + Panel «Costado» `UI-02`)
* **Ubicación**: `frontend/src/components/landing/PilarCostadoExplorer.tsx`.
* **Por qué es una joya de ingeniería**: Combina en un solo organismo los dos recursos más avanzados del cerebro `OCHO` (`pilar-table` y `costado-panel`), adaptados íntegramente a React 19 + TypeScript y a nuestra estética **Blanco y Negro ASCII**.
* **1. Mecánica Técnica de la Tabla «Pilar» (`UI-01`)**:
  - **Columnas Configuradas**:
    1. `id` (`ID Bóveda`, ancho `110px`, tipo `mono`, ej. `TW-8841`).
    2. `concepto` (`Acuerdo / Entregable`, ancho `260px`, tipo `texto`).
    3. `monto` (`Plata Bloqueada`, ancho `150px`, tipo `num`, `tabular-nums`, ej. `$ 2,450,000`).
    4. `moneda` (`Stablecoin`, ancho `110px`, tipo `mono`, badge `ARGt` / `USDT` / `USDC` / `BRAt`).
    5. `progreso` (`Criterios`, ancho `140px`, barra ASCII `[■■■□] 3/4`).
    6. `oraculo` (`Motor Oráculo`, ancho `150px`, tipo `texto`).
    7. `estado` (`Estado Custodia`, ancho `150px`, chip `CUSTODIA ACTIVA` / `LIBERADO`).
  - **Interacciones de «Pilar» Implementadas**:
    - **Redimensión con Guía Vertical (`Column Resizing`)**: Arrastrar el asa derecha (`.pi-borde`) de cualquier columna despliega una línea vertical blanca de `2px` (`.pi-guia`) que cruza toda la tabla con una pastilla que muestra el ancho exacto en píxeles (`184 px`) y detecta topes (`min: 80px`, `max: 420px`). Doble clic autoajusta el ancho al texto más largo con resorte.
    - **Reordenamiento con Física FLIP (`Column Reordering`)**: Botones de reordenamiento y arrastre de cabeceras que intercambian columnas suavemente, más atajo de teclado `Alt + ← / →`.
    - **Fijado con Chincheta (`Sticky Column Pinning`)**: Cada cabecera tiene el botón `.pi-pin` (chincheta SVG con animación `@keyframes pi-clava`). Al fijar una columna, recibe `position: sticky; left: var(--sticky-left); z-index: 10; background: #101014` con sombra lateral y la tabla ejecuta un micro-impulso elástico horizontal.
    - **Selector de Densidad en Ola (`Cascading Density`)**: Segmented control de 3 alturas (`Compacta: 36px`, `Normal: 48px`, `Cómoda: 62px`) con pulgar deslizante. Cada fila tiene `style={{ "--i": rowIndex }}` y transiciona su altura con `transition: height 0.55s var(--ease-wave) calc(var(--i) * 28ms)`.
    - **Menú de Visibilidad de Columnas y Botón `Restablecer`**: Dropdown con checkboxes animados (`stroke-dashoffset`) que impide ocultar la última columna visible (con shake `@keyframes pi-no`), y botón `Restablecer` con punto indicador y estado `✓ Restablecido`.
* **2. Mecánica Técnica del Panel Lateral «Costado» (`UI-02`)**:
  - **Layout Maestro-Detalle con `@container`**:
    - El contenedor general flex contiene a la izquierda la tabla **Pilar** (`flex: 1 1 0; min-width: 0; container: lista / inline-size`) y a la derecha el cajón **Costado** (`width: isOpen ? panelWidth : 0; transition: width 0.48s var(--ease-out-expo)`).
    - **Separador Redimensionable (`role="separator"`)**: Asa vertical en el borde izquierdo del panel que permite arrastrar con el puntero o usar `← / →` (`Shift` para saltos de `48px`) entre `340px` y `600px`, guardando el valor en `localStorage`.
  - **Contenido del Inspector «Costado»**:
    - Cabecera con ID de la bóveda (`#TW-8841`), botones de navegación anterior/siguiente (`↑` / `↓`) y cierre (`✕` / `Esc`).
    - **Mini-Orbe / Sello ASCII Determinista**: Un canvas compacto que genera la huella ASCII única de ese contrato a partir de su `asciiSeed`.
    - **Grilla de Metadatos 2x2**: Depositante (`0x4a...88b2`), Beneficiario (`0x9f...31a0`), Red (`Avalanche C-Chain`), Hash de Custodia (`0x794a...3e82`).
    - **Desglose de Criterios y Línea de Tiempo Onchain**: Lista numerada de los criterios de aceptación de esa bóveda y registro cronológico de bloques.
    - **Pie de Panel con Botón `Copiar Link de Custodia`**: Anima la transición vertical entre `"Copiar enlace de bóveda"` y `"✓ Enlace copiado al portapapeles"` con onda concéntrica (`@keyframes co-onda`) y sincroniza la URL con `?vault=TW-8841` mediante `History API`.

---

### 2.6. `StablecoinAsciiBoard.tsx` (Sección 5A: Tablero de Monedas y Stablecoins 3D en Caracteres ASCII)
* **Ubicación**: `frontend/src/components/landing/StablecoinAsciiBoard.tsx`.
* **Basado en**: Nodo `AR13-threejs-crypto-ascii-board.md` y `TW01-twin-finance-stablecoins.md`.
* **Algoritmo de Renderizado por Medallón (60 FPS, Sin Límite de Contextos WebGL)**:
  - Para garantizar rendimiento instantáneo junto con los demás lienzos de la página, cada tarjeta de moneda (`ARGt`, `USDT`, `USDC`, `BRAt`, `DAI`, `AVAX`) utiliza un **Motor de Raymarching / Proyección 3D de Disco Biselado en Canvas 2D ASCII**:
    1. Modela un cilindro 3D de radio $R$ y espesor $h$ con canto estriado y el símbolo del token (`A$`, `₮`, `$`, `R$`, `◈`, `▲`) extruido en relieve sobre ambas caras.
    2. Calcula en cada celda `(cx, cy)` la normal 3D rotada según la inclinación del mouse `(tiltX, tiltY)` con amortiguación Spring-Damper ($k=0.15, d=0.82$).
    3. Evalúa la iluminación especular Phong + el campo de calor `stampThermal` bajo el cursor y selecciona el carácter correspondiente de la rampa ASCII activa (` .:-=+*#%@`) pintándolo en blanco y escala de grises (`#ffffff`, `#d4d4d8`, `#71717a`, `#27272a`).
  - **Filtros de Categoría**: `Todas (6)` · `Stablecoins Locales Twin (ARGt / BRAt)` · `Dólares Digitales (USDT / USDC / DAI)` · `Infraestructura (AVAX)`.

---

### 2.7. `LemonVsTraditionalMatrix.tsx` & `BenchoFloatingDock.tsx` (Sección 5B y Control Global)
* **`LemonVsTraditionalMatrix.tsx`**:
  - Tabla comparativa arquitectónica de 4 columnas (`Criterio Financiero`, `Transferencia / De Palabra`, `Plataformas Web2 (Upwork/Fiverr)`, y **`CriteriaLock (ARGt / USDT)`**).
  - La columna de CriteriaLock tiene borde blanco `#ffffff` de `1.5px`, cabecera invertida en blanco puro con texto negro y micro-badges de verificación instantánea.
* **`BenchoFloatingDock.tsx`**:
  - Barra flotante inferior (`fixed bottom-5 left-1/2 -translate-x-1/2 z-50`) con `backdrop-filter: blur(24px)`:
    - **Saltos de Sección**: `01 Hero` · `02 Cómo Funciona` · `03 Simulador` · `04 Explorador Pilar` · `05 Stablecoins`.
    - **Selector de Rampa de Glifos en Vivo**: `Classic` · `Blocks` · `Dots` · `Binary` (actualiza instantáneamente todos los componentes ASCII de la landing).
    - **Selector de Modo del Orbe**: `Idle` · `Voice` · `Think` · `Speak`.

---

## 3. Coreografía GSAP y Presupuesto de Rendimiento

1. **Orquestación de Entrada (`gsap.timeline`)**:
   - Revelado secuencial del Header, columna izquierda del Hero, visor del Guardián ASCII y Dock inferior usando exclusivamente `autoAlpha`, `y` y `scale` con `ease: "power3.out"` y `stagger: 0.06`.
2. **Scroll-Triggered Section Reveals**:
   - Cada sección entra suavemente al cruzar el viewport (`IntersectionObserver` + `gsap.fromTo` con `y: 20 ➔ 0`, `autoAlpha: 0 ➔ 1`, `duration: 0.6`).
3. **Hibernación Inteligente de Lienzos (`Canvas Viewport Gating`)**:
   - Todo componente con bucle `requestAnimationFrame` (`AsciiBlobOrb`, `AsciiSphereOrb`, `ASCIIWake`, `Particles`, `StablecoinAsciiBoard`) observa su visibilidad con `IntersectionObserver({ threshold: 0.05 })`. Cuando una sección no está en pantalla, su bucle se estaciona en `0% CPU` y reanuda sin saltos de `dt` al volver a entrar.
4. **Soporte Obligatorio `prefers-reduced-motion: reduce`**:
   - Detectado mediante `gsap.matchMedia()` y `window.matchMedia`: desactiva rotaciones autónomas, ondas de densidad y transiciones largas, renderizando el estado final estático de alta nitidez.
