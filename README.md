# ARQT — Portafolio web

Sitio del **Arq. Gustavo Ríos Barrientos / ARQT Estudio de Arquitectura y Diseño**.
Next.js 16 (App Router) + Tailwind 4 + Motion + Lenis, exportado como sitio estático.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera /out (HTML estático listo para Vercel, Netlify o cualquier hosting)
npm run lint
```

## Contenido

- `lib/site.ts` — textos del estudio, servicios, biografía, cédulas y contacto.
- `lib/projects.ts` — los 16 proyectos (orden, tipología, ubicación, descripción).
- `public/obra/<proyecto>/` — imágenes. `NN.webp` es la versión completa y `NN-sm.webp` la de celular.

### Imágenes

Las imágenes actuales se recortaron del PDF del portafolio con `scripts/extract-images.py`:

```bash
pdfimages -j portafolio.pdf /tmp/pdf/pg
python3 scripts/extract-images.py /tmp/pdf
```

Para mejor calidad, reemplaza cada `NN.webp` por el render original (y regenera `NN-sm.webp` a ~760 px)
y actualiza `width`/`height` en `lib/images.json`.

## Publicar en Netlify

`netlify.toml` ya trae todo: comando `npm run build`, carpeta `out`, Node 22.

1. Netlify → **Add new site → Import an existing project → GitHub** → `portafolio-arq`.
2. Deja los valores que detecta del `netlify.toml` y da **Deploy**.
3. Cada push a `main` vuelve a publicar solo.

La imagen al compartir usa la URL de Netlify automáticamente. Si conectas un dominio propio, define
`NEXT_PUBLIC_SITE_URL` (ej. `https://arqt.mx`) en **Site configuration → Environment variables** y vuelve a publicar.
Agrega las URLs reales de Facebook e Instagram en `lib/site.ts`.
