---
id: ID02
titulo: SoloSight Aura - Micro-Radar Háptico de Cuello para Obstáculos Aéreos
tipo: idea-concepto
tags: [idea, lidar, haptica, ceguera, collar-inteligente, tof-sensor, accesibilidad]
depende_de: [SC02, PAT01, PAT02]
conectado_con: [HK02]
---

# Propuesta de Hackathon: SoloSight Aura (El Escudo Háptico para Ciegos)

## 1. El Concepto en una Oración (El "Elevator Pitch")
Un collar discreto y ultraliviano equipado con un arreglo de sensores de tiempo de vuelo (LiDAR ToF multizona) que proyecta un "cono de protección aérea" hacia la altura de la cabeza y el pecho, traduciendo ramas, andamios y toldos en microvibraciones proporcionales sobre las clavículas.

## 2. Por qué Ganaría un Hackatón en EE.UU.
- **Continúa y Expande la Filosofía de FEEL (HackHarvard)**: En vez de un dispositivo que ocupa una mano, este collar deja **ambas manos 100% libres** (una para el bastón blanco tradicional y la otra para llevar compras o abrir puertas).
- **Complementariedad Perfecta**: No compite con el bastón blanco; cubre exactamente el 50% del espacio que el bastón no puede tocar (la mitad superior del cuerpo).
- **Factor Demo Inmersivo**: El jurado se venda los ojos, camina hacia una rama suspendida o una viga de cartón a la altura de la cara, y el collar vibra suavemente en la clavícula izquierda o derecha permitiéndole esquivarla sin levantar las manos.

## 3. Arquitectura Técnica (Factible en 36 Horas)
```
[Sensor VL53L5CX ToF Multizona 8x8 (64 zonas de profundidad 3D)]
                           │ (I2C)
                           ▼
          [Microcontrolador Seeed Xiao ESP32-C3 / RP2040]
   - Filtrado de nube de puntos: ignora el suelo y objetos lejanos (> 2.5m)
   - Mapeo de vectores espaciales: calcula la trayectoria de colisión con la cabeza
                           │ (PWM)
                           ▼
[Banda Háptica Clavicular: 2x Motores LRA (Linear Resonant Actuators)]
   - Vibración izquierda / derecha según la dirección del obstáculo
   - Frecuencia proporcional a la proximidad (más cerca = mayor intensidad háptica)
```

## 4. Bill of Materials Estimado (BOM < $40 USD)
- Sensor ToF VL53L5CX (matriz 8x8 de distancia): $14.00 USD
- Microcontrolador Xiao ESP32-C3: $5.00 USD
- 2x Motores hápticos LRA + drivers DRV2605L: $8.00 USD
- Batería LiPo 350mAh ultraplana: $3.50 USD
- Collar ergonómico impreso en 3D en TPU flexible: $2.50 USD
- **Costo Total BOM**: **~$33.00 USD**

## 5. Enlaces y Relaciones
- [[SC02-obstaculos-altos-y-friccion-espacial]]: Diagnóstico del punto ciego aéreo.
- [[HK02-hackharvard-2026-feel]]: Inspiración directa en sustitución sensorial háptica.
- [[PAT01-patron-ganador-embodied-ai]]: Fusión sensorial corporal sin pantallas.
- [[PAT02-patron-accesibilidad-radical-lowcost]]: Costo $33 USD vs dispositivos comerciales de $3.000 USD.
