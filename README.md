# Lorenzo Graizzaro — Portfolio

Portfolio personal desplegado como sitio estático en S3 + CloudFront.

**URL en vivo:** https://d3q8bee4t9y11e.cloudfront.net

## Stack

- Next.js 16 (App Router, `output: 'export'` — sitio 100% estático)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm 11
- AWS SAM (infra: S3 + CloudFront via CloudFormation)

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
pnpm deploy       # build + sam deploy (infra) + s3 sync + cloudfront invalidation
```

## Deploy

El script `scripts/deploy.sh` hace todo el pipeline:

```bash
pnpm deploy
```

Pasos internos: `pnpm build` → `sam deploy` (stack `lorenzo-portfolio`) → `aws s3 sync out/ s3://lorenzo-portfolio-493735739644 --delete` → invalidación de CloudFront.

**Recursos AWS:**
- S3: `lorenzo-portfolio-493735739644`
- CloudFront: `E4X6I2HDSWCGA`

## Proyectos

Los proyectos se cargan desde `src/lib/projects/seed-projects.ts`. Para agregar uno nuevo: agregar una entrada al array `seedProjects` y correr `pnpm deploy`.

La capa de base de datos (PostgreSQL + admin form) está deshabilitada — los archivos se conservan en `_disabled_api/` y `database/` para referencia futura.

## Notas

- El portfolio usa exportación estática — no hay server components ni API routes activas en producción.
- Los archivos de CV están en `public/` (`Lorenzo_Graizzaro_CV_ES.pdf`, `Lorenzo_Graizzaro_CV_EN.pdf`).
- La fuente Material Symbols se carga vía `<link>` en `layout.tsx`, no con `@import` en CSS (Turbopack descarta el segundo `@import`).
