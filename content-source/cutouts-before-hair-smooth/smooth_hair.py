"""Smooth the hair silhouette of a portrait cutout into an even, rounded edge.
Only touches dark (hair) pixels inside an expanded head box; face/hands/clothes untouched.
usage: smooth_hair.py in.png out.png fx0 fy0 fx1 fy1 [sigma]"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
fx0, fy0, fx1, fy1 = map(float, sys.argv[3:7])
sigma = float(sys.argv[7]) if len(sys.argv) > 7 else 0  # 0 = auto from face size

im = Image.open(src).convert("RGBA")
w, h = im.size
a = np.asarray(im).astype(np.float32) / 255
rgb, A = a[..., :3], a[..., 3]
fw, fh = (fx1 - fx0) * w, (fy1 - fy0) * h
if not sigma:
    sigma = max(2.0, fw * 0.035)

def blur(x, r):
    img = Image.fromarray(np.clip(x * 255, 0, 255).astype(np.uint8))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255

# Smoothed silhouette: blur alpha, then re-sharpen into a crisp but rounded edge
As = np.clip((blur(A, sigma) - 0.5) * 6 + 0.5, 0, 1)

# Fill colour for pixels the smoothing adds: local average of nearby hair colour
pm = np.stack([blur(rgb[..., i] * A, sigma * 1.5) for i in range(3)], -1)
den = blur(A, sigma * 1.5)[..., None]
fill = np.where(den > 0.02, pm / np.maximum(den, 1e-3), rgb)

# Weight: expanded head box (feathered) x darkness of nearby colour (hair is near-black)
ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
bx0, bx1 = fx0 * w - 0.45 * fw, fx1 * w + 0.45 * fw
by0, by1 = fy0 * h - 1.0 * fh, fy0 * h + 0.55 * fh
box = (xs > bx0) & (xs < bx1) & (ys > by0) & (ys < by1)
boxw = blur(box.astype(np.float32), sigma * 2)
lum = (0.3 * fill[..., 0] + 0.59 * fill[..., 1] + 0.11 * fill[..., 2])
dark = np.clip((0.32 - lum) / 0.12, 0, 1)
W = boxw * dark

A2 = W * As + (1 - W) * A
added = np.clip((A2 - A) / np.maximum(A2, 1e-3), 0, 1)[..., None]
rgb2 = added * fill + (1 - added) * rgb
out = np.dstack([rgb2, A2])
Image.fromarray(np.clip(out * 255 + 0.5, 0, 255).astype(np.uint8)).save(dst)
print(dst, f"sigma={sigma:.1f}")
