import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, QUOTE_LINK } from '../data/content'
import { site } from '../data/site'
import { buttonClass } from './buttonStyles'
import { Logo } from './Logo'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  // Meniu laikomas atidarytu tik tame puslapyje, kuriame buvo atidarytas – pakeitus puslapį jis užsidaro
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const setOpen = useCallback((v: boolean) => setOpenPath(v ? pathname : null), [pathname])
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [setOpen])

  // Mobilus meniu: užrakinamas slinkimas, Escape uždaro, fokusas lieka meniu viduje
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const panelLinks = headerRef.current?.querySelectorAll<HTMLElement>('#mobile-menu a')
    panelLinks?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab' || !headerRef.current) return
      const focusables = [
        toggleRef.current,
        ...Array.from(headerRef.current.querySelectorAll<HTMLElement>('#mobile-menu a')),
      ].filter(Boolean) as HTMLElement[]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1280 && close(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  const transparent = isHome && !scrolled && !open

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ${
        transparent
          ? 'border-b border-white/15 bg-transparent text-white'
          : 'border-b border-line bg-paper/[0.97] text-ink'
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
        <Link to="/" aria-label={`${site.name} – pagrindinis puslapis`} className="relative z-10 -m-2 p-2">
          <Logo inverted={transparent} />
        </Link>

        <nav aria-label="Pagrindinė navigacija" className="hidden xl:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navigation.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[0.9375rem] transition-opacity duration-300 after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 ${
                      isActive ? 'font-medium after:scale-x-100' : 'opacity-80 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Link to={QUOTE_LINK} className={`${buttonClass(transparent ? 'wood' : 'primary')} !min-h-11`}>
              Gauti pasiūlymą
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Uždaryti meniu' : 'Atidaryti meniu'}
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-300 ${
                  open ? 'bottom-1/2 w-6 translate-y-1/2 -rotate-45' : 'w-4'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobilus meniu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto lg:top-[84px] bg-paper text-ink transition-[opacity,visibility] duration-400 xl:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobili navigacija" className="wrap flex min-h-full flex-col pb-8 pt-4">
          <ul className="border-t border-line">
            {navigation.map((item, i) => (
              <li
                key={item.to}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-out-soft ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[60px] items-center justify-between font-display text-[1.6rem] font-medium tracking-[-0.02em] ${
                      isActive ? 'text-forest' : 'text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-wood" aria-hidden="true" />}
                      {isActive && <span className="sr-only">(dabartinis puslapis)</span>}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link to={QUOTE_LINK} className={`${buttonClass('primary')} w-full`}>
              Gauti pasiūlymą
            </Link>
            <p className="mt-6 text-sm text-muted">
              <a href={site.phoneHref} className="text-ink">
                {site.phone}
              </a>
              <span className="mx-2">·</span>
              <a href={`mailto:${site.email}`} className="text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  )
}
