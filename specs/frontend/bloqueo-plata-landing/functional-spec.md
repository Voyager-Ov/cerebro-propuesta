# Especificación Funcional y Catálogo Maestro de Componentes: Landing Page "CriteriaLock" (El Bloqueo de Plata)

---

## 1. Manifiesto de Marca Visual: *Monochrome ASCII Craft × Fintech Argentina (Lemon Style)*

### 1.1. Identidad Central: Blanco y Negro ASCII de Alta Precisión
Nuestra identidad visual **no usa colores chillones ni degradados genéricos de IA**. Mantenemos de forma estricta la estética **Blanco y Negro / Monocromo Carbono (`#000000` / `#09090b` / `#FFFFFF`) con texturas de matriz de puntos (*halftone*) y glifos ASCII interactivos** que venimos construyendo en el proyecto, fusionada con la **arquitectura de producto fintech de Lemon Cash** (claridad en saldos, custodia de stablecoins `ARGt` / `USDT`, tickets de bloqueo y fluidez de pagos) y las reglas de diseño de **Taste Skill**.

```
+-----------------------------------------------------------------------------------+
|  [TW] twin finance // CRITERIALOCK               [ NET: AVALANCHE ] [ PEG: 1:1 ]  |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   BLOQUEÁ LA PLATA.                           .  ·  •  ●  •  ·  .                 |
|   FIJÁ LAS REGLAS.                        ·  •  ●  #  %  @  %  #  ●  •            |
|   COBRÁ AL SEGUNDO.                     •  ●  #  @  [      ]  [      ]  ●         |
|                                         •  ●  #  @  [      ]  [      ]  ●         |
|   Custodia inteligente en ARGt y USDT     ·  •  ●  #  %  @  %  #  ●  •            |
|   que solo se destraba cuando el             .  ·  •  ●  •  ·  .                  |
|   oráculo verifica la entrega.                                                    |
|                                         [ LOCKED VAULT: $ 2,500,000 ARGt ]        |
|   [ (●) Bloquear Plata Ahora ──► ]      [ ⠋ ORÁCULO ESCUCHANDO HITOS...  ]        |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 1.2. Los 5 Pilares Estéticos (Síntesis del Segundo Cerebro + Pinterest + Taste + Lemon)

1. **Monocromo Puro & Contraste Quirúrgico (Pinterest Board `"twin"` + `AR08`)**:
   - **Vacío Absoluto (`#000000`)** para el lienzo general y los visores de canvas interactivos.
   - **Carbón Mate Sólido (`#09090b` y `#0d0d10`)** para tarjetas y contenedores. Cero glassmorphism sucio en las tarjetas de datos; el vidrio esmerilado (`backdrop-blur-2xl`) se reserva exclusivamente para el **Dock Flotante de Bencho** y los controles flotantes tipo iOS.
   - **Bordes Hairline de 1px (`#27272a` en reposo, `#52525b` o `#FFFFFF` en foco/activo)**: Geometría arquitectónica nítida sin sombras difusas innecesarias.
   - **Tinta Blanca (`#FFFFFF` y escala de grises `zinc-100` a `zinc-500`)**: Todo el arte ASCII, las esferas 3D, las monedas y la tipografía principal viven en blanco y escala de grises de alto contraste. Los únicos puntos de color son micro-indicadores semánticos de 6px (verde esmeralda para `VERIFICADO / ONCHAIN`, ámbar para `PENDIENTE / ORÁCULO`).

2. **Física Táctil de Bencho.dev (`AR07`, `AR12`, `Particles`, `ASCIIWake`)**:
   - Nada se mueve de forma caótica ni automática si el usuario no interactúa (*"Status Quo Tranquilo"*).
   - Al pasar el cursor (*hover*), los campos de puntos semitono (*halftone dots*) despiertan en una **estela térmica (`stampThermal`)** que transforma los puntos en glifos ASCII (` .:-=+*#%@`) con un centelleo de terminal a 14 Hz (`hash14Hz`).
   - Las partículas y botones responden con **física de resortes amortiguados (*Spring-Damper / Ley de Hooke*)**: estiramiento elíptico por velocidad, atracción magnética al puntero y onda de choque radial al hacer clic.

3. **ADN Fintech de Lemon Cash (Aplicado al Bloqueo de Plata en Blanco y Negro)**:
   - **Claridad brutal en el manejo de plata**: El usuario entiende en 0.5 segundos cuánta plata está bloqueada (`50,000 ARGt` / `1,200 USDT`), quién la depositó, qué falta para liberarla y en qué red vive (`Avalanche C-Chain`).
   - **Píldoras de Stablecoins & Swaps 1:1**: Selector táctil rápido entre **ARGt** (Peso Argentino Digital de Twin Finance), **USDT** (Tether) y **USDC**, mostrando paridad en tiempo real, costo de red (`< $0.005`) y liquidación instantánea.
   - **Tickets Criptográficos de Custodia**: Tarjetas que parecen comprobantes físicos de bóveda de alta gama, con bordes troquelados o líneas punteadas monoespaciadas (`- - - - -`), hash de transacción abreviado y código QR/link para compartir por WhatsApp o Telegram.

4. **Librerías del Cerebro (`OCHO` & `hacktwin` — Notion, Pilar, Costado, Shadcn, iOS)**:
   - **Estilo Notion**: Bloques de criterios de aceptación con propiedades en píldoras (`Tipo de Oráculo`, `Quórum`, `Repositorio`, `Fecha Límite`, `Estado`) editables y limpias.
   - **Tabla Interactiva «Pilar» (`UI-01` de Moxen)**: Para explorar todas las bóvedas y bloqueos de plata activos en vivo, con redimensión de columnas, reordenamiento 3D con técnica FLIP, fijado de columnas con chincheta (*sticky pin*) y cambio de densidad en ola (*Cómoda, Normal, Compacta*).
   - **Panel Maestro-Detalle «Costado» (`UI-02` de Moxen)**: Al hacer clic en cualquier bóveda o contrato de la tabla, no se abre un modal molesto ni cambia de página; se desliza desde la derecha un panel de inspección profunda que empuja la tabla suavemente con `@container` queries y permite recorrer contratos con las teclas `j` y `k`.
   - **Botones y Segmented Controls Estilo iOS**: Píldoras y botones con curvatura continua (*squircle*), bisel de luz superior interno de 1px (`inset 0 1px 0 rgba(255,255,255,0.2)`), pastilla blanca sólida deslizante con texto negro en estado activo y compresión física al presionar (`scale: 0.96`).

5. **Guardarraíles «Taste Skill» (Anti-AI Slop)**:
   - Prohibido el diseño genérico de 3 tarjetitas centradas con íconos aburridos.
   - Grilla editorial asimétrica tipo Bento Técnico con divisores de 1px expuestos, coordenadas de bloque en las esquinas (`[BLK #49,201,890]`), contrastes drásticos entre titulares `Geist Sans` ultra-ajustados (`tracking-tight`) y telemetría en `Geist Mono`.

---

## 2. Catálogo Detallado de Componentes a Construir (Cómo Hacer Cada Uno y Con Qué Estética)

A continuación se especifica cada componente principal de la landing page, su anatomía visual en **Blanco y Negro ASCII**, la librería del cerebro en la que se basa y su comportamiento interactivo.

---

### COMPONENTE 1: `HeroVaultStage` (Escenario Principal de Bloqueo de Plata + Orbe/Bóveda ASCII)
* **Inspiración del Cerebro**: `AsciiBlobOrb.tsx` (`AR12`) + `AsciiSphereOrb.tsx` (`AR08`) + Pin 1 y Pin 2 de Pinterest.
* **Qué es**: La primera pantalla de la landing. Una composición asimétrica de 12 columnas dividida por una línea vertical hairline de 1px (`#27272a`).
* **Columna Izquierda (7 columnas — Propuesta de Valor y Acción Directa estilo Lemon)**:
  - **Micro-Header de Estado**: Píldora en negro mate con borde `#27272a`, spinner de texto ASCII (`⠋`) y leyenda `PROTOCOLO DE CUSTODIA ONCHAIN // AVALANCHE C-CHAIN`.
  - **Titular Brutalista en Blanco Puro**: *"Bloqueá la plata. Fijá las reglas. Cobrá al segundo."* donde la frase *"Bloqueá la plata"* tiene un subrayado o fondo de trama de puntos halftone en blanco/gris.
  - **Subtítulo Editorial**: Explicación directa del dolor que resuelve (sin clientes que desaparecen ni anticipos en el aire; la plata queda inmovilizada en un contrato inteligente en `ARGt` o `USDT` y se libera sola cuando se aprueban los criterios).
  - **Mini-Widget de Bloqueo Rápido ("Quick Lock Bar")**: Una barra interactiva estilo Lemon donde el usuario puede escribir un monto (ej. `1,500,000`), alternar la píldora entre `ARGt` y `USDT`, y presionar el botón principal estilo iOS blanco puro: **`[ Bloquear Fondos en Bóveda ──► ]`**.
* **Columna Derecha (5 columnas — El Guardián / Bóveda 3D en Blanco y Negro ASCII)**:
  - Visor cuadrado en negro absoluto (`#000000`) enmarcado con esquineros técnicos (`+───+`).
  - En el centro vive el **Orbe / Candado Biomórfico ASCII en Blanco y Negro**:
    - En reposo: una esfera perfecta de puntos blancos semitono con las **dos cavidades oculares negativas (*Hollow Eyes*)** de Blobatar que siguen al cursor por toda la landing.
    - Al pasar el mouse: los puntos blancos se excitan térmicamente convirtiéndose en glifos ASCII (`. : - = + * # % @`) y se dispersan con física de resorte Euler.
    - En la base del visor: telemetría monoespaciada en vivo que muestra el total bloqueado en el protocolo (`TVL: $48,920,000 ARGt // 142 BÓVEDAS ACTIVAS`) y un selector rápido para alternar entre `Vista Blobatar ASCII`, `Vista Esfera Fibonacci 3D` y `Vista Cubo Halftone (ASCIIWake)`.

---

### COMPONENTE 2: `IosTactileButton` & `BenchoSegmentedControl` (Sistema de Botones y Controles Hápticos)
* **Inspiración del Cerebro**: Librería de botones iOS + `BenchoDock.tsx` (`AR07`) + `Shadcn` primitives.
* **Qué es**: El sistema unificado de botones y selectores de toda la landing page, diseñado para que cada clic se sienta como presionar un botón físico de hardware o iOS en blanco y negro.
* **Variantes Visuales**:
  1. **Primario "Pure White iOS Pill"**:
     - Fondo blanco puro `#FFFFFF`, texto negro `#000000` en peso semibold.
     - Bisel especular superior (`inset 0 1px 0 rgba(255,255,255,0.9)`) y sombra suave blanca de baja opacidad (`0 4px 20px rgba(255,255,255,0.12)`).
     - En *hover*: un destello diagonal sutil recorre el botón y la flecha derecha (`──►`) se desplaza `4px` con resorte.
     - En *active/click*: compresión física inmediata a `scale(0.96)` y rebote elástico `back.out(2.5)`.
  2. **Secundario "Carbon Matte Tactile"**:
     - Fondo `#121215`, borde `1px solid #27272a`, bisel superior interno `inset 0 1px 0 rgba(255,255,255,0.08)`, texto blanco `#F4F4F5`.
     - Al posar el cursor, el borde se ilumina en `#52525b` y aparece un micro-indicador ASCII `[·]` a la izquierda.
  3. **Segmented Control Deslizante (Estilo iOS / Bencho)**:
     - Cápsula contenedora en `#09090b` con borde `#27272a` y `padding: 4px`.
     - Al cambiar de opción (ej. entre `ARGt Pesos`, `USDT Tether`, `USDC Circle`), una pastilla blanca `#FFFFFF` se desliza físicamente por debajo de la opción activa invirtiendo el color del texto a negro puro.

---

### COMPONENTE 3: `StablecoinAsciiBoard` (Tablero y Cinta de Monedas 3D ASCII Estilo Lemon + Three.js)
* **Inspiración del Cerebro**: `AR13-threejs-crypto-ascii-board.md` + `TW01-twin-finance-stablecoins.md` + Estética de pagos y stablecoins de Lemon Cash.
* **Qué es**: Sección dedicada a mostrar la "Plata Programable" que soporta el protocolo: las stablecoins locales de **Twin Finance** (`ARGt` Peso Argentino, `BRAt` Real Brasileño, `MEXt` Peso Mexicano) y las stablecoins globales (`USDT`, `USDC`, `DAI`) sobre **Avalanche**.
* **Cómo se ve y cómo se construye (En Blanco y Negro ASCII)**:
  - Una grilla de tarjetas técnicas en carbón mate (`#09090b`) donde cada moneda tiene su propio **Medallón / Moneda 3D renderizada en caracteres ASCII blancos sobre fondo negro**:
    - Cada moneda gira suavemente o se inclina en 3D (pitch/yaw) hacia donde está el puntero del mouse.
    - Al pasar el mouse por encima de la tarjeta de `ARGt` o `USDT`, una onda térmica recorre el logo ASCII de la moneda haciendo brillar sus caracteres (`@ # % * +`) en blanco incandescente.
  - **Datos Estilo Lemon Cash en cada tarjeta**:
    - Nombre y ticker en tipografía grande (`ARGt · Peso Argentino Digital`).
    - Badge de Paridad: `[ PEG 1:1 ARS // COLATERALIZADO ]`.
    - Comparativa de velocidad: `Liquidación: 0.8 seg` vs `Transferencia tradicional: Demorada / Límites`.
    - Mini gráfico de estabilidad en arte ASCII monoespaciado (`──────────● 1.00`).

---

### COMPONENTE 4: `InteractiveVaultSimulator` (Simulador en Vivo de "Bloqueo de Plata" y Criterios estilo Notion)
* **Inspiración del Cerebro**: `CriteriaLockCard.tsx` (`ID09`) + Bloques de propiedades de **Notion** + Estética de comprobante de **Lemon Cash**.
* **Qué es**: El corazón funcional de la landing. Un panel interactivo de dos caras donde cualquier visitante puede **crear un bloqueo de plata real o simulado** y probar cómo el contrato inteligente retiene y libera los fondos.
* **Anatomía Funcional y Estética**:
  1. **Cabezal de Bóveda (Estilo Ticket de Custodia Lemon)**:
     - Muestra el monto bloqueado en tipografía numérica gigante monoespaciada: `$ 500,000.00 ARGt` (con botón para alternar a `1,000.00 USDT`).
     - Estado visual del candado en arte ASCII dinámico:
       - Cuando está bloqueado: dibuja un candado cerrado en matriz de puntos/caracteres con el sello `[ ESTADO: PLATA INMOVILIZADA EN SMART CONTRACT ]`.
       - Nadie puede tocar la plata: ni el cliente puede retirarla sin permiso antes del vencimiento, ni el freelancer puede cobrarla sin cumplir las reglas.
  2. **Constructor de Reglas Estilo Notion (`Notion Criteria Blocks`)**:
     - Lista de criterios de aceptación donde cada fila es un bloque estructurado con **Píldoras de Propiedades de Notion** en escala de grises y blanco:
       - **Criterio 01**: `"Tests E2E pasando al 100%"` · Propiedad Tipo: `[ ⚙ GitHub Action ]` · Propiedad Quórum: `[ Automático ]` · Estado: `[ ● VERIFICADO ]`.
       - **Criterio 02**: `"Entrega de Diseño en Figma Aprobada"` · Propiedad Tipo: `[ ✍ Firma Cliente ]` · Propiedad Hash: `[ 0x8f...2a ]` · Estado: `[ ○ PENDIENTE ]`.
       - **Criterio 03**: `"Performance Lighthouse > 90"` · Propiedad Tipo: `[ 🤖 AI Arbitrator ]` · Propiedad Red: `[ Avalanche ]` · Estado: `[ ● VERIFICADO ]`.
     - **Interacción**: El usuario puede hacer clic en **`[ + Agregar Regla de Desbloqueo ]`** (eligiendo presets como *"Entrega de mercadería con QR"*, *"Merge de Pull Request"*, *"Aprobación de Hito"*) o hacer clic directamente en cualquier criterio pendiente para **simular su aprobación**.
  3. **Consola de Oráculo Desplegable (`Live Oracle Terminal`)**:
     - Al presionar el botón **`[ Simular Validación y Destrabar Plata ──► ]`**, se abre una ventana de terminal negra `#000000` con borde `#27272a` y spinners de texto (`AsciiTextSpinner` del Pin 16 de Pinterest: `⠋ ⠙ ⠹ ⠸`).
     - Imprime en vivo cada paso de validación en `Geist Mono` blanco/gris y, al completarse, el candado ASCII explota en una onda expansiva de partículas y el saldo cambia a **`[ PLATA LIBERADA Y TRANSFERIDA AL INSTANTE ]`**.

---

### COMPONENTE 5: `PilarEscrowExplorer` + `CostadoInspectorPanel` (Explorador de Bóvedas en Vivo con Tabla «Pilar» y Panel Lateral «Costado»)
* **Inspiración del Cerebro**: **Nodo `UI-01` (Tabla Dinámica «Pilar» de Moxen)** + **Nodo `UI-02` (Panel Maestro-Detalle «Costado» de Moxen)** subidos en el cerebro `OCHO`.
* **Qué es**: Una sección de transparencia total (*Onchain Proof-of-Lock Explorer*) donde el usuario puede explorar una tabla real e interactiva con contratos de bloqueo de plata en vivo (freelancers, desarrollo de software, exportaciones PyME, compraventa P2P).
* **Cómo funciona la Tabla «Pilar» adaptada al Blanco y Negro ASCII**:
  - **Barra de Herramientas Superior**:
    - Buscador monoespaciado con filtro instantáneo.
    - **Selector de Densidad en Ola (`Cascading Density`)**: 3 botones (`Compacta`, `Normal`, `Cómoda`) que cambian la altura de todas las filas con una animación escalonada en ola (*staggered wave*).
    - **Menú de Visibilidad de Columnas** y botón de **`[ Restablecer Layout ]`**.
  - **Interacciones con Física de Resortes de «Pilar»**:
    - **Redimensión de Columnas (`Column Resizing`)**: Al arrastrar el borde de cualquier encabezado (`ID Bóveda`, `Concepto / Acuerdo`, `Monto Bloqueado`, `Moneda`, `Progreso de Criterios`, `Oráculo`, `Estado`), aparece una línea guía blanca vertical que indica los píxeles exactos (`184 px`), y con doble clic se autoajusta con resorte.
    - **Reordenamiento por Láminas 3D (`FLIP Reordering`)**: El usuario puede sostener y arrastrar cualquier columna para cambiar su orden; la columna se levanta con sombra e inclinación de 1° mientras las demás se deslizan suavemente.
    - **Fijación con Chincheta (`Sticky Column Pinning`)**: Cada columna tiene un ícono de chincheta (`pin`) para dejarla anclada a la izquierda al hacer scroll horizontal, con el micro-rebote elástico característico de Pilar.
* **Cómo se conecta con el Panel Lateral «Costado» (`Master-Detail Split View`)**:
  - Al hacer clic en cualquier fila de la tabla (o presionar `Intro`), **no se abre un popup que tapa la pantalla**.
  - Desde el borde derecho se desliza el **Panel «Costado»**, empujando suavemente el ancho de la tabla. Gracias a `@container` queries nativas, la tabla oculta automáticamente las columnas secundarias según el espacio disponible.
  - **Dentro del Panel «Costado»**:
    - Se muestra la radiografía completa de esa bóveda: un mini-visor con la semilla ASCII única de ese contrato, el desglose de partes (`Depositante 0x4a...` ➔ `Beneficiario 0x9f...`), la barra de progreso en bloques ASCII (`[■■■■■■□□] 75%`), los hashes de verificación en Avalanche y el botón para copiar el link del contrato.
    - **Navegación Pro por Teclado**: El usuario puede presionar las teclas **`j` / `↓`** y **`k` / `↑`** para recorrer todas las bóvedas de la tabla a velocidad extrema viendo cómo el panel lateral se actualiza al instante sin parpadeos (con `AbortController`), o arrastrar el separador vertical para agrandar el panel.

---

### COMPONENTE 6: `AsciiWakeStepsBento` (Bento Asimétrico de 3 Pasos con Campo Térmico `ASCIIWake`)
* **Inspiración del Cerebro**: `ASCIIWake.tsx` (Bencho.dev) + Pin 6, 8 y 14 del tablero de Pinterest + `Taste Skill` (Bento asimétrico).
* **Qué es**: La sección que explica *"Cómo funciona el bloqueo de plata en 3 movimientos"*, rompiendo con las clásicas 3 tarjetas iguales mediante una grilla Bento asimétrica (1 tarjeta grande horizontal arriba o a la izquierda + 2 tarjetas complementarias) con arte interactivo en blanco y negro.
* **Los 3 Módulos con Arte `ASCIIWake` Interactivo**:
  1. **Paso `01 // DEPOSITÁ Y BLOQUEÁ` (El Cubo Isométrico Halftone)**:
     - Incluye un lienzo interactivo basado en `ASCIIWake.tsx`: un cubo o bóveda isométrica dibujada en puntos blancos de semitono (*halftone*) donde la cara superior brilla más que las laterales. Al pasar el mouse por encima, el rastro de la mano convierte los puntos en caracteres `@ # % * +` que se inclinan magnéticamente hacia el cursor y se enfrían de vuelta a puntos.
     - Copy directo: *"El cliente deposita `ARGt` o `USDT`. La plata queda congelada en un contrato inteligente neutral: el freelancer ve que la plata existe y está asegurada, y el cliente sabe que nadie puede llevársela sin entregar."*
  2. **Paso `02 // REGLAS EN CÓDIGO, NO EN PALABRAS` (La Matriz de Verificación)**:
     - Ilustración interactiva en caracteres monoespaciados que simula un árbol de condiciones (`IF [TESTS == PASS] && [FIGMA == SIGNED] ──► UNLOCK`).
     - Copy directo: *"Definí criterios verificables: un PR mergeado en GitHub, un link entregado, una guía logística o una firma aprobada. Sin letra chica ni discusiones subjetivas."*
  3. **Paso `03 // LIBERACIÓN EN 0.8 SEGUNDOS` (Onda de Choque de Liquidación)**:
     - Visualizador donde al hacer clic se dispara un anillo expansivo de puntos blancos estirados por velocidad (`Particles.tsx`) que transfieren el valor de un nodo a otro instantáneamente.
     - Copy directo: *"Apenas se cumple el último criterio, el contrato destraba los fondos y los envía directo a la billetera del receptor en menos de un segundo. Cero espera bancaria de 30 días."*

---

### COMPONENTE 7: `LemonVsTraditionalMatrix` (Comparativa Brutalista: "Cobrar en el Aire" vs "Plata Bloqueada con CriteriaLock")
* **Inspiración del Cerebro**: Estética de tablas comparativas de alta conversión + Pin 17 de Pinterest + Lenguaje directo de fintech argentina.
* **Qué es**: Un cuadro comparativo de alto contraste en blanco y negro puro que enfrenta los 3 métodos actuales (Transferencia / Palabra de honor, Plataformas Freelance como Upwork/Fiverr, y **CriteriaLock en ARGt/USDT**).
* **Diseño Visual**:
  - Las columnas tradicionales se ven atenuadas en gris oscuro (`#18181b` / texto `zinc-500`) con indicadores ASCII de falla `[ ✕ RIESGO ALTO ]`, `[ -20% COMISIÓN ]`, `[ DEMORA 15-30 DÍAS ]`.
  - La columna de **CriteriaLock** destaca con un borde blanco puro de 1px (`border-white`), cabecera invertida en blanco con texto negro (`[ ★ CRITERIALOCK // ONCHAIN ]`) y badges nítidos:
    - **Riesgo de Impago**: `0% (Plata bloqueada desde el día 1)`.
    - **Riesgo de Mal Trabajo**: `0% (Solo se libera si se cumplen los criterios)`.
    - **Comisión de Plataforma**: `< 0.1% (Gas de Avalanche < $0.005)`.
    - **Moneda**: `ARGt (Pesos 1:1) · USDT · USDC`.
    - **Tiempo de Cobro tras Aprobación**: `Instantáneo (0.8 segundos)`.

---

### COMPONENTE 8: `BenchoFloatingDock` (Dock Flotante Inferior de Vidrio Esmerilado y Control Global)
* **Inspiración del Cerebro**: `BenchoDock.tsx` (`AR07`) + Prototipo 4 de Bencho.dev.
* **Qué es**: La barra de control flotante en píldora ubicada en la parte inferior central de la pantalla (`fixed bottom-6`), con el único efecto `backdrop-blur-2xl` permitido en la interfaz.
* **Qué permite controlar en toda la Landing**:
  1. **Navegación Rápida por Secciones**: Píldoras con salto suave (`Bóveda`, `Simulador`, `Explorador Pilar`, `Monedas ASCII`).
  2. **Estado del Guardián ASCII**: Alternador táctil (`Idle`, `Voice`, `Audit`, `Unlock`) que modifica en vivo el comportamiento de los orbes y animaciones de la página.
  3. **Selector de Rampa de Glifos ASCII**: Permite al usuario cambiar en tiempo real el estilo de caracteres de toda la landing entre `Classic (.:-=+*#%@)`, `Blocks (·░▒▓█)`, `Dots (·•●)` y `Binary (01)`.
  4. **Botón CTA Compacto**: Pastilla blanca de acción rápida `[ Crear Bloqueo ]`.

---

## 3. Arquitectura Completa de la Página (Orden de Lectura y Flujo de Scroll)

La landing page se organiza en **6 grandes bloques verticales** conectados por una grilla arquitectónica con líneas guías de 1px (`border-[#1f1f23]`) que atraviesan la pantalla de arriba a abajo, estilo editorial suizo / neo-brutalista:

1. **`HeaderNav` (Barra Superior Fija de Telemetría)**:
   - Logo `[TW // CRITERIALOCK]` + Indicador de red `Avalanche C-Chain` + Ticker de paridad en vivo `1 ARGt = 1.00 ARS · 1 USDT = 1,000+ ARGt` + Botón estilo iOS `[ Conectar Billetera / Probar Demo ]`.
2. **Sección 1 — `HeroVaultStage` (Impacto Principal + Guardián 3D ASCII)**:
   - Titular de bloqueo de plata + Quick Lock Bar estilo Lemon + Orbe Blobatar/Esfera ASCII interactivo en blanco y negro con ojos Hollow que siguen el cursor.
3. **Sección 2 — `AsciiWakeStepsBento` (El Mecanismo en 3 Pasos con Arte Halftone Interactivo)**:
   - Grilla Bento asimétrica donde cada paso tiene un canvas interactivo (`ASCIIWake` / `Particles`) que reacciona al puntero del usuario.
4. **Sección 3 — `InteractiveVaultSimulator` (Demostrador de Bloqueo y Reglas Estilo Notion)**:
   - El playground completo donde el usuario configura un monto en `ARGt` o `USDT`, edita o aprueba criterios de aceptación en bloques estilo Notion y dispara la terminal de oráculos para ver cómo se destraba el candado ASCII en tiempo real.
5. **Sección 4 — `PilarEscrowExplorer` + `CostadoInspectorPanel` (Explorador de Bóvedas en Vivo)**:
   - La tabla interactiva **Pilar** con columnas redimensionables, reordenables en 3D (FLIP), fijables con chincheta y densidad en ola, acoplada al panel lateral **Costado** que se abre al seleccionar cualquier contrato y permite recorrerlos con `j` / `k`.
6. **Sección 5 — `StablecoinAsciiBoard` & `LemonVsTraditionalMatrix` (Rieles Monetarios + Comparativa)**:
   - El tablero de monedas 3D en caracteres ASCII (`ARGt`, `USDT`, `USDC`, `AVAX`) con inclinación al mouse, seguido de la matriz comparativa en blanco y negro y el cierre de conversión final.

---

## 4. Catálogo Exhaustivo de Estados de la Interfaz (UI State Matrix)

| Componente | Estado Inicial / Reposo (`Idle`) | Estado Hover / Interacción (`Active`) | Estado Procesando / Oráculo (`Loading`) | Estado Completado / Desbloqueado (`Success`) | Estado Vacío / Borde (`Empty / Error`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Orbe / Bóveda ASCII (`HeroVaultStage`)** | Calma zen absoluta; puntos blancos de semitono (`3.6px–5.6px`); ojos Hollow mirando al frente. | Estela térmica continua bajo el cursor que muta puntos a glifos `@#%+*` con shimmer a 14 Hz; mirada inercial sigue al mouse. | Giro o pulsación armónica suave; anillo orbital de Kepler acelerado y telemetría cambiando de bloque. | Onda de choque radial (`shockwave`) al hacer clic o al liberarse la plata; expansión elástica y retorno con resorte. | Si el navegador tiene `prefers-reduced-motion`, renderiza estático en alta definición sin loop continuo. |
| **Simulador de Bóveda (`InteractiveVaultSimulator`)** | Muestra `$ 500,000 ARGt` con `[ CUSTODIA ACTIVA ]`, 2 criterios verificados y 1 pendiente. | Las píldoras estilo Notion iluminan su borde a `#52525b`; el botón iOS blanco proyecta reflejo especular. | El botón muestra `AsciiTextSpinner` (`⠋ Verificando en Avalanche...`); la terminal imprime logs línea por línea cada 300ms. | El candado ASCII pasa de cerrado a abierto; el borde de la tarjeta destella en blanco puro/esmeralda y muestra el hash `0x9a...e24d`. | Si el usuario borra todos los criterios, muestra chips sugeridos de 1 toque (`+ Entrega Figma`, `+ PR GitHub`, `+ QR Envío`). |
| **Tabla «Pilar» (`PilarEscrowExplorer`)** | Filas en densidad `Normal`, primera columna (`ID Bóveda`) lista para fijar, bordes de 1px `#27272a`. | Al arrastrar borde de columna: guía vertical blanca con ancho en `px`. Al arrastrar cabecera: elevación 3D (`1° tilt`) y reordenamiento FLIP. | Transición de densidad (`Compacta` / `Cómoda`) ejecutada en cascada con retardo por fila (`--i`). | Al fijar una columna con `pin`, la columna vuela a la izquierda y la tabla hace un asomo elástico. | Si la búsqueda no arroja bóvedas, muestra arte ASCII de caja fuerte vacía y botón `[ Limpiar Filtros ]`. |
| **Panel «Costado» (`CostadoInspectorPanel`)** | Oculto e `inert` a la derecha; la tabla ocupa el 100% del contenedor. | Al seleccionar fila o presionar `j`/`k`, entra empujando la tabla; `@container` adapta las columnas visibles sin romper el layout. | Si se cambia rápido con `j`/`k`, cancela peticiones previas vía `AbortController` y actualiza instantáneamente la telemetría. | URL sincronizada con `?vault=TW-8841` vía History API; botón `[ Copiar Link de Custodia ]` cambia a `[ ✓ Copiado ]`. | Presionar `Esc` o el botón `✕` cierra el panel y devuelve el foco de teclado exactamente a la fila de origen. |
| **Monedas 3D ASCII (`StablecoinAsciiBoard`)** | Medallones ASCII en blanco y escala de grises mostrando el símbolo de `ARGt`, `USDT`, `USDC`, `AVAX`. | Inclinación 3D (pitch/yaw) hacia las coordenadas del cursor y onda térmica que densifica los caracteres del relieve. | Cambio de filtro (`Todas`, `Monedas Locales Twin`, `Dólares Digitales`) con transición suave GSAP. | Al hacer clic en una moneda, la selecciona automáticamente como moneda activa en el Simulador de Bóveda. | Fallback limpio en matriz tipográfica 2D si WebGL/Canvas está restringido. |

---

## 5. Criterios de Calidad y Anti-Slop (Checklist de Aprobación Funcional)

- **100% Fiel a la Estética Blanco y Negro ASCII**: Ningún bloque rompe la armonía de negro absoluto `#000000`, carbón `#09090b`, bordes `#27272a` y tinta blanca `#FFFFFF`.
- **Integración Real de los Recursos del Cerebro**: No son componentes inventados desde cero sin contexto; reutilizamos y potenciamos `AsciiBlobOrb`, `AsciiSphereOrb`, `ASCIIWake`, `Particles`, `AsciiTextSpinner`, `BenchoDock`, `PilarTable` (`UI-01`), `CostadoPanel` (`UI-02`) y los medallones de `AR13`.
- **Claridad de Producto ("El Bloqueo de Plata")**: Cualquier persona entiende al instante cómo se bloquea la plata en `ARGt` / `USDT`, cómo se fijan las reglas y cómo se libera el pago sin intermediarios.
