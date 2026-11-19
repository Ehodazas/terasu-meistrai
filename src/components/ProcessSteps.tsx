import { processSteps } from '../data/content'

/** Darbų eiga: statinė linija su žingsniais (be slinkimo animacijų). */
export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  const muted = dark ? 'text-paper/65' : 'text-ink-2'
  const lineBase = dark ? 'bg-white/15' : 'bg-line'

  return (
    <ol className="relative grid gap-10 pl-8 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-12">
      {/* Linija: vertikali mobiliuose, horizontali kompiuteryje */}
      <span aria-hidden="true" className={`absolute bottom-2 left-[5px] top-2 w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto ${lineBase}`}>
        
      </span>
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            data-dot
            aria-hidden="true"
            className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full bg-wood ring-4 lg:-top-12 lg:left-0 ${dark ? 'ring-forest' : 'ring-paper'}`}
          />
          <p className={`font-display text-sm font-semibold tabular-nums ${dark ? 'text-wood' : 'text-wood-dark'}`}>
            {String(i + 1).padStart(2, '0')}
          </p>
          <h3 className={`mt-2 text-xl font-medium tracking-[-0.015em] ${dark ? '!text-paper' : ''}`}>{step.title}</h3>
          <p className={`mt-3 leading-relaxed ${muted}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
