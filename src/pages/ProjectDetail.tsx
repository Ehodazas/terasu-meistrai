import { ArrowLeft, ArrowRight, Expand } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Img } from '../components/Img'
import { Lightbox } from '../components/Lightbox'
import { Seo } from '../components/Seo'
import { projects } from '../data/projects'
import { projectSeo } from '../data/seo'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const ref = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useGSAP(
    () => {
      if (index < 0) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-enter]', { y: 20, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07 })
      })
    },
    { scope: ref, dependencies: [slug], revertOnUpdate: true },
  )

  if (index < 0) return <NotFound />

  const project = projects[index]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const [main, ...rest] = project.images
  const quoteType = project.tags.includes('wpc') ? 'wpc' : 'medine'

  return (
    <article ref={ref} className="pt-[var(--header-h)]">
      <Seo entry={projectSeo(project.slug)!} />

      <div className="wrap pb-10 pt-10 sm:pt-14 lg:pt-20">
        <nav aria-label="Naršymo kelias" data-enter>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-ink">
                Pagrindinis
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/atlikti-darbai" className="hover:text-ink">
                Atlikti darbai
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p data-enter className="inline-flex items-center gap-2 border border-wood/40 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em] text-wood-dark">
              Demonstracinis projektas
            </p>
            <h1 data-enter className="h-display mt-5 text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]">
              {project.title}
            </h1>
          </div>
          <p data-enter className="lead lg:col-span-4">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="wrap">
        <button
          type="button"
          data-enter
          onClick={() => setLightbox(0)}
          aria-label="Padidinti nuotrauką"
          className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-img)] bg-sand sm:aspect-[16/9]"
        >
          <span className="img-zoom block h-full w-full">
            <Img name={main} priority sizes="(min-width: 1360px) 1360px, 100vw" />
          </span>
          <ZoomBadge />
        </button>
      </div>

      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start border-t border-ink pt-6 lg:col-span-4 lg:grid-cols-1">
          {[
            ['Medžiaga', project.material],
            ['Projekto tipas', project.type],
            ['Plotas', project.area],
            ['Statusas', 'Demonstracinis pavyzdys'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 font-display text-lg font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">Apie projektą</h2>
          <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-2">
            {project.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h3 className="eyebrow mt-12">Atlikti darbai</h3>
          <ul className="mt-5 border-t border-line">
            {project.scope.map((s, i) => (
              <li key={s} className="flex gap-5 border-b border-line py-4">
                <span className="font-display text-sm font-semibold tabular-nums text-wood-dark">{String(i + 1).padStart(2, '0')}</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Tai demonstracinis projekto aprašymas su iliustracine nuotrauka (Unsplash). Jis parodo, kaip svetainėje bus
            pateikiami tikri įmonės darbai.
          </p>
          <ButtonLink to={`/kontaktai?tipas=${quoteType}#uzklausa`} arrow className="mt-10">
            Noriu panašios terasos
          </ButtonLink>
        </div>
      </div>

      {rest.length > 0 && (
        <section aria-label="Daugiau nuotraukų" className="wrap pb-16 sm:pb-24">
          <ul className={`grid gap-4 sm:gap-6 ${rest.length === 1 ? '' : 'sm:grid-cols-2'}`}>
            {rest.map((img, i) => (
              <li key={img} data-reveal className={rest.length === 3 && i === 0 ? 'sm:col-span-2' : ''}>
                <button
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  aria-label="Padidinti nuotrauką"
                  className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-img)] bg-sand ${
                    rest.length === 3 && i === 0 ? 'aspect-[4/3] sm:aspect-[16/8]' : 'aspect-[4/3]'
                  }`}
                >
                  <span className="img-zoom block h-full w-full">
                    <Img name={img} sizes={rest.length === 1 ? '100vw' : '(min-width: 640px) 50vw, 100vw'} />
                  </span>
                  <ZoomBadge />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Kiti projektai" className="border-t border-line">
        <div className="wrap grid sm:grid-cols-2">
          <Link to={`/atlikti-darbai/${prev.slug}`} className="group flex items-center gap-4 border-b border-line py-8 sm:border-b-0 sm:border-r sm:pr-8">
            <ArrowLeft className="h-5 w-5 shrink-0 text-wood transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-sm text-muted">Ankstesnis projektas</span>
              <span className="mt-1 block font-display text-lg font-medium">{prev.title}</span>
            </span>
          </Link>
          <Link to={`/atlikti-darbai/${next.slug}`} className="group flex items-center justify-end gap-4 py-8 text-right sm:pl-8">
            <span>
              <span className="block text-sm text-muted">Kitas projektas</span>
              <span className="mt-1 block font-display text-lg font-medium">{next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-wood transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>
      <Lightbox items={project.images} index={lightbox} onChange={setLightbox} />
    </article>
  )
}

function ZoomBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-sm font-medium text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <Expand className="h-4 w-4" />
      Padidinti
    </span>
  )
}
