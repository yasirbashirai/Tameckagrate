"""Rebuild the logo wordmark 'FROM SURVIVAL to Soft' -> 'FROM SURVIVOR to Soft' from the logo's own glyphs."""
import sys
import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert("RGBA")).astype(np.float32)
Y0, Y1 = 724, 1000  # wordmark band (below the wings)
band = a[Y0:Y1].copy()
r, g = band[..., 0], band[..., 1]
plum = (r - g) > 25
SLATE = np.array([130, 140, 151], np.float32)

def glyph(x0, x1, recolor=False):
    gl = band[:, x0:x1].copy()
    if recolor:  # plum glyph -> slate, keep its shading via luminance ratio
        lum = gl[..., :3].mean(-1, keepdims=True)
        gl[..., :3] = np.clip(SLATE * (lum / 147.0), 0, 255)
    return gl

def over(dst_band, gl, x):
    h, w = gl.shape[:2]
    reg = dst_band[:, x:x + w]
    sa, da = gl[..., 3:] / 255, reg[..., 3:] / 255
    oa = sa + da * (1 - sa)
    reg[..., :3] = (gl[..., :3] * sa + reg[..., :3] * da * (1 - sa)) / np.maximum(oa, 1e-6)
    reg[..., 3:] = oa * 255

V = glyph(464, 534)
O = glyph(147, 215, recolor=True)
R = glyph(415, 461)

# "to Soft": plum script from x>=663, everything from x>=790
xs = np.arange(band.shape[1])[None, :]
script_mask = ((xs >= 663) & plum) | (xs >= 720)
script = np.where(script_mask[..., None], band, 0)

out = band.copy()
out[(xs >= 540) & np.ones_like(plum)] = 0  # clear V-A-L and the script

GAP = 4
x = 544
over(out, V, x); x += V.shape[1] + GAP + 1
over(out, O, x); x += O.shape[1] + GAP
over(out, R, x); x += R.shape[1]
dx = x - 714 + 12  # keep the original L-end to script relationship
sh = np.zeros_like(script); sh[:, dx:] = script[:, :script.shape[1] - dx]
over(out, sh, 0)

# re-centre the wordmark under the butterfly
ink = np.where(out[..., 3].max(0) > 60)[0]
shift = int(round((a.shape[1] - (ink.min() + ink.max())) / 2))
out = np.roll(out, shift, axis=1)
a[Y0:Y1] = out
Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(dst)
print("dx", dx, "centre shift", shift, "ink", ink.min() + shift, ink.max() + shift)
