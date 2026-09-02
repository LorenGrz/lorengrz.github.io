"use client"
import { useEffect, useState } from "react"

type Phase = "hidden" | "visible" | "leaving"

export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("hidden")

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("intro-done", "1")
      return
    }

    // Kick off the entrance animation on mount. This is a deliberate one-shot
    // animation trigger, not derived state — the lint rule is a false positive here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("visible")

    const t1 = setTimeout(() => setPhase("leaving"), 650)
    const t2 = setTimeout(() => {
      setPhase("hidden")
      sessionStorage.setItem("intro-done", "1")
    }, 1150)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === "hidden") return null

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay${phase === "leaving" ? " intro-leaving" : ""}`}
    >
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />
      <div className="intro-center">
        <span className="intro-name">Lorenzo Graizzaro</span>
        <span className="intro-line" />
      </div>
    </div>
  )
}
