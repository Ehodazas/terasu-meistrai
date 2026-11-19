import type { RefObject } from 'react'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/motion'

/**
 * Minimalios slinkimo animacijos. Tekstas visada matomas iš karto – jokio „laukimo“.
 * Tik nuotraukos, pažymėtos data-reveal="img", trumpai išryškėja (0,4 s) pasirodžiusios ekrane.
 * Atributai data-reveal ir data-split ant teksto paliekami, bet nebeanimuojami.
 * Esant „prefers-reduced-motion“ – niekas neanimuojama.
 */
export function PageReveal({ scope, pageKey }: { scope: RefObject<HTMLElement | null>; pageKey: string }) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const imgs = gsap.utils.toArray<HTMLElement>('[data-reveal="img"]', root)
        gsap.set(imgs, { autoAlpha: 0 })
        ScrollTrigger.batch(imgs, {
          start: 'top bottom+=120',
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, duration: 0.4, ease: 'power1.out', overwrite: true }),
        })
      })
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope, dependencies: [pageKey], revertOnUpdate: true },
  )
  return null
}
