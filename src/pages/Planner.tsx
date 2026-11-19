import { ArrowLeft, ArrowRight, Check, Lightbulb } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Img } from '../components/Img'
import { Seo } from '../components/Seo'
import type { ImageKey } from '../data/images'
import { seo } from '../data/seo'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'
import type { TerraceType } from '../lib/validation'

type Work = 'nauja' | 'atnaujinimas' | 'konstrukcija'
type Height = 'zeme' | 'iki50' | 'virs50'

interface Answers {
  work: Work | null
  material: TerraceType | null
  area: number
  height: Height | null
  extras: string[]
  timing: string | null
}

const works: { value: Work; label: string; hint: string; image: ImageKey }[] = [
  { value: 'nauja', label: 'Nauja terasa', hint: 'Statyba nuo pagrindo', image: 'hero-modern-house' },
  { value: 'atnaujinimas', label: 'Esamos atnaujinimas', hint: 'Remontas, danga, apdaila', image: 'dark-timber-deck' },
  { value: 'konstrukcija', label: 'Tik konstrukcija', hint: 'Lentas klosite patys', image: 'workers-building' },
]
const materialsOpts: { value: TerraceType; label: string; hint: string; image: ImageKey }[] = [
  { value: 'medine', label: 'Medinė', hint: 'Pušis, maumedis, termomediena', image: 'plank-larch' },
  { value: 'wpc', label: 'WPC kompozitas', hint: 'Mažiau priežiūros', image: 'wpc-grey-boards' },
  { value: 'neapsisprendziau', label: 'Dar neapsisprendžiau', hint: 'Patarsime pagal situaciją', image: 'wpc-board-types' },
]
const heights: { value: Height; label: string }[] = [
  { value: 'zeme', label: 'Prie pat žemės' },
  { value: 'iki50', label: 'Iki ~50 cm' },
  { value: 'virs50', label: 'Aukščiau nei 50 cm' },
]
const extrasOpts = ['Laiptai ar pakopos', 'Turėklai', 'Pergolė ar stogelis', 'Apšvietimas', 'Senos dangos demontavimas', 'Vieta lauko virtuvei']
const timings = ['Kuo greičiau', 'Per 1–3 mėnesius', 'Šį sezoną', 'Kol kas tik planuoju']
const areaPresets = [12, 25, 40, 60, 100]

const workLabel = (w: Work | null) => works.find((x) => x.value === w)?.label ?? '—'
const materialLabel = (m: TerraceType | null) => materialsOpts.find((x) => x.value === m)?.label ?? '—'
const heightLabel = (h: Height | null) => heights.find((x) => x.value === h)?.label ?? '—'

const STEPS = ['Darbai', 'Medžiaga', 'Dydis', 'Papildomai', 'Laikas']

export default function Planner() {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [a, setA] = useState<Answers>({ work: null, material: null, area: 30, height: null, extras: [], timing: null })
  const done = step >= STEPS.length

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-step] > *', { x: 16 * dir, autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
      })
    },
    { scope: ref, dependencies: [step], revertOnUpdate: true },
  )

  const canNext = [!!a.work, !!a.material, !!a.height, true, !!a.timing][step] ?? true
  const go = (d: number) => {
    setDir(d)
    setStep((s) => Math.max(0, Math.min(STEPS.length, s + d)))
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const tips: string[] = []
  if (a.work === 'atnaujinimas') tips.push('Prie užklausos galėsite pridėti esamos terasos aprašymą – kelios nuotraukos padės greičiau įvertinti būklę.')
  if (a.material === 'wpc') tips.push('Tamsios WPC spalvos saulėje įkaista labiau – atviroje pietinėje pusėje verta svarstyti šviesesnį atspalvį.')
  if (a.material === 'medine') tips.push('Medinei terasai reikės periodinės priežiūros: valymo ir, norint išlaikyti spalvą, aliejavimo kas 1–2 metus.')
  if (a.height === 'virs50' && !a.extras.includes('Turėklai')) tips.push('Pakeltai terasai saugumo sumetimais verta numatyti turėklus.')
  if (a.area >= 80) tips.push('Didelio ploto terasai ypač svarbus pagrindo lygumas ir vandens nutekėjimas.')

  const finish = () => {
    const message = [
      'Užklausa iš terasos planuoklės:',
      `– Darbai: ${workLabel(a.work)}`,
      `– Medžiaga: ${materialLabel(a.material)}`,
      `– Apytikslis plotas: ~${a.area} m²`,
      `– Aukštis virš žemės: ${heightLabel(a.height)}`,
      `– Papildomai: ${a.extras.length ? a.extras.join(', ') : 'nepasirinkta'}`,
      `– Pageidaujama pradžia: ${a.timing ?? '—'}`,
    ].join('\n')
    navigate('/kontaktai#uzklausa', { state: { planner: { type: a.material ?? undefined, area: String(a.area), message } } })
  }

  return (
    <section className="pt-[var(--header-h)]">
      <Seo entry={seo.planner} />
      <div className="wrap pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Terasos planuoklė</p>
            <h1 className="h-display mt-5 text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem]">Užklausa per dvi minutes</h1>
            <p className="lead mt-5">
              Atsakykite į penkis klausimus apie planuojamą terasą. Pabaigoje užklausos forma bus užpildyta – liks įrašyti
              kontaktus.
            </p>
            <p className="mt-4 text-sm text-muted">Planuoklė neskaičiuoja kainos – ją pateiksime įvertinę vietą.</p>

            {/* Žingsniai */}
            <ol className="mt-10 hidden space-y-1 lg:block">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors ${i === step ? 'bg-paper-2 font-medium' : 'text-muted'}`}>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums ${
                      i < step || done ? 'bg-forest text-paper' : i === step ? 'bg-ink text-paper' : 'border border-line'
                    }`}
                  >
                    {i < step || done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div ref={ref} className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{done ? 'Santrauka' : `${step + 1} žingsnis iš ${STEPS.length}`}</span>
                  <span className="text-muted">{done ? '' : STEPS[step]}</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-2" role="progressbar" aria-valuemin={0} aria-valuemax={STEPS.length} aria-valuenow={Math.min(step, STEPS.length)} aria-label="Planuoklės eiga">
                  <div className="h-full origin-left rounded-full bg-forest transition-transform duration-700 ease-out-soft" style={{ transform: `scaleX(${Math.min(step, STEPS.length) / STEPS.length || 0.04})` }} />
                </div>
              </div>

              <div data-step key={step} aria-live="polite">
                {step === 0 && (
                  <Question title="Ką planuojate?">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {works.map((o) => (
                        <ImageOption key={o.value} {...o} selected={a.work === o.value} onSelect={() => setA((p) => ({ ...p, work: o.value }))} />
                      ))}
                    </div>
                  </Question>
                )}
                {step === 1 && (
                  <Question title="Kokia medžiaga domina?">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {materialsOpts.map((o) => (
                        <ImageOption key={o.value} {...o} selected={a.material === o.value} onSelect={() => setA((p) => ({ ...p, material: o.value }))} />
                      ))}
                    </div>
                  </Question>
                )}
                {step === 2 && (
                  <Question title="Koks apytikslis dydis ir aukštis?">
                    <label htmlFor="area" className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">Plotas</span>
                      <span className="font-display text-3xl font-medium tabular-nums">
                        ~{a.area} <span className="text-lg text-muted">m²</span>
                      </span>
                    </label>
                    <input
                      id="area"
                      type="range"
                      min={5}
                      max={200}
                      step={1}
                      value={a.area}
                      onChange={(e) => setA((p) => ({ ...p, area: Number(e.target.value) }))}
                      className="mt-4 w-full accent-forest"
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {areaPresets.map((n) => (
                        <Chip key={n} selected={a.area === n} onClick={() => setA((p) => ({ ...p, area: n }))}>
                          {n} m²
                        </Chip>
                      ))}
                    </div>
                    <fieldset className="mt-9">
                      <legend className="text-sm font-medium">Aukštis virš žemės</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {heights.map((h) => (
                          <Chip key={h.value} block selected={a.height === h.value} onClick={() => setA((p) => ({ ...p, height: h.value }))} role="radio">
                            {h.label}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>
                  </Question>
                )}
                {step === 3 && (
                  <Question title="Ko dar reikės?" hint="Galite pasirinkti kelis arba praleisti.">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {extrasOpts.map((x) => {
                        const on = a.extras.includes(x)
                        return (
                          <Chip key={x} block selected={on} onClick={() => setA((p) => ({ ...p, extras: on ? p.extras.filter((e) => e !== x) : [...p.extras, x] }))} role="checkbox">
                            {x}
                          </Chip>
                        )
                      })}
                    </div>
                  </Question>
                )}
                {step === 4 && (
                  <Question title="Kada norėtumėte pradėti?">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {timings.map((t) => (
                        <Chip key={t} block selected={a.timing === t} onClick={() => setA((p) => ({ ...p, timing: t }))} role="radio">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </Question>
                )}
                {done && (
                  <div>
                    <h2 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">Jūsų terasa</h2>
                    <dl className="mt-6 grid gap-x-6 sm:grid-cols-2">
                      {[
                        ['Darbai', workLabel(a.work)],
                        ['Medžiaga', materialLabel(a.material)],
                        ['Plotas', `~${a.area} m²`],
                        ['Aukštis', heightLabel(a.height)],
                        ['Papildomai', a.extras.length ? a.extras.join(', ') : 'Nepasirinkta'],
                        ['Pradžia', a.timing ?? '—'],
                      ].map(([k, v]) => (
                        <div key={k} className="border-b border-line py-3.5">
                          <dt className="text-sm text-muted">{k}</dt>
                          <dd className="mt-0.5 font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {tips.length > 0 && (
                      <div className="mt-8 rounded-2xl bg-paper-2 p-5">
                        <p className="flex items-center gap-2 font-medium">
                          <Lightbulb className="h-4 w-4 text-wood-dark" aria-hidden="true" />
                          Į ką atkreipti dėmesį
                        </p>
                        <ul className="mt-3 space-y-2 text-ink-2">
                          {tips.map((t) => (
                            <li key={t} className="flex gap-3 leading-relaxed">
                              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-wood" aria-hidden="true" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={step === 0}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-medium text-ink transition-colors hover:bg-paper-2 disabled:invisible"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Atgal
                </button>
                {done ? (
                  <button
                    type="button"
                    onClick={finish}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 font-medium text-paper transition-colors hover:bg-forest-dark"
                  >
                    Tęsti užklausą
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={!canNext}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {step === 3 && a.extras.length === 0 ? 'Praleisti' : 'Toliau'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              {!canNext && !done && <p className="mt-3 text-right text-sm text-muted">Pasirinkite atsakymą, kad galėtumėte tęsti.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Question({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-muted">{hint}</p>}
      <div className="mt-7">{children}</div>
    </>
  )
}

function ImageOption({ label, hint, image, selected, onSelect }: { label: string; hint: string; image: ImageKey; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
        selected ? 'border-forest ring-2 ring-forest/25' : 'border-line hover:border-ink/40'
      }`}
    >
      <span className="img-zoom relative block aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4]">
        <Img name={image} sizes="(min-width: 640px) 220px, 100vw" alt="" />
        <span
          className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full transition-all ${
            selected ? 'scale-100 bg-forest text-paper' : 'scale-90 bg-paper/80 text-transparent'
          }`}
        >
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
      <span className="block p-4">
        <span className="block font-medium">{label}</span>
        <span className="mt-0.5 block text-sm text-muted">{hint}</span>
      </span>
    </button>
  )
}

function Chip({
  selected,
  onClick,
  children,
  block = false,
  role,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  block?: boolean
  role?: 'radio' | 'checkbox'
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role ? selected : undefined}
      aria-pressed={role ? undefined : selected}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-3 rounded-full border px-5 text-left text-[0.9375rem] transition-colors duration-300 ${block ? 'w-full' : ''} ${
        selected ? 'border-forest bg-forest text-paper' : 'border-line hover:border-ink/40'
      }`}
    >
      {block && (
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-paper bg-paper text-forest' : 'border-ink/25'}`}>
          {selected && <Check className="h-3 w-3" aria-hidden="true" />}
        </span>
      )}
      {children}
    </button>
  )
}
