import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PLANNER_LINK, QUOTE_LINK } from '../data/content'
import type { ImageKey } from '../data/images'
import { site } from '../data/site'
import { ButtonLink } from './Button'
import { Img } from './Img'

interface Props {
  title?: string
  text?: string
  image?: ImageKey
}

/** Kvietimas pateikti užklausą puslapio pabaigoje: suapvalintas blokas su nuotrauka. */
export function CtaBand({
  title = 'Planuojate terasą?',
  text = 'Papasakokite apie savo sklypą ir idėją. Atsakysime į klausimus, patarsime dėl medžiagų ir parengsime pasiūlymą.',
  image = 'deck-trees',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div data-parallax className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-forest text-paper lg:rounded-[32px]">
        <div className="absolute inset-0 -z-10">
          <Img name={image} sizes="100vw" alt="" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/90 to-forest/55" />
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-28">
          <div className="lg:col-span-7">
            <h2 id="cta-title" data-split className="h-section !text-paper">
              {title}
            </h2>
            <p data-reveal className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-paper/80">
              {text}
            </p>
            <Link data-reveal to={PLANNER_LINK} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-wood link-underline">
              Arba užpildykite terasos planuoklę →
            </Link>
          </div>
          <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink to={QUOTE_LINK} variant="wood" arrow>
              Gauti pasiūlymą
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-6 font-medium text-paper backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
