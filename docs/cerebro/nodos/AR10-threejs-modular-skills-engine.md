---
id: AR10
titulo: Three.js Suite de Skills Modulares - Gráficos 3D, Shaders y R3F
tipo: arquitectura-visual
tags: [threejs, 3d, webgl, webgpu, shaders, r3f, skills, animation, postprocessing]
depende_de: [AR01, AR03, AR05, AR08]
conectado_con: [AR07, ID09, ID10, TW02]
---

# Three.js Modular Skills: Motor 3D de Alto Rendimiento

Este nodo incorpora el ecosistema de **13 skills modulares de Three.js (r186)** (`CloudAI-X/threejs-skills`) configuradas en Antigravity para gobernar toda la renderización 3D procedural, interacción y shaders del proyecto.

---

## 1. El Catálogo de las 13 Skills de Three.js

Las skills quedan activadas tanto para WebGL tradicional como para el nuevo pipeline WebGPU/TSL:

| Skill | Dominio de Aplicación |
| :--- | :--- |
| **`threejs-fundamentals`** | Setup limpio de escenas, cámaras, `THREE.Timer`, Resize handling y ciclo de vida de render. |
| **`threejs-animation`** | Animación procedural, mezcla de clips (`AnimationMixer`), morph targets y deformación elástica. |
| **`threejs-geometry`** | Geometría procedural, `BufferGeometry`, texto 3D, instancing masivo y `BatchedMesh`. |
| **`threejs-materials`** | Materiales PBR, MeshPhysicalMaterial, Toon shaders y nodos TSL para WebGPU. |
| **`threejs-shaders`** | Shaders GLSL personalizados (vértices y fragmentos), deformación por ruido Simplex y uniforms. |
| **`threejs-postprocessing`** | Cadenas de `EffectComposer`, bloom, SSAO, desenfoque y pases de postprocesado ASCII. |
| **`threejs-interaction`** | Raycasting preciso para hover/click, gestos táctiles y `OrbitControls`/cámaras cinemáticas. |
| **`threejs-lighting`** | Iluminación física, mapas de sombras optimizados e Image-Based Lighting (IBL). |
| **`threejs-textures`** | Carga de texturas HDR/EXR, compresión KTX2 y mapeo UV. |
| **`threejs-loaders`** | Carga optimizada de modelos GLTF/GLB con descompresión Draco. |
| **`threejs-performance`** | Métricas de draw calls, LOD, frustum culling y eliminación de cuellos de botella de GPU. |
| **`threejs-react-three-fiber`** | Integración declarativa con React Three Fiber (`@react-three/fiber`) y `@react-three/drei`. |
| **`threejs-asset-pipeline`** | Optimización de assets con `gltf-transform`, compresión meshopt y cuantización. |

---

## 2. Aplicación Directa al Motor ASCII del Hackathon

En el contexto de nuestros prototipos (`demo/prototype4.html`, `AR03`, `AR05`, `AR07`):
1. **Shaders de Deformación Sonora**: `threejs-shaders` guía la inyección de ondas de voz en la geometría del orbe (`Blobatar`) en tiempo real.
2. **Física de Resorte e Interacción**: `threejs-interaction` y `threejs-animation` controlan el squish reactivo al cursor sin jank.
3. **Efecto ASCII Post-process**: `threejs-postprocessing` desacopla el cálculo de iluminación 3D del mapeo de caracteres tipográficos monocromáticos.
