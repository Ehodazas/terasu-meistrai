import { useSearchParams } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { DEMO_PROJECTS, projects, type Project } from '../data/projects'
import { seo } from '../data/seo'
import { situations, type Situation } from '../data/situations'

type SitFilter = 'visos' | Situation
type MatFilter = 'visos' | 'medines' | 'wpc'

const matFilters: { value: MatFilter; label: string }[] = [
  { value: 'visos', label: 'Visos medžiagos' },
  { value: 'medines', label: 'Mediena' },
  { value: 'wpc', label: 'WPC' },
]

const isSit = (v: string | null): v is Situation => situations.some((s) => s.value === v)
const isMat = (v: string | null): v is MatFilter => matFilters.some((m) => m.value === v)
const byMaterial = (m: MatFilter) => (p: Project) => m === 'visos' || (m === 'wpc' ? p.tags.includes('wpc') : !p.tags.includes('wpc'))

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const rawSit = params.get('situacija')
  const rawMat = params.get('medziaga')
  const sit: SitFilter = isSit(rawSit) ? rawSit : 'visos'
  const mat: MatFilter = isMat(rawMat) ? rawMat : 'visos'

  const set = (key: 'situacija' | 'medziaga', value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'visos') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const groups = situations
    .filter((s) => sit === 'visos' || s.value === sit)
    .map((s) => ({ info: s, items: projects.filter((p) => p.situation === s.value).filter(byMaterial(mat)) }))
    .filter((g) => g.items.length > 0)
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  const chip = (active: boolean) =>
    `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
      active ? 'border-forest bg-forest text-paper' : 'border-ink/20 text-ink hover:border-ink'
    }`

  return (
    <>
      <Seo entry={seo.projects} />
      <PageHero
        eyebrow="Atlikti darbai"
        title="Terasų pavyzdžiai pagal situaciją"
        lead="Raskite erdvę, panašią į jūsų: terasa prie namo, mažas kiemas, sklypas su nuolydžiu ar sena terasa, kurią verta atnaujinti. Prie kiekvieno – plotas, medžiaga, trukmė ir sprendimas."
      />

      <section aria-labelledby="gallery-title" className="wrap pb-24 sm:pb-32">
        <h2 id="gallery-title" className="sr-only">
          Projektų galerija
        </h2>

        <div className="space-y-4 border-t border-line pt-8">
          <div role="group" aria-label="Situacija" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" aria-pressed={sit === 'visos'} onClick={() => set('situacija', 'visos')} className={chip(sit === 'visos')}>
              Visos situacijos
              <span className={`text-xs tabular-nums ${sit === 'visos' ? 'text-paper/70' : 'text-muted'}`}>{projects.length}</span>
            </button>
            {situations.map((s) => {
              const active = sit === s.value
              return (
                <button key={s.value} type="button" aria-pressed={active} onClick={() => set('situacija', s.value)} className={chip(active)}>
                  {s.label}
                  <span className={`text-xs tabular-nums ${active ? 'text-paper/70' : 'text-muted'}`}>
                    {projects.filter((p) => p.situation === s.value).length}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div role="group" aria-label="Medžiaga" className="flex gap-1 rounded-full bg-paper-2 p-1">
              {matFilters.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  aria-pressed={mat === m.value}
                  onClick={() => set('medziaga', m.value)}
                  className={`min-h-10 rounded-full px-4 text-sm transition-colors ${mat === m.value ? 'bg-white font-medium text-ink shadow-sm' : 'text-ink-2 hover:text-ink'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="text-sm text-muted">
              Rodoma projektų: {total}
            </p>
          </div>
        </div>

        {DEMO_PROJECTS && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            Pastaba: tai demonstraciniai projektų pavyzdžiai su iliustracinėmis nuotraukomis. Prieš paleidžiant svetainę jie
            bus pakeisti tikrais įmonės darbais.
          </p>
        )}

        {groups.length > 0 ? (
          <div className="mt-12 space-y-20 lg:mt-14">
            {groups.map(({ info, items }) => (
              <section key={info.value} aria-labelledby={`grp-${info.value}`}>
                <div className="grid gap-4 border-b border-line pb-6 lg:grid-cols-12 lg:items-end lg:gap-8">
                  <div className="lg:col-span-5">
                    <p className="eyebrow">{info.label}</p>
                    <h3 id={`grp-${info.value}`} className="mt-2 font-display text-[1.6rem] font-medium leading-snug tracking-[-0.02em] sm:text-3xl">
                      {info.question}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7">{info.challenge}</p>
                </div>
                <ul className={`mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 ${items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
                  {items.map((p) => (
                    <li key={p.slug}>
                      <ProjectCard project={p} headingLevel="h3" />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[var(--radius-card)] border border-dashed border-line px-6 py-16 text-center">
            <p className="font-display text-xl font-medium">Pagal šiuos filtrus projektų kol kas nėra</p>
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })}
              className="mt-4 min-h-11 text-forest underline underline-offset-4"
            >
              Rodyti visus projektus
            </button>
          </div>
        )}
      </section>

      <CtaBand title="Turite panašią erdvę?" text="Atsiųskite kelias savo sklypo nuotraukas ar trumpą aprašymą – aptarsime, kas tiktų jūsų namams." />
    </>
  )
}
