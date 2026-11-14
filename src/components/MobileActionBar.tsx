import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QUOTE_LINK } from '../data/content'
import { site } from '../data/site'

/**
 * Telefonuose apačioje rodoma veiksmų juosta: „Skambinti“ ir „Gauti pasiūlymą“.
 * Atsiranda nuslinkus žemiau pirmo ekrano; nerodoma kontaktų ir planuoklės puslapiuose.
 */
export function MobileActionBar() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const hidden = pathname === '/kontaktai' || pathname === '/terasos-planuokle'

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (hidden) return null

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-out-soft md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[140%] opacity-0'
      }`}
    >
      <div className="flex gap-2 rounded-full border border-ink/10 bg-paper/90 p-1.5 shadow-[0_14px_40px_-12px_rgba(37,41,35,0.35)] backdrop-blur-md">
        <a
          href={site.phoneHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium text-ink"
        >
          <Phone className="h-4 w-4 text-wood-dark" aria-hidden="true" />
          Skambinti
        </a>
        <Link
          to={QUOTE_LINK}
          className="flex min-h-12 flex-[1.4] items-center justify-center rounded-full bg-forest text-[0.9375rem] font-medium text-paper"
        >
          Gauti pasiūlymą
        </Link>
      </div>
    </div>
  )
}
