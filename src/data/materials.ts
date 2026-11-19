import type { ImageKey } from './images.ts'

export interface Material {
  slug: string
  name: string
  latin?: string
  lead: string
  description: string
  pros: string[]
  cons: string[]
  care: string
  image: ImageKey
  homeImage: ImageKey
}

export const materials: Material[] = [
  {
    slug: 'impregnuota-mediena',
    name: 'Impregnuota mediena',
    lead: 'Prieinamiausias natūralios medienos variantas.',
    description:
      'Dažniausiai tai pušis, slėgiu impregnuota apsauginiais preparatais. Impregnavimas padidina atsparumą puvimui ir grybeliui, tačiau nepanaikina natūralių medienos savybių – ji ir toliau reaguoja į drėgmę bei saulę.',
    pros: [
      'Mažesnė kaina nei kitų natūralios medienos variantų',
      'Natūrali medienos išvaizda',
      'Lengvai apdirbama, tinka nestandartinėms formoms',
      'Pažeistą lentą nesudėtinga pakeisti',
    ],
    cons: [
      'Gali skilinėti, šiek tiek deformuotis, išsikišti sakai',
      'Be apdorojimo laikui bėgant pilkėja',
      'Ilgaamžiškumas priklauso nuo impregnavimo kokybės ir priežiūros',
    ],
    care: 'Reikalinga periodinė priežiūra: valymas ir apdorojimas terasų aliejumi ar dažyve, dažniausiai kas 1–2 metus.',
    image: 'plank-pine',
    homeImage: 'plank-pine',
  },
  {
    slug: 'maumedis',
    name: 'Maumedis',
    lead: 'Tanki, sakinga mediena su ryškia tekstūra.',
    description:
      'Maumedis tankesnis už pušį ir natūraliai sakingas, todėl dažnai renkamasi, kai norima natūralios medienos be cheminio impregnavimo. Šilto, rausvai rudo atspalvio lentos išsiskiria ryškiomis rievėmis.',
    pros: [
      'Natūrali, ryški medienos tekstūra',
      'Išraiškingas šiltas atspalvis',
      'Tankesnis ir kietesnis už pušį',
      'Galima naudoti be cheminio impregnavimo',
    ],
    cons: [
      'Ypač pirmaisiais metais gali skilinėti ir išsiskirti sakai',
      'Be apdorojimo pilkėja',
      'Dažniausiai brangesnis už impregnuotą pušį',
    ],
    care: 'Norint išlaikyti spalvą, reikia reguliariai valyti ir aliejuoti. Jei leidžiama natūraliai papilkėti, priežiūros mažiau, tačiau valyti vis tiek būtina.',
    image: 'plank-larch',
    homeImage: 'plank-larch',
  },
  {
    slug: 'termomediena',
    name: 'Termomediena',
    lead: 'Aukšta temperatūra apdorota mediena.',
    description:
      'Mediena (dažniausiai pušis, eglė ar uosis) apdorojama aukštoje temperatūroje be cheminių impregnantų. Dėl to ji mažiau sugeria drėgmę, mažiau traukiasi ir brinksta, o visame skerspjūvyje įgauna tolygų rudą atspalvį.',
    pros: [
      'Geresnis matmenų stabilumas – mažiau traukiasi ir brinksta',
      'Didesnis atsparumas puvimui nei neapdorotos medienos',
      'Natūrali išvaizda ir tolygus atspalvis',
      'Apdorojama be cheminių impregnantų',
    ],
    cons: [
      'Trapesnė – reikia tinkamo lagų žingsnio ir kruopštaus tvirtinimo',
      'Saulėje pilkėja, jei neapdorojama aliejumi su UV apsauga',
      'Aukštesnė kaina nei impregnuotos medienos',
    ],
    care: 'Reikalingas reguliarus valymas. Norint išlaikyti rudą spalvą – aliejavimas su UV apsauga.',
    image: 'thermo-dark',
    homeImage: 'thermo-dark',
  },
  {
    slug: 'wpc-kompozitas',
    name: 'WPC kompozitas',
    lead: 'Medienos plaušų ir polimerų lentos.',
    description:
      'WPC (angl. wood-plastic composite) lentos gaminamos iš medienos miltų ir polimerų mišinio. Rinkoje yra labai skirtingų produktų: nuo paprastų tuščiavidurių lentų iki pilnavidurių su apsauginiu polimeriniu sluoksniu (koekstruzija).',
    pros: [
      'Mažesnis įprastinės priežiūros poreikis – nereikia aliejuoti',
      'Daug spalvų ir paviršiaus faktūrų',
      'Nėra atplaišų, tolygus paviršius',
      'Galimi paslėpti tvirtinimo elementai',
    ],
    cons: [
      'Saulėje įkaista labiau nei mediena',
      'Plečiasi nuo temperatūros – būtini montavimo tarpai',
      'Kokybė tarp gamintojų labai skiriasi; pigesni gaminiai gali blukti',
      'Gilių pažeidimų negalima nušlifuoti kaip medienos',
    ],
    care: 'Nereikia aliejuoti, tačiau būtina reguliariai valyti – ypač riebalų, lapų ir samanų dėmes. Visiškai priežiūros nereikalaujančių terasų nėra.',
    image: 'wpc-board-types',
    homeImage: 'wpc-grey-boards',
  },
]

/** Lyginamoji lentelė. Reikšmės santykinės – ne kainos ar garantijos. */
export const comparisonRows: { label: string; values: [string, string, string, string] }[] = [
  { label: 'Išvaizda', values: ['Natūrali mediena, šviesus atspalvis', 'Ryški tekstūra, šiltas atspalvis', 'Tolygus rudas atspalvis', 'Vienoda spalva, imituojama tekstūra'] },
  { label: 'Pradinė kaina', values: ['Žemesnė', 'Vidutinė', 'Vidutinė–aukštesnė', 'Vidutinė–aukštesnė, priklauso nuo kokybės'] },
  { label: 'Priežiūra', values: ['Periodinis valymas ir aliejavimas', 'Reguliarus valymas, aliejavimas spalvai išlaikyti', 'Valymas, aliejavimas su UV apsauga', 'Reguliarus valymas, aliejuoti nereikia'] },
  { label: 'Matmenų stabilumas', values: ['Vidutinis', 'Vidutinis–geras', 'Geras', 'Geras, tačiau plečiasi nuo šilumos'] },
  { label: 'Įkaitimas saulėje', values: ['Nedidelis', 'Nedidelis', 'Nedidelis–vidutinis', 'Didesnis, ypač tamsių spalvų'] },
  { label: 'Pojūtis basomis', values: ['Šilta, neprižiūrėta gali šiurkštėti', 'Tanku ir malonu', 'Lygu ir šilta', 'Be atplaišų, saulėje gali būti karšta'] },
  { label: 'Paviršiaus atnaujinimas', values: ['Galima šlifuoti', 'Galima šlifuoti', 'Galima šlifuoti atsargiai', 'Šlifuoti dažniausiai negalima'] },
  { label: 'Kam tinka', values: ['Riboto biudžeto projektams', 'Vertinantiems natūralią medieną', 'Norintiems stabilesnės medienos', 'Norintiems mažiau priežiūros'] },
]

/**
 * Palyginimas pagal tris kasdienius klausimus. level: 1–3.
 *  - care:     kiek priežiūros reikia (1 – mažai, 3 – daugiausia)
 *  - sun:      kiek įkaista saulėje (1 – mažai, 3 – labiausiai)
 *  - barefoot: kaip malonu vaikščioti basomis (1 – mažiausiai, 3 – maloniausia)
 * Vertinimai santykiniai ir apibendrinti – konkretus gaminys gali skirtis.
 */
export type FeelKey = 'care' | 'sun' | 'barefoot'
export const feelCriteria: { key: FeelKey; label: string; scale: [string, string, string] }[] = [
  { key: 'care', label: 'Priežiūra', scale: ['Mažai', 'Vidutiniškai', 'Daugiau'] },
  { key: 'sun', label: 'Saulėje', scale: ['Mažai įkaista', 'Šyla vidutiniškai', 'Įkaista labiausiai'] },
  { key: 'barefoot', label: 'Basomis', scale: ['Priklauso nuo oro', 'Malonu', 'Labai malonu'] },
]

export const materialFeel: Record<string, Record<FeelKey, { level: 1 | 2 | 3; text: string }>> = {
  'impregnuota-mediena': {
    care: { level: 3, text: 'Valymas ir aliejavimas kas 1–2 metus' },
    sun: { level: 1, text: 'Šviesi mediena saulėje išlieka vėsesnė' },
    barefoot: { level: 2, text: 'Šilta ir natūrali, neprižiūrėta gali šiurkštėti' },
  },
  maumedis: {
    care: { level: 2, text: 'Valymas; aliejavimas, jei norite išlaikyti spalvą' },
    sun: { level: 1, text: 'Mažai įkaista' },
    barefoot: { level: 3, text: 'Tankus, malonus paviršius; pirmaisiais metais gali išsiskirti sakai' },
  },
  termomediena: {
    care: { level: 2, text: 'Valymas; aliejus su UV apsauga spalvai išlaikyti' },
    sun: { level: 2, text: 'Tamsesnė mediena šyla šiek tiek labiau' },
    barefoot: { level: 3, text: 'Lygi, šilta mediena; kraštai trapesni' },
  },
  'wpc-kompozitas': {
    care: { level: 1, text: 'Tik reguliarus valymas, aliejuoti nereikia' },
    sun: { level: 3, text: 'Ypač tamsios spalvos karštą dieną gerokai įkaista' },
    barefoot: { level: 1, text: 'Be atplaišų, bet saulėkaitoje gali būti karšta' },
  },
}
