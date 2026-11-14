import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { images, type ImageKey } from '../data/images'
import { gsap, useGSAP } from '../lib/motion'

interface Props {
  items: ImageKey[]
  index: number | null
  onChange: (i: number | null) => void
}

const base = import.meta.env.BASE_URL

/** Nuotraukų peržiūra per visą ekraną: rodyklės, Escape, braukimas, fokusas lieka viduje. */
export function Lightbox({ items, index, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const touchX = useRef<number | null>(null)
  const open = index !== null
  const count = items.length

  const go = useCallback(
    (d: number) => {
      if (index === null) return
      onChange((index + d + count) % count)
    },
    [index, count, onChange],
  )

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement as HTMLElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      returnFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab' && ref.current) {
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>('button'))
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go, onChange])

  useGSAP(
    () => {
      if (!open) return
      gsap.fromTo('[data-lb-img]', { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
    },
    { scope: ref, dependencies: [index], revertOnUpdate: true },
  )

  if (!open) return null
  const name = items[index]
  const img = images[name]

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Nuotraukų peržiūra"
      className="fade-in fixed inset-0 z-[70] flex flex-col bg-ink/95 text-paper backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-sm tabular-nums text-paper/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onChange(null)}
          aria-label="Uždaryti peržiūrą"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
        <img
          data-lb-img
          key={name}
          src={`${base}images/${name}-1600.webp`}
          width={img.w}
          height={img.h}
          alt={img.alt}
          className="max-h-full max-w-full rounded-[var(--radius-img)] object-contain"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Ankstesnė nuotrauka"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Kita nuotrauka"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <p className="px-6 pb-5 text-center text-sm text-paper/60">{img.alt}</p>
    </div>,
    document.body,
  )
}
