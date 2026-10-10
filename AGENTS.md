# AGENTS.md

Single source of truth for humans and AI agents working on this repo. Moved here from CLAUDE.md on 2026-10-10 by `project-init`'s adopt mode - if this file and the code disagree, the code wins, fix this file.

## Documentation map (read this instead of the code)

1. `AGENTS.md` (this file) - map, how we work, workflow contract.
2. `.agents/CONTEXT.md` - current stack/architecture snapshot and repo facts.
3. `docs/plans/HANDOFF.md` - current state and how to resume, read first if work is mid-flight.
4. `docs/decisions/` - ADRs: why a non-trivial trade-off was decided the way it was.

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
- Los PDFs (`public/Lorenzo-Graizzaro-CV-ES.pdf` / `-EN.pdf`) se generan con
  `pnpm cv` (usa `puppeteer-core`, de ahí esa dependencia) a partir de esos
  JSON. Si se tocan proyectos o skills del resume, hay que regenerarlos.
- `scripts/generate-cv.mjs` sigue reglas ATS (basadas en
  `msdanyg/ats-resume-skill`): una sola columna, sin tablas, skills como líneas
  `Categoría: a, b, c`, experiencia apilada Título / Empresa / Fechas, fechas
  `Mon YYYY`, bullets `•` como texto. No reintroducir columnas ni tablas.
  Verificar con `pdftotext public/Lorenzo-Graizzaro-CV-ES.pdf -` que el texto
  salga en orden. `description` de cada proyecto no se imprime (solo stack +
  highlights) para no pasar de 2 páginas.

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

## Diseño

Rediseño "premium" (2026-09-30, rama `feature/premium-redesign`), aplicado
siguiendo la skill `frontend-design` (`anthropics/skills`, instalada en el hub
de skills en `~/.agents/skills/development/frontend-design/`). Mockup previo
en Claude Design: https://claude.ai/artifact/1FMhf2NTbVFmeYEANoR8Tj (privado).

- Tipografía: `Mona Sans` (variable, eje `wdth`) vía `next/font/google` en vez
  de Geist. JetBrains Mono se mantiene para código/tags.
- Navbar (`site-header.tsx`): ya no muestra el nombre ni ningún monograma —
  solo la píldora de links (izquierda, visible desde `lg`) con indicador que
  se desliza según la sección visible (scrollspy con `IntersectionObserver`),
  y el botón "CV" a la derecha (`ml-auto`, sin `justify-between`: con un solo
  hijo visible en mobile ese `justify-between` lo mandaba a la izquierda).
  El toggle mobile/pill es a `lg` (1024px), no `md` — a 768-1024 la píldora
  con 5 links + CV quedaba apretada. Menú mobile a pantalla completa con el
  mismo `open`/Escape de antes; los links de redes del menú mobile reusan la
  clase `.contact-link` (vía `src/lib/contact-links.ts`, compartido con la
  sección Contacto) en vez de texto plano.
- Hero: sin imagen de fondo (se borró `public/hero-bg.jpg`) — grid CSS con
  fade, dos blobs de aurora animados y grano SVG inline, todo en
  `globals.css`. Sin librería de animación: motion es CSS + React state
  (se evaluó `motion`/framer-motion pero no se usó, para no sumar una
  dependencia sin justificar peso de bundle).
- Proyectos (`projects-section.tsx` + `project-carousel.tsx`): los destacados
  ahora son los 5 que aparecen en el CV (`public/resume.json`), en ese mismo
  orden — Prioria, StudyQuest, OpenRuleta, FraudDetector, BookLibre — en un
  carrusel de a uno (2026-10-07): con JS el track se mueve con `transform` +
  transición CSS (no `scrollIntoView` smooth, que se ignora si el SO/navegador
  tiene animaciones desactivadas), con drag/swipe por pointer events y ←/→;
  bajo `prefers-reduced-motion` hace crossfade en vez de deslizar. Sin JS
  (`html:not(.js)`) cae a una tira `scroll-snap` nativa. El `gap` del track
  en CSS tiene que coincidir con `TRACK_GAP` en `project-carousel.tsx`.
  El resto de proyectos quedó abajo en la grilla con paginación "ver más" que
  ya existía. `Project.featured` ahora refleja "está en el CV", no todos
  `true` como antes.
- Skills: mantiene la organización en categorías de antes (no bento), solo
  restyle.
- Siempre "Node.js/NestJS", nunca "NestJS" solo, en todo texto visible del
  sitio.
- CSS: las clases propias (`.nav-mark`, `.button-primary`, `.card-outline`,
  etc.) viven dentro de `@layer components` en `globals.css` — si quedan
  fuera de ese layer, ganan por orden de cascada sobre utilities de Tailwind
  con el mismo selector (ej. `md:hidden` dejaba de aplicar). Si se agregan
  clases nuevas ahí, van dentro del mismo `@layer components`.
- About: la foto (`me.jpg`) tiene un halo con gradiente/blur detrás en vez del
  borde grueso de antes, y es más grande en mobile (`w-64` vs `w-48`).
- Título "Software Developer & AI Engineer" (no solo "Software Developer") en
  `<title>`, OpenGraph, Twitter card y JSON-LD (`layout.tsx`), y "Software
  developer y AI Engineer" en el hero/About. Siempre "React/Next.js" en texto
  genérico sobre el stack propio (hero, About, categoría Frontend de Skills);
  en el stack de un proyecto puntual solo si ese proyecto usa Next.js de
  verdad (ver OpenRuleta) — no se fuerza en proyectos que son Vite/CRA.
- Proyectos: el heading de la sección dice "Proyectos destacados." (no "Los
  que están en mi CV.").
- Experiencia (`page.tsx` + `public/resume.json`/`resume.en.json`): las 4
  entradas (UNSAM, Freelance, FABRIC SRL, Banco Nación) están sincronizadas
  con el LinkedIn de Loren (títulos, fechas y bullets), no son texto libre.
  Si cambia el LinkedIn, hay que volver a pasarlo a mano (no hay scraping
  automático) y correr `pnpm cv` de nuevo para regenerar los PDFs.

## Última revisión

2026-09-07 — se borró el stack de AWS `lorenzo-portfolio` (S3 + CloudFront +
OAC), un duplicado estático sin dominio propio que servía una copia vieja del
sitio. El único deploy vivo es GitHub Pages. No queda nada de AWS: el repo ya
no tenía `template.yaml` (el `.aws-sam/` local era cruft de agosto) y se quitó
`/.aws-sam/` del `.gitignore`. Sigue pendiente el código muerto de la etapa
"dinámica" (`pg`, `zod`, `repository.ts`, `AdminProjectForm.tsx`).

2026-09-04 — primera vez que se documenta en CLAUDE.md (antes solo existía
`.agents/CONTEXT.md`, parcialmente desactualizado).

## Workflow contract

These rules describe this repo's CURRENT reality, detected by `project-init`'s `adopt.sh` on 2026-10-10 - not an aspiration. If a row says "nothing (convention only)", that rule is not mechanically enforced today.

| Rule | Documented | Enforced by |
|---|---|---|
| Single branch flow - `master` is both base and release branch | this section | nothing (convention only) |
| Branch names observed: feature/ (15),fix/ (4),refactor/ (2) | this section | nothing (convention only) |
| PRs merged into `master` via merge commit (21 of last 30 commits are merges) | this section | nothing (convention only) |
| ~98% of the last 50 commit subjects on `master` are Conventional Commits | this section | nothing (convention only) |
| CI: Deploy to GitHub Pages (deploy-pages.yml): push,workflow_dispatch | this section | nothing requires it to pass before merge |
| Repo allows: squash=true, merge-commit=true, rebase=true; delete-branch-on-merge=false | this section | GitHub repo settings (`gh repo view`) |

Changing any rule above: update this table and every enforcement point in the same change, and record it in `docs/decisions/`.

### Recommended (not enforced yet)
- Branch protection on `master` (required status checks, no force-push).


## Documentation rules

- Any decision with a real trade-off (architecture, a hard-to-reverse library/service choice, data model, security trade-off) gets a new ADR under the ADR directory above.
- When work pauses mid-flight, update `docs/plans/HANDOFF.md` before stopping, not after.
- A change that alters architecture, env vars, commands, or deploy updates `AGENTS.md` and `.agents/CONTEXT.md` in the same change.
- Changing any "Workflow contract" rule updates every enforcement point in the same change, per that section above.
