import { useSyncExternalStore } from 'react'

/**
 * Naršyklės būsenos „kabliukai“, saugūs generuojant HTML serveryje:
 * serveryje grąžinama numatytoji reikšmė, naršyklėje – tikroji (be hydration klaidų).
 */

const subscribeScroll = (cb: () => void) => {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}

/** Ar puslapis nuslinktas žemiau nurodyto atstumo (px). */
export function useScrolledPast(px: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > px,
    () => false,
  )
}

/** Ar atitinka CSS media užklausą (pvz., „prefers-reduced-motion: reduce“). */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}
