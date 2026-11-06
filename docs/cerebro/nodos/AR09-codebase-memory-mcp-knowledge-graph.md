---
id: AR09
titulo: Codebase Memory MCP - Grafo de Conocimiento y Memoria Estructural para Agentes
tipo: arquitectura-tecnica
tags: [mcp, codebase-memory, knowledge-graph, tree-sitter, token-optimization, midudev, hacktwin]
depende_de: [AR06, AR07, AR08]
conectado_con: [ID09, ID10, TW02, FN01]
---

# Codebase Memory MCP: Grafo de Conocimiento y Aceleración de Agentes de IA

Este nodo documenta e incorpora al Segundo Cerebro el componente presentado por **Miguel Ángel Durán (@midu.dev)** en su reel de Instagram ([Ver Reel](https://www.instagram.com/reel/DaLAO49FJPz/)): **`codebase-memory-mcp`** (desarrollado por DeusData).

Se trata de un servidor MCP (*Model Context Protocol*) de ultra alto rendimiento diseñado para dotar a agentes de IA (como Antigravity, Claude Code, Cursor, Codex) de una **memoria arquitectónica persistente en forma de grafo de conocimiento**.

---

## 1. El Problema que Resuelve: Ceguera de Contexto y Quema Masiva de Tokens

Normalmente, cuando un agente de IA necesita comprender un repositorio o investigar el impacto de un cambio:
1. Hace búsquedas a ciegas (`grep`, `glob`, lectura repetitiva de archivos enteros).
2. Quema **decenas de miles de tokens** en cada turno simplemente para ubicar qué funciones llaman a qué servicios.
3. Sufre de "amnesia" entre turnos y sesiones porque no conserva un mapa relacional indexado del proyecto.

### La Solución de Codebase Memory
`codebase-memory-mcp` analiza y compila el árbol sintáctico (AST) de todo el repositorio en un **grafo de conocimiento local** (almacenado en SQLite) sin enviar una sola línea de código a servidores externos ni consumir tokens de LLM para la indexación.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          CODEBASE MEMORY (CBM)                           │
│                                                                          │
│  [Repositorio / Código] ──► (Tree-sitter AST en C)                       │
│                                     │                                    │
│                                     ▼                                    │
│                     [ Grafo Relacional en SQLite ]                       │
│                       • Nodos: Clases, Funciones, Rutas, Tipos           │
│                       • Aristas: CALLS, IMPORTS, EXTENDS, USES           │
│                                     │                                    │
│                                     ▼                                    │
│       [ Herramientas MCP ] ◄──► [ Antigravity / Agentes de IA ]          │
│       (Consultas en < 1ms, reducción de tokens hasta el 99%)             │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Herramientas MCP Expuestas al Agente

El servidor expone un conjunto de herramientas nativas especializadas:

| Herramienta MCP | Función Clave |
| :--- | :--- |
| **`index_repository`** | Escanea e indexa el código generando el grafo de dependencias y símbolos. |
| **`query_graph`** | Ejecuta consultas estructuradas sobre el grafo para responder relaciones complejas. |
| **`search_graph`** | Búsqueda precisa de símbolos, funciones, clases o contratos por nombre o tipo. |
| **`trace_path`** | Rastrea la cadena completa de llamadas (`call path`) aguas arriba o aguas abajo. |
| **`get_architecture`** | Extrae la radiografía del sistema (capas, frameworks, endpoints, hotspots) en segundos. |
| **`detect_changes`** | Analiza diffs de Git y predice qué funciones o módulos sufrirán impacto colateral. |
| **`get_code_snippet`** | Devuelve quirúrgicamente la porción de código solicitada sin volcar archivos enteros. |
| **`manage_adr`** | Gestión de *Architecture Decision Records* persistentes para mantener memoria de decisiones de diseño. |

---

## 3. CBM Lens: Visualizador 3D del Grafo en el Navegador

El componente incluye una interfaz web interactiva (**CBM Lens**) que se puede activar con:
```bash
npx -y codebase-memory-mcp --ui=true --port=9749
```
- Mapea el repositorio como una galaxia de nodos interactivos en 2D/3D.
- Aplica detección de comunidades (algoritmo Louvain) para agrupar módulos y visualizar código muerto o cuellos de botella arquitectónicos.

---

## 4. Configuración en Antigravity para Todos los Proyectos

Para que Antigravity tenga disponible `codebase-memory` en cualquier workspace de manera global, se registra en el archivo maestro de configuración MCP (`C:\Users\pepep\.gemini\config\mcp_config.json`):

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "npx",
      "args": [
        "-y",
        "codebase-memory-mcp"
      ]
    }
  }
}
```

---

## 5. Aplicación Estratégica en la HackaTwin (7 de Noviembre)

En el contexto de la hackathon (`[TW02]`), contar con este indexador permite:
1. **Iteración Ultrarrápida**: Al conectar smart contracts en Solidity (`[ID09]` CriteriaLock) con el motor visual 3D ASCII (`[AR01]`, `[AR07]`) y las APIs de pagos onchain de Belo/Twin (`[TW01]`, `[TW03]`), el agente navega las interfaces y tipos sin desbordar el contexto.
2. **Auditoría de Impacto Onchain**: Detección inmediata de qué componentes visuales o hooks de React dependen de los cambios en los contratos de depósito en garantía.
3. **Consistencia con el Segundo Cerebro**: Complementa este grafo de ideas en Markdown con un grafo automatizado del código fuente en tiempo real.
