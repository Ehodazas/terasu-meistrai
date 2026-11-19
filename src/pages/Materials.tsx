import { Minus, Plus } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Img } from '../components/Img'
import { MaterialCompare } from '../components/MaterialCompare'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { comparisonRows, materials } from '../data/materials'
import { seo } from '../data/seo'

const questions = [
  {
    q: 'Kiek laiko norite skirti priežiūrai?',
    a: 'Jei kasmetinis aliejavimas atrodo per daug, verta svarstyti WPC arba leisti medienai natūraliai papilkėti. Valyti reikės bet kurią terasą.',
  },
  {
    q: 'Kur bus terasa?',
    a: 'Atvira pietinė pusė, šešėlis po medžiais ar vieta prie baseino – kiekviena sąlyga medžiagas veikia skirtingai: įkaitimas, samanos, drėgmė.',
  },
  {
    q: 'Kokia išvaizda jums svarbiausia?',
    a: 'Natūrali, laikui bėgant kintanti mediena ir vienoda, ilgai nekintanti kompozito spalva – du skirtingi požiūriai. Abu gali būti teisingi.',
  },
]

export default function Materials() {
  return (
    <>
      <Seo entry={seo.materials} />
      <PageHero
        eyebrow="Terasų tipai"
        title="Medžiaga, tinkanti jūsų terasai"
        lead="Impregnuota mediena, maumedis, termomediena ar WPC kompozitas – palyginkite jų išvaizdą, priežiūrą ir ribojimus. Visiškai priežiūros nereikalaujančios terasos nėra: skiriasi tik priežiūros pobūdis."
        image="frost-planks"
        imageClass="aspect-[16/10] sm:aspect-[16/6]"
      />

      <section aria-labelledby="quick-compare" className="wrap pt-14 sm:pt-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Greitas palyginimas</p>
          <h2 id="quick-compare" className="h-section mt-4">
            Priežiūra, saulė ir pojūtis basomis
          </h2>
        </div>
        <div className="mt-10">
          <MaterialCompare withImages={false} />
        </div>
      </section>

      <section aria-label="Medžiagos" className="wrap pt-16 sm:pt-24 lg:pt-32">
        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {materials.map((m, i) => (
            <article key={m.slug} id={m.slug} aria-labelledby={`${m.slug}-title`} className="grid gap-8 outline-none lg:grid-cols-12 lg:gap-8">
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <div data-reveal="img" className="aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand lg:aspect-[4/5]">
                  <Img name={m.image} sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'} lg:pt-4`}>
                <p className="font-display text-sm font-semibold tabular-nums text-wood-dark">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`${m.slug}-title`} data-split className="mt-3 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
                  {m.name}
                </h2>
                <p className="mt-2 text-lg text-ink-2">{m.lead}</p>
                <p className="mt-6 leading-[1.75] text-ink-2">{m.description}</p>

                <div className="mt-9 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="eyebrow !text-forest">Privalumai</h3>
                    <ul className="mt-4 space-y-3">
                      {m.pros.map((p) => (
                        <li key={p} className="flex gap-3 leading-snug">
                          <Plus className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2} aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow">Į ką atkreipti dėmesį</h3>
                    <ul className="mt-4 space-y-3">
                      {m.cons.map((c) => (
                        <li key={c} className="flex gap-3 leading-snug text-ink-2">
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-wood-dark" strokeWidth={2} aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-9 border-l-2 border-wood bg-paper-2 px-5 py-4">
                  <p className="text-sm font-semibold">Priežiūra</p>
                  <p className="mt-1 leading-relaxed text-ink-2">{m.care}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="compare-title" className="mt-24 border-t border-line bg-paper-2/60 py-20 sm:mt-32 sm:py-28">
        <div className="wrap">
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
            <p className="eyebrow lg:col-span-3 lg:pt-3">Palyginimas</p>
            <div className="lg:col-span-8">
              <h2 id="compare-title" className="h-section">
                Medžiagos greta
              </h2>
              <p className="lead mt-5 max-w-2xl">
                Vertinimai santykiniai ir apibendrinti. Konkretaus gaminio savybės priklauso nuo gamintojo, klasės ir
                montavimo.
              </p>
            </div>
          </div>

          {/* Kompiuteris / planšetė: lentelė */}
          <div className="mt-14 hidden md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">Terasų medžiagų palyginimas</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="w-[19%] pb-4 pr-4 align-bottom text-sm font-normal text-muted">
                    Savybė
                  </th>
                  {materials.map((m) => (
                    <th key={m.slug} scope="col" className="px-4 pb-4 align-bottom font-display text-lg font-medium tracking-[-0.015em]">
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <th scope="row" className="py-5 pr-4 align-top text-sm font-semibold">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className="px-4 py-5 align-top text-[0.9375rem] leading-relaxed text-ink-2">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Telefonas: kiekviena medžiaga atskirai */}
          <div className="mt-12 space-y-4 md:hidden">
            {materials.map((m, mi) => (
              <details key={m.slug} className="group border border-line bg-white" open={mi === 0}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-5 font-display text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {m.name}
                  <Plus className="h-4 w-4 text-wood-dark transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <dl className="border-t border-line px-5 pb-2">
                  {comparisonRows.map((r) => (
                    <div key={r.label} className="border-b border-line py-3.5 last:border-b-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{r.label}</dt>
                      <dd className="mt-1 leading-relaxed text-ink-2">{r.values[mi]}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="choose-title" className="wrap py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Konsultacija</p>
            <h2 id="choose-title" className="h-section mt-5">
              Trys klausimai prieš renkantis
            </h2>
            <p className="lead mt-5">
              Dažnai geriausias sprendimas paaiškėja apžiūrėjus vietą. Padėsime palyginti variantus pagal jūsų situaciją.
            </p>
            <ButtonLink to="/kontaktai#uzklausa" arrow className="mt-9">
              Užsisakyti konsultaciją
            </ButtonLink>
          </div>
          <ol className="border-t border-ink lg:col-span-7 lg:col-start-6">
            {questions.map((x, i) => (
              <li key={x.q} className="grid gap-3 border-b border-line py-8 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-sm font-semibold tabular-nums text-wood-dark">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.015em]">{x.q}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{x.a}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
