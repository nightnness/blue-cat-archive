import os
import json

gallery_dir = "gallery"
media = {"images": [], "videos": []}

# Load existing media.json if it exists
if os.path.exists("media.json"):
    with open("media.json", "r", encoding="utf-8") as f:
        old_media = json.load(f)
else:
    old_media = {"images": [], "videos": []}

def find_existing(entry_list, src):
    for item in entry_list:
        if item["src"] == src:
            return item
    return None

for root, dirs, files in os.walk(gallery_dir):
    for file in files:
        path = os.path.join(root, file).replace("\\", "/")
        ext = file.lower().split('.')[-1]
        if ext in ["png", "jpg", "jpeg", "gif", "bmp"]:
            existing = find_existing(old_media.get("images", []), path)
            entry = {
                "src": path,
                "title": file,
                "date": existing["date"] if existing else "",
                "location": existing["location"] if existing else ""
            }
            media["images"].append(entry)
        elif ext in ["mp4", "mov", "avi", "webm"]:
            existing = find_existing(old_media.get("videos", []), path)
            entry = {
                "src": path,
                "title": file,
                "date": existing["date"] if existing else "",
                "location": existing["location"] if existing else ""
            }
            media["videos"].append(entry)

with open("media.json", "w", encoding="utf-8") as f:
    json.dump(media, f, indent=2)