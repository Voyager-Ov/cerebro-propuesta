---
id: AR03
titulo: Motor Visual 3D ASCII Blobatar - Orbe Reactivo por Voz y Semilla (ChatGPT Voice + Bencho + Blobatar)
tipo: arquitectura-visual
tags: [ascii, 3d, blobatar, bencho, voice-chat, audio-reactive, threejs, webgl, simplex-noise, dark-mode]
depende_de: [AR01, AR02]
conectado_con: [ID09, ID10, TW02]
---

# Motor Visual: Orbe 3D ASCII Reactivo a Voz y Semillas

## 1. Síntesis Conceptual
Unificación de cuatro paradigmas visuales de vanguardia:
1. **La Interfaz de Voz de ChatGPT**: Un orbe u organismo bioluminiscente central que "respira", escucha, procesa ("piensa") y modula su volumen en tiempo real cuando habla el usuario o la IA.
2. **Blobatar (`blobatar.dev`)**: Morfología 3D orgánica procedural determinada por un string de entrada (*seed*). Cada nombre, contrato, prompt o estado matemático altera los armónicos del ruido tridimensional, creando una identidad biomorfa única y reproducible.
3. **Bencho.dev (`ascii-wake` & `particles`)**: Motor de caracteres tipográficos de alta frecuencia de cuadro con seguimiento de estela gravitacional (*wake effect*) al pasar el cursor o emitir fonemas.
4. **Referencia Estética Pinterest / ASCII Noir**:
   - Caracteres ASCII monocromáticos o con degradado de luminancia (` .:-=+*#%@`).
   - Fondo negro absoluto (`#000000`).
   - **Aura de retroiluminación cromática viva**: Resplandor radial difuso detrás del orbe (azul eléctrico cobalto `#0044FF`, cian `#00F0FF`, violeta o esmeralda) que reacciona a la energía sonora.

---

## 2. Los Cuatro Estados del Orbe (Voice Mode Life-Cycle)

| Estado | Comportamiento Geométrico (Malla 3D) | Comportamiento ASCII / Aura Trasera | Gatillo / Input |
| :--- | :--- | :--- | :--- |
| **1. Idle / Espera** | Pulsación esférica suave (respiración biológica a 0.5 Hz). Amplitud baja de ruido simplex. | Fondo negro, caracteres tenues (`.` y `:`), aura azul cobalto profundo en reposo. | Silencio ambiental. |
| **2. Listening (Usuario Habla)** | Los vértices se deforman instantáneamente según las frecuencias FFT del micrófono (graves dilatan el volumen, agudos generan espículas). | Caracteres de alta densidad (`#`, `%`, `@`), aura que pulsa en tiempo real según los decibeles (azul cobalto brillante / blanco). | Web Audio API `AnalyserNode` en vivo. |
| **3. Thinking (IA Procesa)** | La malla se retuerce de forma toroidal o helicoidal fluida cambiando de semilla (*morphing* orgánico estilo Blobatar). | El aura muta a violeta/ámbar eléctrico con aberración cromática sutil en los bordes ASCII. | `on_prompt_processing` / `contract_resolving`. |
| **4. Speaking (IA Responde)** | Ondulación armónica continua y rítmica como una gota de agua o medusa espacial en gravedad cero. | El aura proyecta un resplandor esmeralda o cian brillante; los caracteres ASCII fluyen desde el núcleo hacia el exterior. | `audio_synthesis_stream` / Cartesia / TTS. |

---

## 3. Arquitectura Matemática y Shader Pipeline
```
[Entrada de Audio / Micrófono] ──► [Web Audio API: FFT Frequency Data (0 - 255)]
                                                      │
[Input de Texto / Seed / Vibe]  ──► [Simplex Noise 3D: Octavas, Frecuencia, Lacunaridad]
                                                      │
                                                      ▼
                              [Three.js: IcosahedronGeometry Subdiv 4-5]
                              [Vertex Displacement: P' = P + Normal * snoise(P, t)]
                                                      │
                                                      ▼
                       [Offscreen Render Buffer (Profundidad + Normales + Iluminación)]
                                                      │
                                                      ▼
                             [AsciiEffect: Luminance ➔ Character Mapper]
                        ( ' . '  ' : '  ' - '  ' = '  ' + '  ' * '  ' # '  ' % '  ' @ ' )
                                                      │
                                                      ▼
                        [Capa Frontal: ASCII Mesh Canvas (Monocromo / Bitonal)]
                        [Capa Trasera: WebGL Radial Glow Blur Shader (Aura Cromática)]
```

---

## 4. Enlaces y Relaciones
- [[AR01-estetica-ascii-3d-dark]]: Fundamentos del motor tipográfico y contraste neo-brutalista.
- [[AR02-figma-code-connect-workflow]]: Mapeo de estados del orbe en el lienzo de Figma.
- [[ID09-escrow-acceptance-criteria-smart-contract]]: El orbe actúa como la "bóveda inteligente" que cambia de forma y color según los criterios cumplidos.
- [[ID10-vibe-brand-os-personal-presence]]: El orbe actúa como el avatar inteligente que representa la "vibra" del usuario en su portafolio.
