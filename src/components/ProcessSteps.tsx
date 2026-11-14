import { useRef } from 'react'
import { processSteps } from '../data/content'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'

/**
 * Darbų eiga. Vienintelis su slinkimu susietas efektas svetainėje:
 * linija „nubrėžiama“ einant per žingsnius (išjungiama esant reduced-motion).
 */
export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { desktop: `(min-width: 1024px) and ${MOTION_OK}`, mobile: `(max-width: 1023px) and ${MOTION_OK}` },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean }
          gsap.fromTo(
            '[data-line]',
            desktop ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
              ease: 'none',
              scrollTrigger: { trigger: ref.current, start: 'top 75%', end: desktop ? 'bottom 55%' : 'bottom 70%', scrub: 0.6 },
            },
          )
          gsap.utils.toArray<HTMLElement>('[data-dot]').forEach((dot) => {
            gsap.fromTo(
              dot,
              { backgroundColor: dark ? 'rgba(247,245,240,0.25)' : '#ddd6c8' },
              {
                backgroundColor: '#a67c52',
                scrollTrigger: { trigger: dot, start: desktop ? 'top 70%' : 'top 65%', toggleActions: 'play none none reverse' },
                duration: 0.3,
              },
            )
          })
        },
      )
    },
    { scope: ref },
  )

  const muted = dark ? 'text-paper/65' : 'text-ink-2'
  const lineBase = dark ? 'bg-white/15' : 'bg-line'

  return (
    <ol ref={ref} className="relative grid gap-10 pl-8 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-12">
      {/* Linija: vertikali mobiliuose, horizontali kompiuteryje */}
      <span aria-hidden="true" className={`absolute bottom-2 left-[5px] top-2 w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto ${lineBase}`}>
        <span data-line className="absolute inset-0 origin-top bg-wood lg:origin-left" />
      </span>
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            data-dot
            aria-hidden="true"
            className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full bg-wood ring-4 lg:-top-12 lg:left-0 ${dark ? 'ring-forest' : 'ring-paper'}`}
          />
          <p className={`font-display text-sm font-semibold tabular-nums ${dark ? 'text-wood' : 'text-wood-dark'}`}>
            {String(i + 1).padStart(2, '0')}
          </p>
          <h3 className={`mt-2 text-xl font-medium tracking-[-0.015em] ${dark ? '!text-paper' : ''}`}>{step.title}</h3>
          <p className={`mt-3 leading-relaxed ${muted}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
