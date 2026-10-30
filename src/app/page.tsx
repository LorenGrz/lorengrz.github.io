import Image from "next/image";
import { CVDownloadModal } from "@/components/cv-download-modal";
import { SiteHeader } from "@/components/site-header";
import { ProjectsSection } from "@/components/projects-section";
import { contactLinks } from "@/lib/contact-links";

const skills = [
  {
    title: "Frontend",
    icon: "terminal",
    items: ["React/Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    learning: false,
  },
  {
    title: "Backend",
    icon: "dns",
    items: ["Node.js", "Next.js", "Kotlin", "Spring Boot", "FastAPI", "REST APIs", "GraphQL"],
    learning: false,
  },
  {
    title: "Datos e Infra",
    icon: "storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP"],
    learning: false,
  },
  {
    title: "Herramientas",
    icon: "settings",
    items: ["Git", "GitHub", "pnpm", "ESLint", "SQL", "Linux"],
    learning: false,
  },
  {
    title: "Datos & ML",
    icon: "query_stats",
    items: ["Python", "pandas", "scikit-learn", "Análisis de datos", "Redes neuronales"],
    learning: false,
  },
  {
    title: "IA y Agentes",
    icon: "smart_toy",
    items: [
      "LLMs",
      "RAG",
      "MCP",
      "Agentes y subagentes",
      "Spec-Driven Development",
      "Amazon Bedrock",
      "Strands Agents",
      "Claude Code",
    ],
    learning: false,
  },
  {
    title: "Aprendiendo",
    icon: "auto_stories",
    items: ["Node.js/NestJS", "WebSockets", "Next.js", "React Native"],
    learning: true,
  },
];

const experience = [
  {
    role: "Instructor Universitario",
    company: "UNSAM",
    period: "Jun 2026 - Presente",
    current: true,
    description:
      "Acompaño a equipos de alumnos avanzados de Algoritmos 3 y PHM a construir aplicaciones completas con buenas prácticas: los ayudo a elegir la base de datos adecuada para su problema y a justificarla, y a que sus proyectos queden desacoplados y mantenibles, listos para crecer. Traduzco conceptos técnicos complejos en explicaciones simples.",
  },
  {
    role: "Software Developer",
    company: "Freelance",
    period: "Ene 2026 - Presente",
    current: true,
    description:
      "Entrego aplicaciones a medida para clientes donde la IA es parte del proceso y no un agregado: automatiza tareas repetitivas y simplifica el trabajo del usuario, con soluciones seguras y costos de infraestructura acotados. En paralelo llevo mis propios productos de la idea al uso real: OpenRuleta se usó en vivo en eventos con cientos de personas.",
  },
  {
    role: "Especialista Administrativo",
    company: "FABRIC SRL",
    period: "Ene 2025 - Dic 2025",
    current: false,
    description:
      "Facturación, pagos, impuestos, sueldos y control de stock. Armé reportes operativos con consultas SQL directas sobre la base de producción, para tener la información del negocio a mano al tomar decisiones, y gestioné la contabilidad diaria con Xubio cuidando la exactitud de los datos.",
  },
  {
    role: "Servicio de Atención al Cliente",
    company: "Banco Nación",
    period: "Feb 2024 - Ago 2025",
    current: false,
    description:
      "Resolví consultas de alto volumen por canales remotos, explicando procesos bancarios a personas no técnicas y manejando información sensible de clientes con procedimientos de seguridad estrictos.",
  },
] as const;

// Background for the hero: this repo's own branch flow (feat/fix/refactor
// branches merged back into master with --no-ff), drawn as a static git graph.
const branches = [
  "M300 70 C300 110 370 100 370 140 V250 C370 290 300 280 300 320",
  "M300 360 C300 400 230 390 230 430 V490 C230 530 300 520 300 560",
  "M300 590 C300 630 370 620 370 660 V700 C370 740 300 730 300 760",
  "M300 610 C300 660 440 640 440 690 V800",
];
const commits: [number, number][] = [
  [370, 160], [370, 200], [370, 240], [230, 450], [230, 480], [370, 670], [370, 700], [440, 710], [440, 760],
];
const merges: [number, number][] = [[300, 320], [300, 560], [300, 760]];

function HeroGraph() {
  return (
    <svg
      aria-hidden
      className="hero-graph"
      fill="none"
      preserveAspectRatio="xMaxYMid meet"
      viewBox="0 0 600 800"
    >
      <path d="M300 0 V800" />
      {branches.map((d) => (
        <path d={d} key={d} />
      ))}
      {commits.map(([cx, cy]) => (
        <circle cx={cx} cy={cy} key={`${cx}-${cy}`} r="5" />
      ))}
      {merges.map(([cx, cy], i) => (
        <circle
          className={i === merges.length - 1 ? "hero-graph-head" : undefined}
          cx={cx}
          cy={cy}
          key={`${cx}-${cy}`}
          r="7"
        />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="pt-16">
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
          <HeroGraph />

          <div className="relative mx-auto grid w-full max-w-container gap-10 px-page py-section lg:grid-cols-[1fr_460px] lg:items-center">
            <div className="hero-intro max-w-3xl">
              <h1
                className="text-5xl font-bold leading-[0.95] tracking-tight text-on-surface sm:text-6xl lg:text-7xl"
                style={{ fontVariationSettings: "'wdth' 120" }}
              >
                Lorenzo
                <br />
                Graizzaro
              </h1>
              <p className="mt-5 text-xl font-medium text-on-surface sm:text-2xl">Software developer y AI Engineer</p>
              <p className="mt-3 max-w-xl text-lg leading-7 text-on-surface-variant">
                Construyo productos con IA integrada que resuelven problemas concretos, del primer boceto al uso real.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="button-primary" href="#projects">
                  Ver proyectos
                </a>
                <a className="button-secondary" href="#contact">
                  Contacto
                </a>
                <CVDownloadModal variant="hero" />
              </div>
            </div>

            <div className="hero-aside hidden lg:block">
              <div className="overflow-hidden rounded-2xl border border-outline bg-surface/90 font-mono text-[13px] leading-[1.9] shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-outline-variant px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-outline" />
                  <span className="h-2.5 w-2.5 rounded-full bg-outline" />
                  <span className="h-2.5 w-2.5 rounded-full bg-outline" />
                  <span className="ml-2.5 text-xs text-on-surface-variant">~/projects/portfolio</span>
                </div>
                <div className="px-5 py-5 text-on-surface-variant">
                  <p>
                    <span className="text-primary">›</span>{" "}
                    <span className="text-on-surface">sumá OpenRuleta a la sección de proyectos</span>
                  </p>
                  <div className="mt-2.5 grid grid-cols-[6.5rem_1fr] gap-x-2">
                    <span className="text-agent-scout">scout</span>
                    <span>lee seed-projects.ts y sus convenciones</span>
                    <span className="text-agent-reasoner">reasoner</span>
                    <span>decide orden, imagen y links</span>
                    <span className="text-agent-worker">worker</span>
                    <span>implementa la entrada nueva</span>
                  </div>
                  <p className="mt-2.5 flex gap-x-4">
                    <span><span className="text-secondary">✓</span> pnpm lint</span>
                    <span><span className="text-secondary">✓</span> typecheck</span>
                    <span><span className="text-secondary">✓</span> build</span>
                  </p>
                  <p>
                    <span className="text-secondary">✓</span> deploy en GitHub Pages
                  </p>
                  <p className="mt-1.5 flex items-center gap-2">
                    <span className="text-primary">›</span>
                    <span aria-hidden className="caret-blink h-[1.15em] w-[0.6em] bg-on-surface" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-section" id="about">
          <div className="mx-auto grid max-w-container gap-10 px-page lg:grid-cols-12 lg:items-center">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <h2 className="section-title">Sobre mí</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-on-surface-variant">
                <p>
                  Me enfoco en el problema antes que en la herramienta: filtrar
                  lo urgente entre cientos de notificaciones, convertir apuntes en práctica de estudio o detectar
                  fraude con menos falsas alarmas. Uso la IA como parte del proceso, no como un agregado.
                </p>
                <p>
                  Como instructor universitario en UNSAM acompaño a equipos de alumnos en sus decisiones de arquitectura, y
                  participo en la comunidad tech en eventos como KCD, Ekoparty, Nerdearla, Data Saturday LATAM y muchos otros más.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-outline-variant bg-surface p-5">
                <h3 className="text-base font-semibold">Educación</h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="text-on-surface-variant">Tecnicatura en Programación Informática</p>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires, Jul 2026</p>
                  </div>
                  <div className="border-t border-outline-variant pt-4">
                    <p className="text-on-surface-variant">
                      Licenciatura en Desarrollo de Software <span className="text-primary">(en curso)</span>
                    </p>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
              <div className="relative w-64 sm:w-full sm:max-w-xs">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-outline">
                  <Image
                    alt="Lorenzo Graizzaro"
                    className="object-cover"
                    fill
                    sizes="(min-width: 640px) 320px, 256px"
                    src="/me.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-page py-section" id="skills">
          <h2 className="section-title">Habilidades</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {skills.map((group) => (
              <article
                className={`card-outline rounded-xl p-5 ${group.learning ? "border-dashed border-primary/40 sm:col-span-2 lg:col-span-3" : ""}`}
                key={group.title}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[22px] text-primary">{group.icon}</span>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                <p className={`mt-3 text-sm leading-6 ${group.learning ? "text-primary" : "text-on-surface-variant"}`}>
                  {group.items.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <ProjectsSection />

        <section className="mx-auto max-w-container px-page py-section" id="experience">
          <h2 className="section-title">Experiencia</h2>
          <ol className="timeline mt-12 flex max-w-2xl flex-col gap-10">
            {experience.map((item) => (
              <li className="relative pl-8" key={`${item.company}-${item.role}`}>
                <span className="timeline-dot" data-current={item.current} aria-hidden />
                <p className="font-mono text-sm text-primary">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.company}</h3>
                <p className="mt-1 font-medium text-on-surface-variant">{item.role}</p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-surface-container-low py-section" id="contact">
          <div className="mx-auto max-w-container px-page">
            <h2 className="section-title">Contacto</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-on-surface-variant">
              Estoy disponible para entrevistas técnicas y conversaciones sobre aplicaciones web prácticas.
            </p>
            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {contactLinks.map((link) => (
                <a
                  className="contact-link"
                  href={link.href}
                  key={link.label}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface py-8">
        <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-page">
          <p className="font-semibold">Lorenzo Graizzaro</p>
          <a
            className="text-sm text-on-surface-variant hover:text-primary"
            href="https://github.com/LorenGrz/lorengrz.github.io"
            rel="noreferrer"
            target="_blank"
          >
            Código del sitio en GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
