"use client"

import { useEffect, useRef, useState } from "react"
import { CVDownloadModal } from "@/components/cv-download-modal"
import { contactLinks } from "@/lib/contact-links"

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#skills", label: "Habilidades" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string>(links[0].href)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  // Scrollspy: highlight the nav link for the section currently in view.
  useEffect(() => {
    // A direct load on a hash (e.g. a shared "#projects" link) should highlight
    // that link immediately, before the observer below gets a chance to fire.
    if (links.some((link) => link.href === window.location.hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveHref(window.location.hash)
    }

    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        setActiveHref(`#${top.target.id}`)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Slide the pill indicator under the active link. Runs after activeHref
  // changes and on resize; measurement-only, so it never affects the links'
  // own visibility or click targets if it fails to run.
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeHref]
      const nav = navRef.current
      if (!el || !nav) return
      const navBox = nav.getBoundingClientRect()
      const elBox = el.getBoundingClientRect()
      setIndicator({ left: elBox.left - navBox.left, width: elBox.width })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [activeHref])

  return (
    <header className="fixed top-0 z-50 w-full">
      <a
        href="#top"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-10 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
      >
        Saltar al contenido
      </a>

      <div className="relative z-10 mx-auto flex max-w-container items-center gap-3 px-page py-4">
        <nav aria-label="Principal" className="nav-pill relative hidden lg:flex" ref={navRef}>
          {indicator && (
            <span
              aria-hidden
              className="nav-pill-indicator"
              style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
            />
          )}
          {links.map((link) => (
            <a
              className="nav-pill-link"
              data-active={activeHref === link.href}
              href={link.href}
              key={link.href}
              ref={(el) => {
                linkRefs.current[link.href] = el
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <CVDownloadModal variant="nav" />
          </div>
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="nav-mark lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-xl leading-none">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 flex flex-col justify-between overflow-y-auto bg-background px-page pb-10 pt-24 lg:hidden"
        >
          <nav aria-label="Principal" className="flex flex-col">
            {links.map((link) => (
              <a
                className="border-b border-outline-variant py-3.5 text-2xl font-semibold tracking-tight text-on-surface sm:py-4 sm:text-3xl"
                style={{ fontVariationSettings: "'wdth' 112" }}
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <div className="sm:hidden">
              <CVDownloadModal variant="hero" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {contactLinks.map((link) => (
                <a
                  className="contact-link"
                  href={link.href}
                  key={link.label}
                  onClick={() => setOpen(false)}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
