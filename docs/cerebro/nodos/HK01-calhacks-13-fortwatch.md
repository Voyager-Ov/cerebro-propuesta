---
id: HK01
titulo: FortWatch - Detección Acústica Local para Personas Sordas (Cal Hacks 13.0)
tipo: caso-hackathon
hackathon: Cal Hacks 13.0 (San Francisco, Octubre 2026)
galardon: Ganador Best Hardware Hack
equipo: Martin Ezequiel Pulitano, Joaquin Giorgis, Pedro Navajas, Nicolas Pugia
origen_equipo: Argentina (Cordoba, CABA / UCEMA, UTN)
tags: [cal-hacks, hardware, tinyml, esp32, accesibilidad, audio-processing, argentina]
depende_de: []
conectado_con: [PAT01, PAT02, HK03, SC01, SC02, ID01]
---

# FortWatch: Guardián Acústico Táctil y Autónomo

## 1. Resumen del Caso
En **Cal Hacks 13.0** (el hackatón universitario más grande del mundo celebrado en el Palace of Fine Arts de San Francisco con más de 1.900 hackers y 600 proyectos), un equipo 100% argentino compuesto por **Martín Pulitano, Joaquín Giorgis, Pedro Navajas y Nicolás Pujia** se alzó con el premio al **Best Hardware Hack** con el dispositivo **FortWatch**.

## 2. El Problema Cotidiano Invisible
Las personas sordas o hipoacúsicas enfrentan constantes situaciones de riesgo y desconexión en el hogar y en la calle:
- No escuchar el llanto de su bebé mientras duermen o están en otra habitación.
- No oír el timbre de la puerta o a alguien llamando en emergencia.
- No percatarse del chirrido de frenos, bocinazos de autos o sirenas de ambulancias cuando caminan de espaldas al tráfico.
- **La barrera actual**: Dispositivos comerciales como el Apple Watch son caros ($400 - $800 USD), requieren un iPhone de última generación y procesan en la nube o consumen batería en pocas horas, además de no estar optimizados para reconocimiento acústico específico.

## 3. Solución Técnica Implementada
- **Microcontrolador ESP32**: Hardware accesible de menos de $10 USD.
- **TinyML / Inferencia Local On-Device**: Un modelo ligero de clasificación de espectrogramas de audio entrenado para discernir patrones de frecuencia críticos (bocinas, llantos, timbres, alarmas de humo, ladridos de emergencia).
- **Latencia Cero & Privacidad Total**: No transmite voz ni audio a la nube; el procesamiento ocurre 100% en el microchip localmente.
- **Feedback Hápitco y Visual**: Patrones de vibración háptica diferenciados según la urgencia del sonido y display OLED con el ícono y nombre del evento detectado.

## 4. Por qué Ganó (DNA de Victoria)
1. **Contraste Extremo Frugal vs Costoso**: Resolvieron un problema de salud/accesibilidad severo con hardware de costo mínimo accesible para países emergentes.
2. **Demo en Vivo Funcional**: En un hackathon lleno de dashboards de software abstractos, el equipo hizo sonar alarmas y llantos en vivo y el reloj vibró instantáneamente en la muñeca del jurado.
3. **Factibilidad y Empatía Humana**: Impacto social directo y medible sin fricción técnica.

## 5. Enlaces y Relaciones
- [[PAT01-patron-ganador-embodied-ai]]: Implementación pura de IA encarnada en hardware local.
- [[PAT02-patron-accesibilidad-radical-lowcost]]: Costo de lista inferior a $25 USD.
- [[HK03-calhacks-competidores-clave]]: Contexto de los rivales en Cal Hacks 13.0.
- [[ID01-heimlich-aegis-silent-choking-monitor]]: Inspira la detección de patrones críticos sin intervención manual.
