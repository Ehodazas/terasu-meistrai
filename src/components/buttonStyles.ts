/** Mygtukų stiliai – bendri komponentams ir paprastoms nuorodoms. */
export type Variant = 'primary' | 'wood' | 'outline' | 'outline-light' | 'light'

export const variants: Record<Variant, string> = {
  primary: 'bg-forest text-paper hover:bg-forest-dark',
  wood: 'bg-wood text-white hover:bg-wood-dark',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'outline-light': 'border border-white/50 text-white hover:bg-white hover:text-ink',
  light: 'bg-paper text-ink hover:bg-white',
}

export const base =
  'group/btn inline-flex min-h-12 whitespace-nowrap items-center justify-center gap-2.5 rounded-[2px] px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-colors duration-300 focus-visible:outline-offset-4'


export const buttonClass = (variant: Variant = 'primary') => `${base} ${variants[variant]}`
