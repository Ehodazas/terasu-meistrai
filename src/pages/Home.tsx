import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/motion'

export default function Home() {
  return (
    <>
      <Seo entry={seo.home} />
      <Hero />
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
        tl.from('[data-hero-line]', { yPercent: 115, duration: 1.2, stagger: 0.1 }, 0.2)
          .from('[data-hero-fade]', { y: 20, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, 0.6)
        // Tekstas lėtai kyla ir blėsta slenkant žemyn
        gsap.to('[data-hero-content]', {
          yPercent: -18,
          autoAlpha: 0.2,
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
      className="relative flex h-[100svh] max-h-[1080px] min-h-[660px] items-end overflow-hidden bg-ink text-white"
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
                  norisi <em className="font-normal not-italic text-wood">būti.</em>
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
          </div>

          {/* Skaidrių valdymas */}
          <div data-hero-fade className="lg:col-span-4 lg:col-start-9">
            <Link
              to={`/atlikti-darbai/${current.slug}`}
              className="group mb-5 hidden items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-colors hover:bg-white/15 lg:flex"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-white/60">Nuotraukoje · pavyzdys</span>
                <span className="mt-1 block font-display font-medium">{current.title}</span>
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
                    aria-label={`Rodyti ${i + 1} nuotrauką`}
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
/* Projektų juosta: kompiuteryje – prisegama ir slenka horizontaliai    */
/* ------------------------------------------------------------------ */

function ProjectsRail() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const list = projects.slice(0, 8)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const viewport = viewportRef.current!
        const track = trackRef.current!
        gsap.set(viewport, { overflow: 'visible' })
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo(
          '[data-rail-progress]',
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } },
        )
        ScrollTrigger.refresh()
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} aria-labelledby="rail-title" className="overflow-hidden py-20 sm:py-28 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pb-10 lg:pt-28">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead index="02" eyebrow="Darbų pavyzdžiai" title="Terasos skirtingiems namams" id="rail-title" className="lg:flex-1" />
        <TextLink to="/atlikti-darbai" className="shrink-0">
          Visi pavyzdžiai
        </TextLink>
      </div>

      <div ref={viewportRef} className="no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto lg:mt-14">
        <ul ref={trackRef} className="flex w-max gap-4 px-5 sm:gap-6 sm:px-8 lg:px-12">
          {list.map((p, i) => (
            <li key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw] xl:w-[27vw]">
              <Link to={`/atlikti-darbai/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-sand">
                <div className="img-zoom h-full w-full">
                  <Img name={p.images[0]} sizes="(min-width: 1024px) 30vw, 78vw" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-display text-xs font-semibold tabular-nums text-ink backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                  <div>
                    <p className="text-[0.8125rem] text-white/75">
                      {p.material} · {p.type}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-medium leading-snug !text-white sm:text-2xl">{p.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[24vw]">
            <Link
              to="/atlikti-darbai"
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

      <div className="wrap mt-10 flex items-center gap-6">
        <span className="relative hidden h-px flex-1 bg-line lg:block">
          <span data-rail-progress className="absolute inset-0 origin-left bg-ink" />
        </span>
        <p className="text-sm text-muted">Demonstraciniai pavyzdžiai su iliustracinėmis nuotraukomis.</p>
      </div>
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
