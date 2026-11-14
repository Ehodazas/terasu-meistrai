import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { base, variants, type Variant } from './buttonStyles'

interface Props {
  to: string
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
  state?: unknown
}

/** Fono „užliejimo“ spalva užvedus pelę – pagal mygtuko variantą. */
const sweep: Record<Variant, string> = {
  primary: 'before:bg-forest-dark',
  wood: 'before:bg-wood-dark',
  outline: 'before:bg-ink',
  'outline-light': 'before:bg-white',
  light: 'before:bg-white',
}

export function ButtonLink({ to, children, variant = 'primary', arrow = false, className = '', state }: Props) {
  return (
    <Link
      to={to}
      state={state}
      className={`${base} ${variants[variant].replace(/hover:bg-\S+/g, '')} relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-full before:transition-transform before:duration-500 before:ease-out-soft hover:before:scale-y-100 ${sweep[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="-mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-current/15 transition-transform duration-500 ease-out-soft group-hover/btn:translate-x-0.5 group-hover/btn:-rotate-45"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </span>
      )}
    </Link>
  )
}

/** Tekstinė nuoroda su rodykle. */
export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group/tl inline-flex items-center gap-2 font-medium text-ink ${className}`}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-wood transition-transform duration-300 group-hover/tl:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  )
}
