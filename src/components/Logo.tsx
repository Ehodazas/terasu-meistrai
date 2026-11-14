export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <rect x="2" y="6" width="24" height="3.4" fill="currentColor" />
      <rect x="2" y="12.3" width="24" height="3.4" fill="var(--color-wood)" />
      <rect x="2" y="18.6" width="24" height="3.4" fill="currentColor" />
    </svg>
  )
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${inverted ? 'text-paper' : 'text-ink'}`}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="whitespace-nowrap font-display text-[0.95rem] font-bold uppercase leading-none tracking-[0.14em]">
        Terasų meistrai
      </span>
    </span>
  )
}
