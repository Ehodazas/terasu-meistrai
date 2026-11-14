import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { Seo } from '../components/Seo'
import { articles } from '../data/articles'
import { articleSeo } from '../data/seo'
import NotFound from './NotFound'

const toId = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function AdviceArticle() {
  const { slug = '' } = useParams()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return <NotFound />
  const others = articles.filter((a) => a.slug !== slug)

  return (
    <>
      <article className="pt-[var(--header-h)]">
        <Seo entry={articleSeo(article.slug)!} />
        <header className="wrap pb-10 pt-10 sm:pt-14 lg:pt-20">
          <Link to="/patarimai" className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Visi patarimai
          </Link>
          <div className="mt-6 max-w-4xl">
            <p className="flex items-center gap-3 text-sm text-muted">
              <span className="rounded-full bg-paper-2 px-3 py-1 font-medium text-ink">{article.category}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.readingMinutes} min. skaitymo
              </span>
            </p>
            <h1 data-split className="h-display mt-5 text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]">
              {article.title}
            </h1>
            <p data-reveal className="lead mt-6 max-w-2xl">
              {article.excerpt}
            </p>
          </div>
        </header>

        <div className="wrap">
          <div data-reveal="img" className="aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand sm:aspect-[16/7]">
            <Img name={article.image} priority sizes="(min-width: 1360px) 1360px, 100vw" />
          </div>
        </div>

        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Turinys" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Turinys</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {article.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${toId(s.heading)}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-ink-2 transition-colors hover:border-wood hover:text-ink">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-2xl space-y-12 lg:col-span-7 lg:col-start-5">
            {article.sections.map((s) => (
              <section key={s.heading} id={toId(s.heading)} className="scroll-mt-28">
                <h2 data-reveal className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-5 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-2">
                  {s.paragraphs.map((p) => (
                    <p key={p} data-reveal>
                      {p}
                    </p>
                  ))}
                </div>
                {s.list && (
                  <ul data-reveal className="mt-6 space-y-3 rounded-2xl bg-paper-2 p-6">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 leading-relaxed">
                        <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-wood" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="border-t border-line pt-6 text-sm text-muted">
              Informacija bendro pobūdžio. Konkrečiam projektui sprendimai priklauso nuo vietos, medžiagų ir gamintojų
              reikalavimų.
            </p>
          </div>
        </div>
      </article>

      <section aria-labelledby="more-title" className="wrap pb-20 sm:pb-28">
        <h2 id="more-title" className="font-display text-2xl font-medium tracking-[-0.02em]">
          Kiti patarimai
        </h2>
        <ul className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          {others.map((a) => (
            <li key={a.slug}>
              <Link to={`/patarimai/${a.slug}`} className="group flex items-center gap-5">
                <div className="img-zoom aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-28">
                  <Img name={a.image} sizes="112px" />
                </div>
                <div>
                  <p className="text-sm text-muted">{a.category}</p>
                  <p className="mt-1 font-display text-lg font-medium leading-snug">
                    <span className="link-underline">{a.title}</span>
                  </p>
                </div>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-wood transition-transform group-hover:rotate-45" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  )
}
