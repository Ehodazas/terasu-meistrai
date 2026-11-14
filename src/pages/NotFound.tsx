import { ButtonLink } from '../components/Button'
import { Seo } from '../components/Seo'
import { navigation } from '../data/content'
import { Link } from 'react-router-dom'

const entry = {
  path: '/404',
  title: 'Puslapis nerastas | Terasų meistrai',
  description: 'Ieškomas puslapis nerastas.',
}

export default function NotFound() {
  return (
    <section className="pt-[var(--header-h)]">
      <Seo entry={entry} noindex />
      <div className="wrap grid min-h-[70svh] gap-12 py-20 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <p className="eyebrow">Klaida 404</p>
          <h1 className="h-display mt-5 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]">Šio puslapio nėra</h1>
          <p className="lead mt-6 max-w-lg">
            Galbūt nuoroda pasenusi arba adresas įvestas su klaida. Grįžkite į pagrindinį puslapį arba pasirinkite skiltį.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" arrow>
              Į pagrindinį puslapį
            </ButtonLink>
            <ButtonLink to="/kontaktai" variant="outline">
              Susisiekti
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Svetainės skiltys" className="lg:col-span-4 lg:col-start-9">
          <ul className="border-t border-ink">
            {navigation.slice(1).map((n) => (
              <li key={n.to} className="border-b border-line">
                <Link to={n.to} className="flex min-h-14 items-center font-display text-lg font-medium transition-colors hover:text-forest">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
