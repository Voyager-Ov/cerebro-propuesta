import urllib.request
import re

url = "https://www.pinterest.com/pin/636063147423013793/"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        title = re.findall(r"<title>(.*?)</title>", html)
        print("Title:", title)
        desc = re.findall(r'<meta[^>]*name="description"[^>]*content="([^"]*)"', html)
        print("Desc:", desc)
        # Find video urls
        vids = list(dict.fromkeys(re.findall(r'https://v1\.pinimg\.com/videos/[^\s"\'\\]+', html)))
        print("Videos:", vids)
except Exception as e:
    print("Error:", e)
