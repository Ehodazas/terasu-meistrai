import type { ReactNode } from 'react'

interface Props {
  index?: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  id?: string
  className?: string
}

/** Sekcijos antraštė: numeris + kategorija kairėje, pavadinimas ir tekstas dešinėje. */
export function SectionHead({ index, eyebrow, title, children, id, className = '' }: Props) {
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <p className="eyebrow flex items-center gap-3 self-start lg:col-span-3 lg:pt-3">
        {index && <span className="tabular-nums text-ink/40">{index}</span>}
        {index && <span className="h-px w-6 bg-wood/50" aria-hidden="true" />}
        {eyebrow}
      </p>
      <div className="lg:col-span-8">
        <h2 id={id} className="h-section max-w-[18ch]">
          {title}
        </h2>
        {children && <div className="lead mt-5 max-w-2xl">{children}</div>}
      </div>
    </div>
  )
}
