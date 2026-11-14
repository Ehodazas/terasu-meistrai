import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink, TextLink } from '../components/Button'
import { Faq } from '../components/Faq'
import { Img } from '../components/Img'
import { Marquee } from '../components/Marquee'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { ProcessSteps } from '../components/ProcessSteps'
import { QuoteForm } from '../components/QuoteForm'
import { SectionHead } from '../components/SectionHead'
import { Seo } from '../components/Seo'
import { PLANNER_LINK } from '../data/content'
import type { ImageKey } from '../data/images'
import { materials } from '../data/materials'
import { getProject, projects } from '../data/projects'
import { seo } from '../data/seo'
import { services } from '../data/services'
import { site } from '../data/site'
import { useMediaQuery } from '../lib/browser'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'

export default function Home() {
  return (
    <>
      <Seo entry={seo.home} />
      <Hero />
      <ServiceRegion />
      <Marquee />
      <Intro />
      <ServicesList />
      <ProjectsRail />
      <MaterialsStrip />
      <Process />
      <FaqSection />
      <Inquiry />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Hero: skaidrės su lėtu priartėjimu, progreso juostos ir pauzė        */
/* ------------------------------------------------------------------ */

const slides: { image: ImageKey; project: string }[] = [
  { image: 'hero-modern-house', project: 'wpc-terasa-prie-namo-pusyne' },
  { image: 'deck-glass-door', project: 'terasa-su-suolu-prie-stikliniu-duru' },
  { image: 'large-deck-house', project: 'erdvi-lauko-poilsio-zona' },
]
const SLIDE_MS = 6500

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  // Esant „sumažinti judesį“ skaidrės nesikeičia pačios, kol naudotojas nepaleidžia
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null)
  const playing = userPlaying ?? !reducedMotion
  const setPlaying = (fn: (p: boolean) => boolean) => setUserPlaying(fn(playing))
  const next = useCallback(() => setActive((a) => (a + 1) % slides.length), [])

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(next, SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [active, playing, next])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('[data-hero-line]', { yPercent: 105, duration: 0.8, stagger: 0.08 }, 0.1)
          .from('[data-hero-fade]', { y: 12, autoAlpha: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 }, 0.35)
        // Tekstas šiek tiek kyla slenkant žemyn (neblunka – lieka įskaitomas)
        gsap.to('[data-hero-content]', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  const current = getProject(slides[active].project)!

  return (
    <section
      ref={ref}
      aria-roledescription="karuselė"
      aria-label="Terasų pavyzdžiai"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-28 text-white lg:h-[100svh] lg:max-h-[1080px] lg:min-h-[660px] lg:pt-0"
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out-soft ${i === active ? 'z-[1] opacity-100' : 'z-0 opacity-0'}`}
        >
          <div
            className={`h-full w-full ${
              i === active
                ? 'scale-100 transition-transform duration-[8000ms] ease-out motion-reduce:transition-none'
                : 'scale-[1.12] transition-transform delay-[1400ms] duration-0'
            }`}
          >
            <Img name={s.image} priority={i === 0} sizes="100vw" alt={i === 0 ? undefined : ''} className="object-[38%_center] sm:object-center" />
          </div>
        </div>
      ))}
      <div aria-hidden="true" className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-black/25 to-black/30" />

      <div className="wrap relative z-[3] pb-10 sm:pb-14 lg:pb-16">
        <div data-hero-content className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-hero-fade className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.8125rem] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-wood" aria-hidden="true" />
              Medinių ir WPC terasų įrengimas
            </p>
            <h1 className="h-display text-[3.1rem] !text-white sm:text-[4.8rem] lg:text-[6.4rem]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  Terasos, kuriose
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  norisi <em className="font-normal not-italic text-wood-light">būti.</em>
                </span>
              </span>
            </h1>
            <p data-hero-fade className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg">
              Projektuojame ir įrengiame medines bei WPC terasas, pritaikytas jūsų namams ir gyvenimo būdui.
            </p>
            <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/kontaktai#uzklausa" variant="wood" arrow>
                Gauti pasiūlymą
              </ButtonLink>
              <ButtonLink to="/atlikti-darbai" variant="outline-light">
                Peržiūrėti darbus
              </ButtonLink>
            </div>
            <a data-hero-fade href="#darbo-regionas" className="mt-6 inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white">
              <MapPin className="h-4 w-4 text-wood" aria-hidden="true" />
              Dirbame {site.regionSummary}
            </a>
          </div>

          {/* Skaidrių valdymas */}
          <div data-hero-fade className="lg:col-span-4 lg:col-start-9">
            <Link
              key={current.slug}
              to={`/atlikti-darbai/${current.slug}`}
              aria-live="polite"
              className="fade-in group mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/15 sm:p-4 lg:mb-5"
            >
              <span className="min-w-0">
                <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-white/60 sm:text-xs">Nuotraukoje · pavyzdys</span>
                <span className="mt-0.5 block truncate font-display text-[0.9375rem] font-medium sm:text-base">{current.title}</span>
                <span className="mt-0.5 hidden text-[0.8125rem] text-white/70 sm:block">
                  {current.material} · {current.area} · {current.duration}
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm tabular-nums text-white/70">
                {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <div className="flex flex-1 gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.image}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Rodyti nuotrauką: ${getProject(s.project)!.title}`}
                    title={getProject(s.project)!.title}
                    aria-current={i === active}
                    className="group relative h-8 flex-1"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                      <span
                        key={`${active}-${i}`}
                        className={`absolute inset-0 origin-left bg-white ${i < active ? 'scale-x-100' : i > active ? 'scale-x-0' : ''}`}
                        style={
                          i === active
                            ? { animation: `progress ${SLIDE_MS}ms linear both`, animationPlayState: playing ? 'running' : 'paused' }
                            : undefined
                        }
                      />
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Sustabdyti skaidres' : 'Paleisti skaidres'}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-ink"
              >
                {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Darbo regionas – iškart po hero, kad lankytojas žinotų, ar atvyksime */
/* ------------------------------------------------------------------ */

function ServiceRegion() {
  return (
    <section id="darbo-regionas" aria-labelledby="region-title" className="scroll-mt-24 bg-forest text-paper">
      <div className="wrap grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex items-start gap-4 lg:col-span-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper/10">
            <MapPin className="h-5 w-5 text-wood" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wood">Darbo regionas</p>
            <h2 id="region-title" className="mt-1.5 font-display text-xl font-medium leading-snug !text-paper sm:text-2xl">
              Atvykstame į objektus {site.regionSummary}
            </h2>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 lg:col-span-5">
          {site.serviceArea.map((a) => (
            <li key={a} className="rounded-full border border-paper/20 px-4 py-2 text-[0.9375rem] text-paper/90">
              {a}
            </li>
          ))}
        </ul>
        <div className="lg:col-span-3 lg:text-right">
          <p className="text-sm leading-relaxed text-paper/70">Objektas kitur Lietuvoje? Parašykite – įvertinsime galimybes.</p>
          <Link to="/kontaktai#darbo-zona" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-paper link-underline">
            Plačiau apie darbo zoną
            <ArrowRight className="h-4 w-4 text-wood" aria-hidden="true" />
          </Link>
          {site.isPlaceholder && <p className="mt-2 text-xs text-paper/45">Regionas nurodytas kaip pavyzdys.</p>}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section aria-labelledby="intro-title" className="wrap py-20 sm:py-28 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <p data-reveal className="eyebrow lg:col-span-3 lg:pt-3">
          Terasų meistrai
        </p>
        <div className="lg:col-span-9">
          <h2 id="intro-title" data-split className="font-display text-[1.75rem] font-medium leading-[1.25] tracking-[-0.025em] sm:text-[2.4rem] lg:text-[2.9rem]">
            Terasa – ta namų dalis, kuri naudojama kiekvieną šiltą dieną.{' '}
            <span className="text-ink/45">Todėl ją statome taip pat kruopščiai, kaip statomas pats namas.</span>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:gap-8">
            <div data-reveal="img" className="aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand sm:aspect-[5/4]">
              <Img name="router-detail" sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-between gap-8 sm:pl-4 lg:pl-10">
              <div className="space-y-5 leading-[1.75] text-ink-2">
                <p data-reveal>
                  Įrengiame medines ir kompozitines terasas individualiems namams, sodyboms ir verslo objektams. Darbą
                  pradedame nuo to, ko dažnai nesimato: grunto, atramų, lagų ir vandens nutekėjimo.
                </p>
                <p data-reveal>
                  Padedame pasirinkti medžiagą pagal jūsų biudžetą ir tai, kiek laiko norite skirti priežiūrai, o darbų
                  eigą ir kainą paaiškiname iš anksto.
                </p>
              </div>
              <div data-reveal className="grid grid-cols-3 gap-3 border-t border-line pt-6 text-sm text-ink-2">
                {['Projektavimas', 'Konstrukcija', 'Įrengimas'].map((x, i) => (
                  <p key={x}>
                    <span className="block font-display text-xs font-semibold tabular-nums text-wood-dark">0{i + 1}</span>
                    {x}
                  </p>
                ))}
              </div>
              <TextLink to="/apie-mus">Daugiau apie mus</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesList() {
  const [active, setActive] = useState(0)
  return (
    <section aria-labelledby="services-title" className="mx-3 rounded-[var(--radius-card)] bg-paper-2 py-20 sm:mx-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap">
        <SectionHead index="01" eyebrow="Paslaugos" title="Nuo pamatų iki paskutinės lentos" id="services-title">
          Galime įrengti visą terasą arba atlikti atskirą darbų etapą.
        </SectionHead>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-sand">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-soft ${
                    i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                >
                  <Img name={s.image} sizes="40vw" alt="" />
                </div>
              ))}
              <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-2 font-display text-sm font-medium backdrop-blur">
                {services[active].nav}
              </span>
            </div>
          </div>

          <ul className="border-t border-ink/15 lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.slug} data-reveal className="border-b border-ink/15">
                <Link
                  to={`/paslaugos#${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:py-8"
                >
                  <span className={`pt-1.5 font-display text-sm font-semibold tabular-nums transition-colors ${i === active ? 'lg:text-wood-dark' : ''} text-ink/40`}>
                    {s.number}
                  </span>
                  <span>
                    <span className="block font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em] transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5 sm:text-[1.6rem]">
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-xl leading-relaxed text-ink-2">{s.short}</span>
                  </span>
                  <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 ease-out-soft group-hover:-rotate-45 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Projektų juosta: įprastas horizontalus slinkimas – rodyklėmis,       */
/* pele tempiant arba pirštu braukiant (be puslapio „užrakinimo“)       */
/* ------------------------------------------------------------------ */

function ProjectsRail() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const list = projects.slice(0, 8)

  const update = useCallback(() => {
    const v = viewportRef.current
    if (!v) return
    const max = v.scrollWidth - v.clientWidth
    setProgress(max > 0 ? v.scrollLeft / max : 0)
    setEdges({ start: v.scrollLeft < 8, end: v.scrollLeft > max - 8 })
  }, [])

  useEffect(() => {
    const v = viewportRef.current
    if (!v) return
    v.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      v.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = (dir: 1 | -1) => {
    const v = viewportRef.current
    const card = v?.querySelector('li')
    if (!v || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    v.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: reduce ? 'auto' : 'smooth' })
  }

  // Tempimas pele (lietimui naudojamas įprastas braukimas)
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !viewportRef.current) return
    drag.current = { x: e.clientX, left: viewportRef.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current
    const v = viewportRef.current
    if (!d || !v) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true
      v.style.scrollSnapType = 'none'
      v.setPointerCapture(e.pointerId)
    }
    if (d.moved) v.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    const v = viewportRef.current
    if (v) v.style.scrollSnapType = ''
    // paliekame žymą, kad po tempimo nesuveiktų paspaudimas ant kortelės
    window.setTimeout(() => (drag.current = null), 0)
  }

  const arrowBtn =
    'flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30'

  return (
    <section aria-labelledby="rail-title" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead index="02" eyebrow="Darbų pavyzdžiai" title="Terasos skirtingiems namams" id="rail-title" className="lg:flex-1" />
        <div className="flex shrink-0 items-center gap-6">
          <TextLink to="/atlikti-darbai">Visi pavyzdžiai</TextLink>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Ankstesni projektai" className={arrowBtn}>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Kiti projektai" className={arrowBtn}>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        className="no-scrollbar mt-12 cursor-grab snap-x snap-mandatory overflow-x-auto active:cursor-grabbing lg:mt-14"
      >
        <ul className="flex w-max gap-4 px-5 sm:gap-6 sm:px-8 lg:px-12">
          {list.map((p, i) => (
            <li key={p.slug} data-reveal className="w-[78vw] shrink-0 snap-start scroll-ml-5 sm:w-[44vw] sm:scroll-ml-8 lg:w-[30vw] lg:scroll-ml-12 xl:w-[27vw]">
              <Link
                to={`/atlikti-darbai/${p.slug}`}
                draggable={false}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-sand"
              >
                <div className="img-zoom pointer-events-none h-full w-full">
                  <Img name={p.images[0]} sizes="(min-width: 1024px) 30vw, 78vw" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-display text-xs font-semibold tabular-nums text-ink backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                  <div>
                    <p className="text-[0.8125rem] text-white/80">
                      {p.material} · {p.area} · {p.duration}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-medium leading-snug !text-white sm:text-2xl">{p.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 ease-out-soft group-hover:-rotate-45">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[24vw]">
            <Link
              to="/atlikti-darbai"
              draggable={false}
              className="group flex aspect-[4/5] flex-col justify-between rounded-[var(--radius-img)] bg-forest p-7 text-paper transition-colors hover:bg-forest-dark"
            >
              <span className="eyebrow !text-wood">Galerija</span>
              <span>
                <span className="block font-display text-3xl font-medium leading-tight tracking-[-0.02em]">Visi {projects.length} pavyzdžiai</span>
                <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="wrap mt-8 flex items-center gap-6">
        <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-ink transition-transform duration-150" style={{ transform: `translateX(${progress * 300}%)` }} />
        </span>
        <div className="flex gap-2 sm:hidden">
          <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Ankstesni projektai" className={arrowBtn}>
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Kiti projektai" className={arrowBtn}>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="wrap mt-4 text-sm text-muted">Demonstraciniai pavyzdžiai su iliustracinėmis nuotraukomis.</p>
    </section>
  )
}

function MaterialsStrip() {
  return (
    <section aria-labelledby="materials-title" className="wrap py-20 sm:py-28 lg:py-32">
      <SectionHead index="03" eyebrow="Medžiagos" title="Keturi pagrindiniai pasirinkimai" id="materials-title">
        Kiekviena medžiaga turi savo privalumų ir ribojimų. Visiškai priežiūros nereikalaujančių terasų nėra – skiriasi
        tik priežiūros pobūdis ir dažnumas.
      </SectionHead>
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-6">
        {materials.map((m, i) => (
          <li key={m.slug} data-reveal className={i % 2 === 1 ? 'mt-10 lg:mt-16' : ''}>
            <Link to={`/terasu-tipai#${m.slug}`} className="group block">
              <div className="img-zoom relative aspect-[3/4] overflow-hidden rounded-[var(--radius-img)] bg-sand">
                <Img name={m.homeImage} sizes="(min-width: 1024px) 25vw, 50vw" />
                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium tracking-[-0.015em] sm:text-xl">
                <span className="link-underline">{m.name}</span>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{m.lead}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div data-reveal className="mt-12 lg:mt-16">
        <TextLink to="/terasu-tipai">Palyginti medžiagas</TextLink>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section aria-labelledby="process-title" className="mx-3 rounded-[var(--radius-card)] bg-forest py-20 text-paper sm:mx-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <p data-reveal className="eyebrow flex items-center gap-3 self-start !text-wood lg:col-span-3 lg:pt-3">
            <span className="tabular-nums text-paper/40">04</span>
            <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
            Darbų eiga
          </p>
          <div className="lg:col-span-8">
            <h2 id="process-title" data-split className="h-section max-w-[18ch] !text-paper">
              Aiškūs žingsniai nuo pirmo skambučio
            </h2>
            <p data-reveal className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-paper/70 sm:text-lg">
              Prieš pradedant darbus žinote, kas bus daroma, iš kokių medžiagų ir per kiek laiko.
            </p>
          </div>
        </div>
        <div className="mt-16 lg:mt-24">
          <ProcessSteps dark />
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="wrap py-20 sm:py-28 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow flex items-center gap-3">
            <span className="tabular-nums text-ink/40">05</span>
            <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
            DUK
          </p>
          <h2 id="faq-title" data-split className="h-section mt-5">
            Dažniausi klausimai
          </h2>
          <div data-reveal className="mt-8 rounded-[var(--radius-card)] bg-paper-2 p-6">
            <p className="font-display text-lg font-medium">Neradote atsakymo?</p>
            <p className="mt-2 leading-relaxed text-ink-2">Paskambinkite arba parašykite – atsakysime į klausimus apie jūsų terasą.</p>
            <a href={site.phoneHref} className="mt-4 inline-flex font-display text-lg font-medium text-forest link-underline">
              {site.phone}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Faq schema />
        </div>
      </div>
    </section>
  )
}

function Inquiry() {
  return (
    <section id="uzklausa" aria-labelledby="inquiry-title" className="mx-3 mb-3 rounded-[var(--radius-card)] bg-paper-2 py-20 sm:mx-5 sm:mb-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow">
            Užklausa
          </p>
          <h2 id="inquiry-title" data-split className="h-section mt-5">
            Papasakokite apie savo terasą
          </h2>
          <p data-reveal className="lead mt-5 max-w-md">
            Užpildykite formą – susisieksime, aptarsime jūsų idėją ir suderinsime apžiūros laiką. Pasiūlymą parengiame
            įvertinę vietą.
          </p>

          <Link
            data-reveal
            to={PLANNER_LINK}
            className="group mt-8 flex items-center justify-between gap-4 rounded-[var(--radius-card)] bg-forest p-5 text-paper transition-colors hover:bg-forest-dark sm:p-6"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-wood">Greičiau</span>
              <span className="mt-1 block font-display text-lg font-medium">Terasos planuoklė – 5 klausimai</span>
              <span className="mt-1 block text-sm text-paper/70">Pasirinkite atsakymus, o užklausą užpildysime už jus.</span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:-rotate-45">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>

          <dl data-reveal className="mt-10 space-y-5 border-t border-line pt-8">
            <div>
              <dt className="text-sm text-muted">Telefonas</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="font-display text-xl font-medium link-underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">El. paštas</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all font-display text-xl font-medium link-underline">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
          <PlaceholderTag className="mt-6" />
        </div>
        <div data-reveal className="lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
