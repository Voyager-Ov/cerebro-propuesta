import json
import re

with open("scripts/pinterest_dump.json", "r", encoding="utf-8") as f:
    data = json.load(f)

pins = []

def extract_pins(obj):
    if isinstance(obj, dict):
        if "grid_title" in obj or ("images" in obj and "description" in obj) or obj.get("type") == "pin":
            title = obj.get("grid_title") or obj.get("title") or obj.get("closeup_attribution", {}).get("full_name") or ""
            desc = obj.get("description") or obj.get("description_html") or ""
            images = obj.get("images", {})
            orig_img = images.get("orig", {}).get("url") or images.get("736x", {}).get("url") or images.get("474x", {}).get("url") or ""
            link = obj.get("link") or obj.get("domain") or ""
            if orig_img or title or desc:
                pins.append({
                    "id": obj.get("id"),
                    "title": title,
                    "desc": desc,
                    "img": orig_img,
                    "link": link
                })
        for k, v in obj.items():
            extract_pins(v)
    elif isinstance(obj, list):
        for item in obj:
            extract_pins(item)

extract_pins(data)

# Deduplicate by id or img
seen = set()
unique_pins = []
for p in pins:
    key = p.get("id") or p.get("img")
    if key and key not in seen:
        seen.add(key)
        unique_pins.append(p)

print(f"Total pins extracted: {len(unique_pins)}")
for i, p in enumerate(unique_pins[:25]):
    print(f"\n--- PIN {i+1} ---")
    print(f"Title: {p['title']}")
    print(f"Desc: {p['desc'][:120] if p['desc'] else ''}")
    print(f"Img: {p['img']}")
    print(f"Link: {p['link']}")
