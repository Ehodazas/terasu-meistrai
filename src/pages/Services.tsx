import { Check } from 'lucide-react'
import { ButtonLink, TextLink } from '../components/Button'
import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { seo } from '../data/seo'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <Seo entry={seo.services} />
      <PageHero
        eyebrow="Paslaugos"
        title="Terasų įrengimas nuo pagrindo iki detalių"
        lead="Įrengiame naujas medines ir WPC terasas, montuojame konstrukcijas, laiptus ir turėklus, atnaujiname senas terasas. Kainą skaičiuojame individualiai, įvertinę vietą ir pasirinktas medžiagas."
      >
        <nav aria-label="Paslaugų sąrašas" className="mt-12 lg:mt-16">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span className="tabular-nums text-wood-dark">{s.number}</span>
                  {s.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="border-t border-line">
        {services.map((s, i) => {
          const reverse = i % 2 === 1
          const quote = s.terraceType ? `/kontaktai?tipas=${s.terraceType}#uzklausa` : '/kontaktai#uzklausa'
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="border-b border-line py-16 outline-none sm:py-24 lg:py-28"
            >
              <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
                <div className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-sand lg:sticky lg:top-28 lg:aspect-[5/6]">
                    <Img name={s.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:col-start-8'} lg:py-6`}>
                  <p className="font-display text-sm font-semibold tabular-nums text-wood-dark">{s.number}</p>
                  <h2 id={`${s.slug}-title`} className="mt-3 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
                    {s.title}
                  </h2>
                  <div className="mt-6 space-y-4 leading-[1.75] text-ink-2">
                    {s.description.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <h3 className="eyebrow">Privalumai</h3>
                      <ul className="mt-4 space-y-3">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex gap-3 leading-snug">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2} aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="eyebrow">Kur tinka</h3>
                      <ul className="mt-4 space-y-3">
                        {s.applications.map((a) => (
                          <li key={a} className="flex gap-3 leading-snug text-ink-2">
                            <span className="mt-[0.55em] h-px w-3 shrink-0 bg-wood" aria-hidden="true" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <ButtonLink to={quote} arrow>
                      Gauti pasiūlymą
                    </ButtonLink>
                    {s.terraceType && (
                      <TextLink to="/terasu-tipai">{s.terraceType === 'wpc' ? 'Apie WPC kompozitą' : 'Medienos rūšys'}</TextLink>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <CtaBand
        title="Nežinote, nuo ko pradėti?"
        text="Aprašykite situaciją savais žodžiais – kokia vieta, kokio dydžio terasa ir kaip ją naudosite. Patarsime, kokie darbai reikalingi."
      />
    </>
  )
}
