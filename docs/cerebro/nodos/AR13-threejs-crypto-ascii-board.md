---
id: AR13
titulo: Suite Three.js r186 & Tablero de Criptomonedas y Stablecoins Voxel 3D (Referencia Pinterest Pin 636063147423013825)
tipo: arquitectura-visual
tags: [threejs, voxel, crypto, stablecoins, pinterest-board, segmint-poster, instanced-mesh, raycasting, webgl, shaders]
depende_de: [AR01, AR03, AR05, AR07, AR08, AR10, AR12]
conectado_con: [FN01, FN02, ID06, ID07, ID08]
---

# Suite Three.js r186 & Tablero de Criptomonedas y Stablecoins Voxel 3D

Este nodo documenta la arquitectura técnica para renderizar logos de criptomonedas y stablecoins en **monedas y componentes Voxel 3D en relieve**, integrando la estética exacta del póster de **Segmint 2023** subido en el tablero de Pinterest (`https://pin.it/6o48K3g0P` / `demo/pin_reference.jpg`), junto con el motor de **Three.js r186** con `InstancedMesh` e interacción física de resorte al pasar el ratón.

---

## 1. Auditoría de las 13 Librerías / Skills de Three.js

Para renderizar múltiples criptomonedas y stablecoins en una lista o grilla interactiva sin colapsar el navegador, analizamos las 13 skills oficiales de Three.js:

| # | Skill / Módulo Three.js | Diagnóstico y Solución Arquitectónica para el Tablero Crypto |
|---|---|---|
| **1** | **`threejs-performance`** | **La Regla de Oro del Canvas Único**: Los navegadores limitan los contextos WebGL independientes a 8–16. Crear un `<canvas>` Three.js por cada fila o card de cripto destruye silenciosamente los contextos más antiguos. La solución canónica es el **Single-Canvas Multi-Viewport con Scissor Test (`renderer.setScissorTest(true)`)** o un **Hero Viewport reactivo**, renderizando decenas de tokens con 1 solo contexto WebGL y 60 FPS garantizados. |
| **2** | **`threejs-geometry`** | **Instanced Voxel Meshes**: En lugar de mallas estáticas pesadas, se utiliza `THREE.InstancedMesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), material, count)`. Una grilla circular de $34 \times 34$ cubos se dibuja en **1 sola draw call**, permitiendo esculpir el relieve de cualquier logo (ETH, BTC, SOL, AVAX, USDT, USDC, DAI, ARGT). |
| **3** | **`threejs-fundamentals`** | Ciclo de vida gobernado por `THREE.Timer` y `THREE.Clock` conectado al DOM para evitar que el delta se dispare al minimizar la pestaña. |
| **4** | **`threejs-interaction`** | **Raycasting y Seguimiento del Cursor**: Cálculo de inclinación 3D en tiempo real (pitch/yaw) a partir de las coordenadas del puntero normalizadas `[-1, 1]`. |
| **5** | **`threejs-materials`** | `MeshStandardMaterial` con `metalness: 0.35` y `roughness: 0.25` para destacar los bordes biselados de cada cubo voxel individual bajo luces direccionales. |
| **6** | **`threejs-lighting`** | `DirectionalLight` para generar sombras de oclusión entre los cubos y un `PointLight` móvil sincronizado con el ratón que ilumina dinámicamente las crestas del logo. |
| **7** | **`threejs-animation`** | Ecuación de resorte amortiguado (Hooke's Law / Spring-Damper) para una oscilación táctil fluida sin movimientos mecánicos rígidos. |
| **8** | **`threejs-postprocessing`** | Tonemapping cinematográfico `ACESFilmicToneMapping` con exposición calibrada a 1.25. |
| **9** | **`threejs-shaders`** | Cuantización de color y deformación de altura por instancia (`instanceMatrix` y `instanceColor`). |
| **10** | **`threejs-react-three-fiber`** | Orquestación declarativa en React 19 y Next.js 16. |
| **11** | **`threejs-textures`** | Matrices de altura procedurales en tiempo de ejecución. |
| **12** | **`threejs-loaders`** | Carga de tipografía pixelada `Silkscreen` para los titulares del póster. |
| **13** | **`threejs-asset-pipeline`** | Liberación estricta de memoria con `dispose()` en geometrías y materiales instanciados. |

---

## 2. La Referencia Canónica del Pin de Pinterest (Segmint 2023 - Pin #636063147423013825)

El usuario identificó como referencia definitiva el póster de **Segmint 2023** (`https://pin.it/6o48K3g0P` / `demo/pin_reference.jpg`):

1. **Medalla / Moneda Voxel Cilíndrica 3D**:
   * En lugar de arte tipográfico plano con signos de puntuación (`/ \ | -`), la moneda es una plataforma circular tridimensional construida con **cientos de micro-cubos / voxels (`THREE.InstancedMesh(new THREE.BoxGeometry(...))`)**.
   * El logo (Ethereum, Bitcoin, Solana, Avalanche, USDT, USDC, DAI, ARGt) se encuentra **esculpido en relieve 3D sobre la superficie del disco de cubos**, con facetas inclinadas, variación de altura y sombras proyectadas.
2. **Tipografía Pixelada & Estética Editorial Suiza**:
   * Titular en tipografía pixelada 8-bit (`Silkscreen`) en caja alta (*"THANKS FOR WATCH"*, *"SEGMINT 2026"*).
   * Transición de **dispersión de píxeles (pixel dither / particle cloud)** desde el lienzo superior hacia el pie editorial blanco/gris.
3. **Interacción con Hover en Three.js**:
   * Al mover el cursor, la moneda voxel se inclina en perspectiva 3D (pitch y yaw con resorte amortiguado de Hooke).
   * La luz puntual PBR persigue al ratón generando destellos especulares en las aristas de los cubos.
   * Micro-cubos en órbita flotante alrededor de la moneda simulan la nube de píxeles dispersos del póster.

---

## 3. Catálogo de Componentes y Variantes

* `CryptoAsciiBoard.tsx`: Componente maestro React 19 / Next.js 16 con selector de tema (*Segmint Cobalt Blue* o *Void Carbon Black*), escenario 3D Voxel interactivo con Three.js r186 e `InstancedMesh`, y tarjetas con arte de bloques Unicode 3D de alta densidad (`█`, `▓`, `▒`, `░`, `▀`, `▄`).
* `demo/crypto_ascii_board.html`: Prototipo interactivo autónomo con Three.js r186 reproduciendo fielmente el póster de Segmint 2023.
* `demo/voxel_crypto_pin.html`: Escenario aislado de validación voxel 3D con mutación dinámica de tokens.
