---
id: ID05
titulo: Clarity - Pin Decodificador de Prosodia y Micro-Alertas de Subtexto
tipo: idea-concepto
tags: [idea, neurodivergencia, prosodia, haptica, audio-local, autismo, tdah, edge-ai]
depende_de: [SC04, PAT01]
conectado_con: [HK01]
---

# Propuesta de Hackathon: Clarity (El Intérprete Táctil de Subtexto Humano)

## 1. El Concepto en una Oración (El "Elevator Pitch")
Un pin magnético para la solapa que analiza en tiempo real la prosodia acústica y entonación de conversaciones (sin grabar palabras ni texto por privacidad), transmitiendo mediante micro-pulsos hápticos en un anillo si el interlocutor está usando sarcasmo, escalando en tensión o demostrando aburrimiento.

## 2. Por qué Ganaría un Hackatón en EE.UU.
- **La Neurodivergencia es el Gran Tema Olvidado de la IA**: Más del 20% de la población mundial tiene condiciones neurodivergentes (espectro autista, TDAH, fobia social) para quienes descifrar el lenguaje no verbal en entrevistas de trabajo, citas o negociaciones es una fuente extrema de fatiga y ansiedad.
- **Privacidad Radical por Diseño**: No es una grabadora espía. El modelo TinyML procesa directamente coeficientes MFCC (Mel-Frequency Cepstral Coefficients) y modulación de pitch (F0), descartando el contenido léxico. No sabe de qué hablas, solo **cómo suena la emoción**.
- **Factor Demo**: Un participante del equipo le dice al otro con tono sarcástico y seco: *"Claro, tu idea es brillante, sos un genio"*. El pin capta la contradicción entre el tono descendente y la cadencia lenta, y el anillo en el dedo del jurado emite una doble vibración suave: *"Sarcasmo / Discrepancia detectada"*.

## 3. Arquitectura Técnica (Factible en 36 Horas)
```
[Micrófono MEMS I2S de Alta Sensibilidad en la Solapa]
                           │ (I2S DMA)
                           ▼
          [Microcontrolador ESP32-S3 (TinyML con Edge Impulse)]
   - Extracción de características prosódicas: Pitch fundamental (F0), jitter, shimmer, pausas
   - Clasificador ligero de estados prosódicos (Neutral, Tensión/Ira, Sarcasmo/Ironía, Fatiga/Desinterés)
                           │ (ESP-NOW / BLE Ultra-baja latencia < 30ms)
                           ▼
 [Anillo / Parche Háptico: Micro-Actuador Táctil Háptico Resonante]
   - Patrón háptico silencioso y discreto (solo el usuario lo siente en su piel)
```

## 4. Bill of Materials Estimado (BOM < $30 USD)
- Microcontrolador ESP32-S3 Stamp: $5.00 USD
- Micrófono MEMS I2S INMP441: $1.80 USD
- Micro-motor háptico de disco (Coin motor) para el anillo: $1.50 USD
- Transceptor Bluetooth / ESP-NOW miniatura: integrado en SoC
- 2x Baterías LiPo 120mAh (una en pin, una en anillo): $5.00 USD
- Cajas impresas en 3D con imanes de neodimio: $2.50 USD
- **Costo Total BOM**: **~$15.80 USD**

## 5. Enlaces y Relaciones
- [[SC04-ceguera-temporal-paralisis-tdah]]: Alivio de la carga cognitiva en situaciones cotidianas.
- [[PAT01-patron-ganador-embodied-ai]]: Traducción de señal acústica analógica a háptica sin pantallas.
- [[HK01-calhacks-13-fortwatch]]: Mismo principio de microfonía local y privacidad on-device.
