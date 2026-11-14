import { QUOTE_LINK } from '../data/content'
import { site } from '../data/site'
import { ButtonLink } from './Button'

interface Props {
  title?: string
  text?: string
}

/** Kvietimas pateikti užklausą puslapio pabaigoje. */
export function CtaBand({
  title = 'Planuojate terasą?',
  text = 'Papasakokite apie savo sklypą ir idėją. Atsakysime į klausimus, patarsime dėl medžiagų ir parengsime pasiūlymą.',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="bg-forest text-paper">
      <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <h2 id="cta-title" className="h-section !text-paper">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-paper/75">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink to={QUOTE_LINK} variant="wood" arrow>
            Gauti pasiūlymą
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-white/30 px-6 font-medium text-paper transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
