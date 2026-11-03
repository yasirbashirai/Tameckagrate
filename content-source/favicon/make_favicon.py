"""Builds the favicon set from her butterfly mark: white mark on a plum rounded square."""
from PIL import Image, ImageDraw
import os, sys

root = sys.argv[1]
mark = Image.open(f"{root}/public/images/fsts-mark.png").convert("RGBA")
alpha = mark.split()[3]
# Drop the near-white matte so only the mark remains
px = mark.load()
a = alpha.copy(); ap = a.load()
for y in range(mark.height):
    for x in range(mark.width):
        r, g, b, al = px[x, y]
        if r > 230 and g > 230 and b > 230: ap[x, y] = 0
a = a.crop(a.point(lambda v: 255 if v > 120 else 0).getbbox())

def tile(size, pad=0.16, radius=0.22):
    img = Image.new("RGBA", (size * 4, size * 4), (0, 0, 0, 0))
    ImageDraw.Draw(img).rounded_rectangle([0, 0, size * 4 - 1, size * 4 - 1], radius=int(size * 4 * radius), fill=(126, 74, 118, 255))
    inner = int(size * 4 * (1 - 2 * pad))
    k = inner / max(a.size); m = a.resize((int(a.width * k), int(a.height * k)), Image.LANCZOS)
    white = Image.new("RGBA", m.size, (255, 255, 255, 255)); white.putalpha(m)
    img.alpha_composite(white, ((size * 4 - m.width) // 2, (size * 4 - m.height) // 2))
    return img.resize((size, size), Image.LANCZOS)

app = f"{root}/src/app"
tile(512).save(f"{app}/icon.png")
tile(180, pad=0.14, radius=0).save(f"{app}/apple-icon.png")
tile(48, pad=0.1).save(f"{app}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("ok")
