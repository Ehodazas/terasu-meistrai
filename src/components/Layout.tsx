import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/motion'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileActionBar } from './MobileActionBar'
import { PageReveal } from './PageReveal'

/** Puslapio keitimas: slenka į viršų arba į #žymą; atnaujina ScrollTrigger padėtis. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    const samePage = prevPath.current === pathname
    prevPath.current = pathname
    if (hash) {
      // Puslapis gali būti įkeliamas dalimis (lazy), todėl žymos ieškome kelis kartus
      let tries = 0
      let t = 0
      const seek = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!el) {
          if (tries++ < 40) t = window.setTimeout(seek, 50)
          return
        }
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: samePage && !reduce ? 'smooth' : 'auto', block: 'start' })
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
      t = window.setTimeout(seek, 30)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => window.clearTimeout(t)
  }, [pathname])

  return null
}

function PageLoading() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center pt-[84px]" role="status">
      <span className="sr-only">Įkeliama…</span>
      <span aria-hidden="true" className="h-px w-16 animate-pulse bg-wood" />
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <a
        href="#turinys"
        className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform focus:translate-y-0"
      >
        Pereiti prie turinio
      </a>
      <ScrollManager />
      <Header />
      <main id="turinys" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoading />}>
          <div ref={pageRef} key={pathname} className="page-in">
            <Outlet />
          </div>
          <PageReveal scope={pageRef} pageKey={pathname} />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
