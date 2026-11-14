import { site } from '../data/site'

/** Žyma, rodoma tol, kol kontaktai yra pavyzdiniai (site.isPlaceholder). */
export function PlaceholderTag({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  if (!site.isPlaceholder) return null
  return (
    <p
      className={`inline-flex items-center gap-2 border px-2.5 py-1 text-xs ${
        dark ? 'border-white/15 text-paper/55' : 'border-line text-muted'
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-wood" aria-hidden="true" />
      Pavyzdiniai kontaktiniai duomenys – bus pakeisti
    </p>
  )
}
