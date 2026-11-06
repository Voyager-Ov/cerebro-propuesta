---
id: ID04
titulo: KeySteady - Llavero Estabilizador Activo Giroscópico para Cerraduras
tipo: idea-concepto
tags: [idea, biomecanica, giroscopio, motricidad-fina, temblores, silver-tech, hardware]
depende_de: [SC05, PAT01, PAT02]
conectado_con: [HK03]
---

# Propuesta de Hackathon: KeySteady (Estabilizador Giroscópico de Bolsillo)

## 1. El Concepto en una Oración (El "Elevator Pitch")
Un llavero ergonómico de mano que utiliza un micro-volante giroscópico contrarrotatorio de alta inercia (Reaction Wheel) para cancelar físicamente los temblores involuntarios de 4 a 8 Hz en personas con Parkinson o temblor esencial, permitiéndoles embocar la llave en la cerradura al primer intento.

## 2. Por qué Ganaría un Hackatón en EE.UU.
- **La Magia de la Física Pura**: A diferencia de soluciones de software que prometen milagros virtuales, la resistencia giroscópica se siente de inmediato en la mano. Cuando el juez toma el llavero y trata de sacudirlo, siente una fuerza física invisible que mantiene la punta de la llave milimétricamente quieta en el espacio.
- **Empatía para la Tercera Edad y Autonomía**: Devuelve la dignidad de entrar a tu propia casa de noche sin tener que depender de un vecino o romper la cerradura.
- **Factor Demo**: Un motor vibra a 6 Hz simulando una mano con Parkinson sosteniendo una llave frente a una maqueta de cerradura: con el sistema apagado, la llave golpea erráticamente el marco; con KeySteady encendido, la llave entra suavemente en la ranura como guiada por un láser.

## 3. Arquitectura Técnica (Factible en 36 Horas)
```
[Sensor IMU MPU6050 (Lectura de aceleración angular a 200 Hz)]
                           │ (I2C)
                           ▼
              [Microcontrolador RP2040 / Arduino Nano]
   - Filtro pasa-altos / Notch filter: separa el temblor involuntario (4-8 Hz) del movimiento intencional (< 1 Hz)
   - Algoritmo PID de torque inverso
                           │ (PWM / ESC)
                           ▼
 [Micro-Motor Brushless BLDC con Volante de Inercia de Latón / Tungsteno]
   - Genera momento angular compensatorio instantáneo en el eje de cabeceo y guiñada
```

## 4. Bill of Materials Estimado (BOM < $35 USD)
- Micro-motor BLDC drone (1103 o 1204) + ESC miniatura: $9.00 USD
- Volante de inercia metálico mecanizado o contrapeso de bronce: $4.00 USD
- IMU 6 ejes MPU6050: $2.00 USD
- Microcontrolador RP2040 Zero: $3.50 USD
- Batería 1S LiPo 450mAh con descarga 25C: $4.00 USD
- Empuñadura ergonómica impresa en 3D: $2.50 USD
- **Costo Total BOM**: **~$25.00 USD**

## 5. Enlaces y Relaciones
- [[SC05-temblores-y-perdida-motricidad-fina]]: Dolor de la pérdida motriz en el día a día.
- [[HK03-calhacks-competidores-clave]]: Inspirado en el enfoque biomecánico de *Sophi*.
- [[PAT01-patron-ganador-embodied-ai]]: Fusión de control motor y sensórica física.
- [[PAT02-patron-accesibilidad-radical-lowcost]]: Costo 10 veces menor a dispositivos ortopédicos de $300 USD.
