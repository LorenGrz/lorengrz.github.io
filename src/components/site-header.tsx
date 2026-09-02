"use client"

import { useEffect, useState } from "react"
import { CVDownloadModal } from "@/components/cv-download-modal"

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#skills", label: "Habilidades" },
  { href: "#projects", label: "Proyectos" },
  { href: "#contact", label: "Contacto" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/90 backdrop-blur-md">
      <a
        href="#top"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-10 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
      >
        Saltar al contenido
      </a>

      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-page">
        <a className="text-base font-bold text-on-surface sm:text-lg" href="#top">
          Lorenzo Graizzaro
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CVDownloadModal variant="nav" />
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-outline-variant text-on-surface md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-xl leading-none">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-outline-variant bg-surface md:hidden">
          <ul className="mx-auto flex max-w-container flex-col px-page py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="block py-3 font-mono text-sm text-on-surface-variant hover:text-primary"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
