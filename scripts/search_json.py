import json
import re

with open("scripts/pinterest_dump.json", "r", encoding="utf-8") as f:
    text = f.read()

print("File size:", len(text))
# Find all i.pinimg.com links
pinimgs = list(dict.fromkeys(re.findall(r'https://i\.pinimg\.com/(?:originals|736x|564x|474x|236x)/[^\s"\'\\]+', text)))
print("Pinimg count:", len(pinimgs))
for p in pinimgs[:15]:
    print(" -", p)

# Search for pin texts or titles or descriptions
# Let's search for "title" or "board" in JSON
data = json.loads(text)

def search_keys(obj, target, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if target.lower() in k.lower():
                print(f"Match key '{k}' at path: {path}")
            search_keys(v, target, f"{path}.{k}")
    elif isinstance(obj, list):
        for i, item in enumerate(obj[:5]):
            search_keys(item, target, f"{path}[{i}]")

search_keys(data, "board")
search_keys(data, "pin")
