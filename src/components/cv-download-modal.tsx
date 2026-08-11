"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type Phase = "closed" | "open" | "closing"

interface Props {
  variant?: "nav" | "hero"
}

export function CVDownloadModal({ variant = "hero" }: Props) {
  const [phase, setPhase] = useState<Phase>("closed")
  const [mounted, setMounted] = useState(false)

  const handleOpen = useCallback(() => setPhase("open"), [])
  const handleClose = useCallback(() => {
    setPhase("closing")
    setTimeout(() => setPhase("closed"), 200)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (phase !== "open") return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [phase, handleClose])

  const modal = (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${phase === "closing" ? "modal-leaving" : "modal-entering"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Ver CV"
    >
      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
      <div className="modal-card relative w-full max-w-xs rounded-2xl border border-outline-variant bg-surface p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-on-surface">Ver CV</h2>
          <button
            aria-label="Cerrar"
            className="text-on-surface-variant transition hover:text-on-surface"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined text-xl leading-none">close</span>
          </button>
        </div>
        <p className="mb-4 text-sm text-on-surface-variant">Se abre en una pestaña nueva</p>
        <div className="flex flex-col gap-3">
          <a
            className="flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-variant px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"
            href="/Lorenzo_Graizzaro_CV_ES.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
            Español
          </a>
          <a
            className="flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-variant px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"
            href="/Lorenzo_Graizzaro_CV_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
            English
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {variant === "nav" ? (
        <button
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          onClick={handleOpen}
        >
          CV
        </button>
      ) : (
        <button className="button-secondary cursor-pointer gap-2" onClick={handleOpen}>
          <span className="material-symbols-outlined text-base leading-none">description</span>
          Ver CV
        </button>
      )}

      {mounted && phase !== "closed" && createPortal(modal, document.body)}
    </>
  )
}
