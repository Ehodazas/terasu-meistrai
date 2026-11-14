import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { articles } from '../data/articles'
import { seo } from '../data/seo'

export default function Advice() {
  const [first, ...rest] = articles
  return (
    <>
      <Seo entry={seo.advice} />
      <PageHero
        eyebrow="Patarimai"
        title="Ką verta žinoti apie terasas"
        lead="Praktiniai patarimai apie medžiagų pasirinkimą, terasos pagrindą ir priežiūrą – kad sprendimą priimtumėte žinodami, ko tikėtis."
      />

      <section aria-label="Straipsniai" className="wrap pb-20 sm:pb-28">
        <Link to={`/patarimai/${first.slug}`} className="group grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div data-reveal="img" className="img-zoom aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand lg:col-span-7 lg:aspect-[16/10]">
            <Img name={first.image} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Meta category={first.category} minutes={first.readingMinutes} />
            <h2 data-split className="mt-4 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
              {first.title}
            </h2>
            <p data-reveal className="mt-4 leading-relaxed text-ink-2">
              {first.excerpt}
            </p>
            <span data-reveal className="mt-6 inline-flex items-center gap-2 font-medium">
              <span className="link-underline">Skaityti</span>
              <ArrowUpRight className="h-4 w-4 text-wood transition-transform group-hover:rotate-45" aria-hidden="true" />
            </span>
          </div>
        </Link>

        <ul className="mt-16 grid gap-x-6 gap-y-14 border-t border-line pt-12 sm:grid-cols-2">
          {rest.map((a) => (
            <li key={a.slug} data-reveal>
              <Link to={`/patarimai/${a.slug}`} className="group block">
                <div className="img-zoom aspect-[16/10] overflow-hidden rounded-[var(--radius-img)] bg-sand">
                  <Img name={a.image} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="mt-5">
                  <Meta category={a.category} minutes={a.readingMinutes} />
                  <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-[-0.02em]">
                    <span className="link-underline">{a.title}</span>
                  </h2>
                  <p className="mt-2 leading-relaxed text-ink-2">{a.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Turite klausimų apie savo terasą?" text="Papasakokite apie situaciją – patarsime, kokia medžiaga ir konstrukcija tiktų jūsų sklypui." />
    </>
  )
}

function Meta({ category, minutes }: { category: string; minutes: number }) {
  return (
    <p className="flex items-center gap-3 text-sm text-muted">
      <span className="rounded-full bg-paper-2 px-3 py-1 font-medium text-ink">{category}</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {minutes} min. skaitymo
      </span>
    </p>
  )
}
