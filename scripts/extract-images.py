"""Recorta los renders del portafolio PDF (pdfimages -j) a WebP en public/obra.

Uso: pdfimages -j portafolio.pdf <dir>/pg && python3 scripts/extract-images.py <dir>
Cada página del PDF es una sola imagen de 1650x1275; las coordenadas son de esa imagen.
"""
import json
import sys
from pathlib import Path

from PIL import Image

SRC = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "obra"

# slug -> lista de (página, (x0, y0, x1, y1))
CROPS = {
    "estudio": [
        (2, (0, 0, 1650, 1275)),      # cocina
        (6, (0, 0, 1440, 1275)),      # fachada piedra
        (25, (0, 0, 1650, 1275)),     # sala
    ],
    "casa-puebla": [(8, (0, 0, 1440, 795)), (8, (0, 805, 545, 1275)), (8, (555, 805, 1045, 1275))],
    "casa-de-la-cultura": [(9, (200, 355, 1650, 1275)), (9, (770, 0, 1650, 347))],
    "casa-montes-urales": [(10, (0, 0, 1440, 850)), (10, (808, 852, 1192, 1275)), (10, (1194, 852, 1650, 1275))],
    "casa-texcalco": [(11, (200, 215, 1650, 1275))],
    "casa-torres": [(12, (0, 0, 675, 847)), (12, (808, 0, 1440, 847)), (12, (808, 852, 1650, 1275))],
    "departamentos-ekato": [(13, (0, 0, 830, 1160)), (13, (835, 0, 1650, 567)), (13, (835, 575, 1650, 920))],
    "departamentos-solartiz": [(14, (200, 0, 1650, 745)), (14, (933, 750, 1650, 1275))],
    "pro-laguna-41": [(15, (0, 0, 1650, 490)), (15, (720, 605, 1206, 1275)), (15, (1210, 605, 1650, 1275))],
    "la-bocata": [(16, (0, 490, 1440, 1275)), (16, (728, 0, 1118, 486)), (16, (1122, 0, 1650, 380))],
    "roof-garden-nogales": [(17, (0, 0, 897, 980)), (17, (899, 0, 1650, 475)), (17, (899, 483, 1650, 787))],
    "casa-xicoh": [(18, (500, 0, 1650, 1275))],
    "departamentos-timotlan": [(19, (708, 0, 1440, 1275)), (19, (0, 660, 706, 1275))],
    "casa-magnolias": [(20, (200, 0, 1000, 1275)), (20, (1002, 0, 1650, 656))],
    "oficina-romacal": [(21, (500, 605, 1440, 1275)), (21, (577, 0, 1650, 598)), (21, (0, 605, 498, 1275))],
    "cocina-parazal": [(22, (0, 0, 1440, 783)), (22, (0, 786, 515, 1275)), (22, (519, 786, 975, 1275))],
    "casa-guerrero-200": [(23, (0, 290, 1650, 1275)), (23, (200, 0, 1110, 1275))],
}

manifest: dict[str, list[dict[str, object]]] = {}
for slug, crops in CROPS.items():
    d = OUT / slug
    d.mkdir(parents=True, exist_ok=True)
    manifest[slug] = []
    for i, (page, box) in enumerate(crops, 1):
        im = Image.open(SRC / f"pg-{page:03d}.jpg").convert("RGB").crop(box)
        name = f"{i:02d}.webp"
        im.save(d / name, "WEBP", quality=82, method=6)
        sm = im.copy()
        sm.thumbnail((760, 760))
        sm.save(d / f"{i:02d}-sm.webp", "WEBP", quality=78, method=6)
        manifest[slug].append({"src": f"/obra/{slug}/{name}", "sm": f"/obra/{slug}/{i:02d}-sm.webp", "width": im.width, "height": im.height})

# Retrato del arquitecto
im = Image.open(SRC / "pg-004.jpg").convert("RGB").crop((253, 145, 737, 793))
im.save(OUT / "gustavo.webp", "WEBP", quality=86, method=6)

# Plano/wireframe decorativo de la página de filosofía
im = Image.open(SRC / "pg-005.jpg").convert("RGB").crop((0, 0, 530, 1275))
im.save(OUT / "wireframe.webp", "WEBP", quality=80, method=6)

# Logo: plata sobre azul en la portada -> máscara blanca con alfa
cover = Image.open(SRC / "pg-000.jpg").convert("L").crop((540, 450, 1110, 775))
lo, hi = 70, 190
alpha = cover.point(lambda v: 0 if v <= lo else 255 if v >= hi else int((v - lo) * 255 / (hi - lo)))
bbox = alpha.point(lambda v: 255 if v > 40 else 0).getbbox()
alpha = alpha.crop(bbox)
logo = Image.new("RGBA", alpha.size, (255, 255, 255, 0))
logo.putalpha(alpha)
logo.save(ROOT / "public" / "arqt-logo.png", optimize=True)
print("logo", logo.size)

# Solo el isotipo (rombos), sin las letras
rows = [alpha.crop((0, y, alpha.width, y + 1)).getextrema()[1] for y in range(alpha.height)]
gap = next(y for y in range(40, alpha.height) if rows[y] < 30)
mark = logo.crop((0, 0, logo.width, gap))
mark = mark.crop(mark.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox())
mark.save(ROOT / "public" / "arqt-mark.png", optimize=True)

# Ícono de la app: isotipo blanco sobre azul ARQT
NAVY = (23, 43, 110, 255)
icon = Image.new("RGBA", (512, 512), NAVY)
m = mark.copy()
m.thumbnail((360, 360))
icon.alpha_composite(m, ((512 - m.width) // 2, (512 - m.height) // 2))
icon.convert("RGB").save(ROOT / "app" / "icon.png")
apple = icon.convert("RGB").resize((180, 180), Image.LANCZOS)
apple.save(ROOT / "app" / "apple-icon.png")

# Imagen para compartir (WhatsApp, Facebook): render + velo azul + logo
og = Image.open(SRC / "pg-019.jpg").convert("RGB").crop((708, 140, 1440, 524)).resize((1200, 630), Image.LANCZOS).convert("RGBA")
veil = Image.new("RGBA", og.size, (12, 22, 60, 165))
og.alpha_composite(veil)
lg = logo.copy()
lg.thumbnail((560, 300))
og.alpha_composite(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2))
og.convert("RGB").save(ROOT / "app" / "opengraph-image.jpg", quality=86)

(ROOT / "lib").mkdir(exist_ok=True)
(ROOT / "lib" / "images.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(json.dumps({k: len(v) for k, v in manifest.items()}))
