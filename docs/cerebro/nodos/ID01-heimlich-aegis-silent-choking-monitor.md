---
id: ID01
titulo: Aegis - Detector Inercial y Acústico de Asfixia Silenciosa para Solitarios
tipo: idea-concepto
tags: [idea, hardware, imu, audio, esp32, salvavidas, tinyml, urgencia-medica]
depende_de: [SC01, PAT01, PAT02]
conectado_con: [HK01, HK03]
---

# Propuesta de Hackathon: Aegis (El Ángel Guardián para la Asfixia Solitaria)

## 1. El Concepto en una Oración (El "Elevator Pitch")
Un colgante o parche ligero con sensor acústico de contacto y acelerómetro que detecta en menos de 15 segundos el patrón biomecánico de asfixia por comida en personas solas, disparando una baliza sonora de emergencia y una llamada automática de auxilio con geolocalización antes de la pérdida de conocimiento.

## 2. Por qué Ganaría un Hackatón en EE.UU.
- **Narrativa Conmovedora y Urgente**: Resuelve una muerte 100% prevenible que afecta a más de 5.000 personas al año (y millones que comen solas con miedo a atragantarse).
- **El Jurado Queda en Shock con la Realidad Médica**: Explicar que la víctima *no puede hablar ni pedirle a Siri que llame a una ambulancia* crea un impacto inmediato.
- **Factor Demo Brutal**: En la mesa de jueces, un integrante del equipo se pone el sensor en el cuello, finge comer y simula los espasmos convulsivos sin emitir voz: en 12 segundos, Aegis detecta la oclusión traqueal, la sirena local suena a 100 dB y el celular del juez recibe un SMS de socorro con mapa en tiempo real.

## 3. Arquitectura Técnica (Factible en 36 Horas)
```
[Sensor Acústico Piezoeléctrico en Tráquea + IMU 6-Ejes MPU6050]
                           │ (I2C / ADC)
                           ▼
          [Microcontrolador ESP32-S3 (TinyML Local)]
   - Modelo de detección de espasmos respiratorios inerciales
   - Verificación de ausencia de flujo sonoro aéreo (Sonido = 0 + IMU = Espasmo)
   - Detección de gesto de manos al cuello (maniobra de asfixia)
                           │ (Bluetooth BLE / Wi-Fi)
                           ▼
 [Sirena Piezoeléctrica Local (100 dB)] + [App / API Twilio SMS & Llamada 911]
```

## 4. Bill of Materials Estimado (BOM < $25 USD)
- Microcontrolador ESP32-S3 Mini: $4.50 USD
- Sensor IMU 6 ejes MPU6050 / LSM6DS3: $2.00 USD
- Sensor piezoeléctrico de contacto acústico: $1.20 USD
- Buzzer piezoeléctrico de alta potencia: $1.00 USD
- Batería LiPo 500mAh + módulo cargador TP4056: $4.00 USD
- Carcasa impresa en 3D en resina o filamento flexible TPU: $2.00 USD
- **Costo Total BOM**: **~$14.70 USD**

## 5. Enlaces y Relaciones
- [[SC01-asfixia-silenciosa-solitarios]]: Análisis del problema cotidiano invisible.
- [[PAT01-patron-ganador-embodied-ai]]: Inferencia de señales físicas crudas en tiempo real.
- [[PAT02-patron-accesibilidad-radical-lowcost]]: Costo inferior a $15 USD.
- [[HK01-calhacks-13-fortwatch]]: Comparte el stack de ESP32 + TinyML local.
