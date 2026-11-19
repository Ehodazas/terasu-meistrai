/**
 * Logotipo ženklas: terasos lentos iš viršaus suapvalintame kvadrate.
 * (Ankstesnės trys horizontalios linijos buvo panašios į meniu mygtuką.)
 */
export function LogoMark({ className = '', inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill={inverted ? '#F7F5F0' : '#34483B'} />
      <g fill={inverted ? '#34483B' : '#F7F5F0'}>
        <rect x="7.5" y="7" width="3.6" height="18" rx="1" />
        <rect x="14.2" y="10" width="3.6" height="15" rx="1" fill="#A67C52" />
        <rect x="20.9" y="7" width="3.6" height="18" rx="1" />
      </g>
    </svg>
  )
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${inverted ? 'text-paper' : 'text-ink'}`}>
      <LogoMark className="h-8 w-8 shrink-0" inverted={inverted} />
      <span className="whitespace-nowrap font-display text-[0.95rem] font-bold uppercase leading-none tracking-[0.14em]">
        Terasų meistrai
      </span>
    </span>
  )
}
