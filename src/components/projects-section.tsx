"use client"

import { useState } from "react"
import Image from "next/image"
import { seedProjects } from "@/lib/projects/seed-projects"

const PAGE_SIZE = 3

const statusLabel: Record<string, string> = {
  in_progress: "en progreso",
  completed: "completado",
  private: "privado",
}

const allProjects = [...seedProjects].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)

const placeholderStyle: React.CSSProperties = {
  backgroundColor: "var(--surface-variant)",
  backgroundImage:
    "radial-gradient(70% 70% at 30% 0%, rgba(249, 115, 22, 0.12), transparent 70%), radial-gradient(circle, var(--outline-variant) 1px, transparent 1.4px)",
  backgroundSize: "100% 100%, 22px 22px",
}

export function ProjectsSection() {
  const [page, setPage] = useState(1)
  // Index from which freshly paginated cards should animate themselves in — the
  // global ScrollReveal observer only wires up cards present on the first paint.
  const [revealFrom, setRevealFrom] = useState<number | null>(null)

  const visible = allProjects.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < allProjects.length

  const showMore = () => {
    setRevealFrom(visible.length)
    setPage((p) => p + 1)
  }

  const revealNew = (node: HTMLElement | null) => {
    if (!node) return
    requestAnimationFrame(() => requestAnimationFrame(() => node.classList.add("is-visible")))
  }

  return (
    <section className="bg-surface-container-low py-section" id="projects">
      <div className="mx-auto max-w-container px-page">
        <div className="reveal reveal-left">
          <p className="section-kicker">Proyectos</p>
          <h2 className="section-title">Proyectos destacados.</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 stagger-group">
          {visible.map((project, index) => {
            const isNew = revealFrom !== null && index >= revealFrom
            return (
              <article
                className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm transition hover:shadow-md reveal reveal-up"
                key={project.id}
                ref={isNew ? revealNew : undefined}
                style={isNew ? { transitionDelay: `${(index - (revealFrom ?? 0)) * 85}ms` } : undefined}
              >
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
                  <div
                    className="flex h-48 items-center justify-center border-b border-outline-variant"
                    style={placeholderStyle}
                  >
                    <span className="font-mono text-lg font-semibold text-on-surface">{project.title}</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-xl font-semibold">{project.title}</h3>
                    <span className="shrink-0 rounded bg-primary-soft px-2 py-1 font-mono text-xs text-primary">
                      {statusLabel[project.status] ?? project.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-on-surface-variant">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 6).map((item) => (
                      <span className="rounded bg-background px-2 py-1 font-mono text-xs text-on-surface-variant" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.repositoryNote ? (
                    <p className="mt-4 text-xs leading-5 text-on-surface-variant">{project.repositoryNote}</p>
                  ) : null}
                  <div className="mt-auto flex gap-4 pt-6">
                    {project.links.length > 0 ? (
                      project.links.map((link) => (
                        <a
                          className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-primary"
                          href={link.url}
                          key={link.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span className="material-symbols-outlined text-base leading-none">
                            {link.label === "GitHub" ? "code" : "open_in_new"}
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
            )
          })}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button className="button-secondary" onClick={showMore}>
              {(() => {
                const n = Math.min(PAGE_SIZE, allProjects.length - visible.length)
                return `Ver ${n} ${n === 1 ? "proyecto" : "proyectos"} más`
              })()}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
