# Contexto del proyecto

Portfolio personal de Lorenzo Graizzaro. **Sitio 100% estático**, exportado
con Next.js (`output: "export"`) y deployado en GitHub Pages.

- **URL en vivo:** https://lorengrz.github.io/
- **Repo remoto real:** `LorenGrz/lorengrz.github.io` (el nombre de la carpeta
  local, `portfolio`, no coincide con el nombre del repo en GitHub — no
  confundir al buscarlo).
- **Deploy:** automático vía GitHub Actions al pushear a `master`
  (`.github/workflows/deploy-pages.yml`): `pnpm lint` → `pnpm typecheck` →
  `pnpm build` → publica `./out`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · pnpm 11.
Fuentes (Geist, JetBrains Mono) self-host vía `next/font`. Iconos: Material
Symbols cargados por `<link>` con `icon_names=` para subsetear glifos.

## Arquitectura — ojo con esto

El proyecto **empezó** como una app dinámica con backend (`src/lib/projects/
repository.ts` con `pg`, `src/components/AdminProjectForm.tsx`, un
`ADMIN_TOKEN` para proteger `POST /api/projects`, pensado para desplegar con
SAM + un adapter de Next.js). **Pivotó a export estático puro** (ver README):
hoy no hay server components ni API routes activas en producción, todo corre
client-side sobre HTML/JS estáticos.

- Ese código de la etapa "dinámica" (`repository.ts`, `AdminProjectForm.tsx`,
  `zod`, `pg` como dependencia, `aws/template.yaml` si existe) sigue en el
  repo pero **no se ejecuta en producción** — es código muerto o a medio
  migrar, no asumir que el admin flow funciona.
- Los proyectos que se muestran hoy salen de un array hardcodeado:
  `src/lib/projects/seed-projects.ts`. Para agregar uno: sumar una entrada ahí
  y pushear a `master`. No hay carga dinámica ni base de datos real en runtime.
- Imágenes: `ContentCreator` y `HumanDetector` usan capturas reales en
  `public/`; el resto usa Unsplash (dominio permitido en `next.config.ts`).
  `images: []` en un proyecto cae a un placeholder con el nombre.

## CV / Resume

- Fuente de verdad: `public/resume.json` / `public/resume.en.json` (formato
  JSON Resume).
- Los PDFs (`public/Lorenzo_Graizzaro_CV_ES.pdf` / `_EN.pdf`) se generan con
  `pnpm cv` (usa `puppeteer-core`, de ahí esa dependencia) a partir de esos
  JSON. Si se tocan proyectos o skills del resume, hay que regenerarlos.

## Comandos

```bash
pnpm dev · pnpm build (→ ./out) · pnpm lint · pnpm typecheck
pnpm cv   # regenera los dos PDFs desde resume.json/resume.en.json
```

## Notas

- `src/app/robots.ts` y `src/app/sitemap.ts` generan `robots.txt`/`sitemap.xml`
  en el build.
- Scroll-reveal solo oculta contenido cuando hay JS (`html.js`); sin JS se ve
  todo igual (progressive enhancement, no rompe accesibilidad).
- Ya existe `.agents/CONTEXT.md` con notas más detalladas de estructura de
  carpetas (quedó desactualizado en la parte de arquitectura/DB — este
  CLAUDE.md es la versión al día).

## Última revisión

2026-09-04 — primera vez que se documenta en CLAUDE.md (antes solo existía
`.agents/CONTEXT.md`, parcialmente desactualizado).
