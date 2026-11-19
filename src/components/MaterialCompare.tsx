import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { feelCriteria, materialFeel, materials, type FeelKey } from '../data/materials'
import { Img } from './Img'

type Priority = 'visi' | FeelKey

const priorities: { value: Priority; label: string }[] = [
  { value: 'visi', label: 'Rodyti visas' },
  { value: 'care', label: 'Kuo mažiau priežiūros' },
  { value: 'sun', label: 'Vėsus paviršius saulėje' },
  { value: 'barefoot', label: 'Malonu vaikščioti basomis' },
]

/** Kiek medžiaga atitinka prioritetą (didesnis – geriau). */
function score(slug: string, p: Priority) {
  if (p === 'visi') return 0
  const lvl = materialFeel[slug][p].level
  return p === 'barefoot' ? lvl : 4 - lvl
}

/**
 * Medžiagų palyginimas pagal priežiūrą, įkaitimą saulėje ir pojūtį basomis.
 * Pasirinkus, kas svarbiausia, tinkamiausios medžiagos pažymimos ir perkeliamos į priekį.
 */
export function MaterialCompare({ withImages = true }: { withImages?: boolean }) {
  const [priority, setPriority] = useState<Priority>('visi')
  const best = priority === 'visi' ? 0 : Math.max(...materials.map((m) => score(m.slug, priority)))
  const list = [...materials].sort((a, b) => score(b.slug, priority) - score(a.slug, priority))

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p id="priority-label" className="text-sm font-medium text-ink">
          Kas jums svarbiausia?
        </p>
        <div role="radiogroup" aria-labelledby="priority-label" className="flex flex-wrap gap-2">
          {priorities.map((p) => {
            const on = priority === p.value
            return (
              <button
                key={p.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPriority(p.value)}
                className={`min-h-11 rounded-full border px-4 text-[0.9375rem] transition-colors ${
                  on ? 'border-ink bg-ink text-paper' : 'border-ink/20 bg-white text-ink hover:border-ink'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((m) => {
          const feel = materialFeel[m.slug]
          const isBest = priority !== 'visi' && score(m.slug, priority) === best
          return (
            <li
              key={m.slug}
              className={`flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-white transition-shadow ${
                isBest ? 'border-forest shadow-[0_0_0_2px_var(--color-forest)]' : 'border-line'
              }`}
            >
              {withImages && (
                <div className="relative aspect-[16/9] bg-sand">
                  <Img name={m.homeImage} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  {isBest && (
                    <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-paper">Tinka geriausiai</span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-medium">{m.name}</h3>
                {!withImages && isBest && <p className="mt-1 text-xs font-semibold text-forest">Tinka geriausiai</p>}
                <dl className="mt-4 space-y-4">
                  {feelCriteria.map((c) => {
                    const f = feel[c.key]
                    const highlighted = priority === c.key
                    return (
                      <div key={c.key}>
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className={`text-sm ${highlighted ? 'font-semibold text-ink' : 'text-muted'}`}>{c.label}</dt>
                          <dd className="text-right text-sm font-medium">{c.scale[f.level - 1]}</dd>
                        </div>
                        <div className="mt-1.5 grid grid-cols-3 gap-1" aria-hidden="true">
                          {[1, 2, 3].map((i) => (
                            <span key={i} className={`h-1.5 rounded-full ${i <= (c.key === "barefoot" ? f.level : 4 - f.level) ? (highlighted ? 'bg-forest' : 'bg-ink/70') : 'bg-ink/10'}`} />
                          ))}
                        </div>
                        <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-2">{f.text}</p>
                      </div>
                    )
                  })}
                </dl>
                <Link to={`/terasu-tipai#${m.slug}`} className="group mt-5 inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-forest">
                  <span className="link-underline">Plačiau apie medžiagą</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-sm text-muted">Kuo daugiau užpildytų brūkšnelių – tuo geriau jums. Vertinimai santykiniai. Visiškai priežiūros nereikalaujančių terasų nėra – skiriasi tik priežiūros pobūdis.</p>
    </div>
  )
}
