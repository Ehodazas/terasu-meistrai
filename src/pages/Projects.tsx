import { useSearchParams } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { DEMO_PROJECTS, projectFilters, projects, type ProjectTag } from '../data/projects'
import { seo } from '../data/seo'

type FilterValue = 'visi' | ProjectTag
const isFilter = (v: string | null): v is FilterValue => projectFilters.some((f) => f.value === v)

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('filtras')
  const filter: FilterValue = isFilter(raw) ? raw : 'visi'
  const list = filter === 'visi' ? projects : projects.filter((p) => p.tags.includes(filter))
  const label = projectFilters.find((f) => f.value === filter)!.label

  const choose = (value: FilterValue) => {
    const next = new URLSearchParams(params)
    if (value === 'visi') next.delete('filtras')
    else next.set('filtras', value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo entry={seo.projects} />
      <PageHero
        eyebrow="Atlikti darbai"
        title="Terasų pavyzdžiai"
        lead="Medinės ir kompozitinės terasos, terasos su laiptais ir pergolėmis, nedidelės sodo aikštelės ir senų terasų atnaujinimas."
      />

      <section aria-labelledby="gallery-title" className="wrap pb-24 sm:pb-32">
        <h2 id="gallery-title" className="sr-only">
          Projektų galerija
        </h2>

        <div className="flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtruoti projektus" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {projectFilters.map((f) => {
              const active = f.value === filter
              const count = f.value === 'visi' ? projects.length : projects.filter((p) => p.tags.includes(f.value as ProjectTag)).length
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f.value)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-[0.9375rem] transition-colors duration-300 ${
                    active ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:border-ink/50'
                  }`}
                >
                  {f.label}
                  <span className={`text-xs tabular-nums ${active ? 'text-paper/60' : 'text-muted'}`}>{count}</span>
                </button>
              )
            })}
          </div>
          <p aria-live="polite" className="text-sm text-muted">
            Rodoma: {label.toLowerCase()} ({list.length})
          </p>
        </div>

        {DEMO_PROJECTS && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            Pastaba: tai demonstraciniai projektų pavyzdžiai su iliustracinėmis nuotraukomis. Prieš paleidžiant svetainę jie
            bus pakeisti tikrais įmonės darbais.
          </p>
        )}

        {list.length > 0 ? (
          <ul key={filter} className="fade-in mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-y-16">
            {list.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 border border-dashed border-line px-6 py-16 text-center">
            <p className="font-display text-xl font-medium">Šioje kategorijoje projektų kol kas nėra</p>
            <button type="button" onClick={() => choose('visi')} className="mt-4 min-h-11 text-forest underline underline-offset-4">
              Rodyti visus projektus
            </button>
          </div>
        )}
      </section>

      <CtaBand title="Turite panašią idėją?" text="Atsiųskite kelias savo sklypo nuotraukas ar trumpą aprašymą – aptarsime, kas tiktų jūsų namams." />
    </>
  )
}
