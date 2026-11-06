---
id: AR02
titulo: Flujo de Mapeo Figma a Código y Gestión del Lienzo Infinito
tipo: arquitectura-visual
tags: [figma, code-connect, dev-mode, design-systems, ui-mapping, dev-workflow]
depende_de: []
conectado_con: [AR01, ID09, ID10]
---

# Flujo de Trabajo: Mapeo de Pantallas Figma en Lienzo Infinito hacia Código

## 1. La Herramienta Recomendada
Para mantener el lienzo infinito de Figma vinculado con el código del proyecto, la integración directa se realiza mediante:
1. **Plugin de Figma para Antigravity**: Permite leer nodos de Figma, inspeccionar jerarquías y sincronizar frames directamente dentro del entorno de desarrollo.
2. **Figma Code Connect**: Mapea componentes de React/Tailwind con sus variantes en Figma Dev Mode, permitiendo que al inspeccionar cualquier frame en el lienzo infinito se obtenga el código exacto listo para pegar.

## 2. Convención para el Lienzo Infinito de Figma
Para navegar cómodamente por todas las pantallas sin perderse en el lienzo infinito:
- **Disposición en Matriz 2D**:
  - **Eje X (Horizontal)**: Pasos secuenciales del User Journey (01-Landing ➔ 02-ConnectWallet ➔ 03-CreateContract ➔ 04-CriteriaTracking ➔ 05-Release).
  - **Eje Y (Vertical)**: Estados de la pantalla (Default, Loading, Error, Success, Empty State).
- **Header Badges en cada Frame**:
  - `[READY FOR DEV]` (Verde): El componente está finalizado para programar.
  - `[IN REVIEW]` (Amarillo): Cambios en discusión.
  - `[DEPRECATED]` (Gris): Versiones viejas descartadas.

## 3. Estructura de Mapeo en `design.md`
En el archivo de diseño, cada pantalla debe tener su ficha técnica:
```markdown
### Screen: [Nombre de la Pantalla]
- **Figma Node URL**: https://figma.com/file/...
- **Layout**: 1440px / 12-column grid / Gap 24px
- **Componentes Empleados**:
  - `NavbarAscii` (Variant: Connected)
  - `CriteriaCard` (Variant: Active, Verified, Failed)
  - `AsciiCanvas3D` (Model: Wireframe-Cube)
- **Ruta en Código**: `app/(dashboard)/contract/[id]/page.tsx`
```

## 4. Enlaces y Relaciones
- [[AR01-estetica-ascii-3d-dark]]: Definición de tokens y estética.
- [[ID09-escrow-acceptance-criteria-smart-contract]]: Mapeo de pantallas de Escrow.
- [[ID10-vibe-brand-os-personal-presence]]: Mapeo de pantallas de VibeOS.
