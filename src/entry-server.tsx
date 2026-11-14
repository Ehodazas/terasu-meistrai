import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { allSeoRoutes } from './data/seo'
import { basename } from './lib/basename'
import { AppRoutes } from './routes'

/** Visi maršrutai, kuriuos reikia sugeneruoti (tie patys, kaip sitemap.xml). */
export const routes = allSeoRoutes.map((r) => r.path)

async function toHtml(location: string) {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter basename={basename} location={location}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
    // Statiniam HTML visas turinys turi būti vietoje, o ne „išskaidytas“ srautui
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  )
  return new Response(prelude).text()
}

/**
 * Build metu naudojamas įėjimo taškas: atvaizduoja vieną maršrutą į HTML.
 * Pirmas atvaizdavimas įkelia „lazy“ puslapio modulį; antras grąžina HTML,
 * kuriame turinys įrašytas tiesiogiai (be „Įkeliama…“ ir be pakeitimo skriptų).
 */
export async function render(path: string): Promise<string> {
  const location = (basename === '/' ? '' : basename) + path
  await toHtml(location)
  const html = await toHtml(location)
  if (html.includes('<template id="B:')) throw new Error(`Maršrutas ${path} vis dar laukia įkėlimo`)
  return html
}
