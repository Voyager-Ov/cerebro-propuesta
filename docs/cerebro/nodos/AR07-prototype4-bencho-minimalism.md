---
id: AR07
titulo: Prototipo 4 - Minimalismo Estilo Bencho.dev (Dock Flotante Vidriado y Píldoras)
tipo: arquitectura-visual
tags: [ascii, prototype-4, bencho-dev, minimalism, floating-dock, glassmorphism, micro-interactions]
depende_de: [AR05, AR06]
conectado_con: [ID09, ID10, TW02]
---

# Prototipo 4: Minimalismo Refinado Estilo Bencho.dev

El **Prototipo 4** (`demo/prototype4.html`) elimina toda la tosquedad de los marcos de juego tipo HUD cibernético de versiones previas, adoptando la filosofía de diseño ultra-minimalista y refinada de **Bencho.dev** (Lorenzo Cabra).

---

## 1. Filosofía de Reducción Visual (De HUD a Glass Dock)

| Elemento | Prototipo 3 (HUD Clásico) | Prototipo 4 (Estilo Bencho.dev) |
| :--- | :--- | :--- |
| **Estructura** | Marcos rectangulares rígidos con bordes gruesos arriba y abajo. | **Dock flotante en píldora de vidrio** (`border-radius: 9999px`, `backdrop-filter: blur(24px)`). |
| **Controles de Estado** | Botones individuales toscos con texto en mayúsculas `[RESPIRAR]`. | **Segmented Control elíptico** con micro-iconos vectoriales SVG y pastilla activa blanca deslizante. |
| **Input de Semilla** | Caja rectangular pesada con etiquetas grandes. | **Cápsula de semilla integrada en el dock** con icono minimalista de ajustes. |
| **Tipografía de Interfaz** | Monospace tosca en toda la pantalla. | **Sans-serif limpia (`Inter / Apple System`) para la UI**, reservando `JetBrains Mono` solo para el renderizado ASCII. |
| **Paleta y Marca** | Textos largos de estado. | **Micro-badge superior sutil**: `blobatar / ascii 3d` con punto verde pulsante de 6px y swatch de color flotante. |

---

## 2. Anatomía del Dock Flotante Vidriado

```
┌───────────────────────────────────────────────────────────────────────────┐
│  (⚙ Bencho-Craft-04)  │   (✦ Idle)  (🎙 Voice)  (✨ Think)  (🔊 Speak)    │
└───────────────────────────────────────────────────────────────────────────┘
```

### Especificación de Estilos CSS Clave:
```css
.dock {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 6px;
  background: rgba(14, 14, 16, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(24px);
  border-radius: 9999px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.9);
}

.pill-btn.active {
  color: #000000;
  background: #FFFFFF;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.25);
}
```

---

## 3. Preservación de la Física Interactiva
A pesar de la reducción extrema de la interfaz, se mantienen intactas todas las capacidades interactivas del motor:
- **Hover Squish (Física Spring-Damper)**: Aplastamiento elástico en $Y$ y expansión en $X/Z$.
- **Click Blink**: Parpadeo expressivo de los ojos en ranura horizontal y onda expansiva de caracteres `@`.
- **Hollow Eyes**: Dos cuencas en negro puro que siguen al cursor con alta sensibilidad.
- **Micro-hint inferior**: Whisper text discreto: `Hover to squish · Click to blink · Drag to rotate`.

---

## 4. Enlaces y Relaciones
- [[AR05-prototype3-hover-jiggle-physics]]: Base de la simulación de resortes.
- [[AR06-figma-to-react-nextjs-pipeline]]: Componentización en Next.js con Tailwind.
- [[ID10-vibe-brand-os-personal-presence]]: UI final minimalista para el portafolio personal.
