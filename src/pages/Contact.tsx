import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { seo } from '../data/seo'
import { site } from '../data/site'
import type { TerraceType } from '../lib/validation'

export default function Contact() {
  const [params] = useSearchParams()
  const t = params.get('tipas')
  const defaultType: TerraceType | undefined = t === 'medine' || t === 'wpc' ? t : undefined

  return (
    <>
      <Seo entry={seo.contact} />
      <PageHero
        eyebrow="Kontaktai"
        title="Aptarkime jūsų terasą"
        lead="Paskambinkite, parašykite arba užpildykite užklausos formą. Kuo daugiau papasakosite apie vietą ir idėją, tuo tiksliau galėsime patarti."
      />

      <section aria-label="Kontaktinė informacija ir užklausos forma" className="wrap pb-20 sm:pb-28 lg:pb-32">
        <div className="grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          <div className="space-y-12 lg:col-span-4">
            <div>
              <h2 className="eyebrow">Kontaktinė informacija</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted">Telefonas</p>
                    <a href={site.phoneHref} className="link-underline font-display text-xl font-medium">
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted">El. paštas</p>
                    <a href={`mailto:${site.email}`} className="link-underline break-all font-display text-xl font-medium">
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted">Biuras</p>
                    <p className="font-display text-lg font-medium">{site.address}</p>
                    <p className="mt-1 text-sm text-muted">Susitikimai – iš anksto suderinus laiką.</p>
                  </div>
                </li>
              </ul>
              <PlaceholderTag className="mt-6" />
            </div>

            <div>
              <h2 className="eyebrow flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Darbo laikas
              </h2>
              <dl className="mt-5 border-t border-line">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-ink-2">{h.days}</dt>
                    <dd className="text-right font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Statybos sezono metu dirbame objektuose, todėl ne visada galime atsiliepti iš karto – perskambinsime.
              </p>
            </div>
          </div>

          <div id="uzklausa" className="scroll-mt-28 outline-none lg:col-span-7 lg:col-start-6">
            <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.025em] sm:text-[2.2rem]">Užklausa pasiūlymui</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-2">
              Atsakysime ir suderinsime apžiūros laiką. Pasiūlymą parengsime įvertinę vietą ir jūsų pageidavimus.
            </p>
            <div className="mt-8 border border-line">
              <QuoteForm key={defaultType ?? 'none'} defaultType={defaultType} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="area-title" className="border-t border-line bg-paper-2/60 py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Darbo zona</p>
            <h2 id="area-title" className="h-section mt-5">
              Kur dirbame
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-8">
              {site.serviceArea.map((a) => (
                <li key={a} className="flex items-center gap-3 border-b border-line py-5 text-lg">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-wood" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl leading-relaxed text-ink-2">
              Dėl objektų kituose Lietuvos regionuose susisiekite – įvertinsime galimybes pagal projekto apimtį ir darbų
              grafiką.
            </p>
            {site.isPlaceholder && <p className="mt-4 text-sm text-muted">Darbo zona nurodyta kaip pavyzdys ir bus patikslinta.</p>}
          </div>
        </div>
      </section>
    </>
  )
}
