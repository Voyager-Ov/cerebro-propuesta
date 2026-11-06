#!/usr/bin/env python3
"""
generate_graph.py
Escanea los nodos Markdown en docs/cerebro/nodos/, extrae el frontmatter YAML y los enlaces,
calcula componentes conexos y genera diagramas Mermaid sin dependencias externas.
Soporta nodos de Sprints, Casos de Hackathons, Situaciones Cotidianas e Ideas de Proyecto.
"""

import os
import re
import json

def parse_simple_yaml(yaml_text):
    data = {}
    current_key = None
    
    for line in yaml_text.splitlines():
        line_clean = line.strip()
        if not line_clean or line_clean.startswith('#'):
            continue
        
        # Check list item
        if line_clean.startswith('- '):
            val = line_clean[2:].strip().strip('"').strip("'")
            if current_key:
                if not isinstance(data.get(current_key), list):
                    data[current_key] = []
                data[current_key].append(val)
            continue
            
        # Check key: value
        if ':' in line_clean:
            parts = line_clean.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip()
            current_key = key
            
            if not val:
                data[key] = []
            elif val.startswith('[') and val.endswith(']'):
                # Inline list [a, b, c]
                items = [x.strip().strip('"').strip("'") for x in val[1:-1].split(',') if x.strip()]
                data[key] = items
            else:
                clean_val = val.strip('"').strip("'")
                if clean_val.lower() == 'true':
                    clean_val = True
                elif clean_val.lower() == 'false':
                    clean_val = False
                elif clean_val.isdigit():
                    clean_val = int(clean_val)
                data[key] = clean_val
                
    return data

def parse_markdown_node(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not match:
        return None, content

    yaml_block = match.group(1)
    body = match.group(2)
    try:
        data = parse_simple_yaml(yaml_block)
        return data, body
    except Exception as e:
        print(f"Error parseando {filepath}: {e}")
        return None, body

def build_graph(nodes_dir):
    nodes = {}
    edges = []

    if not os.path.exists(nodes_dir):
        return nodes, edges

    for fname in os.listdir(nodes_dir):
        if not fname.endswith('.md'):
            continue
        fpath = os.path.join(nodes_dir, fname)
        meta, body = parse_markdown_node(fpath)
        if not meta or 'id' not in meta:
            continue

        node_id = str(meta['id'])
        nodes[node_id] = {
            'meta': meta,
            'file': fname,
            'path': fpath
        }

    for node_id, data in nodes.items():
        meta = data['meta']
        for target in meta.get('depende_de', []) or []:
            edges.append({
                'source': node_id,
                'target': str(target),
                'type': 'depende_de',
                'label': 'depende de'
            })
        for target in meta.get('conectado_con', []) or []:
            edges.append({
                'source': node_id,
                'target': str(target),
                'type': 'conectado_con',
                'label': 'conecta con'
            })

    return nodes, edges

def generate_mermaid_diagram(nodes, edges, category_filter=None):
    lines = ["flowchart TD"]
    lines.append("    classDef hackathon fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e;")
    lines.append("    classDef patron fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#5b21b6;")
    lines.append("    classDef situacion fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;")
    lines.append("    classDef idea fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;")
    lines.append("    classDef fintech fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;")
    lines.append("    classDef arquitectura fill:#fdf2f8,stroke:#db2777,stroke-width:2px,color:#9d174d;")
    lines.append("    classDef default fill:#f1f5f9,stroke:#64748b,stroke-width:1px,color:#334155;")

    filtered_nodes = {}
    for nid, ndata in nodes.items():
        tipo = ndata['meta'].get('tipo', '')
        if category_filter is None or tipo == category_filter:
            filtered_nodes[nid] = ndata

    # Nodes grouped by tipo
    tipo_groups = {}
    for nid, ndata in filtered_nodes.items():
        tipo = ndata['meta'].get('tipo', 'general')
        tipo_groups.setdefault(tipo, []).append((nid, ndata))

    for tipo, nlist in tipo_groups.items():
        tipo_label = tipo.replace('-', ' ').upper()
        lines.append(f'    subgraph SG_{tipo} ["Categoría: {tipo_label}"]')
        for nid, ndata in nlist:
            meta = ndata['meta']
            title = str(meta.get('titulo', nid)).replace('"', "'")
            # Style assignment
            if 'hackathon' in tipo:
                c_style = 'hackathon'
            elif 'patron' in tipo:
                c_style = 'patron'
            elif 'situacion' in tipo:
                c_style = 'situacion'
            elif 'idea' in tipo:
                c_style = 'idea'
            elif 'fintech' in tipo:
                c_style = 'fintech'
            elif 'arquitectura' in tipo:
                c_style = 'arquitectura'
            else:
                c_style = 'default'
            
            lines.append(f'        node_{nid}["<b>[{nid}]</b><br/>{title}"]:::{c_style}')
        lines.append('    end')

    # Draw edges
    drawn_edges = set()
    for edge in edges:
        s, t = edge['source'], edge['target']
        edge_key = f"{s}->{t}:{edge['type']}"
        if edge_key in drawn_edges:
            continue
        drawn_edges.add(edge_key)

        label = edge['label']
        if s in filtered_nodes and t in filtered_nodes:
            lines.append(f'    node_{s} -->|"{label}"| node_{t}')
        elif s in filtered_nodes and t not in filtered_nodes and t in nodes:
            t_meta = nodes[t]['meta']
            t_title = str(t_meta.get('titulo', t)).replace('"', "'")
            lines.append(f'    node_{t}["[{t}] {t_title}"]:::default')
            lines.append(f'    node_{s} -.->|"{label}"| node_{t}')

    return "\n".join(lines)

if __name__ == '__main__':
    base_dir = os.getcwd()
    nodes_dir = os.path.join(base_dir, 'docs', 'cerebro', 'nodos')
    nodes, edges = build_graph(nodes_dir)
    print("==================================================")
    print("Segundo Cerebro - Red de Conocimiento Hackathon")
    print("==================================================")
    print(f"Nodos indexados: {len(nodes)}")
    print(f"Aristas indexadas: {len(edges)}")
    for nid, d in sorted(nodes.items()):
        m = d['meta']
        print(f" - [{nid}] ({m.get('tipo')}) {m.get('titulo')} | Deps: {m.get('depende_de', [])} | Conex: {m.get('conectado_con', [])}")
    
    mermaid_all = generate_mermaid_diagram(nodes, edges, category_filter=None)
    
    print("\n--- Diagrama Mermaid Global ---")
    print(mermaid_all)
