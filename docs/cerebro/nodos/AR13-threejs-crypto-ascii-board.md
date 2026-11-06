---
id: AR13
titulo: Suite Three.js r186 & Tablero de Criptomonedas y Stablecoins ASCII 3D (Estética Pinterest)
tipo: arquitectura-visual
tags: [threejs, ascii, crypto, stablecoins, pinterest-board, bencho-minimalism, scissor-test, raycasting, webgl, shaders]
depende_de: [AR01, AR03, AR05, AR07, AR08, AR10, AR12]
conectado_con: [FN01, FN02, ID06, ID07, ID08]
---

# Suite Three.js r186 & Tablero de Criptomonedas y Stablecoins ASCII 3D

Este nodo documenta la arquitectura técnica para renderizar logos de criptomonedas y stablecoins en **componentes ASCII interactivos**, integrando la estética del **tablero de Pinterest** subido en el cerebro (`demo/pinterest_board.png`, Video *"The Solar System / Circular motion graphics / ASCII Noir"*), y una auditoría exhaustiva de las **13 librerías y skills modulares de Three.js (r186)** para resolver el problema de renderizar múltiples criptos en una lista o grid con efectos de hover por mouse de alto rendimiento.

---

## 1. Auditoría de las 13 Librerías / Skills de Three.js

Para renderizar múltiples criptomonedas y stablecoins en una lista o grilla interactiva sin colapsar el navegador, analizamos las 13 skills oficiales de Three.js:

| # | Skill / Módulo Three.js | Diagnóstico y Solución Arquitectónica para el Tablero Crypto |
|---|---|---|
| **1** | **`threejs-fundamentals`** | **Ciclo de vida y Render Loop**: Implementación de `THREE.Timer` conectado a `document` para evitar acumulación de deltas cuando la pestaña pierde foco. Gestión precisa del aspect ratio de cámara (`PerspectiveCamera(45, w/h, 0.1, 100)`) y resize sin memory leaks. |
| **2** | **`threejs-performance`** | **La Regla de Oro del Canvas Único**: Los navegadores limitan los contextos WebGL independientes a 8–16. Crear un `<canvas>` Three.js por cada fila o card de cripto destruye silenciosamente los contextos más antiguos. La solución canónica es el **Single-Canvas Multi-Viewport con Scissor Test (`renderer.setScissorTest(true)`)**, renderizando 20 monedas con 1 solo contexto WebGL y 60 FPS garantizados. |
| **3** | **`threejs-geometry`** | **Modelado de Monedas 3D e Instancing**: Modelado de cilindro biselado (`CylinderGeometry(radius, radius, height, radialSegments)`), aros concéntricos de Kepler (`RingGeometry`, `TorusGeometry`) y mallas combinadas. Para listas densas, `InstancedMesh` permite dibujar todos los tokens en **1 sola draw call**. |
| **4** | **`threejs-interaction`** | **Raycasting y NDC**: Detección de puntero mediante `THREE.Raycaster` transformando las coordenadas del evento `(clientX, clientY)` a Normalized Device Coordinates `[-1, 1]`. En modo lista, calcula el índice de la moneda activa y la normal del impacto para inclinar la moneda hacia el cursor. |
| **5** | **`threejs-postprocessing`** | **Pipeline ASCII y Luminancia**: Integración de `AsciiEffect.js` (`three/addons/effects/AsciiEffect.js`) o pases GLSL personalizados (`RenderPass` → `UnrealBloomPass` → `AsciiPass` → `OutputPass`) para mapear gradientes de luz a caracteres tipográficos (`.:-=+*#%@`). |
| **6** | **`threejs-animation`** | **Física de Inercia y Spring-Damper**: Animación de rotación continua suave (yaw: $0.6 \text{ rad/s}$) acelerada dinámicamente al posar el cursor, con oscilación elástica según la Ley de Hooke amortiguada (resorte $k=0.15$, amortiguamiento $d=0.82$). |
| **7** | **`threejs-materials`** | **Acabado Metálico Neo-Brutalist**: `MeshStandardMaterial` con `metalness: 0.85`, `roughness: 0.25` y colores emisivos (`emissiveIntensity`) sintonizados a la identidad cromática de cada criptomoneda (oro BTC, cobalto ETH, esmeralda USDT, cian-púrpura SOL). |
| **8** | **`threejs-shaders`** | **Efectos Glitch & Shimmer Terminal**: Shaders de vértices para deformación ondulatoria y fragment shaders que cuantizan la iluminación en cuadrículas discretas simulando fósforo CRT o decodificación ASCII matricial. |
| **9** | **`threejs-lighting`** | **Luz de Borde Especular y Cursor Tracking**: `DirectionalLight` superior para marcar las estrías del canto de la moneda y un `PointLight` móvil posicionado en las coordenadas 3D del cursor para producir destellos interactivos en el relieve del logo. |
| **10** | **`threejs-react-three-fiber`** | **Orquestación en React 19 / Next.js 16**: Uso de `@react-three/fiber` con `View` (`drei/core/View`) para sincronizar viewports HTML con el renderizador 3D compartido sin recrear el canvas. |
| **11** | **`threejs-textures`** | **Generación Procedural de Matrices**: `CanvasTexture` dinámico que graba glifos tipográficos en alta definición y los proyecta sobre las caras de las monedas 3D. |
| **12** | **`threejs-loaders`** | **Carga Vectorial SVG**: Uso de `SVGLoader` para parsear curvas de logos oficiales e inflarlas mediante `ExtrudeGeometry` a mallas tridimensionales. |
| **13** | **`threejs-asset-pipeline`** | **Optimización Máxima**: Reutilización de geometrías maestras en memoria (`shared geometry instance`) y disposición estricta con `geometry.dispose()` y `material.dispose()`. |

---

## 2. Estética del Tablero de Pinterest ("The Solar System / ASCII Noir")

El diseño visual hereda directamente los patrones refinados del tablero de Pinterest y los principios anti-slop:

1. **Fondo Carbono Mate Puro (`#000000`, `#09090b`)**: Superficie oscura de software financiero de misión crítica, sin degradados ruidosos.
2. **Retroiluminación Difusa por Token (Back-Glow Aura)**:
   * **Bitcoin (`BTC`)**: Oro Solar (`#F7931A`)
   * **Ethereum (`ETH`)**: Cobalto Eléctrico (`#627EEA`)
   * **Solana (`SOL`)**: Gradiente Cyber Cian-Púrpura (`#14F195` / `#9945FF`)
   * **Avalanche (`AVAX`)**: Rojo Carmesí Volcánico (`#E84142`)
   * **Polygon (`POL`)**: Violeta Profundo (`#8247E5`)
   * **Ripple (`XRP`)**: Azul Hielo Metalizado (`#00AAE4`)
   * **Dogecoin (`DOGE`)**: Oro Cálido (`#C2A633`)
   * **Tether (`USDT`)**: Verde Esmeralda Fósforo (`#26A17B`)
   * **USD Coin (`USDC`)**: Azul Cerúleo Financiero (`#2775CA`)
   * **Dai (`DAI`)**: Ámbar Maker (`#F5AC37`)
   * **Ethena (`USDe`)**: Verde Neón Delta-Neutral (`#A3E635`)
   * **ARGt (`ARGT`)**: Celeste Bandera & Sol de Mayo (`#74ACDF` / `#FFB800`) - *Peg de Belo / PyME Agent*.
   * **PayPal USD (`PYUSD`)**: Azul Corporativo (`#0079C1`)
3. **Anillos Celestiales de Kepler & Satélites**: Anillos concéntricos tangentes y cuentas de Fibonacci que orbitan cada logo al interactuar con el mouse.
4. **Física de Estela Térmica (Bencho.dev `ascii-wake`)**: Al hacer hover sobre una cripto, los caracteres ASCII del logo entran en una onda de mutación de frecuencia alta y se estabilizan en su glifo nítido.

---

## 3. Catálogo de Componentes y Variantes

* `CryptoAsciiBoard.tsx`: Componente maestro React 19 / Next.js 16 que provee:
  * Selector de vistas: **Grid Neo-Brutalist**, **Lista Terminal**, **3D Scissor Canvas** e **Inspector Hero**.
  * Filtros: **Todas**, **Criptomonedas L1/L2**, y **Stablecoins**.
  * Detección cinemática del cursor con inclinación 3D (pitch/yaw/roll) y aceleración de giro.
  * Onda térmica ASCII procedural y partículas orbitales reactivas.
  * Telemetría en tiempo real: Símbolo, Red Nativa, Tipo de Colateral, Hash de Contrato simulado y Peg.
* `demo/crypto_ascii_board.html`: Prototipo interactivo autónomo con Three.js r186 y GSAP para inspección inmediata en cualquier navegador.
