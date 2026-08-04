"use client"
import { useEffect } from "react"

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    )

    const elements = document.querySelectorAll<HTMLElement>(".reveal")
    elements.forEach((el) => {
      const group = el.closest<HTMLElement>(".stagger-group")
      if (group) {
        const siblings = group.querySelectorAll<HTMLElement>(".reveal")
        const idx = Array.from(siblings).indexOf(el)
        el.style.transitionDelay = `${idx * 85}ms`
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
