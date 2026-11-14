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
}

export function ButtonLink({ to, children, variant = 'primary', arrow = false, className = '' }: Props) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </Link>
  )
}


/** Tekstinė nuoroda su rodykle. */
export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`group/tl inline-flex items-center gap-2 font-medium text-ink ${className}`}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-wood transition-transform duration-300 group-hover/tl:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  )
}
