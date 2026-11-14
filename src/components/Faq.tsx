import { Plus } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { faq } from '../data/faq'

/**
 * DUK akordeonas. Vienu metu atidarytas vienas atsakymas, aukštis animuojamas
 * per grid-template-rows (be JS matavimų). Prideda FAQPage struktūrinius duomenis.
 */
export function Faq({ items = faq, schema = false }: { items?: typeof faq; schema?: boolean }) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  useEffect(() => {
    if (!schema) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [items, schema])

  return (
    <ul className="border-t border-ink/15">
      {items.map((item, i) => {
        const isOpen = open === i
        const bid = `${uid}-b${i}`
        const pid = `${uid}-p${i}`
        return (
          <li key={item.q} data-reveal className="border-b border-ink/15">
            <h3>
              <button
                id={bid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-medium tracking-[-0.015em] transition-colors group-hover:text-forest sm:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out-soft ${
                    isOpen ? 'rotate-45 border-forest bg-forest text-paper' : 'border-ink/15 group-hover:border-ink/40'
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <div
              id={pid}
              role="region"
              aria-labelledby={bid}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-ink-2">{item.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
