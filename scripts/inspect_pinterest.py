import urllib.request
import json
import re

url = "https://www.pinterest.com/octaviovelo/twin/?invite_code=fecd819e075e47b0abe653b0e51ce24c"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print(f"HTML size: {len(html)}")
        
        titles = re.findall(r"<title>(.*?)</title>", html)
        print("Page Title:", titles)

        # Look for board description or structured data
        desc = re.findall(r'<meta[^>]*name="description"[^>]*content="([^"]*)"', html)
        print("Meta description:", desc)

        # Look for pin cards or text
        # Pinterest embeds initial data in script tag __PWS_DATA__
        pws = re.findall(r'<script id="__PWS_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
        if pws:
            data = json.loads(pws[0])
            print("Found __PWS_DATA__ JSON keys:", list(data.keys()))
            # Save dump for inspection
            with open("scripts/pinterest_dump.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print("Wrote scripts/pinterest_dump.json")
        else:
            print("No __PWS_DATA__ found")
            # Look for image urls
            images = list(dict.fromkeys(re.findall(r'https://i\.pinimg\.com/(?:originals|736x|564x|474x|236x)/[a-zA-Z0-9/_.-]+', html)))
            print(f"Found {len(images)} pin images:")
            for img in images[:15]:
                print("  ", img)

except Exception as e:
    print("Error:", e)
