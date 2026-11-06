---
id: ID03
titulo: Scentinel - Nariz Electrónica de Detección de Fugas, Moho y Alimentos en Heladera
tipo: idea-concepto
tags: [idea, e-nose, voc, calidad-aire, tinyml, salud-preventiva, sostenibilidad]
depende_de: [SC03, PAT01]
conectado_con: [HK04]
---

# Propuesta de Hackathon: Scentinel (La Nariz Digital para el Hogar Oculto)

## 1. El Concepto en una Oración (El "Elevator Pitch")
Un clip inteligente para la heladera y ambientes que utiliza un sensor químico de 4 canales de gases volátiles y TinyML para detectar la firma molecular de bacterias patógenas en alimentos 18 horas antes de que tengan mal olor, y advertir de fugas lentas de gases neurotóxicos en el hogar.

## 2. Por qué Ganaría un Hackatón en EE.UU.
- **Encuadre Perfecto para Tracks de Salud y Sustentabilidad**: Encaja tanto en desafíos de *Sustainability* (evitar desperdicio de 1.300 millones de toneladas de alimentos comestibles al año) como en *Healthcare* (evitar intoxicaciones por salmonella o listeria).
- **El Sentido Olfativo es la Última Frontera de la IA**: Todo el mundo hace IA para visión (cámaras) o audio (micrófonos). Casi nadie en un hackathon hace IA para **olfato y química ambiental**.
- **Factor Demo**: En la mesa de jueces, el equipo saca un frasco con un trozo de pollo de hace 3 días que a simple vista y al olfato parece fresco. Scentinel analiza el aire del frasco en 5 segundos, la luz LED pasa de verde a rojo parpadeante y en la pantalla se muestra: *"Alerta: Concentración de sulfuros volátiles y cadaverina al 84% - Riesgo de intoxicación aguda detectado"*.

## 3. Arquitectura Técnica (Factible en 36 Horas)
```
[Sensor Químico BME688 / Serie MQ (VOC, VSC, CO, NO2, Resistencia Térmica)]
                           │ (I2C)
                           ▼
          [Microcontrolador ESP32-S3 con Edge Impulse]
   - Perfil de regresión de gases volátiles (TinyML Random Forest / SVM)
   - Clasificador entrenado con firmas químicas: Carne fresca, inicio de descomposición, moho, fuga de gas
                           │ (BLE / Matter)
                           ▼
 [Anillo LED RGB en el Clip + Widget en Dashboard Web / Notificación Móvil]
```

## 4. Bill of Materials Estimado (BOM < $30 USD)
- Sensor cuádruple de gas Bosch BME688 con IA de gas integrada: $12.00 USD
- Microcontrolador ESP32-C3: $4.50 USD
- Batería recargable tipo botón LIR2450 o LiPo 250mAh: $3.00 USD
- Anillo LED RGB direccionable WS2812: $1.00 USD
- Clip magnético impreso en 3D: $1.50 USD
- **Costo Total BOM**: **~$22.00 USD**

## 5. Enlaces y Relaciones
- [[SC03-fatiga-olfativa-gases-y-alimentos]]: El dolor biológico de la fatiga olfativa.
- [[PAT01-patron-ganador-embodied-ai]]: Captura sensorial más allá de cámaras y micrófonos.
- [[HK04-hackharvard-competidores-clave]]: Ideal para los desafíos de Regeneron y ASUS Sustainability.
