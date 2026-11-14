import type { RefObject } from 'react'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/motion'

/**
 * Bendra slinkimo animacijų sistema. Puslapyje pažymėkite elementus:
 *  - data-reveal            – iškyla iš apačios (grupėmis, su nedideliu vėlavimu)
 *  - data-reveal="img"      – nuotraukos rėmas atsiveria iš apačios, nuotrauka nusileidžia iš priartinimo
 *  - data-split             – antraštė; pasirodo visa iš karto, kaip ir data-reveal
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
        // Nuotraukų rėmai
        root.querySelectorAll<HTMLElement>('[data-reveal="img"]').forEach((el) => {
          const img = el.querySelector('img')
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', once: true } })
          tl.fromTo(el, { clipPath: 'inset(8% 0% 0% 0% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 0.6, ease: 'power3.out' })
          if (img) tl.from(img, { scale: 1.06, duration: 0.8, ease: 'power3.out' }, 0)
        })

        // Paprasti elementai – grupėmis
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="img"]), [data-split]', root)
        // Trumpas ir nedidelis judesys; prasideda dar prieš elementui pasirodant ekrane
        gsap.set(items, { y: 8, autoAlpha: 0 })
        ScrollTrigger.batch(items, {
          start: 'top bottom+=80',
          interval: 0.05,
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out', stagger: { amount: 0.12 }, overwrite: true }),
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
