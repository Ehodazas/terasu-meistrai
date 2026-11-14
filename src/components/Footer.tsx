import { Link } from 'react-router-dom'
import { navigation, QUOTE_LINK } from '../data/content'
import { services } from '../data/services'
import { site } from '../data/site'
import { Logo } from './Logo'
import { PlaceholderTag } from './PlaceholderTag'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-ink text-paper/75">
      <div className="wrap pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo inverted />
            <p className="mt-6 max-w-sm leading-relaxed">
              Medinių ir WPC terasų projektavimas, konstrukcijos ir įrengimas. Terasos, pritaikytos jūsų namams ir
              gyvenimo būdui.
            </p>
            <Link
              to={QUOTE_LINK}
              className="mt-8 inline-flex min-h-11 items-center border-b border-wood pb-1 font-display font-medium text-paper transition-colors hover:text-wood"
            >
              Gauti pasiūlymą
            </Link>
          </div>

          <nav aria-label="Puslapiai" className="lg:col-span-2 lg:col-start-5">
            <h2 className="eyebrow !text-paper/45">Puslapiai</h2>
            <ul className="mt-5 space-y-1">
              {navigation.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="inline-flex min-h-9 items-center transition-colors hover:text-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Paslaugos" className="lg:col-span-3">
            <h2 className="eyebrow !text-paper/45">Paslaugos</h2>
            <ul className="mt-5 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/paslaugos#${s.slug}`}
                    className="inline-flex min-h-9 items-center transition-colors hover:text-paper"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow !text-paper/45">Kontaktai</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.phoneHref} className="text-paper transition-colors hover:text-wood">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-paper transition-colors hover:text-wood">
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
              <li>
                {site.hours[0].days}, {site.hours[0].time}
              </li>
            </ul>
            <PlaceholderTag className="mt-4" dark />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Visos teisės saugomos.
          </p>
          <p className="md:text-center">Iliustracinės nuotraukos: Unsplash</p>
          <Link to="/privatumo-politika" className="transition-colors hover:text-paper">
            Privatumo politika
          </Link>
        </div>
      </div>
    </footer>
  )
}
