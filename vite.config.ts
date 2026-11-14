import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { site } from './src/data/site.ts'
import { allSeoRoutes } from './src/data/seo.ts'

/**
 * Po build:
 *  - kiekvienam maršrutui sukuria atskirą index.html su unikaliu <title>, aprašymu,
 *    canonical ir Open Graph žymomis (paieškos sistemos jas mato be JavaScript);
 *  - sugeneruoja sitemap.xml ir robots.txt;
 *  - sukuria 404.html (GitHub Pages SPA atsarginis variantas).
 */
function staticSeo(siteUrl: string, base: string): Plugin {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return {
    name: 'terasu-static-seo',
    apply: 'build',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
      const origin = siteUrl.replace(/\/$/, '')
      const ogImage = `${origin}/images/og-image.jpg`

      const render = (path: string, title: string, description: string, noindex = false) => {
        const url = `${origin}${path === '/' ? '/' : path}`
        const head = [
          `<title>${esc(title)}</title>`,
          `<meta name="description" content="${esc(description)}" />`,
          noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:locale" content="lt_LT" />`,
          `<meta property="og:site_name" content="${esc(site.name)}" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${ogImage}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
        ].join('\n    ')
        return template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${head}\n    <!--/seo-->`)
      }

      for (const r of allSeoRoutes) {
        const html = render(r.path, r.title, r.description)
        if (r.path === '/') {
          writeFileSync(resolve(dist, 'index.html'), html)
        } else {
          const dir = resolve(dist, '.' + r.path)
          mkdirSync(dir, { recursive: true })
          writeFileSync(resolve(dir, 'index.html'), html)
        }
      }

      writeFileSync(
        resolve(dist, '404.html'),
        render('/404', `Puslapis nerastas | ${site.name}`, 'Ieškomas puslapis nerastas.', true),
      )

      const today = new Date().toISOString().slice(0, 10)
      const urls = allSeoRoutes
        .map((r) => `  <url><loc>${origin}${r.path}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n')
      writeFileSync(
        resolve(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: ${base}\n\nSitemap: ${origin}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // GitHub Pages projektui: BASE_PATH=/repozitorijos-pavadinimas/
  const base = env.BASE_PATH || '/'
  const siteUrl = env.VITE_SITE_URL || site.url
  return {
    base,
    plugins: [react(), tailwindcss(), staticSeo(siteUrl, base)],
  }
})
