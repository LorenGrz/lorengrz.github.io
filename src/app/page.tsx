import Image from "next/image";
import { CVDownloadModal } from "@/components/cv-download-modal";
import { SiteHeader } from "@/components/site-header";
import { ProjectsSection } from "@/components/projects-section";

const skills = [
  {
    title: "Frontend",
    icon: "terminal",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
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
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "AWS", "GCP"],
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
    role: "Tutor de Algoritmos 3",
    company: "UNSAM",
    period: "2026 - Presente",
    current: true,
    description:
      "Tutoría práctica en la materia Algoritmos 3, orientada a interfaces de usuario con React. Acompaño a estudiantes en el razonamiento sobre problemas y la construcción de proyectos.",
  },
  {
    role: "Administrativo",
    company: "FABRIC SRL",
    period: "Dic 2024 - Dic 2025",
    current: false,
    description:
      "Consultas SQL sobre datos de producción para reporting operativo y gestión contable con Xubio: cheques, transferencias y control de stock.",
  },
  {
    role: "Operador Remoto",
    company: "Banco Nación",
    period: "Ene 2024 - Dic 2024",
    current: false,
    description: "Resolución de consultas en entorno de alta demanda usando máquinas virtuales y herramientas internas.",
  },
] as const;

const contactLinks = [
  { label: "Email", icon: "alternate_email", href: "mailto:lorenzograizzaro55@gmail.com", external: false },
  { label: "GitHub", icon: "terminal", href: "https://github.com/LorenGrz", external: true },
  { label: "LeetCode", icon: "code", href: "https://leetcode.com/u/LorenGrz/", external: true },
  { label: "LinkedIn", icon: "person", href: "https://linkedin.com/in/lorenzo-graizzaro", external: true },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="pt-16">
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
          <div className="hero-grid absolute inset-0" aria-hidden />
          <div className="hero-aurora hero-aurora-primary" aria-hidden />
          <div className="hero-aurora hero-aurora-secondary" aria-hidden />
          <div className="grain" aria-hidden />

          <div className="relative mx-auto grid w-full max-w-container gap-10 px-page py-section lg:grid-cols-[1fr_460px] lg:items-center">
            <div className="hero-intro max-w-3xl order-2 lg:order-1">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-on-surface-variant backdrop-blur-sm sm:text-sm">
                <span className="dot-pulse" aria-hidden />
                Disponible para nuevas oportunidades
              </p>
              <h1
                className="text-5xl font-bold leading-[0.95] tracking-tight text-on-surface sm:text-6xl lg:text-7xl"
                style={{ fontVariationSettings: "'wdth' 120" }}
              >
                Lorenzo
                <br />
                Graizzaro
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-on-surface-variant sm:text-xl sm:leading-8">
                <span className="font-semibold text-on-surface">Software developer.</span> Construyo aplicaciones con
                IA integrada en su flujo: defino la arquitectura con criterio propio y armo mis propios entornos
                agénticos para gestionar el contexto. Stack principal: React, TypeScript, Node.js/NestJS,
                Python/FastAPI y Kotlin/Spring Boot.
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

            <div className="hero-aside order-1 hidden lg:block lg:order-2">
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
                    <span className="text-[#7cc4ff]">scout</span>
                    <span>lee seed-projects.ts y sus convenciones</span>
                    <span className="text-[#c4a7ff]">reasoner</span>
                    <span>decide orden, imagen y links</span>
                    <span className="text-[#ffb37a]">worker</span>
                    <span>implementa la entrada nueva</span>
                  </div>
                  <p className="mt-2.5">
                    <span className="text-secondary">✓</span> pnpm lint &nbsp;
                    <span className="text-secondary">✓</span> typecheck &nbsp;
                    <span className="text-secondary">✓</span> build
                  </p>
                  <p>
                    <span className="text-secondary">✓</span> deploy en GitHub Pages
                  </p>
                  <p className="mt-1.5">
                    <span className="text-primary">›</span>{" "}
                    <span aria-hidden className="caret-blink inline-block h-4 w-2 -translate-y-0.5 bg-on-surface" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-section" id="about">
          <div className="mx-auto grid max-w-container gap-10 px-page lg:grid-cols-12 lg:items-center">
            <div className="order-2 lg:order-1 lg:col-span-7 reveal reveal-left">
              <p className="section-kicker">Sobre mí</p>
              <h2 className="section-title">Desarrollador de software especializado en aplicaciones impulsadas por IA</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-on-surface-variant">
                <p>
                  Soy Software Developer usando React, Next.js, TypeScript, Node.js/NestJS, Python/FastAPI, Kotlin/Spring Boot
                  y Docker. Me importan las interfaces claras y un backend claro y mantenible. Me interesa el ecosistema
                  de IA y Automatizaciones.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-outline-variant bg-surface p-5">
                <h3 className="text-base font-semibold">Educación</h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="text-on-surface-variant">Tecnicatura en Programación Informática</p>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires — Jul 2026</p>
                  </div>
                  <div className="border-t border-outline-variant pt-4">
                    <p className="text-on-surface-variant">Licenciatura en Desarrollo de Software</p>
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary whitespace-nowrap">En curso</span>
                    <p className="mt-0.5 font-semibold">Universidad Nacional de San Martín</p>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Buenos Aires</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 reveal reveal-right">
              <div className="relative aspect-square w-48 overflow-hidden rounded-2xl border-4 border-surface shadow-md sm:w-full sm:max-w-xs sm:border-8">
                <Image
                  alt="Lorenzo Graizzaro"
                  className="object-cover"
                  fill
                  sizes="(min-width: 640px) 320px, 192px"
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
                className={`card-outline rounded-xl p-3 lg:p-5 reveal reveal-up ${group.learning ? "col-span-2 border-dashed border-primary/40 lg:col-span-3" : ""}`}
                key={group.title}
              >
                <div className="mb-3 flex items-center gap-2 lg:mb-5 lg:gap-3">
                  <span className="material-symbols-outlined text-base text-primary lg:text-[24px]">{group.icon}</span>
                  <h3 className="text-sm font-semibold lg:text-lg">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1 lg:gap-2">
                  {group.items.map((item) => (
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-xs lg:px-3 lg:py-1 lg:text-sm ${group.learning ? "bg-primary/10 text-primary" : "bg-surface-variant text-on-surface-variant"}`}
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

        <ProjectsSection />

        <section className="mx-auto max-w-container px-page py-section" id="experience">
          <div className="reveal reveal-up">
            <p className="section-kicker text-center">Experiencia</p>
            <h2 className="section-title mx-auto max-w-2xl text-center">Experiencia que moldea cómo construyo software.</h2>
          </div>
          <ol className="timeline mx-auto mt-12 flex max-w-2xl flex-col gap-10">
            {experience.map((item) => (
              <li className="relative pl-8 reveal reveal-up" key={`${item.company}-${item.role}`}>
                <span className="timeline-dot" data-current={item.current} aria-hidden />
                <p className="font-mono text-sm font-semibold text-primary">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.company}</h3>
                <p className="mt-1 font-medium text-on-surface-variant">{item.role}</p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-surface-container-low py-section" id="contact">
          <div className="mx-auto max-w-2xl px-page text-center">
            <div className="reveal reveal-up">
              <p className="section-kicker">Contacto</p>
              <h2 className="section-title">Conectemos.</h2>
              <p className="mt-4 text-base leading-7 text-on-surface-variant">
                Estoy disponible para entrevistas técnicas y conversaciones sobre aplicaciones web prácticas.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 stagger-group">
              {contactLinks.map((link) => (
                <a
                  className="contact-link reveal reveal-up"
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
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-page text-center md:flex-row md:text-left">
          <p className="font-semibold">Lorenzo Graizzaro</p>
          <p className="text-sm text-on-surface-variant">Construido con Next.js, TypeScript y Tailwind CSS. Desplegado como sitio estático en GitHub Pages.</p>
        </div>
      </footer>
    </>
  );
}
