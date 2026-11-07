# Plan de Ejecución de Tareas (`todos.md`): Landing Page "CriteriaLock" (El Bloqueo de Plata)

Plan de implementación estructurado en **4 Grupos de Ejecución (Sprints Tácticos)** diseñados para maximizar la calidad artesanal en nuestra ventana de contexto, permitiendo construir, compilar y verificar cada bloque al 100% sin recortar ninguna micro-interacción ni física.

---

## 🧭 Estrategia Recomendada por Grupos (Roadmap en 4 Bloques)

| Grupo | Tareas Incluidas | Foco Técnico y Estético | Por qué agruparlo así |
| :--- | :--- | :--- | :--- |
| **GRUPO 1** ✅<br/>*Cimientos, Sistema Táctil iOS/Bencho y Hero Principal* | `[x] [F-01]` `[x] [F-02]`<br/>`[x] [F-03]` `[x] [F-04]` | `globals.css`, dataset `mock-vaults-data.ts`, `IosTactileButton`, `BenchoSegmentedControl`, `HeaderNav` y `HeroVaultStage` (Quick Lock Bar estilo Lemon + Guardián 3D ASCII con 4 modos). | Deja lista toda la base de diseño Blanco y Negro ASCII, los primitivos reutilizables y la primera pantalla completa (*Above the Fold*) funcionando. |
| **GRUPO 2** ✅<br/>*Bento `ASCIIWake` (3 Pasos) + Simulador de Bóveda y Reglas Notion* | `[x] [F-05]` `[x] [F-06]` | `AsciiWakeStepsBento` (cubo halftone, circuito lógico ASCII interactivo y onda de partículas) + `InteractiveVaultSimulator` (ticket de custodia Lemon + bloques con propiedades de Notion + consola de oráculo en vivo). | Agrupa el corazón interactivo del producto donde el usuario configura el bloqueo de plata, edita criterios estilo Notion y destraba el candado ASCII. |
| **GRUPO 3** ✅<br/>*Ingeniería del Cerebro `OCHO`: Tabla «Pilar» + Panel «Costado»* | `[x] [F-07]` | `PilarCostadoExplorer` (redimensión con guía en `px`, reordenamiento FLIP, chincheta `pin` sticky, densidad en ola + panel lateral `Costado` con `@container`, separador persistente y teclas `j`/`k`). | Al ser el organismo más denso en eventos de puntero, teclado y física CSS/JS, dedicarle un turno exclusivo garantiza fidelidad total a `UI-01` y `UI-02` sin simplificaciones. |
| **GRUPO 4** ✅<br/>*Monedas 3D ASCII (`AR13`), Comparativa, Dock Global y Ensamblaje GSAP* | `[x] [F-08]` `[x] [F-09]`<br/>`[x] [F-10]` `[x] [F-11]` | `StablecoinAsciiBoard` (medallones 3D ASCII de `ARGt`, `USDT`, `USDC`, `BRAt`, `DAI`, `AVAX`), `LemonVsTraditionalMatrix`, `BenchoDock` con selector global de rampa ASCII y ensamblaje final en `page.tsx`. | Conecta todas las secciones en `page.tsx`, aplica la coreografía GSAP (`gsap.matchMedia`) y realiza la verificación visual en vivo con capturas. |

---

## Capa 1: Tokens de Diseño, Dataset Onchain y Primitivos Táctiles (iOS + Bencho + Shadcn)

### `[F-01]` Tokens CSS Monocromo ASCII, Animaciones de Resorte y Utilidades de Tabla/Panel
- **Archivos destino**:
  - `frontend/src/app/globals.css`
  - `frontend/src/app/layout.tsx`
- **`Depends on`**: Ninguna
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. Definir en `:root` las variables de color en blanco y negro estricto (`--bg-void: #000000`, `--surface-carbon: #09090b`, `--surface-elevated: #0d0d10`, `--surface-sticky: #101014`, `--border-hairline: #27272a`, `--ink-pure: #ffffff`), los biseles especulares estilo hardware/iOS (`--bevel-ios-white`, `--bevel-ios-dark`) y las curvas de resorte de **Pilar** y **Costado** (`--ease-spring`, `--ease-wave`, `--ease-out-expo`).
  2. Incorporar las reglas CSS de soporte para la tabla **Pilar** (`.pi-guia` de redimensión, `@keyframes pi-clava` para la chincheta, `@keyframes pi-no` para resguardo de última columna, transición de densidad en ola con `calc(var(--i) * 28ms)`) y para el panel **Costado** (`@container` queries, `@keyframes co-onda` del botón copiar, separador redimensionable).
  3. Configurar en `layout.tsx` el título y metadata de **CriteriaLock // Twin Finance Smart Escrow** manteniendo `Geist Sans` y `Geist Mono`.
- **Criterios de Salida (Exit Criteria)**:
  - `globals.css` compila sin errores en Tailwind v4.
  - Los números financieros con clase `.tabular-nums` mantienen ancho fijo y las curvas de resorte funcionan fluidamente.

---

### `[F-02]` Dataset Maestro de Bóvedas, Criterios Estilo Notion y Rampas ASCII
- **Archivos destino**:
  - `frontend/src/lib/mock-vaults-data.ts`
- **`Depends on`**: Ninguna
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. Definir las 4 rampas globales de glifos ASCII (`Classic`, `Blocks`, `Dots`, `Binary`) y sus tipos TypeScript (`GlyphRampKey`).
  2. Crear el catálogo de **6 Stablecoins y Activos Onchain** (`ARGt` Peso Argentino Digital 1:1 de Twin Finance, `USDT` Tether, `USDC` Circle, `BRAt` Real Brasileño Digital, `DAI` Maker y `AVAX` Avalanche) con su símbolo para extrusión 3D ASCII (`A$`, `₮`, `$`, `R$`, `◈`, `▲`), paridad, tiempo de liquidación, red y dirección de contrato.
  3. Crear **8 registros realistas de Bóvedas de Bloqueo de Plata (`INITIAL_VAULTS`)** para poblar la tabla **Pilar** y el inspector **Costado** (ej. `#TW-8841` Desarrollo E-Commerce en `ARGt`, `#TW-8839` Exportación Lote Vinos Mendoza-San Pablo en `USDT`, `#TW-8835` Auditoría Smart Contracts en `USDC`, `#TW-8828` Rediseño UI/UX Fintech en `ARGt`, etc.), cada uno con su lista de bloques de criterios estilo Notion, dirección de depositante/beneficiario, semilla ASCII y cronología de bloques en Avalanche.
  4. Definir los **Presets de Reglas de Desbloqueo de 1 Toque** (`Merge PR en GitHub`, `Aprobación de Figma firmada`, `Escaneo de QR Logístico`, `Cobertura de Tests > 90%`).
- **Criterios de Salida (Exit Criteria)**:
  - Exportación tipada sin `any` de `INITIAL_VAULTS`, `STABLECOIN_ASSETS`, `CRITERIA_PRESETS` y `ASCII_RAMPS`.

---

### `[F-03]` Primitivos Táctiles: `IosTactileButton` y `BenchoSegmentedControl`
- **Archivos destino**:
  - `frontend/src/components/ui/IosTactileButton.tsx`
  - `frontend/src/components/ui/BenchoSegmentedControl.tsx`
- **`Depends on`**: `[F-01]`
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. Construir `IosTactileButton.tsx` con variantes `primary-white` (blanco puro `#FFFFFF` con texto negro, bisel especular superior de 1px y sombra luminosa suave), `carbon-matte` (`#0d0d10` con borde `#27272a` y bisel oscuro) y `ghost-ascii` (con corchetes monoespaciados `[ · ]`).
  2. Integrar micro-interacción física con GSAP en `onPointerDown` (`scale: 0.96`) y `onPointerUp` (`scale: 1.0, ease: "back.out(2.5)"`), soporte de `AsciiTextSpinner` integrado para estados de carga y flecha direccional `──►` animada.
  3. Construir `BenchoSegmentedControl.tsx` con pastilla blanca deslizante (`.seg-thumb`) calculada por índice activo con curva `var(--ease-spring)`, soporte de íconos, badges monoespaciados y accesibilidad por teclado (`role="radiogroup"` o `role="tablist"`).
- **Criterios de Salida (Exit Criteria)**:
  - Ambos componentes responden con física de resorte al clic/teclado y respetan `prefers-reduced-motion`.

---

## Capa 2: Escenario Hero, Bento `ASCIIWake` de 3 Pasos y Simulador de Bóveda + Notion

### `[F-04]` Barra Superior de Telemetría (`HeaderNav`) y Escenario Principal (`HeroVaultStage`)
- **Archivos destino**:
  - `frontend/src/components/HeaderNav.tsx`
  - `frontend/src/components/landing/HeroVaultStage.tsx`
- **`Depends on`**: `[F-01]`, `[F-02]`, `[F-03]`
- **`Parallelizable`**: `false`
- **Detalle de Implementación**:
  1. Actualizar `HeaderNav.tsx` con estética estricta en blanco y negro: logo `[TW // CRITERIALOCK]`, ticker en vivo de paridad (`1 ARGt = 1.00 ARS · 1 USDT = 1,180 ARGt · AVAX GAS: $0.004`), enlaces rápidos a las secciones de la landing y botón táctil `[ Crear Bloqueo ]`.
  2. Construir `HeroVaultStage.tsx` en grilla asimétrica de 12 columnas con divisor vertical de `1px solid #18181b`:
     - **Columna Izquierda (7 cols)**: Etiqueta de protocolo con `AsciiTextSpinner`, titular masivo *"Bloqueá la plata. Fijá las reglas. Cobrá al segundo."*, subtítulo de dolor/solución, y la **Quick Lock Bar estilo Lemon Cash** (input numérico formateado + selector segmentado `ARGt` / `USDT` / `USDC` + equivalencia en tiempo real + botón primario iOS blanco **`[ Bloquear Fondos en Bóveda ──► ]`** que envía el monto al Simulador).
     - **Columna Derecha (5 cols)**: Visor en `#000000` con crucetas ASCII en las esquinas y selector superior para alternar en vivo entre:
       1. **`Blobatar ASCII` (`AsciiBlobOrb`)** en blanco y negro con ojos Hollow negativos que siguen al cursor y estela térmica con la rampa de glifos activa.
       2. **`Esfera 3D` (`AsciiSphereOrb`)** con celosía de Fibonacci y racimos de aros concéntricos.
       3. **`Cubo Bóveda` (`ASCIIWake`)** en puntos de semitono interactivos.
       4. **`Comparativa 1:1 SVG vs ASCII`** (`CanonicalBlobatar` + `AsciiBlobOrb`).
- **Criterios de Salida (Exit Criteria)**:
  - Escribir un monto en el Hero y pulsar *"Bloquear Fondos en Bóveda"* hace scroll suave al Simulador de la Sección 3 precargando exactamente ese monto y moneda.
  - Los 4 modos del visor derecho alternan sin parpadeos y reaccionan a la rampa de glifos global.

---

### `[F-05]` Grilla Bento Asimétrica de 3 Pasos con Arte `ASCIIWake` y `Particles` (`AsciiWakeStepsBento`)
- **Archivos destino**:
  - `frontend/src/components/ASCIIWake.tsx` (extender props para soportar cualquier rampa e inversión limpia en oscuro)
  - `frontend/src/components/landing/AsciiWakeStepsBento.tsx`
- **`Depends on`**: `[F-01]`, `[F-02]`
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. **Tarjeta 01 (`lg:col-span-5` — "01 // Depositá y Congelá la Plata")**: Integra el cubo isométrico de semitono de `ASCIIWake.tsx` en blanco sobre negro (`#000000`). Al pasar el mouse, la estela térmica transforma los puntos en glifos ASCII de la rampa activa que se inclinan hacia el puntero.
  2. **Tarjeta 02 (`lg:col-span-7` — "02 // Reglas en Código y Oráculos, No en Palabras")**: Construir el **Simulador de Circuito de Condiciones ASCII Interactivo** donde 3 nodos de entrada (`[PR #142 MERGED]`, `[TESTS E2E 98%]`, `[FIRMA CLIENTE 2/2]`) se conectan mediante tuberías de caracteres ASCII (`═══╦═══►`) a una compuerta `[AND // QUÓRUM]` y al estado `[DESTRABAR PLATA]`. Hacer clic en cualquier nodo conmuta su estado en vivo e ilumina el cableado en blanco puro.
  3. **Tarjeta 03 (`lg:col-span-12` — "03 // Liquidación Instantánea en 0.8 Segundos")**: Integra el enjambre físico de `Particles.tsx` en blanco sobre negro con botones táctiles para disparar la transición elástica de partículas entre `Orden (Círculo)` ➔ `Custodia (Bóveda Cuadrada)` ➔ `Liberación (Flor Expansiva)`.
- **Criterios de Salida (Exit Criteria)**:
  - Los 3 módulos del Bento son 100% interactivos al mouse/clic y detienen su bucle cuando están fuera de pantalla.

---

### `[F-06]` Simulador de Bloqueo de Plata + Bloques de Reglas Estilo Notion + Terminal de Oráculo (`InteractiveVaultSimulator`)
- **Archivos destino**:
  - `frontend/src/components/landing/InteractiveVaultSimulator.tsx`
- **`Depends on`**: `[F-02]`, `[F-03]`
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. **Columna Izquierda (Ticket Criptográfico de Custodia Estilo Lemon en Blanco y Negro)**:
     - Cabecera con ID de contrato autogenerado, selector de moneda (`ARGt` / `USDT` / `USDC`) e input de monto sincronizado con el Hero.
     - **Arte ASCII Dinámico de Candado / Bóveda**: Dibuja en matriz monoespaciada el candado cerrado (`[ ESTADO: PLATA INMOVILIZADA ]`) y lo anima abriéndose cuando todos los criterios pasan a estado `verified`.
     - Resumen de garantías: `Comisión: 0%` · `Retiro unilateral: Bloqueado` · `Red: Avalanche C-Chain`.
  2. **Columna Derecha (Constructor de Criterios con Propiedades Estilo Notion)**:
     - Lista interactiva de bloques de criterios donde cada bloque tiene: checkbox táctil para aprobar/desaprobar manualmente, título editable, y **Píldoras de Propiedades de Notion** (`[ ⚙ Tipo de Oráculo ]`, `[ # Hash SHA-256 ]`, `[ ⛓ Quórum ]`, `[ ● Estado ]`) más botón para eliminar regla.
     - Barra de **Presets de 1 Toque** (`+ Merge PR GitHub`, `+ Aprobación Figma`, `+ QR Entrega Belo`, `+ Auditoría Slither`) e input para agregar una regla personalizada.
  3. **Consola de Oráculo en Vivo + Inserción en Tabla Pilar**:
     - Botón **`[ Ejecutar Oráculo y Destrabar Plata ──► ]`** que despliega la terminal negra `#000000`, transmite los logs paso a paso con `AsciiTextSpinner` y destraba la bóveda.
     - Botón **`[ + Publicar este Contrato en el Explorador en Vivo ]`** que inserta la bóveda recién creada al principio de la tabla **Pilar** (Sección 4) y abre su detalle en el panel **Costado**.
- **Criterios de Salida (Exit Criteria)**:
  - El usuario puede agregar/quitar criterios estilo Notion, simular la verificación completa con logs en vivo y publicar su contrato directamente en la tabla de la Sección 4.

---

## Capa 3: Explorador en Vivo («Pilar» + «Costado») y Tablero de Monedas 3D ASCII

### `[F-07]` Explorador de Bóvedas en Vivo: Fusión de Tabla Dinámica «Pilar» (`UI-01`) + Panel Lateral «Costado» (`UI-02`)
- **Archivos destino**:
  - `frontend/src/components/landing/PilarCostadoExplorer.tsx`
- **`Depends on`**: `[F-01]`, `[F-02]`, `[F-03]`
- **`Parallelizable`**: `false`
- **Detalle de Implementación**:
  1. **Implementación Completa de las Mecánicas de «Pilar» (`UI-01` de Moxen) en Blanco y Negro**:
     - **Barra de Herramientas**: Buscador monoespaciado en tiempo real, filtro rápido por moneda (`Todas`, `ARGt`, `USDT`, `USDC`), **Menú desplegable de Columnas Visibles** con contador `[ 7 / 7 ]` y resguardo que impide ocultar la última columna (con animación `@keyframes pi-no`), **Selector de Densidad en Ola** (`Compacta`, `Normal`, `Cómoda`) con pulgar deslizante y retardo escalonado por fila (`calc(var(--i) * 28ms)`), y botón **`Restablecer`** con punto indicador y estado `✓ Restablecido`.
     - **Redimensión de Columnas (`Column Resizing`)**: Arrastrar el borde derecho de cualquier encabezado proyecta la línea guía vertical blanca `.pi-guia` de arriba a abajo con pastilla de medida en vivo (`184 px`) y detección de límites (`min`/`max`). Doble clic en el separador autoajusta el ancho de la columna.
     - **Reordenamiento de Columnas (`FLIP Column Reordering`)**: Arrastrar o mover columnas con controles/teclado (`Alt + ← / →`) intercambia su posición con transición suave.
     - **Fijado con Chincheta (`Sticky Column Pinning`)**: Botón de chincheta `.pi-pin` en cada cabecera (con animación `@keyframes pi-clava` y tecla rápida `P`) que fija la columna a la izquierda (`position: sticky`) y produce el micro-empuje elástico de la tabla.
  2. **Implementación Completa del Panel Maestro-Detalle «Costado» (`UI-02` de Moxen)**:
     - **Split-View con `@container` Queries**: Hacer clic en cualquier fila de bóveda (o presionar `Intro`) desliza desde la derecha el panel **Costado** empujando el ancho de la tabla sin taparla.
     - **Separador Redimensionable (`role="separator"`)**: Permite arrastrar el borde del panel entre `340px` y `600px` con persistencia en `localStorage` y doble clic para restaurar a `440px`.
     - **Navegación Pro con Teclas `j` / `k` / `↑` / `↓` / `Esc` + `History API`**: Recorre las bóvedas actualizando `?vault=TW-XXXX` con `history.replaceState` y cancelando cargas en tránsito con `AbortController`. Cuando el panel está cerrado, aplica el atributo HTML `inert`.
     - **Radiografía de la Bóveda dentro del Panel**: Sello visual ASCII determinista del contrato, grilla 2x2 de partes y hashes, lista detallada de criterios de aceptación estilo Notion, actividad de bloques en Avalanche y botón **`Copiar Link de Custodia`** con animación `@keyframes co-onda`.
- **Criterios de Salida (Exit Criteria)**:
  - Redimensionar, fijar con chincheta, ocultar/mostrar columnas, cambiar densidad en ola y abrir/recorrer el panel lateral con `j`/`k` funcionan con fluidez total a 60 FPS.

---

### `[F-08]` Tablero de Stablecoins y Monedas 3D en Caracteres ASCII (`StablecoinAsciiBoard`)
- **Archivos destino**:
  - `frontend/src/components/landing/StablecoinAsciiBoard.tsx`
- **`Depends on`**: `[F-01]`, `[F-02]`
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. Implementar el renderizador de **Medallones 3D en Caracteres ASCII sobre Canvas 2D HiDPI** (basado en `AR13-threejs-crypto-ascii-board.md`) para los 6 activos clave: **`ARGt` (Peso Argentino Digital)**, **`USDT` (Tether)**, **`USDC` (Circle)**, **`BRAt` (Real Brasileño Digital)**, **`DAI`** y **`AVAX` (Avalanche)**.
  2. Cada medallón dibuja un cilindro 3D biselado con estrías perimetrales y el símbolo del activo en relieve que gira suavemente y se inclina en 3D (`pitch`/`yaw` con resorte Spring-Damper) hacia la posición del puntero del mouse, despertando una onda térmica con los caracteres de la rampa ASCII global.
  3. Incluir en cada tarjeta los indicadores estilo **Lemon Cash**: etiqueta de paridad (`1:1 ARS`, `1:1 USD`, `1:1 BRL`), tiempo de liquidación (`0.8s`), costo de red y botón **`[ Usar esta Moneda en Bóveda ]`** que actualiza la moneda activa en el Hero y en el Simulador.
- **Criterios de Salida (Exit Criteria)**:
  - Los 6 medallones ASCII responden en 3D al movimiento del mouse en cada tarjeta y cambian sus glifos al alternar la rampa en el dock.

---

## Capa 4: Matriz Comparativa, Dock Flotante Global y Orquestación de Página

### `[F-09]` Matriz Comparativa en Blanco y Negro (`LemonVsTraditionalMatrix`) y Footer Brutalista
- **Archivos destino**:
  - `frontend/src/components/landing/LemonVsTraditionalMatrix.tsx`
- **`Depends on`**: `[F-01]`, `[F-03]`
- **`Parallelizable`**: `true`
- **Detalle de Implementación**:
  1. Construir la tabla comparativa arquitectónica que contrasta **Transferencia Bancaria / Palabra de Honor**, **Plataformas Web2 (Upwork / Fiverr - 20% comisión)** y **`CriteriaLock Smart Escrow (ARGt / USDT)`** en 6 ejes críticos (Riesgo de impago, Riesgo de entrega fallida, Comisiones, Tiempo de liquidación, Protección contra devaluación/inflación y Resolución de disputas).
  2. Incluir al final un bloque de cierre de alta conversión (**CTA Final de Bóveda**) y el Footer Neo-Brutalista con reloj de bloques de Avalanche en vivo y enlaces al Segundo Cerebro.
- **Criterios de Salida (Exit Criteria)**:
  - Contraste impecable en blanco y negro con la columna de CriteriaLock destacada con borde blanco puro de `1px`.

---

### `[F-10]` Dock Flotante Inferior (`BenchoDock`) y Ensamblaje Maestro en `page.tsx`
- **Archivos destino**:
  - `frontend/src/components/BenchoDock.tsx`
  - `frontend/src/app/page.tsx`
- **`Depends on`**: `[F-04]`, `[F-05]`, `[F-06]`, `[F-07]`, `[F-08]`, `[F-09]`
- **`Parallelizable`**: `false`
- **Detalle de Implementación**:
  1. Evolucionar `BenchoDock.tsx` para que sea el centro de mando flotante de toda la landing page:
     - **Saltos de Sección con Indicador Activo**: `Hero` · `3 Pasos` · `Simulador` · `Explorador Pilar` · `Stablecoins`.
     - **Selector de Rampa de Glifos ASCII en Vivo**: Permite alternar entre `Classic (.:-=+*#%@)`, `Blocks (·░▒▓█)`, `Dots (·•●)` y `Binary (01)` actualizando al instante el Orbe Hero, el Bento `ASCIIWake` y las Monedas 3D ASCII.
     - **Selector de Estado del Guardián**: `Idle` · `Voice` · `Think` · `Speak`.
  2. Ensamblar en `frontend/src/app/page.tsx` las 6 secciones conectadas por un estado global coherente (moneda seleccionada, monto de bloqueo rápido, rampa de glifos activa, lista viva de bóvedas que conecta el Simulador con la tabla **Pilar** y el panel **Costado**).
- **Criterios de Salida (Exit Criteria)**:
  - Flujo de punta a punta conectado: crear un bloqueo en el Hero o en el Simulador actualiza el estado global y permite inspeccionarlo inmediatamente en la tabla **Pilar** + panel **Costado**.

---

## Capa 5: Coreografía GSAP, Auditoría a11y / Reduced-Motion y Verificación Visual

### `[F-11]` Coreografía GSAP, Auditoría de Accesibilidad y Verificación en Servidor Local
- **Archivos destino**:
  - `frontend/src/app/page.tsx`
  - Verificación de compilación TypeScript y renderizado en `http://localhost:3000`
- **`Depends on`**: `[F-10]`
- **`Parallelizable`**: `false`
- **Detalle de Implementación**:
  1. Integrar la timeline GSAP de entrada y los reveals de sección con `gsap.matchMedia()` respetando `(prefers-reduced-motion: reduce)`.
  2. Verificar que todos los lienzos Canvas pausen su bucle `requestAnimationFrame` vía `IntersectionObserver` cuando no están visibles.
  3. Ejecutar `npm run build` / verificación de tipos TypeScript en `frontend/` para garantizar **0 errores de compilación y 0 errores de hidratación en Next.js 16 + React 19**.
  4. Levantar el servidor y capturar screenshots de cada sección para validar que la estética **Blanco y Negro ASCII** luce limpia, táctil y libre de cualquier rastro de "AI slop".
- **Criterios de Salida (Exit Criteria)**:
  - Build limpia en Next.js 16, 60 FPS estables y todas las interacciones verificadas.
