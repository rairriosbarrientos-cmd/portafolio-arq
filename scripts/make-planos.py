"""Genera la versión "plano" (dibujo de líneas sobre azul) de la imagen principal de cada proyecto.

Uso: python3 scripts/make-planos.py   (después de extract-images.py)
Salida: public/obra/<proyecto>/plano.webp y plano-sm.webp, mismas dimensiones que 01.webp.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OBRA = ROOT / "public" / "obra"

NAVY = np.array((16, 33, 92), np.float32)
GRID = np.array((120, 150, 230), np.float32)
LINE = np.array((214, 228, 255), np.float32)


def plano(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert("L").filter(ImageFilter.GaussianBlur(1.1)), dtype=np.float32)
    gx = np.zeros_like(a)
    gy = np.zeros_like(a)
    gx[:, 1:-1] = a[:, 2:] - a[:, :-2]
    gy[1:-1, :] = a[2:, :] - a[:-2, :]
    mag = np.clip((np.hypot(gx, gy) - 6) / 38, 0, 1) ** 0.8
    h, w = a.shape
    yy, xx = np.mgrid[0:h, 0:w]
    grid = (((xx % 48) == 0) | ((yy % 48) == 0)).astype(np.float32) * 0.10
    out = NAVY * (1 - grid[..., None]) + GRID * grid[..., None]
    out = out * (1 - mag[..., None]) + LINE * mag[..., None]
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))


for d in sorted(p for p in OBRA.iterdir() if p.is_dir() and p.name != "estudio"):
    src = Image.open(d / "01.webp")
    out = plano(src)
    out.save(d / "plano.webp", "WEBP", quality=80, method=6)
    sm = out.copy()
    sm.thumbnail((760, 760))
    sm.save(d / "plano-sm.webp", "WEBP", quality=76, method=6)
    print(d.name, out.size)
