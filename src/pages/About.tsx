import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { PageHero } from '../components/PageHero'
import { ProcessSteps } from '../components/ProcessSteps'
import { SectionHead } from '../components/SectionHead'
import { Seo } from '../components/Seo'
import { seo } from '../data/seo'

const quality = [
  {
    title: 'Konstrukcija svarbiau už dangą',
    text: 'Gražiausios lentos neišgelbės terasos, jei po jomis kaupiasi vanduo ar lagai sumontuoti per retai. Todėl pagrindui skiriame daugiausia laiko.',
  },
  {
    title: 'Montavimas pagal medžiagos savybes',
    text: 'Mediena traukiasi ir brinksta, kompozitas plečiasi nuo šilumos. Tarpai, tvirtinimas ir ventiliacija parenkami pagal konkrečią medžiagą ir gamintojo nurodymus.',
  },
  {
    title: 'Švarūs mazgai ir detalės',
    text: 'Lentų galai, kraštai, laiptų pakopos ir sujungimai – detalės, kurias pastebite kasdien. Jas planuojame iš anksto, o ne sprendžiame vietoje.',
  },
]

const communication = [
  ['Aiškus pasiūlymas', 'Pasiūlyme nurodome medžiagas, darbų apimtį ir terminus, kad galėtumėte palyginti ir priimti sprendimą.'],
  ['Vienas kontaktinis asmuo', 'Visais klausimais bendraujate su tuo pačiu žmogumi – nuo apžiūros iki darbų perdavimo.'],
  ['Informacija apie eigą', 'Jei keičiasi orai ar medžiagų pristatymo terminai, apie tai pranešame iš karto.'],
  ['Priežiūros rekomendacijos', 'Perduodami terasą paaiškiname, kaip ją prižiūrėti, kad ji ilgiau išliktų geros būklės.'],
]

const reasons = [
  'Patariame rinktis medžiagą pagal jūsų poreikius, o ne pagal tai, ką lengviausia parduoti.',
  'Sąžiningai įvertiname seną terasą – jei pakanka atnaujinimo, nesiūlome statyti iš naujo.',
  'Konstrukciją pritaikome konkrečiam sklypui: gruntui, nuolydžiui ir aukščiams.',
  'Galime atlikti visą darbą arba atskirą etapą – pavyzdžiui, tik konstrukciją.',
  'Kalbame suprantamai ir atsakome į klausimus prieš pradedant darbus.',
]

export default function About() {
  return (
    <>
      <Seo entry={seo.about} />
      <PageHero
        eyebrow="Apie mus"
        title="Statome terasas, kurias patys norėtume turėti"
        lead="„Terasų meistrai“ – komanda, dirbanti su medinėmis ir kompozitinėmis terasomis. Mūsų darbas – suprasti, kaip naudosite terasą, ir pastatyti ją taip, kad ji ilgai tarnautų."
        image="workers-building"
        imageClass="aspect-[4/3] sm:aspect-[16/7] [&_img]:object-[center_62%]"
      />

      <section aria-labelledby="philosophy-title" className="wrap py-20 sm:py-28 lg:py-32">
        <SectionHead index="01" eyebrow="Filosofija" title="Paprasti sprendimai, atlikti kruopščiai" id="philosophy-title" />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 text-[1.0625rem] leading-[1.8] text-ink-2 lg:col-span-6 lg:col-start-4">
            <p>
              Gera terasa nebūtinai turi būti sudėtinga. Dažniausiai geriausiai atrodo tos, kurios dera prie namo
              architektūros, turi aiškias linijas ir yra patogios naudoti: be aukštų slenksčių, su patogiais laiptais ir
              vieta baldams.
            </p>
            <p>
              Prieš siūlydami sprendimą, klausiame, kaip terasą naudosite – ar tai bus vieta rytinei kavai, šeimos
              vakarienėms, ar erdvė svečiams. Nuo to priklauso dydis, forma ir medžiaga.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="quality-title" className="border-t border-line bg-paper-2/60 py-20 sm:py-28 lg:py-32">
        <div className="wrap">
          <SectionHead index="02" eyebrow="Požiūris į kokybę" title="Kokybė prasideda ten, kur jos nesimato" id="quality-title" />
          <ol className="mt-14 grid gap-px bg-line sm:mt-20 lg:grid-cols-3">
            {quality.map((q, i) => (
              <li key={q.title} data-reveal className="bg-paper-2 py-8 sm:p-8 lg:p-10">
                <span className="font-display text-sm font-semibold tabular-nums text-wood-dark">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.015em] sm:text-2xl">{q.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-2">{q.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="craft-title" className="wrap py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="grid grid-cols-5 gap-4 lg:col-span-6">
            <div data-reveal="img" className="col-span-3 aspect-[3/4] overflow-hidden rounded-[var(--radius-img)] bg-sand">
              <Img name="saw-detail" sizes="(min-width: 1024px) 30vw, 60vw" />
            </div>
            <div data-reveal="img" className="col-span-2 mt-16 aspect-[3/4] overflow-hidden rounded-[var(--radius-img)] bg-sand">
              <Img name="toolbelt" sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow flex items-center gap-3">
              <span className="tabular-nums text-ink/40">03</span>
              <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
              Medžiagos ir darbas
            </p>
            <h2 id="craft-title" className="h-section mt-5">
              Tinkamos medžiagos ir patikrinti sprendimai
            </h2>
            <div className="mt-6 space-y-5 leading-[1.8] text-ink-2">
              <p>
                Dirbame su terasų lentomis, konstrukcine mediena, tvirtinimo detalėmis ir atramomis, skirtomis lauko
                sąlygoms. Naudojame nerūdijančio plieno arba tinkamai padengtus varžtus ir laikomės gamintojų montavimo
                reikalavimų.
              </p>
              <p>
                Jei kuri nors medžiaga netinka jūsų sąlygoms – pavyzdžiui, tamsus kompozitas atviroje pietinėje pusėje –
                apie tai pasakysime iš anksto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="border-t border-line py-20 sm:py-28 lg:py-32">
        <div className="wrap">
          <SectionHead index="04" eyebrow="Darbų eiga" title="Kaip vyksta terasos statyba" id="process-title" />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section aria-labelledby="comm-title" className="bg-ink py-20 text-paper sm:py-28 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3 !text-wood">
              <span className="tabular-nums text-paper/40">05</span>
              <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
              Bendravimas
            </p>
            <h2 id="comm-title" className="h-section mt-5 !text-paper">
              Žinote, kas vyksta jūsų kieme
            </h2>
          </div>
          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {communication.map(([t, d]) => (
              <div key={t} className="border-t border-white/15 pt-6">
                <dt className="font-display text-lg font-medium text-paper">{t}</dt>
                <dd className="mt-3 leading-relaxed text-paper/65">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="why-title" className="wrap py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3">
              <span className="tabular-nums text-ink/40">06</span>
              <span className="h-px w-6 bg-wood/50" aria-hidden="true" />
              Kodėl verta kreiptis
            </p>
            <h2 id="why-title" className="h-section mt-5">
              Ko galite tikėtis dirbdami su mumis
            </h2>
            <div className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-sand lg:block">
              <Img name="deck-trees" sizes="40vw" />
            </div>
          </div>
          <ul className="border-t border-ink lg:col-span-6 lg:col-start-7">
            {reasons.map((r, i) => (
              <li key={r} data-reveal className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-6 text-lg leading-relaxed">
                <span className="pt-1 font-display text-sm font-semibold tabular-nums text-wood-dark">{String(i + 1).padStart(2, '0')}</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
