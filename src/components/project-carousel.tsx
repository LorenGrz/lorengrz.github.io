"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Project } from "@/lib/projects/project"

const statusLabel: Record<string, string> = {
  in_progress: "en progreso",
  completed: "completado",
  private: "privado",
}

const placeholderStyle: React.CSSProperties = {
  backgroundColor: "var(--surface-variant)",
  backgroundImage:
    "radial-gradient(70% 70% at 30% 0%, rgba(249, 115, 22, 0.12), transparent 70%), radial-gradient(circle, var(--outline-variant) 1px, transparent 1.4px)",
  backgroundSize: "100% 100%, 22px 22px",
}

interface Props {
  projects: readonly Project[]
}

/**
 * Featured projects — the ones that also appear in the CV — shown as a
 * horizontally scrolling carousel. Native scroll-snap does the work, so the
 * cards stay reachable by touch/trackpad/keyboard with no JS at all; the
 * arrow buttons and dots are a progressive-enhancement layer on top.
 */
export function ProjectCarousel({ projects }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .reduce<IntersectionObserverEntry | null>(
            (best, entry) => (!best || entry.intersectionRatio > best.intersectionRatio ? entry : best),
            null,
          )
        if (!mostVisible) return
        const i = cardRefs.current.findIndex((el) => el === mostVisible.target)
        if (i !== -1) setIndex(i)
      },
      { root: track, threshold: [0.5, 0.75, 1] },
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [projects.length])

  const scrollToIndex = (i: number) => {
    const card = cardRefs.current[i]
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  return (
    <div>
      <div
        className="carousel-track scrollbar-none"
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Proyectos destacados"
      >
        {projects.map((project, i) => (
          <article
            className="carousel-card card-outline flex flex-col overflow-hidden rounded-2xl"
            key={project.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
          >
            {project.primaryImage ? (
              <div className="relative h-56 overflow-hidden border-b border-outline-variant bg-surface-variant">
                <Image
                  alt={project.primaryImage.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 560px, 88vw"
                  src={project.primaryImage.url}
                />
              </div>
            ) : (
              <div className="flex h-56 items-center justify-center border-b border-outline-variant" style={placeholderStyle}>
                <span className="font-mono text-lg font-semibold text-on-surface">{project.title}</span>
              </div>
            )}
            <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-on-surface-variant">
                    {String(i + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight" style={{ fontVariationSettings: "'wdth' 112" }}>
                    {project.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-xs text-primary">
                  {statusLabel[project.status] ?? project.status.replace("_", " ")}
                </span>
              </div>
              <p className="min-h-20 text-sm leading-6 text-on-surface-variant">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 6).map((item) => (
                  <span className="rounded-full bg-surface-variant px-2.5 py-1 font-mono text-xs text-on-surface-variant" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex gap-5 pt-2">
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-2"
                      href={link.url}
                      key={link.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-base leading-none">
                        {link.label === "GitHub" ? "code" : "open_in_new"}
                      </span>
                      {link.label}
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

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {projects.map((project, i) => (
            <button
              aria-current={index === i}
              aria-label={`Ir a ${project.title}`}
              className="carousel-dot"
              data-active={index === i}
              key={project.id}
              onClick={() => scrollToIndex(i)}
              type="button"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Proyecto anterior"
            className="carousel-arrow"
            disabled={index === 0}
            onClick={() => scrollToIndex(index - 1)}
            type="button"
          >
            <span className="material-symbols-outlined text-xl leading-none">chevron_left</span>
          </button>
          <button
            aria-label="Siguiente proyecto"
            className="carousel-arrow"
            disabled={index === projects.length - 1}
            onClick={() => scrollToIndex(index + 1)}
            type="button"
          >
            <span className="material-symbols-outlined text-xl leading-none">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
