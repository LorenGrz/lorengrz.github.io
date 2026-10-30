# Refinamiento visual del portfolio (frontend-design)

## Contexto
Loren pidió revisar todo el sitio con criterio de "buen gusto". La skill elegida es `frontend-design`, que ya está instalada. El alcance elegido es **refinamiento**: se mantienen la paleta oscura con acento naranja y Mona Sans + JetBrains Mono. Se sacan los rasgos genéricos (que delatan una plantilla), y la terminal del hero queda como el único elemento llamativo, porque muestra el flujo real scout/reasoner/worker.
Pedidos explícitos durante la planificación:
1. Cambiar el fondo del hero por otra cosa.
2. Sacar "Disponible para nuevas oportunidades", que se ve "muy Claude".

Archivos: `src/app/page.tsx`, `src/app/globals.css`, `src/components/projects-section.tsx`, `src/components/project-carousel.tsx`. No hace falta tocar `site-header.tsx`.

## Cambios

### 1. Hero (`page.tsx` + `globals.css`)
- **Fondo nuevo:** se van la aurora (los dos blobs), la grilla y el grano. En su lugar va un SVG inline estático con forma de **grafo de ramas git**: líneas de `master` con ramas `feat/`, `fix/` y `refactor/` que salen y vuelven con merges `--no-ff`, que es el flujo real del repo. Va del lado derecho, detrás de la terminal, con `stroke` en `--outline-variant`, sin animación y con `aria-hidden`. Los nodos de merge más recientes llevan `--primary` con opacidad baja. Se desvanece hacia la izquierda con una `mask-image` para no competir con el texto. En mobile se ve más tenue o se recorta.
  - Clases que se borran de `globals.css`: `.hero-grid`, `.hero-aurora*`, `@keyframes aurora-drift-*` y `.grain`. Se agrega `.hero-graph`.
- **Se borra la píldora "Disponible para nuevas oportunidades"** junto con `.dot-pulse` y su keyframe. No se reemplaza por nada; Contacto ya dice que estás disponible para entrevistas.
- Hoy el `<span font-semibold>` destaca una sola frase dentro del párrafo, que es un patrón de plantilla. Lo cambio por un subtítulo propio ("Software developer y AI Engineer") en una línea con peso medio, y el párrafo queda aparte.
- Los colores hex sueltos de la terminal (`#7cc4ff`, `#c4a7ff` y `#ffb37a`) pasan a tokens en `:root` (`--agent-scout`, `--agent-reasoner` y `--agent-worker`).
- Entrada del hero: se mantiene una sola secuencia orquestada, porque ese es el "momento" permitido.

### 2. Rótulos y movimiento (todas las secciones)
- Saco el `section-kicker` mono ("Sobre mí", "Habilidades", "Proyectos", "Experiencia", "Contacto") arriba de cada `h2`, porque repite el título y el nav. Se borra la clase `.section-kicker`.
- Saco el scroll-reveal de las secciones (`reveal reveal-*` en `page.tsx` y `projects-section.tsx`). Queda solo la entrada del hero. `scroll-reveal.tsx` y las reglas `.reveal` se borran si nada más las usa; lo confirmo con `rg "reveal"` antes de borrar. También se va `revealFrom`/`revealNew` de "ver más".
- Saco el `group-hover:scale-105` de las imágenes de "Otros proyectos" y dejo solo el cambio de borde.

### 3. Títulos de sección: copy más directo
- About: "Desarrollador de software especializado en aplicaciones impulsadas por IA" repite el hero. Lo cambio por un h2 corto ("Sobre mí").
- Skills: "Stack técnico con el que construyo y lanzo proyectos." → "Habilidades".
- Experiencia: "Experiencia que moldea cómo construyo software." → "Experiencia".
- Proyectos: queda "Proyectos destacados." (decisión documentada en AGENTS.md), sin punto final para que coincida con el resto.
- Contacto: "Conectemos." → "Contacto". Se mantiene la línea de disponibilidad.
- Todos los títulos van alineados a la izquierda (hoy algunos están centrados y otros no) y sin punto final.

### 4. Tipografía y chips
- Uso el mono solo donde el contenido es código o datos: la terminal, los chips de stack de proyecto y las fechas de experiencia. Las skills, el "Otros proyectos", el estado de proyecto y "Repositorio privado" pasan a sans.
- En Skills, los chips pasan a texto plano separado por comas dentro de cada categoría (menos ruido de píldoras). "Aprendiendo" mantiene el borde punteado como único diferenciador.
- En el carrusel, el contador `01/05` se queda: es la posición real dentro de una secuencia, así que está justificado.

### 5. Limpieza menor
- En el footer saco la línea "Construido con Next.js…"; dejo el nombre y un link a GitHub reusando `contactLinks`.
- Se mantiene el foco visible, `prefers-reduced-motion` y el gutter de mobile.

## Fuera de alcance
La paleta, las fuentes, el header/nav, el modal de CV, los datos de proyectos y el CV en PDF quedan como están.

## Docs
- `AGENTS.md`, sección Diseño: actualizar la descripción del hero (grafo de ramas en lugar de aurora/grano, sin píldora de disponibilidad, sin kickers ni scroll-reveal).
- Copiar este plan a `docs/superpowers/plans/2026-10-30-visual-refinement.md`.

## Git
- Rama `feat/visual-refinement` (incluye el cambio de hero/instructor que ya está sin commitear en `page.tsx`).
- Commit, push y merge `--no-ff` a `master` solo si Loren lo confirma.

## Verificación
1. `pnpm lint && pnpm typecheck && pnpm build`.
2. `pnpm dev` + Playwright: screenshots a 375px, 768px y 1280px del hero, de cada sección y del menú mobile. Revisar que el grafo no compita con el texto y que no haya scroll horizontal.
3. Emular `prefers-reduced-motion` y navegar con Tab para confirmar que el foco se ve.
4. `rg -n "section-kicker|hero-aurora|grain|dot-pulse|reveal"` no debe devolver usos huérfanos.
