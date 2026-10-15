# CV + portfolio orientados a valor agregado

## Contexto
Hoy el CV y el portfolio describen proyectos y experiencia por *qué tecnologías usa* y *cómo está hecho*. Loren quiere que lo entienda alguien de RRHH: qué problema resolví, qué resultado tuvo, en qué eventos estuve presente y qué presenté. Las tecnologías se quedan donde ya están (línea "Stack:" bajo el título en el CV, chips bajo el texto en el portfolio); el texto pasa a ser problema → solución → resultado / concepto clave aprendido. Además: reordenar el CV y sumar una sección de comunidad/eventos.

Reglas (skill `cv-linkedin-optimizer`): no inventar resultados — solo métricas que ya existen (~300 inscripciones OpenRuleta, ~35% menos falsos positivos y latencias de FraudDetector). Sin años en eventos salvo Data Saturday LATAM 2026 (único dato confirmado). CV ≤ 2 páginas.

## Cambios

### 1. `scripts/generate-cv.mjs` — orden de secciones
Nuevo orden: Perfil profesional → **Experiencia laboral → Proyectos → Comunidad y eventos → Educación → Habilidades** → Información adicional.
- Agregar label `events` ("Comunidad y eventos" / "Community & Events").
- `renderEvents(resume.events)`: bullets `•` de texto (reusa `bulletList`), una línea por evento — ATS-safe, sin tablas.
- `renderWork`: imprimir `w.summary` como una línea antes de los highlights (hoy no se imprime) solo si entra en 2 páginas; si no, dejar solo highlights.

### 2. `public/resume.json` y `public/resume.en.json` — contenido
- **`basics.summary`**: reescrito a valor: "Desarrollo productos con IA integrada que resuelven problemas concretos: priorizar lo urgente, convertir apuntes en práctica, detectar fraude. Llevé OpenRuleta a eventos de la comunidad tech (KCD, Ekoparty, Data Saturday LATAM) donde la operé en vivo con cientos de asistentes. Como ayudante de cátedra en UNSAM acompaño a equipos a tomar decisiones de arquitectura…" (tecnologías mínimas, solo las core: IA/agentes, AWS, full-stack TypeScript/Python).
- **`work[].highlights`** reescritos con verbo de acción + impacto:
  - UNSAM: "Acompaño a equipos de alumnos a elegir la base de datos correcta para cada caso…", "Ayudo a transformar proyectos acoplados en arquitecturas que pueden crecer…".
  - Freelance: aplicaciones a medida para clientes; IA como parte del proceso que automatiza tareas repetitivas; enlazar a proyectos propios.
  - Fabric SRL: "Automaticé el reporting operativo con consultas SQL sobre producción, reemplazando armado manual…" (sin números), gestión contable con Xubio.
  - Banco Nación: atención de alto volumen con foco en precisión y seguridad de datos → habilidad de comunicación con usuarios no técnicos.
- **`projects[]`**: `keywords` se mantiene (línea Stack). Prioria con stack resumido: `React Native, Expo, AWS serverless (Lambda, Bedrock, DynamoDB, Cognito, SQS, Polly, SAM)`. `highlights` pasan a problema/valor, ej.:
  - Prioria: "Resuelve la sobrecarga de notificaciones: un agente de IA decide qué es urgente y lo anuncia por voz, sin que el usuario tenga que mirar el teléfono"; "Aprende de cada respuesta del usuario (feedback 👍/👎)"; "Infraestructura 100% serverless: costo casi nulo sin uso, escala sola".
  - StudyQuest: "Convierte apuntes y PDFs en quizzes jugables en minutos"; "Estudio colaborativo en tiempo real (matchmaking, salas, chat)"; "Proveedor de IA intercambiable para controlar costos por plan"; concepto clave: Spec-Driven Development.
  - OpenRuleta: "Presentado y operado en vivo en KCD, Ekoparty y Data Saturday LATAM Argentina 2026 (~300 inscripciones simultáneas desde el celular), sobre plan gratuito de Supabase"; "Seguridad por diseño: el formulario público solo puede inscribir, nunca leer datos".
  - FraudDetector: "Reduce ~35% los falsos positivos al exigir consenso de 3 modelos"; "Respuestas en 40–150 ms, aptas para análisis en tiempo real".
  - BookLibre: "Trabajo en equipo académico con flujo de PRs"; "Cada dato en la base que mejor le sirve (relacional, documentos, caché)"; sesiones seguras cross-origin.
- **Nuevo `events`** (clave custom, JSON Resume admite extras), array de strings:
  - "KCD, Ekoparty y Data Saturday LATAM Argentina 2026: presenté y operé OpenRuleta en vivo para los sorteos del evento"
  - "Nerdearla: asistente"
  - "Charlas y meetups de AWS, OpenAI Codex y Microsoft (IA y GitHub Copilot)"
  - "Participación en hackatones (ej. HumanDetector en una antihackathon)"
- `meta.lastModified` → 2026-10-15.

### 3. Portfolio
- `src/lib/projects/seed-projects.ts`: reescribir `summary` de los 9 proyectos a valor/problema (es lo que se muestra; chips de stack quedan igual en `project-carousel.tsx:161` / `projects-section.tsx:108`). `description` se ajusta solo donde arranque listando tecnologías (no se muestra en UI, baja prioridad). OpenRuleta menciona KCD/Ekoparty/Data Saturday.
- `src/app/page.tsx`:
  - `experience[].description` sincronizado con los nuevos highlights del resume (misma redacción).
  - Hero y About: párrafo orientado a qué resuelvo, dejando el título "Software developer y AI Engineer" y "React/Next.js", "Node.js/NestJS" (reglas de CLAUDE.md).
  - Nueva sección `#community` "Comunidad y eventos" entre Experiencia y Contacto, mismo estilo (`section-kicker`, `section-title`, `card-outline`, `reveal`), lista de eventos de un array local `events` como `skills`/`experience`. Se agrega al nav en `site-header.tsx` como "Comunidad" solo si la píldora entra a 1024px; si no, se deja fuera del nav.

### 4. LinkedIn (salida de la skill, en el chat, sin archivos)
Headline `Software Developer & AI Engineer | Productos con IA que resuelven problemas reales | AWS · React/Next.js · Node.js/NestJS`, About corto y skills a destacar, más lista de gaps (sin métricas de clientes freelance; años de eventos).

### 5. Docs
Actualizar `CLAUDE.md` (sección Diseño/CV: nuevo orden, `events`, sección Comunidad) tras el merge, según flujo git del AGENTS global (rama `feat/value-oriented-cv`, `--no-ff`).

## Verificación
- `pnpm lint && pnpm typecheck && pnpm build`
- `pnpm cv` → `pdfinfo` ≤ 2 páginas en ES y EN; `pdftotext public/Lorenzo-Graizzaro-CV-ES.pdf -` muestra el orden Experiencia → Proyectos → Comunidad → Educación → Habilidades y los bullets en orden.
- `pnpm dev` y revisar en navegador: carrusel, grilla, nueva sección Comunidad (mobile y ≥1024px), nav.

## Cambio posterior (2026-10-15)
A pedido de Loren se descartó la sección "Comunidad y eventos" (CV y portfolio): los eventos se mencionan solo en el perfil profesional del CV (y en hero/About del sitio). Orden final del CV: Perfil → Experiencia → Proyectos → Educación → Habilidades.
