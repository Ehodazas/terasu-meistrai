import type { ImageKey } from './images.ts'

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  readingMinutes: number
  image: ImageKey
  sections: { heading: string; paragraphs: string[]; list?: string[] }[]
}

/** Patarimų straipsniai. Bendro pobūdžio informacija – be gamintojų reklamos ir konkrečių kainų. */
export const articles: Article[] = [
  {
    slug: 'medine-ar-wpc-terasa',
    title: 'Medinė ar WPC terasa: kaip pasirinkti',
    excerpt: 'Natūrali mediena ar kompozitas? Palyginame išvaizdą, priežiūrą, elgseną saulėje ir tai, į ką verta atkreipti dėmesį renkantis.',
    category: 'Medžiagos',
    readingMinutes: 5,
    image: 'wpc-board-types',
    sections: [
      {
        heading: 'Pradėkite nuo to, kaip naudosite terasą',
        paragraphs: [
          'Dažnai renkamasi pagal nuotrauką ar kaimyno terasą, tačiau svarbiau įvertinti savo situaciją: kiek laiko norite skirti priežiūrai, ar terasa bus saulėtoje vietoje, ar ja vaikščios vaikai ir augintiniai, ar šalia bus baseinas.',
        ],
      },
      {
        heading: 'Natūrali mediena',
        paragraphs: [
          'Mediena – šilta, maloni liesti ir laikui bėgant įgauna savitą išvaizdą. Impregnuota pušis yra prieinamiausias variantas, maumedis išsiskiria ryškia tekstūra, o termomediena – geresniu matmenų stabilumu.',
          'Medinę terasą reikia periodiškai valyti ir, jei norite išlaikyti spalvą, aliejuoti. Didelis privalumas – paviršių galima nušlifuoti ir atnaujinti.',
        ],
        list: ['Natūrali išvaizda ir tekstūra', 'Mažiau įkaista saulėje', 'Paviršių galima atnaujinti', 'Reikia periodinės priežiūros'],
      },
      {
        heading: 'WPC kompozitas',
        paragraphs: [
          'Kompozitinės lentos gaminamos iš medienos plaušų ir polimerų. Jų nereikia aliejuoti, spalva ilgiau išlieka vienoda, nėra atplaišų. Tačiau jos labiau įkaista saulėje, plečiasi nuo temperatūros, o pigesni gaminiai gali blukti.',
          'Renkantis WPC verta domėtis, ar lenta pilnavidurė, ar turi apsauginį sluoksnį (koekstruzija), ir kokios gamintojo montavimo bei garantijos sąlygos.',
        ],
        list: ['Nereikia aliejuoti', 'Vienoda spalva ir paviršius', 'Labiau įkaista saulėje', 'Kokybė labai skiriasi tarp gamintojų'],
      },
      {
        heading: 'Trumpai',
        paragraphs: [
          'Jei vertinate natūralumą ir nebijote sezoninės priežiūros – rinkitės medieną. Jei svarbiausia mažiau rūpesčių ir vienoda išvaizda – svarstykite kokybišką WPC. Abiem atvejais terasos ilgaamžiškumą labiausiai lemia tinkamai įrengta konstrukcija.',
        ],
      },
    ],
  },
  {
    slug: 'medines-terasos-prieziura',
    title: 'Medinės terasos priežiūra: sezoninis planas',
    excerpt: 'Ką daryti pavasarį, vasarą, rudenį ir žiemą, kad medinė terasa ilgiau išliktų graži ir tvirta.',
    category: 'Priežiūra',
    readingMinutes: 4,
    image: 'frost-planks',
    sections: [
      {
        heading: 'Pavasaris: apžiūra ir valymas',
        paragraphs: [
          'Pirmiausia apžiūrėkite terasą: ar nėra klibančių lentų, išsikišusių varžtų, pažeistų vietų. Nuvalykite nešvarumus ir samanas specialia terasų valymo priemone ir šepečiu. Aukšto slėgio plovikliu naudokitės atsargiai – per stipri srovė gali pažeisti medienos paviršių.',
        ],
        list: ['Patikrinkite tvirtinimą ir lentų būklę', 'Išvalykite tarpus tarp lentų', 'Nuplaukite paviršių ir leiskite išdžiūti'],
      },
      {
        heading: 'Vasaros pradžia: apsauga',
        paragraphs: [
          'Kai mediena gerai išdžiūvusi, ją galima apdoroti terasų aliejumi ar dažyve. Dažniausiai tai daroma kas vienus–dvejus metus, priklausomai nuo saulės ir apkrovos. Aliejų tepkite plonu sluoksniu, o perteklių nuvalykite.',
        ],
      },
      {
        heading: 'Ruduo: lapai ir drėgmė',
        paragraphs: [
          'Ant terasos paliktų lapų krūvos sulaiko drėgmę ir palieka dėmes. Reguliariai juos nušluokite, o prieš žiemą įsitikinkite, kad vanduo gali laisvai nutekėti, o po terasa – vėdintis.',
        ],
      },
      {
        heading: 'Žiema: be druskos ir metalinių kastuvų',
        paragraphs: [
          'Sniegą šalinkite plastikiniu kastuvu, judėdami išilgai lentų. Druska ir agresyvios ledo tirpinimo priemonės gali pažeisti paviršių bei tvirtinimo detales.',
        ],
      },
    ],
  },
  {
    slug: 'terasos-pagrindas',
    title: 'Terasos pagrindas: poliai, pamatai ar blokeliai',
    excerpt: 'Nuo pagrindo priklauso, ar terasa po kelerių metų neįlinks ir nepradės pūti. Apžvelgiame dažniausius sprendimus.',
    category: 'Konstrukcija',
    readingMinutes: 4,
    image: 'workers-building',
    sections: [
      {
        heading: 'Kodėl pagrindas svarbiausias',
        paragraphs: [
          'Dauguma terasų problemų – įlinkusios lentos, stovintis vanduo, pūvantys lagai – atsiranda dėl netinkamo pagrindo ar per retai sumontuotų lagų. Danga matoma, bet ilgaamžiškumą lemia tai, kas po ja.',
        ],
      },
      {
        heading: 'Sraigtiniai poliai',
        paragraphs: [
          'Įsukami į gruntą be didelių žemės darbų, todėl mažiau pažeidžia aplinką ir tinka nelygiems sklypams. Tinkamumas priklauso nuo grunto – kartais reikia patikrinti, kaip giliai polis turi būti įsuktas.',
        ],
      },
      {
        heading: 'Betoniniai pamatai',
        paragraphs: [
          'Tradicinis, patikimas sprendimas didesnėms apkrovoms ar pakeltoms terasoms. Reikia daugiau darbų ir laiko betonui sukietėti.',
        ],
      },
      {
        heading: 'Pamatų blokeliai',
        paragraphs: [
          'Tinka nedidelėms, žemoms terasoms ant stabilaus, sutankinto pagrindo. Būtina gerai paruošti pagrindą ir užtikrinti vandens nutekėjimą.',
        ],
      },
      {
        heading: 'Nepamirškite',
        paragraphs: ['Nepriklausomai nuo pasirinkto atramų tipo, svarbu:'],
        list: [
          'Lagų žingsnis turi atitikti lentų gamintojo reikalavimus',
          'Po terasa turi būti vėdinimas',
          'Paviršiui reikia nedidelio nuolydžio vandeniui nutekėti',
          'Po terasa verta pakloti geotekstilę nuo piktžolių',
        ],
      },
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}
