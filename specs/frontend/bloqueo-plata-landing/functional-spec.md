# Functional Specification: Landing Page "CriteriaLock" (Bloqueo de Plata)

## 1. Visión y Resumen del Producto
**CriteriaLock** es el protocolo de custodia inteligente (*Smart Escrow*) para Argentina y LATAM que elimina la desconfianza en los pagos de servicios, tecnología y comercio. 

Permite que un cliente o contratante **bloquee fondos** en stablecoins (**ARGt** de Twin Finance, **USDT**, **USDC**) dentro de un contrato inteligente en la red Avalanche. Los fondos quedan inmovilizados y protegidos: el cliente no puede retirarlos arbitrariamente y el proveedor tiene la certeza absoluta de que el dinero ya está reservado. La plata se libera automáticamente en el instante exacto en que se validan los criterios de aceptación acordados (vía tests de código, oráculos o doble firma criptográfica).

---

## 2. Dirección de Arte & Persona Estética

### Arquetipo de Diseño: *High-Voltage Cyber-Fintech meets Neo-Brutalist ASCII Craft*
Fusión de tres universos visuales clave:
1. **La Estética "Lemon Cash" (Fintech Argentina de Alto Voltaje)**:
   - Fondo oscuro profundo (obsidiana y carbón mate) que hace explotar acentos **verde eléctrico hiper-volt** y lima fósforo (`Electric Lime / Lemon Neon`).
   - Lenguaje claro, directo, sin vueltas ("Bloqueá la plata. Entregá el laburo. Cobrá al instante").
   - Tarjetas táctiles inspiradas en plásticos fintech físicos y tarjetas metálicas con reflejos especulares, etiquetas de stablecoins (ARGt, USDT, AVAX) y badges de rendimiento/seguridad.
2. **El Tablero de Pinterest "Twin" (Dither, ASCII 3D, Dot-Matrix & Halftone)**:
   - Iconografía y loaders procedurales de terminal (`Loaders made of text`, `ASCII Art`).
   - Orbe y candado biomorphic 3D renderizados en matriz de puntos / caracteres ASCII monoespaciados que reaccionan a la interacción.
   - Retículas dithered y estética retro-futurista con líneas de 1px de alta precisión matemática.
3. **Guardarraíles "Taste" (Anti-AI Slop Standards)**:
   - Rechazo rotundo a gradientes genéricos morados, plantillas predecibles de 3 columnas idénticas y fuentes genéricas de sistema.
   - Asimetría controlada con composiciones editoriales de alta tensión visual: contrastes drásticos de escala tipográfica (titulares masivos condensados frente a etiquetas monoespaciadas microscópicas).
   - Componentes táctiles con ADN de iOS (squircles redondeados, micro-rebotes de resorte `spring`, sombras oclusivas y biseles internos que dan volumen real).
   - Componentes inspirados en Notion (badges limpios de propiedades) y el minimalismo de Bencho.dev (docks flotantes de vidrio esmerilado).

---

## 3. Jerarquía Visual y Patrón de Escaneo (Z & F Scanning)

1. **Impacto Primario (Eye-Catching Focal Point - 0.0s - 0.5s)**:
   - El gran titular neo-brutalista de alto contraste y el **Simulador Táctil del Candado 3D ASCII**: un artefacto central que representa la "Caja Fuerte / Bóveda Criptográfica", palpitando con un aura verde eléctrico Lemon que muta de estado bloqueado `[LOCKED: 50,000 ARGt]` a liberado `[UNLOCKED]`.
2. **Impacto Secundario (Comprensión del Mecanismo - 0.5s - 2.0s)**:
   - Barra ticker de stablecoins en tiempo real (ARGt paridad 1:1, USDT, AVAX gas < $0.005) y la tarjeta interactiva de **Criterios de Aceptación** estilo Notion/Terminal con oráculos en vivo (GitHub PR, test suites, firmas multisig).
3. **Impacto Terciario (Decisión y Acción - 2.0s+)**:
   - Botón CTA principal de estilo iOS con micro-glare y relieve háptico: *"Bloquear Fondos"* / *"Crear Contrato de Custodia"*, flanqueado por indicadores de auditoría de seguridad y gas libre de fricción.

---

## 4. Recorridos de Usuario y Experiencia Interactiva (User Journeys)

### Flujo A: El Freelancer / Agencia que busca cobrar seguro
1. **Llegada y Empatía Inmediata**: Ve el titular: *"Nunca más persigas una factura impaga. Cobrá al segundo que aprueben el hito."*
2. **Exploración de la Bóveda**: Interactúa con el selector de moneda (ARGt / USDT / USDC) y mueve el slider para ver cómo se bloquea el monto acordado.
3. **Configuración de Criterios**: Agrega un criterio rápido (ej. "Aprobación de diseño en Figma", "Deploy en producción") y observa el hash criptográfico generado en tiempo real.
4. **Conversión**: Hace clic en *"Generar Link de Custodia"* para enviárselo a su cliente por WhatsApp o email con un solo toque.

### Flujo B: El Cliente / Empresa que necesita garantías de entrega
1. **Garantía de Fondos Intactos**: Comprende que la plata no se transfiere de inmediato, sino que permanece inmovilizada en una bóveda neutral de Avalanche C-Chain.
2. **Validación Transparente**: Visualiza el checklist automatizado con oráculos: si el desarrollador no cumple los criterios estipulados en el contrato, los fondos se devuelven automáticamente sin comisiones ocultas.
3. **Aprobación Háptica**: Con un solo botón con feedback físico, aprueba el entregable y ve la animación del candado abriéndose con lluvia de caracteres terminales y liberación inmediata.

---

## 5. Catálogo Completo de Estados de la Interfaz (State Catalog)

### 1. Estado Inicial / Entrada (Hero & Vault Inactivo)
- **Visual**: Fondo negro obsidiana con sutil grano de textura analógica (dither noise). El orbe/candado ASCII reposa en un estado de respiración lenta (zen pulse) con resplandor atenuado verde fósforo.
- **Micro-detalles**: Tipografía monoespaciada con etiqueta parpadeante `STATUS: READY // AVAX_CHAIN_ID: 43114`.

### 2. Estado Activo / Bóveda Bloqueada (Populated & Locked)
- **Visual**: La tarjeta de custodia muestra el monto bloqueado en gran tamaño (`$ 1,250,000 ARGt` o `1,500 USDT`), con un candado cerrado y un badge verde Lemon `[CUSTODIA ACTIVA]`.
- **Criterios**: 3 hitos visibles; dos marcados con tilde verde esmeralda y el último en estado de espera con pulso rítmico.

### 3. Estado de Verificación en Progreso (Simulación del Oráculo)
- **Visual**: El candado ASCII acelera su giro y emite caracteres aleatorios tipo terminal hacker (`/ - \ | # % @`).
- **Terminal lateral**: Se despliega una consola negra translúcida que imprime línea por línea la validación de oráculos (RPC Avalanche, hash del PR de GitHub, firma quórum 2/3).
- **Controles**: El botón principal entra en estado `Verificando con Oráculo...` con un spinner de caracteres monoespaciados, inhabilitando clics repetidos.

### 4. Estado de Fondos Liberados (Unlocked State)
- **Visual**: Onda de choque expansiva suave (`shockwave`). El candado 3D ASCII se abre físicamente, su aura transiciona a un verde esmeralda radiante `#00FF85`, y los números del saldo giran hacia el balance del receptor.
- **Sonido visual**: Micro-insignia que indica `FONDOS TRANSFERIDOS A BILLETERA DESTINO (TX #0x9a...24)`.

### 5. Estado Vacío / Sin Contrato Configurado (Zero State)
- **Visual**: En el creador de contratos, si no hay criterios añadidos, no se muestra un espacio en blanco, sino una guía de inicio rápido con presets sugeridos ("Hito 1: Entrega Wireframes", "Hito 2: Deploy Staging") presentados como píldoras interactivas de un toque.

### 6. Estados Interactivos (Micro-Interactions)
- **Botones Estilo iOS**: 
  - `Hover`: Elevación sutil con realce del borde interno y aumento de brillo del acento.
  - `Active / Tap`: Compresión háptica proporcional (`scale: 0.97`) con retorno elástico instantáneo.
- **Dock Bencho.dev**: Barra flotante inferior de vidrio esmerilado que sigue al scroll, permitiendo alternar moneda (ARGt / USDT), probar la simulación del candado o cambiar el tema cromático.
- **Badges de Stablecoins**: Efecto de brillo especular al pasar el cursor, mostrando paridad y rendimiento anual estimado.

---

## 6. Secciones Estructuradas de la Landing Page

1. **Header Minimalista Táctil**:
   - Logo monoespaciado `[CRITERIA // LOCK]` con dot verde Lemon parpadeante.
   - Píldoras de estado de red (`Avalanche C-Chain`, `Twin Protocol ARGt`).
   - Botón de conexión de billetera / acceso rápido con contorno de 1px.
2. **Hero Section (Bóveda Central & Valor Principal)**:
   - Titular de alto impacto con tipografía híbrida (Grotesque técnica + monospace accent).
   - Componente interactivo dual: visualizador 3D ASCII de la Bóveda / Candado inteligente a la derecha y simulador de bloqueo rápido a la izquierda.
   - Social proof en cinta ticker: "Auditoría en proceso • Avalanche • Tether • Belo • Twin Finance".
3. **Sección "Cómo Funciona el Bloqueo de Plata" (El Flujo en 3 Pasos)**:
   - Tarjetas de estilo fintech oscuro con números ASCII gigantes dithered:
     - `01`: Bloqueá tus stablecoins (ARGt o USDT) sin custodia de terceros.
     - `02`: Fijá los criterios en piedra digital (código, entrega, hito).
     - `03`: Liberación automática en 1 segundo cuando se cumple la regla.
4. **Interactive Criteria Playground (El Demostrador)**:
   - Una réplica en vivo del smart escrow donde el usuario puede activar/desactivar oráculos simulados y ver el candado destrabarse en tiempo real.
5. **Comparativa: Plataforma Tradicional vs CriteriaLock**:
   - Tabla minimalista de alto contraste (0% comisiones vs 20% plataformas tradicionales, pagos en 1 segundo vs transferencias bancarias a 30 días, stablecoins seguras vs devaluación constante).
6. **Footer Neo-Brutalista**:
   - Reloj de bloques en vivo, links al repositorio, enlace al Segundo Cerebro y firma del protocolo.
