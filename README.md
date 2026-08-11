# Lorenzo Graizzaro — Portfolio

Portfolio personal desplegado como sitio estático en GitHub Pages.

**URL en vivo:** https://lorengrz.github.io/

## Stack

- Next.js 16 (App Router, `output: 'export'` — sitio 100% estático)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm 11

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
```

## Deploy

El deploy es automático vía GitHub Actions al hacer push a `master`.

**Repo:** `LorenGrz/lorengrz.github.io`
**Workflow:** `.github/workflows/deploy-pages.yml`
**Pasos internos:** `pnpm build` → sube `./out` como artefacto → GitHub Pages publica en `https://lorengrz.github.io/`

## Proyectos

Los proyectos se cargan desde `src/lib/projects/seed-projects.ts`. Para agregar uno nuevo: agregar una entrada al array `seedProjects` y hacer push a `master`.

La capa de base de datos (PostgreSQL + admin form) está deshabilitada — los archivos se conservan en `_disabled_api/` y `database/` para referencia futura.

## CV / Resume

- Los archivos de CV están en `public/` (`Lorenzo_Graizzaro_CV_ES.pdf`, `Lorenzo_Graizzaro_CV_EN.pdf`).
- La fuente de verdad de los datos del CV es `public/resume.json` (formato JSON Resume).
- Los PDFs se generan manualmente a partir de `resume.json` — al actualizar proyectos o skills, regenerar los PDFs.

## Notas

- El portfolio usa exportación estática — no hay server components ni API routes activas en producción.
- La fuente Material Symbols se carga vía `<link>` en `layout.tsx`, no con `@import` en CSS (Turbopack descarta el segundo `@import`).
