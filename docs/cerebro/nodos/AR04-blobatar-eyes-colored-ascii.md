---
id: AR04
titulo: Prototipo 2 - Blobatar 3D ASCII con Ojos Hollow y Color Directo (Sin Aura)
tipo: arquitectura-visual
tags: [ascii, blobatar, hollow-eyes, colored-ascii, prototype-2, threejs, smooth-morphing, mouse-tracking]
depende_de: [AR01, AR02, AR03]
conectado_con: [ID09, ID10, TW02]
---

# Prototipo 2: Evolución Blobatar 3D ASCII

Este nodo documenta la transición arquitectónica desde el **Prototipo 1** hacia el **Prototipo 2** y define la base para el futuro **Prototipo 3**.

---

## 1. Cambios Clave Respecto al Prototipo 1

| Componente | Prototipo 1 (`demo/index.html`) | Prototipo 2 (`demo/prototype2.html`) |
| :--- | :--- | :--- |
| **Color del ASCII** | Caracteres monocromáticos proyectados sobre un fondo con aura difusa CSS. | **Color directo sobre cada caracter ASCII** en canvas 2D; fondo negro absoluto (`#000000`) sin resplandores borrosos. |
| **Fisonomía** | Malla esférica simétrica con ruido simplex estándar. | **Morfología orgánica estilo Blobatar** (baja frecuencia, lóbulos suaves redondeados y asimetría). |
| **Rasgos Faciales** | Ninguno (solo volumen abstracto). | **Dos ojos huecos ("Hollow Eyes")**: dos cavidades oscuras cilíndricas/esféricas que siguen intensamente al cursor. |
| **Seguimiento al Mouse** | Inclinación giroscópica sutil del cuerpo. | **Tracking desacoplado de alta sensibilidad**: el cuerpo rota suavemente, mientras que los ojos se desplazan velozmente hacia el cursor. |
| **Transición de Estado** | Cambio brusco de semilla matemática. | **Morfología prolongada y suave (~1.2s)** con interpolación cúbica (*ease-in-out*) para evitar sensación de congelamiento. |

---

## 2. Anatomía de los Ojos Hollow (Dos Huecos)

En el motor de renderizado (`renderColoredAscii`):
1. **Coordenadas 3D de los Ojos**:
   $$\vec{P}_{\text{eye}} = (\pm \text{spread} + \text{mouse}_x \cdot K_x, \text{elev} + \text{mouse}_y \cdot K_y, Z_{\text{front}})$$
2. **Proyección a la Grilla ASCII**:
   Se proyecta el vector 3D con la cámara para obtener las celdas $(col, row)$ exactas en la matriz de texto.
3. **Corte Negativo (Negative Space)**:
   Si la distancia a cualquiera de los dos centros de ojo es inferior al radio $R_{\text{hole}}$, el píxel se descarta por completo (`continue`), dejando un espacio en negro puro en el rostro del personaje.
4. **Borde de Contorno**:
   En la frontera exterior ($R_{\text{hole}} < d < R_{\text{hole}} + 1.2$), se dibuja un caracter tenue (`:`) a bajo brillo para dar definición a la cuenca ocular.

---

## 3. Roadmap de Versiones

* **Prototipo 1 (`demo/index.html`)**: Monocromo + Aura difusa + Esfera simple. *(Archivado como primer intento).*
* **Prototipo 2 (`demo/prototype2.html`)**: Color directo en caracteres + Dos huecos de ojos con tracking intenso + Morfología suave Blobatar.
* **Prototipo 3 (Próximo paso)**:
  * Animación reactiva al pasar el mouse por encima (*hover squish / jiggle physics*).
  * Reacción táctil al hacer clic (parpadeo de ojos / guiño / onda expansiva de caracteres).
  * Expresiones emocionales dinámicas según el tono de la conversación.

---

## 4. Enlaces y Relaciones
- [[AR03-ascii-voice-blob-engine]]: Base matemática del ruido simplex.
- [[AR01-estetica-ascii-3d-dark]]: Paletas de color directo (Cobalt, Cyan, Purple).
- [[ID10-vibe-brand-os-personal-presence]]: Implementación en el portafolio personal.
