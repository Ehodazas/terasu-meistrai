import { ArrowRight, Clock, Mail, Phone } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, PLANNER_LINK, QUOTE_LINK } from '../data/content'
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

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false)
      if (returnFocus) toggleRef.current?.focus()
    },
    [setOpen],
  )

  // Mobilus meniu: užrakinamas slinkimas, Escape uždaro, fokusas lieka meniu viduje
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    headerRef.current?.querySelector<HTMLElement>('#mobile-menu a')?.focus()

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
  // Nuslinkus antraštė tampa kompaktiška „plaukiojančia“ juosta
  const compact = scrolled && !open

  const barStyle = compact
    ? 'max-w-[1320px] rounded-full border border-ink/[0.07] bg-paper/85 text-ink shadow-[0_12px_40px_-14px_rgba(37,41,35,0.28)] backdrop-blur-md'
    : transparent
      ? 'border-b border-white/15 bg-transparent text-white'
      : 'border-b border-line bg-paper text-ink'

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* Viršutinė informacinė juosta (nuo planšetės) */}
      <div
        inert={compact}
        className={`relative z-10 hidden overflow-hidden transition-[height,opacity] duration-500 ease-out-soft lg:block ${
          compact ? 'h-0 opacity-0' : 'h-10 opacity-100'
        } ${transparent ? 'border-b border-white/10 text-white/80' : 'bg-ink text-paper/70'}`}
      >
        <div className="wrap flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
          <ul className="flex items-center gap-6">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-wood">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-wood">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="hidden items-center gap-2 xl:inline-flex">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {site.hours[0].days} {site.hours[0].time}
            </li>
          </ul>
          <Link to={PLANNER_LINK} className="group inline-flex items-center gap-2 font-medium transition-colors hover:text-wood">
            Terasos planuoklė – užklausa per 2 minutes
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={`relative z-10 transition-[padding] duration-500 ease-out-soft ${compact ? 'px-3 pt-3 sm:px-5' : ''}`}>
        <div className={`mx-auto transition-[background-color,border-color,color,box-shadow] duration-500 ease-out-soft ${barStyle}`}>
          <div
            className={`flex items-center justify-between gap-6 ${
              compact ? 'h-[60px] pl-5 pr-2 sm:pl-6' : 'wrap h-[72px] lg:h-[84px]'
            }`}
          >
            <Link to="/" aria-label={`${site.name} – pagrindinis puslapis`} className="relative -m-2 p-2">
              <Logo inverted={transparent} />
            </Link>

            <nav aria-label="Pagrindinė navigacija" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {navigation.slice(1).map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 text-[0.9375rem] transition-colors duration-300 ${
                          isActive
                            ? transparent
                              ? 'bg-white/15 font-medium text-white'
                              : 'bg-ink/[0.07] font-medium text-ink'
                            : transparent
                              ? 'text-white/85 hover:bg-white/10 hover:text-white'
                              : 'text-ink/75 hover:bg-ink/[0.05] hover:text-ink'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden sm:block">
                <Link to={QUOTE_LINK} className={`${buttonClass(transparent ? 'wood' : 'primary')} !min-h-11 !px-5`}>
                  Gauti pasiūlymą
                </Link>
              </span>
              <button
                ref={toggleRef}
                type="button"
                className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden ${
                  transparent ? 'hover:bg-white/10' : 'hover:bg-ink/[0.06]'
                }`}
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
        </div>
      </div>

      {/* Mobilus meniu – brolinis elementas, kad juostos backdrop-filter jo nepaveiktų */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
        inert={!open}
        className={`fixed inset-0 overflow-y-auto bg-paper pt-[72px] text-ink transition-[opacity,visibility] duration-400 lg:pt-[124px] xl:hidden ${
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
                    `flex min-h-[58px] items-center justify-between font-display text-[1.55rem] font-medium tracking-[-0.02em] ${
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
          <div className="mt-auto space-y-3 pt-10">
            <Link to={QUOTE_LINK} className={`${buttonClass('primary')} w-full`}>
              Gauti pasiūlymą
            </Link>
            <Link to={PLANNER_LINK} className={`${buttonClass('outline')} w-full`}>
              Terasos planuoklė
            </Link>
            <p className="pt-3 text-sm text-muted">
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
