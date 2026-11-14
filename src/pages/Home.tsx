import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink, TextLink } from '../components/Button'
import { Img } from '../components/Img'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { ProcessSteps } from '../components/ProcessSteps'
import { ProjectCard } from '../components/ProjectCard'
import { QuoteForm } from '../components/QuoteForm'
import { SectionHead } from '../components/SectionHead'
import { Seo } from '../components/Seo'
import { materials } from '../data/materials'
import { getProject } from '../data/projects'
import { seo } from '../data/seo'
import { services } from '../data/services'
import { site } from '../data/site'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'

const featured = ['daugiapakope-sodo-terasa', 'pilka-wpc-terasa-su-suolu', 'terasa-su-pergole'].map((s) => getProject(s)!)

export default function Home() {
  return (
    <>
      <Seo entry={seo.home} />
      <Hero />
      <Intro />
      <ServicesList />
      <MaterialsStrip />
      <Featured />
      <Process />
      <Inquiry />
    </>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('[data-hero-img]', { scale: 1.08, duration: 2.2, ease: 'power2.out' }, 0)
          .from('[data-hero-line]', { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.25)
          .from('[data-hero-fade]', { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.65)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative flex min-h-[640px] items-end overflow-hidden bg-ink text-white h-[100svh] max-h-[1080px]">
      <div data-hero-img className="absolute inset-0">
        <Img name="hero-modern-house" priority sizes="100vw" className="object-[38%_center] sm:object-center" />
      </div>
      {/* tamsinimas apačioje – kad tekstas būtų įskaitomas */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />

      <div className="wrap relative pb-12 sm:pb-16 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="h-display text-[3rem] !text-white sm:text-[4.6rem] lg:text-[6rem]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  Terasos, kuriose
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  norisi būti.
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
          <ul
            data-hero-fade
            className="hidden border-l border-white/25 pl-6 text-sm leading-7 text-white/75 lg:col-span-3 lg:col-start-10 lg:block"
          >
            <li>Medinės ir WPC terasos</li>
            <li>Konstrukcijos ir pamatai</li>
            <li>Laiptai ir turėklai</li>
            <li>Senų terasų atnaujinimas</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section aria-labelledby="intro-title" className="wrap py-20 sm:py-28 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow lg:col-span-3 lg:pt-3">Terasų meistrai</p>
        <div className="lg:col-span-9">
          <h2 id="intro-title" className="font-display text-[1.75rem] font-medium leading-[1.25] tracking-[-0.025em] sm:text-[2.4rem] lg:text-[2.9rem]">
            Terasa – ta namų dalis, kuri naudojama kiekvieną šiltą dieną.{' '}
            <span className="text-ink/45">Todėl ją statome taip pat kruopščiai, kaip statomas pats namas.</span>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:gap-8">
            <div className="aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4]">
              <Img name="router-detail" sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-between gap-8 sm:pl-4 lg:pl-10">
              <div className="space-y-5 leading-[1.75] text-ink-2">
                <p>
                  Įrengiame medines ir kompozitines terasas individualiems namams, sodyboms ir verslo objektams. Darbą
                  pradedame nuo to, ko dažnai nesimato: grunto, atramų, lagų ir vandens nutekėjimo.
                </p>
                <p>
                  Padedame pasirinkti medžiagą pagal jūsų biudžetą ir tai, kiek laiko norite skirti priežiūrai, o darbų
                  eigą ir kainą paaiškiname iš anksto.
                </p>
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
    <section aria-labelledby="services-title" className="border-t border-line bg-paper-2/60 py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHead index="01" eyebrow="Paslaugos" title="Nuo pamatų iki paskutinės lentos" id="services-title">
          Galime įrengti visą terasą arba atlikti atskirą darbų etapą.
        </SectionHead>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-sand">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out-soft ${i === active ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Img name={s.image} sizes="40vw" alt="" />
                </div>
              ))}
            </div>
          </div>

          <ul className="border-t border-line lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-line">
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
                    <span className="block font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em] sm:text-[1.6rem]">
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-xl leading-relaxed text-ink-2">{s.short}</span>
                  </span>
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
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

function MaterialsStrip() {
  return (
    <section aria-labelledby="materials-title" className="wrap py-20 sm:py-28 lg:py-32">
      <SectionHead index="02" eyebrow="Medžiagos" title="Keturi pagrindiniai pasirinkimai" id="materials-title">
        Kiekviena medžiaga turi savo privalumų ir ribojimų. Visiškai priežiūros nereikalaujančių terasų nėra – skiriasi
        tik priežiūros pobūdis ir dažnumas.
      </SectionHead>
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-6">
        {materials.map((m, i) => (
          <li key={m.slug} className={i % 2 === 1 ? 'mt-10 lg:mt-16' : ''}>
            <Link to={`/terasu-tipai#${m.slug}`} className="group block">
              <div className="img-zoom aspect-[3/4] overflow-hidden bg-sand">
                <Img name={m.homeImage} sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <h3 className="mt-4 text-lg font-medium tracking-[-0.015em] sm:text-xl">
                <span className="link-underline">{m.name}</span>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{m.lead}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 lg:mt-16">
        <TextLink to="/terasu-tipai">Palyginti medžiagas</TextLink>
      </div>
    </section>
  )
}

function Featured() {
  const [a, b, c] = featured
  return (
    <section aria-labelledby="featured-title" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead index="03" eyebrow="Darbų pavyzdžiai" title="Terasos skirtingiems namams" id="featured-title" className="lg:flex-1" />
          <TextLink to="/atlikti-darbai" className="shrink-0">
            Visi pavyzdžiai
          </TextLink>
        </div>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ProjectCard project={a} aspect="aspect-[4/3] lg:aspect-[6/5]" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:pt-28">
            <ProjectCard project={b} sizes="(min-width: 1024px) 40vw, 50vw" />
            <ProjectCard project={c} aspect="aspect-[4/3] lg:aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 50vw" />
          </div>
        </div>
        <p className="mt-12 max-w-2xl text-sm text-muted">
          Pateikti projektai yra demonstraciniai pavyzdžiai su iliustracinėmis nuotraukomis.
        </p>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-forest py-20 text-paper sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <p className="eyebrow flex items-center gap-3 self-start !text-wood lg:col-span-3 lg:pt-3">
            <span className="tabular-nums text-paper/40">04</span>
            <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
            Darbų eiga
          </p>
          <div className="lg:col-span-8">
            <h2 id="process-title" className="h-section max-w-[18ch] !text-paper">
              Aiškūs žingsniai nuo pirmo skambučio
            </h2>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-paper/70 sm:text-lg">
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

function Inquiry() {
  return (
    <section id="uzklausa" aria-labelledby="inquiry-title" className="bg-paper-2 py-20 sm:py-28 lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">Užklausa</p>
          <h2 id="inquiry-title" className="h-section mt-5">
            Papasakokite apie savo terasą
          </h2>
          <p className="lead mt-5 max-w-md">
            Užpildykite formą – susisieksime, aptarsime jūsų idėją ir suderinsime apžiūros laiką. Pasiūlymą parengiame
            įvertinę vietą.
          </p>
          <dl className="mt-10 space-y-5 border-t border-line pt-8">
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
                <a href={`mailto:${site.email}`} className="font-display text-xl font-medium link-underline break-all">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
          <PlaceholderTag className="mt-6" />
        </div>
        <div className="lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
