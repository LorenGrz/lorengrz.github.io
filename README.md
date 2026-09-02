# Lorenzo Graizzaro — Portfolio

Portfolio personal desplegado como sitio 100% estático en GitHub Pages.

**URL en vivo:** https://lorengrz.github.io/

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm 11

Fuentes (Geist, JetBrains Mono) vía `next/font` (self-host). Los iconos usan Material Symbols cargados por `<link>` con `icon_names=` para subsetear solo los glifos usados.

## Setup local

```bash
pnpm install
pnpm dev
# http://localhost:3000
```

## Scripts

```bash
pnpm dev          # servidor de desarrollo
pnpm build        # build estático → ./out
pnpm lint
pnpm typecheck
pnpm cv           # regenera los PDFs de CV desde resume.json
```

## Deploy

Automático vía GitHub Actions al hacer push a `master`.

**Repo:** `LorenGrz/lorengrz.github.io`
**Workflow:** `.github/workflows/deploy-pages.yml` — `pnpm lint` → `pnpm typecheck` → `pnpm build` → publica `./out` en GitHub Pages.

## Proyectos

Se cargan desde `src/lib/projects/seed-projects.ts`. Para agregar uno: sumar una entrada al array `seedProjects` y hacer push a `master`.

- `images: []` muestra un placeholder con el nombre del proyecto. Para una captura real, poné el archivo en `public/` y referencialo con una ruta relativa (`/mi-proyecto.png`).
- No se usan imágenes externas.

## CV / Resume

- Los PDFs están en `public/` (`Lorenzo_Graizzaro_CV_ES.pdf`, `Lorenzo_Graizzaro_CV_EN.pdf`).
- Fuente de verdad: `public/resume.json` / `public/resume.en.json` (formato JSON Resume).
- Los PDFs se generan con `pnpm cv` a partir de esos JSON — al tocar proyectos o skills, regenerarlos.

## Notas

- Exportación estática: sin server components ni API routes activas en producción.
- `src/app/robots.ts` y `src/app/sitemap.ts` generan `robots.txt` y `sitemap.xml` en el build.
- El scroll-reveal solo oculta contenido cuando hay JS (`html.js`); sin JS todo se ve igual.
