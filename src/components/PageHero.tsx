import { useRef, type ReactNode } from 'react'
import type { ImageKey } from '../data/images'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'
import { Img } from './Img'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: ImageKey
  imageClass?: string
  children?: ReactNode
}

/** Vidinių puslapių antraštė. Įeina vieną kartą, užkrovus puslapį. */
export function PageHero({ eyebrow, title, lead, image, imageClass = 'aspect-[4/3] sm:aspect-[16/7]', children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-enter]', { y: 22, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 })
        gsap.from('[data-enter-img] img', { scale: 1.06, duration: 1.6, ease: 'power2.out' })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="pt-[72px] lg:pt-[84px]">
      <div className="wrap pb-12 pt-14 sm:pt-20 lg:pb-16 lg:pt-28">
        <p data-enter className="eyebrow">
          {eyebrow}
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 data-enter className="h-display text-[2.6rem] sm:text-[3.6rem] lg:col-span-7 lg:text-[4.6rem]">
            {title}
          </h1>
          {lead && (
            <div data-enter className="lead lg:col-span-4 lg:col-start-9 lg:pb-2">
              {lead}
            </div>
          )}
        </div>
        {children}
      </div>
      {image && (
        <div className="wrap">
          <div data-enter-img className={`overflow-hidden bg-sand ${imageClass}`}>
            <Img name={image} priority sizes="(min-width: 1360px) 1360px, 100vw" />
          </div>
        </div>
      )}
    </section>
  )
}
