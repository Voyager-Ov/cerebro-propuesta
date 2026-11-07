---
id: AR15
titulo: App Localito - Mobile Wallet Lemon UI con Moneda 3D ASCII y Soporte Multiactivo
tipo: arquitectura
estado: Activo
fecha: 2026-11-07
tags: [frontend, localito, lemon-ui, mobile-wallet, ascii-3d, argt, stablecoins, credit-line, qr-interoperable]
depende_de: [AR01, AR08, AR13, AR14]
conectado_con: [AR13, AR14, ID06, ID07, ID09, TW01, TW03]
archivos_front:
  - frontend/src/app/localito/page.tsx
  - frontend/src/components/localito/LemonLocalitoWallet.tsx
  - frontend/src/components/HeaderNav.tsx
---

# [AR15] App Localito — Mobile Wallet Lemon UI con Moneda 3D ASCII y Soporte Multiactivo

## 1. Resumen de la Implementación

En coordinación con las especificaciones funcionales de **Engel (`mdf-angel`)** para el proyecto **`moneda-local` (Localito / TwinLocal v0.1)**, se implementó en el frontend la experiencia completa de la aplicación móvil de usuario/comercio inspirada en la arquitectura visual de **Lemon Cash** y enriquecida con el motor gráfico 3D ASCII de alta densidad de HackaTwin.

- **Ruta de acceso en vivo**: `/localito` (ej. `http://localhost:3000/localito`).
- **Enlace de navegación**: Agregado en el menú principal (`HeaderNav.tsx`) bajo **"App Localito (Lemon UI)"**.
- **Componente central**: [`LemonLocalitoWallet.tsx`](file:///c:/Users/pepep/hacktwin/frontend/src/components/localito/LemonLocalitoWallet.tsx).

---

## 2. Características y Componentes Principales

### A. Motor Moneda 3D ASCII de Alta Definición (`HighDefAsciiCoin`)
- Renderizado procedural sobre `<canvas>` con puntos de alta densidad y relieve volumétrico del glifo según el activo seleccionado.
- **Interacción Cinética**:
  - Giroscopio pasivo (lectura de `deviceorientation` con delta relativo, sin pedir permisos intrusivos).
  - Inercia por scroll vertical y arrastre táctil (estilo Luma / Apple Wallet).
  - Efecto de destello (*burst*) de rotación rápida al alternar de activo.
- **Activos Soportados**:
  - `USDT` (Tether USD — TNA +8.4%)
  - `USDC` (USD Coin — TNA +7.9%)
  - `ARGt` (Peso Digital Twin — paridad 1:1 ARS)
  - `DAI` (MakerDAO Stable — TNA +6.5%)
  - `TL` (Token Localito — Respaldo físico y crédito mutuo para comercios de proximidad).

### B. Arquitectura Visual Lemon Cash (Mobile-First)
- **Header y Saldos**:
  - Conmutador de privacidad (`Eye` / `EyeOff`) para ocultar/mostrar importes.
  - Balance total unificado con display en Pesos Argentinos ($ ARS) y desglose de rendimientos devengados.
  - Tarjeta de **Línea de Crédito Respaldada Onchain** vinculada a los criterios de custodia de CriteriaLock (`[ID09]`).
- **Píldoras de Acción Rápida (Quick Actions)**:
  - **Depositar** (`ArrowDownLeft`): Selección de activo, red (Avalanche C-Chain / Arbitrum / Polygon) y copia de dirección o alias CVU/CBU.
  - **Enviar** (`ArrowUpRight`): Formulario con verificación de destinatario (alias, CVU o 0x address), cálculo de comisiones (gasless en stablecoins locales) y botón de envío táctil.
  - **Swap Instantáneo** (`ArrowLeftRight`): Intercambio directo sin comisiones entre `ARGt` / `TL` y stablecoins de resguardo (`USDT` / `USDC`).
  - **Cobrar con QR** (`QrCode`): Generador de código QR interoperable con monto prefijado en `TL` o `ARGt` para cobros en comercios.

### C. Modos de Visualización
- **Modo Mockup de Celular**: Envoltura con marco de smartphone, notch superior y sombra exterior suave para demostración en presentaciones o pantallas grandes.
- **Modo Pantalla Completa / Mobile Nativo**: Detección responsive para expandirse al 100% del viewport en dispositivos móviles reales (PWA ready).

---

## 3. Conexión con los Repositorios del Ecosistema

1. **`JMReader/localito` (`moneda-local`)**: El componente `LemonLocalitoWallet.tsx` está listo para ser adoptado como la interfaz de `apps/web/` del repositorio oficial.
2. **`JMReader/contractAR` (`escrow-argt`)**: Comparte el motor de bloqueo de fondos y condiciones de liberación de CriteriaLock.
3. **Cerebro Compartido (`SharedBrain-hackatwin`)**: Documentado en la sesión de `oky` para revisión y validación directa por parte de **Engel (`mdf-angel`)**.
