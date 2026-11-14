import type { RefObject } from 'react'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../lib/motion'

/**
 * Bendra slinkimo animacijų sistema. Puslapyje pažymėkite elementus:
 *  - data-reveal            – iškyla iš apačios (grupėmis, su nedideliu vėlavimu)
 *  - data-reveal="img"      – nuotraukos rėmas atsiveria iš apačios, nuotrauka nusileidžia iš priartinimo
 *  - data-split             – antraštė, kurios žodžiai iškyla po vieną
 *  - data-parallax          – nuotrauka rėme lėtai slenka (rėmui reikia overflow-hidden)
 * Esant „prefers-reduced-motion“ – niekas neanimuojama, turinys matomas iš karto.
 */
export function PageReveal({ scope, pageKey }: { scope: RefObject<HTMLElement | null>; pageKey: string }) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Antraštės: žodžiai iškyla iš po kaukės
        root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words', mask: 'words' })
          gsap.from(split.words, {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })

        // Nuotraukų rėmai
        root.querySelectorAll<HTMLElement>('[data-reveal="img"]').forEach((el) => {
          const img = el.querySelector('img')
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
          tl.fromTo(el, { clipPath: 'inset(18% 0% 0% 0% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'expo.out' })
          if (img) tl.from(img, { scale: 1.18, duration: 1.6, ease: 'expo.out' }, 0)
        })

        // Paprasti elementai – grupėmis
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="img"])', root)
        gsap.set(items, { y: 36, autoAlpha: 0 })
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.95, ease: 'power3.out', stagger: 0.09, overwrite: true }),
        })

        // Paralaksas
        root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((frame) => {
          const img = frame.querySelector('img')
          if (!img) return
          gsap.fromTo(
            img,
            { yPercent: -7, scale: 1.16 },
            { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
      // Šriftai ir nuotraukos gali pakeisti aukščius – perskaičiuojame padėtis
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope, dependencies: [pageKey], revertOnUpdate: true },
  )
  return null
}
