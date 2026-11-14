import { useEffect } from 'react'
import { site } from '../data/site'
import type { SeoEntry } from '../data/seo'

const siteUrl = (import.meta.env.VITE_SITE_URL || site.url).replace(/\/$/, '')

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Atnaujina <head> naršant tarp puslapių. Statinės kiekvieno maršruto
 * žymos generuojamos build metu (žr. vite.config.ts), todėl paieškos
 * sistemos jas mato ir be JavaScript.
 */
export function Seo({ entry, noindex = false }: { entry: SeoEntry; noindex?: boolean }) {
  useEffect(() => {
    const url = `${siteUrl}${entry.path}`
    document.title = entry.title
    setMeta('name', 'description', entry.description)
    setMeta('property', 'og:title', entry.title)
    setMeta('property', 'og:description', entry.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:locale', 'lt_LT')
    setMeta('property', 'og:image', `${siteUrl}/images/og-image.jpg`)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (noindex) {
      canonical?.remove()
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex'
    } else {
      robots?.remove()
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
    }
  }, [entry, noindex])

  return null
}
