---
id: HK02
titulo: FEEL - Radar Háptico Espacial en la Palma de la Mano (HackHarvard 2026)
tipo: caso-hackathon
hackathon: HackHarvard 2026 (Cambridge / Harvard University, Octubre 2026)
galardon: Primer Premio General (Grand Prize) & Ganador Hardware for Good
equipo: Martin Ezequiel Pulitano (UCEMA - Argentina), Benjamin Liu, Isabella Chen, Ethan Chen
origen_equipo: Liderazgo técnico argentino e internacional
tags: [hackharvard, hardware-for-good, lidar, haptica, ceguera, spatial-ai, argentina]
depende_de: []
conectado_con: [PAT01, PAT02, HK04, SC02, ID02]
---

# FEEL: La Habitación en la Palma de tu Mano

## 1. Resumen del Caso
En **HackHarvard 2026: Hack to the Moon** (la 11.ª edición del hackatón insignia de la Universidad de Harvard con más de 500 participantes internacionales en el David Rubenstein Treehouse), el estudiante argentino **Martín Ezequiel Pulitano** (20 años, estudiante de Ingeniería Informática en UCEMA) junto a su equipo se consagró con el **Primer Premio General Absoluto (1st Place Overall)** y el premio **Hardware for Good**.

## 2. El Problema Cotidiano Invisible
Para una persona ciega o con baja visión severa:
- El bastón blanco solo detecta objetos al nivel del piso en un radio de 1 metro y no advierte peligros a la altura del pecho o la cabeza (andamios, ramas, puertas abiertas, carteles).
- Las apps de navegación auditiva tradicionales saturan el oído con voces artificiales continuas ("a 3 metros doble a la derecha"), privando al usuario de su sentido auditivo natural, que es vital para escuchar el tráfico, pasos o el eco ambiental.
- Perder la orientación espacial fina dentro de interiores (aeropuertos, pasillos, aulas, encontrar una silla libre o una puerta de salida).

## 3. Solución Técnica Implementada
- **Puck Háptico en la Palma**: Un dispositivo ergonómico de 24 pines electromecánicos que descansan directamente sobre la palma de la mano (una de las zonas con mayor densidad de terminaciones nerviosas del cuerpo humano).
- **Percepción Espacial con LiDAR y Visión**: Utiliza el sensor LiDAR y las cámaras del smartphone para mapear en tiempo real la nube de puntos 3D del entorno inmediato hasta 5 metros con un campo visual de 180°.
- **Traducción Háptica Directa**: 
  - La matriz de pines "dibuja" la topografía física del espacio: los pines se elevan o bajan imitando la cercanía de paredes y obstáculos.
  - Al preguntar por voz *"¿Dónde está la salida?"* o *"¿Hay una silla vacía?"*, los pines pulsan vectorialmente en la palma apuntando la dirección exacta como una brújula táctil invisible.
- **BOM Frugal**: Prototipo fabricado con piezas impresas en 3D y actuadores miniatura con un costo de lista de componentes de **~$70 USD**.

## 4. Por qué Conquistó Harvard
1. **Sustitución Sensorial Elegante**: En lugar de aturdir al usuario con más sonido, activó el sentido del tacto palmar, dejando libre el oído y la atención.
2. **Impacto Emocional Inmediato en el Jurado**: Los jueces pudieron ponerse el puck en la mano, cerrar los ojos y caminar guiados exclusivamente por los pulsos en la palma sin tropezar.
3. **Hardware + IA Generativa / Espacial en 36 Horas**: La ejecución física completa en menos de 48 horas demostró un nivel técnico descollante frente a proyectos puramente de software.

## 5. Enlaces y Relaciones
- [[PAT01-patron-ganador-embodied-ai]]: Fusión de sensor 3D e interfaz corporal háptica.
- [[PAT02-patron-accesibilidad-radical-lowcost]]: Costo ~$70 USD vs dispositivos médicos de $5.000 USD.
- [[HK04-hackharvard-competidores-clave]]: Contexto del ecosistema HackHarvard 2026.
- [[SC02-obstaculos-altos-y-friccion-espacial]]: Análisis a fondo del dolor cotidiano resuelto.
- [[ID02-aurahaptic-tactile-compass-blind-navigation]]: Evolución conceptual y derivados.
