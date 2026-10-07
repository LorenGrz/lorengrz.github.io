"use client"

import { useRef, useState, useSyncExternalStore } from "react"
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

// Horizontal distance (px) a drag/swipe must travel to change slide.
const SWIPE_THRESHOLD = 50
// Below this, a pointer interaction still counts as a click on a link.
const DRAG_SLOP = 8
// Must match `.carousel-track { gap }` in globals.css.
const TRACK_GAP = "1.5rem"

const noopSubscribe = () => () => {}

interface Props {
  projects: readonly Project[]
}

/**
 * Featured projects — the ones that also appear in the CV — shown one at a
 * time. Without JS it degrades to a native scroll-snap strip (see the
 * `html.js` rules in globals.css). With JS the track moves with a CSS
 * transform transition, so the motion is the same regardless of the browser's
 * smooth-scroll setting; under prefers-reduced-motion it crossfades instead.
 */
export function ProjectCarousel({ projects }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; dx: number; active: boolean; id: number } | null>(null)
  const suppressClick = useRef(false)
  const [index, setIndex] = useState(0)
  // false on the server and during hydration, true after: inactive slides are
  // only made inert once JS owns the carousel, so the no-JS strip stays usable.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)

  const last = projects.length - 1
  const goTo = (i: number) => setIndex(Math.max(0, Math.min(last, i)))
  const baseTransform = `translateX(calc(${-index} * (100% + ${TRACK_GAP})))`

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, active: false, id: e.pointerId }
    suppressClick.current = false
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const track = trackRef.current
    if (!d || !track || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    if (!d.active) {
      // Let vertical scrolling win when the gesture is mostly vertical.
      if (Math.abs(e.clientY - d.y) > Math.abs(dx)) {
        drag.current = null
        return
      }
      if (Math.abs(dx) < DRAG_SLOP) return
      d.active = true
      track.setPointerCapture(e.pointerId)
      track.dataset.dragging = "true"
    }
    // Resist at the ends so it's clear there's nothing more that way.
    const atEdge = (index === 0 && dx > 0) || (index === last && dx < 0)
    d.dx = atEdge ? dx / 3 : dx
    track.style.transform = `${baseTransform} translateX(${d.dx}px)`
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const track = trackRef.current
    drag.current = null
    if (!d || !track || !d.active) return
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId)
    delete track.dataset.dragging
    track.style.transform = ""
    suppressClick.current = true
    if (d.dx <= -SWIPE_THRESHOLD) goTo(index + 1)
    else if (d.dx >= SWIPE_THRESHOLD) goTo(index - 1)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(index + 1)
    else if (e.key === "ArrowLeft") goTo(index - 1)
  }

  return (
    <div onKeyDown={onKeyDown}>
      <div className="carousel-viewport scrollbar-none" role="group" aria-roledescription="carousel" aria-label="Proyectos destacados">
        <div
          className="carousel-track"
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault()
              e.stopPropagation()
              suppressClick.current = false
            }
          }}
          onPointerCancel={endDrag}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          ref={trackRef}
          style={hydrated ? { transform: baseTransform } : undefined}
        >
          {projects.map((project, i) => (
            <article
              aria-label={`${i + 1} de ${projects.length}: ${project.title}`}
              aria-roledescription="slide"
              className="carousel-slide card-outline overflow-hidden rounded-2xl lg:grid lg:grid-cols-[1.15fr_1fr]"
              data-active={index === i}
              inert={hydrated && index !== i}
              key={project.id}
            >
              {project.primaryImage ? (
                <div className="relative h-56 overflow-hidden border-b border-outline-variant bg-surface-variant sm:h-72 lg:h-auto lg:min-h-96 lg:border-r lg:border-b-0">
                  <Image
                    alt={project.primaryImage.alt}
                    className="object-cover"
                    draggable={false}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 640px, 92vw"
                    src={project.primaryImage.url}
                  />
                </div>
              ) : (
                <div
                  className="flex h-56 items-center justify-center border-b border-outline-variant sm:h-72 lg:h-auto lg:min-h-96 lg:border-r lg:border-b-0"
                  style={placeholderStyle}
                >
                  <span className="font-mono text-lg font-semibold text-on-surface">{project.title}</span>
                </div>
              )}
              <div className="flex flex-col gap-4 p-6 lg:p-9">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-on-surface-variant">
                    {String(i + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-xs text-primary">
                    {statusLabel[project.status] ?? project.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="text-3xl font-semibold tracking-tight lg:text-4xl" style={{ fontVariationSettings: "'wdth' 112" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-6 text-on-surface-variant lg:text-base lg:leading-7">{project.summary}</p>
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
                        draggable={false}
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
      </div>

      <div className="carousel-controls mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {projects.map((project, i) => (
            <button
              aria-current={index === i}
              aria-label={`Ir a ${project.title}`}
              className="carousel-dot"
              data-active={index === i}
              key={project.id}
              onClick={() => goTo(i)}
              type="button"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button aria-label="Proyecto anterior" className="carousel-arrow" disabled={index === 0} onClick={() => goTo(index - 1)} type="button">
            <span className="material-symbols-outlined text-xl leading-none">chevron_left</span>
          </button>
          <button aria-label="Siguiente proyecto" className="carousel-arrow" disabled={index === last} onClick={() => goTo(index + 1)} type="button">
            <span className="material-symbols-outlined text-xl leading-none">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
