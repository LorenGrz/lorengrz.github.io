import Image from "next/image";
import { AdminProjectForm } from "@/components/AdminProjectForm";
import { listProjects } from "@/lib/projects/repository";

export const dynamic = "force-dynamic";

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
    title: "Data and Infra",
    icon: "storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Docker Compose"],
    learning: false,
  },
  {
    title: "Tools",
    icon: "settings",
    items: ["Git", "GitHub", "pnpm", "ESLint", "SQL", "Linux"],
    learning: false,
  },
  {
    title: "Learning",
    icon: "auto_stories",
    items: ["Supabase", "WebSockets", "Next.js", "React Native"],
    learning: true,
  },
];

const experience = [
  {
    role: "Algorithms 3 Tutor",
    company: "UNSAM",
    period: "2026 - Present",
    description:
      "Practical tutoring in a React-focused user interface course, helping students reason through problems and build projects.",
  },
  {
    role: "Administrative",
    company: "FABRIC SRL",
    period: "Jan 2025 - Jan 2026",
    description:
      "Ran SQL queries over production data for operational reporting and handled accounting workflows with Xubio.",
  },
  {
    role: "Remote Operator",
    company: "Banco Nacion",
    period: "Jan 2024 - Jan 2025",
    description: "Resolved customer requests in a high-demand environment using virtual machines and internal systems.",
  },
] as const;

export default async function Home() {
  const projects = await listProjects();

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-page">
          <a className="text-base font-bold text-on-surface sm:text-lg" href="#top">
            Lorenzo Graizzaro
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a className="nav-link" href="#projects">
              Projects
            </a>
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#skills">
              Skills
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </div>
          <a className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark" href="/Lorenzo_Graizzaro_CV.pdf">
            Resume
          </a>
        </nav>
      </header>

      <main id="top" className="pt-16">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-container items-center px-page py-section">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Available for full-stack roles
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-normal text-on-surface sm:text-5xl">
                Lorenzo Graizzaro
              </h1>
              <p className="mt-3 text-2xl font-semibold text-on-surface-variant">Full Stack Developer</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
                I build full-stack web applications with React, TypeScript, NestJS, Kotlin/Spring Boot, SQL databases, and Docker-based
                development environments.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="button-primary" href="#projects">
                  View Projects
                </a>
                <a className="button-secondary" href="#contact">
                  Contact
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant bg-white p-5 shadow-sm">
              <p className="font-mono text-sm font-semibold text-primary">current-stack.ts</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-on-surface-variant">Frontend</dt>
                  <dd className="mt-1 font-semibold">React, Next.js, TypeScript, Tailwind</dd>
                </div>
                <div>
                  <dt className="text-on-surface-variant">Backend</dt>
                  <dd className="mt-1 font-semibold">Node.js, NestJS, Kotlin, Spring Boot</dd>
                </div>
                <div>
                  <dt className="text-on-surface-variant">Persistence</dt>
                  <dd className="mt-1 font-semibold">PostgreSQL, MySQL, MongoDB, Redis</dd>
                </div>
                <div>
                  <dt className="text-on-surface-variant">Location</dt>
                  <dd className="mt-1 font-semibold">Buenos Aires, Argentina</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-section" id="about">
          <div className="mx-auto grid max-w-container gap-10 px-page lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="section-kicker">About</p>
              <h2 className="section-title">Practical full-stack development with real project depth.</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-on-surface-variant">
                <p>
                  I am a Full Stack Developer with hands-on projects using React, TypeScript, Node.js/NestJS, and Kotlin/Spring Boot. I care
                  about clear interfaces, maintainable backend logic, and reproducible Docker-based environments.
                </p>
                <p>
                  At UNSAM, I tutor Algorithms 3, a course focused on user interfaces with React. That role keeps me close to fundamentals:
                  explaining decisions, debugging with others, and turning vague problems into working software.
                </p>
                <p>
                  My previous work also involved SQL queries over operational data and remote support in high-demand environments, which gave
                  me practical experience with pressure, accuracy, and communication.
                </p>
              </div>
              <div className="mt-6 rounded-lg border border-outline-variant bg-white p-5">
                <h3 className="text-base font-semibold">Education</h3>
                <p className="mt-2 text-on-surface-variant">Associate&apos;s Degree in Computer Programming</p>
                <p className="mt-1 font-semibold">Universidad Nacional de San Martin</p>
                <p className="mt-1 text-sm text-on-surface-variant">Buenos Aires — Jul 2026</p>
              </div>
            </div>
            <div className="flex justify-center lg:col-span-5">
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border-8 border-surface shadow-md">
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
          <p className="section-kicker text-center">Skills</p>
          <h2 className="section-title mx-auto max-w-2xl text-center">Technical stack I use to build and ship projects.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {skills.map((group) => (
              <article
                className={`rounded-xl border bg-white p-5 ${group.learning ? "border-dashed border-primary/40" : "border-outline-variant"}`}
                key={group.title}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">{group.icon}</span>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      className={`rounded px-3 py-1 font-mono text-sm ${group.learning ? "bg-primary/10 text-primary" : "bg-surface-variant text-on-surface-variant"}`}
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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-kicker">Projects</p>
                <h2 className="section-title">Featured full-stack work.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-on-surface-variant">
                New projects can be added from the private admin form without editing source code.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article className="group overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition hover:shadow-md" key={project.id}>
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
                      <span className="font-mono text-sm text-on-surface-variant">screenshot pending</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="rounded bg-primary-soft px-2 py-1 font-mono text-xs text-primary">{project.status.replace("_", " ")}</span>
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
                    <div className="mt-6 flex gap-4">
                      {project.links.length > 0 ? (
                        project.links.map((link) => (
                          <a className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-primary hover:underline" href={link.url} key={link.label} rel="noreferrer" target="_blank">
                            <span className="material-symbols-outlined text-base leading-none">
                              {link.label.toLowerCase().includes("live") || link.label.toLowerCase().includes("demo") ? "open_in_new" : "code"}
                            </span>
                            {link.label}
                          </a>
                        ))
                      ) : (
                        <span className="font-mono text-sm text-on-surface-variant">Private repository</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-page py-section">
          <p className="section-kicker text-center">Experience</p>
          <h2 className="section-title mx-auto max-w-2xl text-center">Work that shaped how I build software.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {experience.map((item) => (
              <article className="rounded-lg border border-outline-variant bg-white p-5" key={`${item.company}-${item.role}`}>
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
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Let&apos;s connect.</h2>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">
              I am open to full-stack roles, technical interviews, and conversations about practical web applications.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <a className="contact-link" href="mailto:lorenzograizzaro55@gmail.com">
                <span className="material-symbols-outlined">alternate_email</span>
                Email Me
              </a>
              <a className="contact-link" href="https://github.com/LorenGrz" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined">terminal</span>
                GitHub
              </a>
              <a className="contact-link" href="https://linkedin.com/in/lorenzo-graizzaro" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined">person</span>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <AdminProjectForm />
      </main>

      <footer className="border-t border-outline-variant bg-surface py-8">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-page text-center md:flex-row md:text-left">
          <p className="font-semibold">Lorenzo Graizzaro</p>
          <p className="text-sm text-on-surface-variant">Built with Next.js, TypeScript, PostgreSQL, and AWS serverless in mind.</p>
        </div>
      </footer>
    </>
  );
}
