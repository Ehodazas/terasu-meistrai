import { ArrowRight, ArrowUpRight, Compass, MapPin } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink, TextLink } from '../components/Button'
import { ConstructionDiagram } from '../components/ConstructionDiagram'
import { Faq } from '../components/Faq'
import { Img } from '../components/Img'
import { MaterialCompare } from '../components/MaterialCompare'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { ProcessSteps } from '../components/ProcessSteps'
import { QuoteForm } from '../components/QuoteForm'
import { SectionHead } from '../components/SectionHead'
import { Seo } from '../components/Seo'
import { PLANNER_LINK } from '../data/content'
import { getProject, projects } from '../data/projects'
import { seo } from '../data/seo'
import { services } from '../data/services'
import { site } from '../data/site'
import { getSituation, situations, type Situation } from '../data/situations'

export default function Home() {
  return (
    <>
      <Seo entry={seo.home} />
      <Hero />
      <ServiceRegion />
      <SituationExplorer />
      <ConstructionSection />
      <MaterialsSection />
      <ServicesList />
      <Process />
      <FaqSection />
      <Inquiry />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Hero: vienas demonstracinis projektas su plotu, medžiaga, sprendimu */
/* ------------------------------------------------------------------ */

const FEATURED = 'wpc-terasa-prie-namo-pusyne'

function Hero() {
  const p = getProject(FEATURED)!
  const situation = getSituation(p.situation)
  return (
    <section aria-labelledby="hero-title" className="relative flex items-center overflow-hidden bg-ink pb-10 pt-28 text-white sm:pb-14 lg:min-h-[min(86svh,820px)] lg:pb-12 lg:pt-[148px]">
      <div className="absolute inset-0">
        <Img name={p.images[0]} priority sizes="100vw" className="object-[38%_center] sm:object-center" />
      </div>
      {/* Tamsinimas: viršuje – navigacijos kontrastui, kairėje ir apačioje – tekstui */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/40 lg:to-black/5" />

      <div className="wrap relative w-full">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-1.5 text-[0.8125rem] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-wood-light" aria-hidden="true" />
              Medinių ir WPC terasų įrengimas
            </p>
            <h1 id="hero-title" className="h-display text-[3rem] !text-white sm:text-[4.6rem] lg:text-[5.8rem]">
              Terasos, kuriose norisi <em className="font-normal not-italic text-wood-light">būti.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/90 sm:text-lg">
              Projektuojame ir įrengiame medines bei WPC terasas, pritaikytas jūsų namams ir gyvenimo būdui.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/kontaktai#uzklausa" variant="wood" arrow>
                Gauti pasiūlymą
              </ButtonLink>
              <ButtonLink to="/atlikti-darbai" variant="outline-light">
                Peržiūrėti darbus
              </ButtonLink>
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
              <Link to={PLANNER_LINK} className="inline-flex items-center gap-2 font-medium text-white underline-offset-4 hover:underline">
                <Compass className="h-4 w-4 text-wood-light" aria-hidden="true" />
                Kokia terasa tinka jūsų erdvei? Planuoklė
              </Link>
              <a href="#darbo-regionas" className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-white hover:underline">
                <MapPin className="h-4 w-4 text-wood-light" aria-hidden="true" />
                Dirbame {site.regionSummary}
              </a>
            </div>
          </div>

          {/* Demonstracinis projektas */}
          <aside aria-labelledby="featured-title" className="rounded-[var(--radius-card)] bg-ink/80 p-5 backdrop-blur-md sm:p-6 lg:col-span-5 lg:col-start-8">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-wood-light">Nuotraukoje · demonstracinis projektas</p>
            <h2 id="featured-title" className="mt-2 font-display text-xl font-medium leading-snug !text-white sm:text-2xl">
              {p.title}
            </h2>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-white/15 py-4">
              {[
                ['Plotas', p.area],
                ['Medžiaga', p.material],
                ['Situacija', situation.label],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-white/60">{k}</dt>
                  <dd className="mt-0.5 font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <p className="text-xs text-white/60">Sprendimas</p>
              <p className="mt-1 leading-relaxed text-white/90">{p.solution}</p>
            </div>
            <Link to={`/atlikti-darbai/${p.slug}`} className="group mt-5 inline-flex items-center gap-2 font-medium text-white">
              <span className="underline-offset-4 group-hover:underline">Žiūrėti projektą</span>
              <ArrowUpRight className="h-4 w-4 text-wood-light transition-transform group-hover:rotate-45" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Darbai pagal situaciją                                              */
/* ------------------------------------------------------------------ */

function SituationExplorer() {
  const [active, setActive] = useState<Situation>('prie-namo')
  const info = getSituation(active)
  const list = projects.filter((p) => p.situation === active).slice(0, 3)

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = situations[(i + (e.key === 'ArrowRight' ? 1 : -1) + situations.length) % situations.length]
    setActive(next.value)
    document.getElementById(`sit-tab-${next.value}`)?.focus()
  }

  return (
    <section aria-labelledby="situations-title" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHead index="01" eyebrow="Darbai pagal situaciją" title="Kokia jūsų erdvė?" id="situations-title">
          Pasirinkite situaciją, panašiausią į jūsų – parodysime, į ką atkreipti dėmesį ir kokie sprendimai pritaikyti panašiose erdvėse.
        </SectionHead>

        <div role="tablist" aria-label="Situacijos" className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {situations.map((s, i) => {
            const on = s.value === active
            const count = projects.filter((p) => p.situation === s.value).length
            return (
              <button
                key={s.value}
                id={`sit-tab-${s.value}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="sit-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(s.value)}
                onKeyDown={(e) => onKey(e, i)}
                className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
                  on ? 'border-forest bg-forest text-paper' : 'border-ink/20 text-ink hover:border-ink'
                }`}
              >
                {s.label}
                <span className={`text-xs tabular-nums ${on ? 'text-paper/70' : 'text-muted'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div id="sit-panel" role="tabpanel" aria-labelledby={`sit-tab-${active}`} className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="rounded-[var(--radius-card)] bg-paper-2 p-6 sm:p-8 lg:col-span-4">
            <h3 className="font-display text-2xl font-medium leading-snug">{info.question}</h3>
            <p className="mt-3 leading-relaxed text-ink-2">{info.challenge}</p>
            <p className="mt-6 text-sm font-semibold">Dažniausi sprendimai</p>
            <ul className="mt-3 space-y-2">
              {info.solutions.map((s) => (
                <li key={s} className="flex gap-3 leading-snug">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-wood" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3">
              <TextLink to={`/atlikti-darbai?situacija=${active}`}>Visi tokie darbai</TextLink>
              <TextLink to={PLANNER_LINK}>Aprašyti savo erdvę planuoklėje</TextLink>
            </div>
          </div>

          <ul className={`grid gap-6 sm:grid-cols-2 lg:col-span-8 ${list.length >= 3 ? "lg:grid-cols-3" : list.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            {list.map((p) => (
              <li key={p.slug}>
                <Link to={`/atlikti-darbai/${p.slug}`} className="group block">
                  <div className={`img-zoom aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand ${list.length >= 3 ? "lg:aspect-[4/5]" : "lg:aspect-[4/3]"}`}>
                    <Img name={p.images[0]} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-medium leading-snug">
                    <span className="link-underline">{p.title}</span>
                  </h4>
                  <p className="mt-1 text-sm text-muted">
                    {p.material} · {p.area} · {p.duration}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    <span className="font-medium text-ink">Sprendimas: </span>
                    {p.solution}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-sm text-muted">Demonstraciniai pavyzdžiai su iliustracinėmis nuotraukomis.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ConstructionSection() {
  return (
    <section aria-labelledby="construction-title" className="mx-3 rounded-[var(--radius-card)] bg-paper-2 py-20 sm:mx-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap">
        <SectionHead index="02" eyebrow="Konstrukcija" title="Kas slypi po lentomis" id="construction-title">
          Terasos ilgaamžiškumą labiau lemia tai, ko nesimato, nei pačios lentos. Taip atrodo tinkamai įrengtos terasos
          pjūvis.
        </SectionHead>
        <div className="mt-12 lg:mt-16">
          <ConstructionDiagram />
        </div>
      </div>
    </section>
  )
}

function MaterialsSection() {
  return (
    <section aria-labelledby="materials-title" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead index="03" eyebrow="Medžiagos" title="Priežiūra, saulė ir pojūtis basomis" id="materials-title" className="lg:flex-1">
            Trys klausimai, kurie kasdien svarbiausi. Pasirinkite, kas jums svarbiausia – pažymėsime tinkamiausias medžiagas.
          </SectionHead>
          <TextLink to="/terasu-tipai" className="shrink-0">
            Išsamus palyginimas
          </TextLink>
        </div>
        <div className="mt-12">
          <MaterialCompare />
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

function ServicesList() {
  const [active, setActive] = useState(0)
  return (
    <section aria-labelledby="services-title" className="mx-3 rounded-[var(--radius-card)] bg-paper-2 py-20 sm:mx-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap">
        <SectionHead index="04" eyebrow="Paslaugos" title="Nuo pamatų iki paskutinės lentos" id="services-title">
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

function Process() {
  return (
    <section aria-labelledby="process-title" className="mx-3 rounded-[var(--radius-card)] bg-forest py-20 text-paper sm:mx-5 sm:py-28 lg:rounded-[32px] lg:py-32">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <p data-reveal className="eyebrow flex items-center gap-3 self-start !text-wood lg:col-span-3 lg:pt-3">
            <span className="tabular-nums text-paper/40">05</span>
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
            <span className="tabular-nums text-ink/40">06</span>
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
