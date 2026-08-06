import Image from "next/image";
import { CVDownloadModal } from "@/components/cv-download-modal";
import { seedProjects } from "@/lib/projects/seed-projects";

const skills = [
  {
    title: "Frontend",
    icon: "terminal",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chakra UI", "HTML/CSS"],
    learning: false,
  },
  {
    title: "Backend",
    icon: "dns",
    items: ["Node.js", "NestJS", "Kotlin", "Java", "Spring Boot", "REST APIs", "GraphQL"],
    learning: false,
  },
  {
    title: "Datos e Infra",
    icon: "storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Docker Compose"],
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
    title: "Aprendiendo",
    icon: "auto_stories",
    items: ["NestJS", "Supabase", "WebSockets", "Next.js", "React Native"],
    learning: true,
  },
];

const experience = [
  {
    role: "Tutor de Algoritmos 3",
    company: "UNSAM",
    period: "2026 - Presente",
    description:
      "Tutoría práctica en la materia Algoritmos 3, orientada a interfaces de usuario con React. Acompaño a estudiantes en el razonamiento sobre problemas y la construcción de proyectos.",
  },
  {
    role: "Administrativo",
    company: "FABRIC SRL",
    period: "Dic 2024 - Dic 2025",
    description:
      "Consultas SQL sobre datos de producción para reporting operativo y gestión contable con Xubio: cheques, transferencias y control de stock.",
  },
  {
    role: "Operador Remoto",
    company: "Banco Nación",
    period: "Ene 2024 - Dic 2024",
    description: "Resolución de consultas en entorno de alta demanda usando máquinas virtuales y herramientas internas.",
  },
] as const;

const statusLabel: Record<string, string> = {
  in_progress: "en progreso",
  completed: "completado",
  private: "privado",
};

export default function Home() {
  const projects = seedProjects;

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-page">
          <a className="text-base font-bold text-on-surface sm:text-lg" href="#top">
            Lorenzo Graizzaro
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a className="nav-link" href="#about">
              Sobre mí
            </a>
            <a className="nav-link" href="#skills">
              Habilidades
            </a>
            <a className="nav-link" href="#projects">
              Proyectos
            </a>
            <a className="nav-link" href="#contact">
              Contacto
            </a>
          </div>
          <CVDownloadModal variant="nav" />
        </nav>
      </header>

      <main id="top" className="pt-16">
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              alt=""
              aria-hidden
              className="object-cover brightness-[0.35]"
              fill
              priority
              sizes="100vw"
              src="/hero-bg.jpg"
            />
            <div className="absolute inset-0 bg-black/50 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
          </div>
          <div className="relative mx-auto grid w-full max-w-container gap-10 px-page py-section lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="max-w-3xl order-2 lg:order-1">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
                Disponible para roles full-stack
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-normal text-white sm:text-4xl lg:text-5xl">
                Lorenzo Graizzaro
              </h1>
              <p className="mt-3 text-xl font-semibold text-white/80 sm:text-2xl">Desarrollador Full Stack</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Construyo aplicaciones web full-stack con React, TypeScript, NestJS, Kotlin/Spring Boot, bases de datos SQL y entornos de
                desarrollo basados en Docker.
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

            <div className="hidden lg:flex flex-col items-center gap-5 order-1 lg:order-2">
              <div className="hidden lg:block w-full rounded-lg border border-white/20 bg-white/10 p-5 shadow-sm backdrop-blur-sm">
              <p className="font-mono text-sm font-semibold text-primary">stack-actual.ts</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-white/60">Frontend</dt>
                  <dd className="mt-1 font-semibold text-white">React, Next.js, TypeScript, Tailwind</dd>
                </div>
                <div>
                  <dt className="text-white/60">Backend</dt>
                  <dd className="mt-1 font-semibold text-white">Node.js, NestJS, Kotlin, Spring Boot</dd>
                </div>
                <div>
                  <dt className="text-white/60">Persistencia</dt>
                  <dd className="mt-1 font-semibold text-white">PostgreSQL, MySQL, MongoDB, Redis</dd>
                </div>

              </dl>
            </div>
          </div>
        </div>
        </section>

        <section className="bg-surface-container-low py-section" id="about">
          <div className="mx-auto grid max-w-container gap-10 px-page lg:grid-cols-12 lg:items-center">
            <div className="order-2 lg:order-1 lg:col-span-7 reveal reveal-left">
              <p className="section-kicker">Sobre mí</p>
              <h2 className="section-title">Desarrollo full-stack práctico con profundidad real en proyectos.</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-on-surface-variant">
                <p>
                  Soy Desarrollador Full Stack usando React, Next.js, TypeScript, Node.js/NestJS, Kotlin/Spring Boot y Docker.
                  Me importan las interfaces claras, la lógica de backend mantenible y los entornos reproducibles. Me interesa el ecosistema
                  de IA y Automatizaciones.
                </p>
              </div>
              <div className="mt-6 rounded-lg border border-outline-variant bg-surface p-5">
                <h3 className="text-base font-semibold">Educación</h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="text-on-surface-variant">Tecnicatura en Programación Informática</p>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires — Jul 2026</p>
                  </div>
                  <div className="border-t border-outline-variant pt-4">
                    <p className="text-on-surface-variant">Licenciatura en Desarrollo de Software</p>
                    <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary whitespace-nowrap">En curso</span>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 reveal reveal-right">
              <div className="relative aspect-square w-48 overflow-hidden rounded-xl border-4 border-surface shadow-md sm:w-full sm:max-w-xs sm:border-8">
                <Image
                  alt="Lorenzo Graizzaro"
                  className="object-cover"
                  fill
                  sizes="320px"
                  src="/me.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-page py-section" id="skills">
          <div className="reveal reveal-up">
            <p className="section-kicker text-center">Habilidades</p>
            <h2 className="section-title mx-auto max-w-2xl text-center">Stack técnico con el que construyo y lanzo proyectos.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 stagger-group">
            {skills.map((group) => (
              <article
                className={`rounded-xl border bg-surface p-3 lg:p-5 reveal reveal-up ${group.learning ? "border-dashed border-primary/40" : "border-outline-variant"}`}
                key={group.title}
              >
                <div className="mb-3 flex items-center gap-2 lg:mb-5 lg:gap-3">
                  <span className="material-symbols-outlined text-base text-primary lg:text-[24px]">{group.icon}</span>
                  <h3 className="text-sm font-semibold lg:text-lg">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1 lg:gap-2">
                  {group.items.map((item) => (
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-xs lg:px-3 lg:py-1 lg:text-sm ${group.learning ? "bg-primary/10 text-primary" : "bg-surface-variant text-on-surface-variant"}`}
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low py-section" id="projects">
          <div className="mx-auto max-w-container px-page">
            <div className="reveal reveal-left">
              <p className="section-kicker">Proyectos</p>
              <h2 className="section-title">Proyectos full-stack destacados.</h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3 stagger-group">
              {projects.map((project) => (
                <article className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm transition hover:shadow-md reveal reveal-up" key={project.id}>
                  {project.primaryImage ? (
                    <div className="relative h-48 overflow-hidden border-b border-outline-variant bg-surface-variant">
                      <Image
                        alt={project.primaryImage.alt}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 360px, 100vw"
                        src={project.primaryImage.url}
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center border-b border-outline-variant bg-surface-variant">
                      <span className="font-mono text-sm text-on-surface-variant">captura pendiente</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="min-w-0 text-xl font-semibold">{project.title}</h3>
                      <span className="shrink-0 rounded bg-primary-soft px-2 py-1 font-mono text-xs text-primary">{statusLabel[project.status] ?? project.status.replace("_", " ")}</span>
                    </div>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-on-surface-variant">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((item) => (
                        <span className="rounded bg-background px-2 py-1 font-mono text-xs text-on-surface-variant" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                    {project.repositoryNote ? <p className="mt-4 text-xs leading-5 text-on-surface-variant">{project.repositoryNote}</p> : null}
                    <div className="mt-auto flex gap-4 pt-6">
                      {project.links.length > 0 ? (
                        project.links.map((link) => (
                          <a className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-primary" href={link.url} key={link.label} rel="noreferrer" target="_blank">
                            <span className="material-symbols-outlined text-base leading-none">
                              {link.label.toLowerCase().includes("live") || link.label.toLowerCase().includes("demo") ? "open_in_new" : "code"}
                            </span>
                            <span className="hover:underline underline-offset-2">{link.label}</span>
                          </a>
                        ))
                      ) : (
                        <span className="font-mono text-sm text-on-surface-variant">Repositorio privado</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-page py-section">
          <div className="reveal reveal-up">
            <p className="section-kicker text-center">Experiencia</p>
            <h2 className="section-title mx-auto max-w-2xl text-center">Experiencia que moldea cómo construyo software.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3 stagger-group">
            {experience.map((item) => (
              <article className="rounded-lg border border-outline-variant bg-surface p-5 reveal reveal-up" key={`${item.company}-${item.role}`}>
                <p className="font-mono text-sm font-semibold text-primary">{item.period}</p>
                <h3 className="mt-3 text-xl font-semibold">{item.company}</h3>
                <p className="mt-1 font-medium text-on-surface-variant">{item.role}</p>
                <p className="mt-4 text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low py-section" id="contact">
          <div className="mx-auto max-w-2xl px-page text-center">
            <div className="reveal reveal-up">
              <p className="section-kicker">Contacto</p>
              <h2 className="section-title">Conectemos.</h2>
              <p className="mt-4 text-base leading-7 text-on-surface-variant">
                Estoy disponible para roles full-stack, entrevistas técnicas y conversaciones sobre aplicaciones web prácticas.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 stagger-group">
              <a className="contact-link reveal reveal-up" href="mailto:lorenzograizzaro55@gmail.com">
                <span className="material-symbols-outlined">alternate_email</span>
                Email
              </a>
              <a className="contact-link reveal reveal-up" href="https://github.com/LorenGrz" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined">terminal</span>
                GitHub
              </a>
              <a className="contact-link reveal reveal-up" href="https://linkedin.com/in/lorenzo-graizzaro" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined">person</span>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-outline-variant bg-surface py-8">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-page text-center md:flex-row md:text-left">
          <p className="font-semibold">Lorenzo Graizzaro</p>
          <p className="text-sm text-on-surface-variant">Construido con Next.js, TypeScript, PostgreSQL y arquitectura serverless en AWS.</p>
        </div>
      </footer>
    </>
  );
}
