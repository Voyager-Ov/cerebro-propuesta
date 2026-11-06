---
id: AR05
titulo: Prototipo 3 - Física de Resorte (Hover Squish), Click Blink y Ondas Cinéticas
tipo: arquitectura-visual
tags: [ascii, prototype-3, spring-damper, hover-squish, blink, ripple-wave, interactive-physics]
depende_de: [AR03, AR04]
conectado_con: [AR06, ID09, ID10]
---

# Prototipo 3: Física Reactiva de Resorte, Parpadeo y Ondas

El **Prototipo 3** (`demo/prototype3.html`) transforma el orbe de una animación pasiva a una criatura virtual completamente táctil e interactiva.

---

## 1. Mecánica 1: Hover Squish con Física Spring-Damper (Ley de Hooke)

Al pasar el cursor sobre el orbe, el cuerpo no se deforma rígidamente; se aplasta elásticamente como una masa gelatinosa.

### Formulación Matemática:
$$F = -k \cdot (y - y_{\text{target}}) - c \cdot v$$
* $k = 180.0$ (Rigidez del resorte / *Stiffness*).
* $c = 12.0$ (Coeficiente de amortiguamiento / *Damping*).
* $y_{\text{target}} = 0.88$ (Aplastamiento vertical del 12% cuando `isHovered = true`).

### Conservación de Volumen:
Para mantener la ilusión biológica, cuando la masa se comprime verticalmente en el eje $Y$, debe expandirse proporcionalmente en los ejes $X$ y $Z$:
$$\text{scale}_{XZ} = 1.0 + (1.0 - \text{scale}_Y) \cdot 0.55$$

---

## 2. Mecánica 2: Click Reaction (Parpadeo / Eye Blink)

Al hacer clic o tocar con el dedo en la pantalla:
1. **Compresión del Eje Ocular**:
   El radio vertical de los dos huecos de los ojos se colapsa a una ranura horizontal (`- -`) durante 180 ms.
2. **Rebote Elástico (*Jiggle*)**:
   El clic inyecta un impulso de velocidad negativa (`squishVelocity -= 0.85`), provocando un rebote oscilatorio visible en los caracteres ASCII.
3. **Onda Expansiva (*Kinetic Ripple*)**:
   Una onda concéntrica recorre la superficie desde el centro hacia afuera, sobrecargando temporalmente la luminosidad de los caracteres ASCII en el frente de onda con glifos de máxima densidad (`@`).

---

## 3. Demostración en Vivo
* Archivo ejecutable: [`demo/prototype3.html`](file:///c:/Users/pepep/hacktwin/demo/prototype3.html)
* URL en red local (Tablet): `http://192.168.1.3:8080/demo/prototype3.html`
