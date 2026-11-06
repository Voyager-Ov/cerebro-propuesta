---
id: ID09
titulo: CriteriaLock - Smart Escrow con Bloqueo de Fondos y Validación de Criterios de Aceptación
tipo: idea-concepto
tags: [idea, smart-contract, escrow, criteria, argt, usdt, avalanche, freelancing, b2b]
depende_de: [TW01, TW02, TW03, AR01, AR02]
conectado_con: [ID06, ID08]
---

# Propuesta 1: CriteriaLock (Smart Escrow de Fondos Basado en Criterios)

## 1. El Concepto en una Oración
Un protocolo de fideicomiso digital descentralizado (*smart escrow*) donde el cliente bloquea fondos en **ARGt** (Twin Finance) o **USDT** (Tether) en la red **Avalanche**, y el dinero se libera de forma automática únicamente cuando se verifican y cumplen los criterios de aceptación previamente definidos en el contrato.

## 2. El Dolor Real que Resuelve en América Latina
- **Para el Freelancer / Desarrollador**: El miedo a trabajar 4 semanas y que el cliente desaparezca, postergue el pago o invente excusas para no pagar el saldo restante.
- **Para el Cliente / Empresa**: El miedo a pagar el 100% por adelantado a un contratista desconocido y que entregue un trabajo defectuoso, incompleto o abandone el proyecto.
- **La Falta de Herramientas**: Las plataformas como Upwork o Fiverr cobran comisiones leoninas (10% al 20%) y operan solo en dólares con trabas bancarias locales.

## 3. Dinámica del Contrato Inteligente
```
[1. Creación del Contrato]
   - Cliente y Proveedor acuerdan el monto ($500.000 ARGt o 500 USDT)
   - Se redactan los Criterios de Aceptación (ej. "Deploy en Vercel", "Lighthouse > 85", "Figma Aprobado")
   - El hash SHA-256 de los criterios se ancla en el Smart Contract.
                       │
                       ▼
[2. Bloqueo de Plata (Funds Locked)]
   - El cliente deposita los fondos en el contrato en Avalanche (gas < $0.01).
   - El dinero está a salvo de ambas partes (el cliente no puede retirarlo unilateralmente mientras el plazo esté vigente).
                       │
                       ▼
[3. Verificación de Criterios]
   - Mecanismo A: Doble firma digital (Cliente aprueba milestone).
   - Mecanismo B (AI Arbitrator): Un agente de IA evalúa los entregables contra los criterios de aceptación y emite un veredicto firmado.
   - Mecanismo C (Oracle): Webhook de GitHub (PR mergeado) o endpoint de test superado.
                       │
                       ▼
[4. Liberación Instantánea de Fondos]
   - El contrato transfiere automáticamente los ARGt / USDT a la billetera del freelancer.
```

## 4. Por qué es Ideal para HackaTwin (7 de Noviembre)
- **Alineación con Twin Finance**: Utiliza **ARGt** para pagos locales de servicios en Argentina.
- **Alineación con Tether**: Emplea **USDT** para contratistas internacionales.
- **Alineación con Avalanche**: Permite crear contratos y liberar fondos en 1 segundo con micro-comisiones de red.
- **Estética ASCII 3D**: La interfaz muestra una caja fuerte o candado 3D en malla ASCII que gira y se desbloquea físicamente en la pantalla cuando los criterios pasan a estado `[OK]`.

## 5. Enlaces y Relaciones
- [[TW01-twin-finance-stablecoins]]: Liquidación en ARGt y monedas locales.
- [[TW02-hackatwin-7-noviembre]]: Presentación en el track Blockchain + Fintech.
- [[AR01-estetica-ascii-3d-dark]]: Interfaz con candado 3D ASCII y terminal dark.
- [[AR02-figma-code-connect-workflow]]: Mapeo del flujo de pantallas en Figma.
