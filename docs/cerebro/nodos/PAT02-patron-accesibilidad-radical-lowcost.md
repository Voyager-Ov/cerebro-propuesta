---
id: PAT02
titulo: Patrón Accesibilidad Radical de Bajo Costo (BOM < $80)
tipo: patron-ganador
tags: [patron, accesibilidad, frugal-engineering, esp32, 3d-printing, impacto-social]
depende_de: []
conectado_con: [HK01, HK02, HK03, ID01, ID02, ID04]
---

# Patrón Ganador: Accesibilidad Radical y Frugal Engineering

Tanto **FortWatch** en Cal Hacks como **FEEL** en HackHarvard comparten un núcleo socioeconómico demoledor: **democratizar tecnología que hoy cuesta miles de dólares en monopolios médicos**.

## 1. La Discrepancia del Mercado Actual
- **Mercado Médico Tradicional**:
  - Un audífono con procesamiento direccional avanzado cuesta entre $2.000 y $6.000 USD.
  - Una prótesis o dispositivo de visión asistida comercial (como OrCam) cuesta $4.000 USD.
  - Esto margina al 90% de la población mundial con discapacidades en América Latina, África y el sudeste asiático.
- **La Disrupción de Hackathon (BOM < $80 USD)**:
  - Microchips como ESP32, Raspberry Pi RP2040 o Seeed Xiao cuestan entre $3 y $8 USD.
  - Sensores MEMS (micrófonos I2S, IMUs de 6 ejes, sensores de distancia ToF) cuestan entre $1 y $5 USD.
  - Carcasas impresas en filamento PLA/PETG cuestan menos de $1 USD en material.

## 2. Factores de Empatía que Conquistan a los Jueces
1. **La Narrativa "Anti-Corporate / Frugal"**:
   - Presentar cómo un grupo de estudiantes de universidades de Argentina o países emergentes logra el 85% de la funcionalidad de un equipo médico de $5.000 USD con un circuito de $20 USD.
   - Genera una simpatía moral inmediata que coloca al proyecto en el radar de premios como *Hardware for Good*, *Grand Prize* y *Social Impact*.
2. **Universalidad (Curb-Cut Effect)**:
   - Las rampas de las esquinas fueron diseñadas para personas en sillas de ruedas, pero hoy benefician a personas con cochecitos de bebé, valijas y repartidores en bicicleta.
   - Un proyecto de accesibilidad radical que resuelve un caso extremo (ej. personas sordas) tiene un caso de uso masivo adyacente (ej. trabajadores en entornos industriales ruidosos, bomberos en incendios, buceadores, gamers).

## 3. Lista de Verificación para Prototipar en Hackathons
- [ ] ¿El Bill of Materials (BOM) es menor a $80 USD?
- [ ] ¿Requiere suscripción mensual o servidores pesados? (Ideal: autosuficiente o edge-first).
- [ ] ¿Es reparable o fabricable con herramientas hogareñas / makerspace?
- [ ] ¿Dignifica a la persona? (Evitar diseños estigmatizantes o aparatosos tipo "casco de laboratorio"; preferir factores de forma discretos como collares, anillos, pulseras o pucks).

## 4. Enlaces y Relaciones
- [[HK01-calhacks-13-fortwatch]]: Dispositivo accesible por una fracción del costo de un smartwatch comercial.
- [[HK02-hackharvard-2026-feel]]: Alternativa al bastón blanco por ~$70 USD.
- [[ID01-heimlich-aegis-silent-choking-monitor]]: Prevención doméstica accesible a cualquier hogar.
- [[ID04-kinetic-stabilizer-smart-keyring]]: Mecanismo pasivo-activo de bajo costo para temblores.
