import type { ImageKey } from './images.ts'

/**
 * DEMONSTRACINIAI PROJEKTAI
 * ------------------------------------------------------------------
 * Visi žemiau esantys projektai yra PAVYZDINIAI ir skirti tik svetainės
 * demonstracijai. Nuotraukos – iliustracinės (Unsplash), tai NĖRA realūs
 * įmonės atlikti darbai. Prieš paleidžiant svetainę pakeiskite juos tikrais
 * projektais arba nustatykite DEMO_PROJECTS = false ir pašalinkite įrašus.
 */
export const DEMO_PROJECTS = true

export type ProjectTag = 'medines' | 'wpc' | 'atnaujinimas'

export interface Project {
  slug: string
  title: string
  material: string
  type: string
  area: string
  /** Apytikslė darbų trukmė objekte (demonstracinė). */
  duration: string
  tags: ProjectTag[]
  summary: string
  description: string[]
  scope: string[]
  images: ImageKey[]
  demo: true
}

export const projectFilters: { value: 'visi' | ProjectTag; label: string }[] = [
  { value: 'visi', label: 'Visi projektai' },
  { value: 'medines', label: 'Medinės terasos' },
  { value: 'wpc', label: 'WPC terasos' },
  { value: 'atnaujinimas', label: 'Terasų atnaujinimas' },
]

export const projects: Project[] = [
  {
    slug: 'wpc-terasa-prie-namo-pusyne',
    title: 'WPC terasa prie namo pušyne',
    material: 'WPC kompozitas',
    type: 'Terasa prie modernaus namo',
    area: '≈ 70 m²',
    duration: '≈ 8 darbo dienos',
    tags: ['wpc'],
    summary: 'Šviesi kompozitinė terasa, tęsianti svetainės grindų liniją į lauką.',
    description: [
      'Namas su dideliais stiklo langais ir stumdomomis durimis – terasa čia tampa tiesiogine gyvenamosios erdvės tąsa. Pasirinktos šviesios kompozitinės lentos, kurios dera su fasado medžiu ir nereikalauja kasmetinio aliejavimo.',
      'Terasos lygis suderintas su vidaus grindimis, kad išeiti būtų patogu be slenksčio. Lentos klojamos ant aliuminio lagų su paslėptomis tvirtinimo detalėmis.',
    ],
    scope: ['Sraigtiniai poliai ir pagrindo konstrukcija', 'Aliuminio lagų sistema', 'Kompozitinės dangos klojimas', 'Kraštų apdaila'],
    images: ['hero-modern-house'],
    demo: true,
  },
  {
    slug: 'daugiapakope-sodo-terasa',
    title: 'Daugiapakopė sodo terasa su lysvėmis',
    material: 'Impregnuota pušis',
    type: 'Terasa su laiptais',
    area: '≈ 55 m²',
    duration: '≈ 10 darbo dienų',
    tags: ['medines'],
    summary: 'Kelių lygių terasa, sujungianti namo išėjimą, poilsio zoną ir pakeltas daržo lysves.',
    description: [
      'Sklypas su nuolydžiu nuo namo, todėl terasa suskirstyta į kelis lygius. Viršutinė dalis skirta stalui ir kėdėms, žemesnė – augalams ir pakeltoms lysvėms, kurios suformuotos iš tų pačių lentų.',
      'Laiptai ir pakopos išdėstyti taip, kad iš namo būtų galima tiesiai nueiti į sodą. Visa konstrukcija pakelta nuo grunto ir vėdinama.',
    ],
    scope: ['Kelių lygių konstrukcija', 'Laiptai ir pakopos', 'Pakeltos lysvės iš terasos lentų', 'Apdorojimas terasų aliejumi'],
    images: ['multilevel-1', 'multilevel-2', 'multilevel-3', 'multilevel-4'],
    demo: true,
  },
  {
    slug: 'terasa-su-placiais-laiptais',
    title: 'Terasa su plačiais laiptais',
    material: 'Maumedis',
    type: 'Terasa su laiptais',
    area: '≈ 30 m²',
    duration: '≈ 6 darbo dienos',
    tags: ['medines'],
    summary: 'Pakelta maumedžio terasa su plačiomis pakopomis, kurios atlieka ir sėdimos vietos funkciją.',
    description: [
      'Terasa įrengta prie namo su didelėmis stumdomomis durimis. Kadangi grindys pakeltos virš žemės, vietoj siaurų laiptų suprojektuotos plačios pakopos per visą terasos plotį.',
      'Maumedžio lentos parinktos dėl šilto atspalvio, kuris dera su lubų apdaila.',
    ],
    scope: ['Pakelta konstrukcija', 'Plačios pakopos per visą plotį', 'Maumedžio danga', 'Aliejavimas'],
    images: ['stairs-modern'],
    demo: true,
  },
  {
    slug: 'terasa-su-pergole',
    title: 'Terasa su pergole ir lauko virtuve',
    material: 'Termomediena',
    type: 'Terasa su pergole',
    area: '≈ 45 m²',
    duration: '≈ 9 darbo dienos',
    tags: ['medines'],
    summary: 'Termomedienos terasa su medine pergole virš valgomojo zonos.',
    description: [
      'Šeima norėjo lauko valgomojo, kuriame būtų galima pasislėpti nuo vidurdienio saulės. Virš terasos sumontuota medinė pergolė, o grindims pasirinkta termomediena dėl jos stabilumo.',
      'Pergolės atramos tvirtinamos prie atskirų pamatų, nepriklausomai nuo terasos lagų.',
    ],
    scope: ['Pagrindas ir lagai', 'Termomedienos danga', 'Medinė pergolė', 'Vieta lauko virtuvei'],
    images: ['pergola'],
    demo: true,
  },
  {
    slug: 'pilka-wpc-terasa-su-suolu',
    title: 'Pilka WPC terasa su suolu',
    material: 'WPC kompozitas',
    type: 'Kiemo terasa',
    area: '≈ 40 m²',
    duration: '≈ 5 darbo dienos',
    tags: ['wpc'],
    summary: 'Ramių pilkų tonų kompozitinė terasa su įmontuotu suolu ir vietomis augalams.',
    description: [
      'Kiemo terasa, kurioje norėta minimalios priežiūros ir vienodos išvaizdos. Pasirinktos pilkos koekstruduotos lentos, suolas suformuotas iš tos pačios sistemos.',
      'Prie terasos krašto palikta vietos augalams, kad didelis vienspalvis plotas neatrodytų šaltas.',
    ],
    scope: ['Pagrindo konstrukcija', 'WPC dangos klojimas', 'Įmontuotas suolas', 'Kraštų apdaila'],
    images: ['wpc-bench'],
    demo: true,
  },
  {
    slug: 'erdvi-lauko-poilsio-zona',
    title: 'Erdvi lauko poilsio zona',
    material: 'Maumedis',
    type: 'Didelė lauko erdvė',
    area: '≈ 120 m²',
    duration: '≈ 3 savaitės',
    tags: ['medines'],
    summary: 'Didelė medinė aikštelė prieš namą, skirta šventėms ir buvimui lauke.',
    description: [
      'Didelio ploto terasa, kuri atstoja kiemą. Lentos klojamos ilgomis linijomis, kad erdvė atrodytų rami ir vientisa, o žalia zona viduryje suskaido plotą.',
      'Esant tokiam plotui, ypač svarbus pagrindo lygumas ir vandens nutekėjimas – jiems skirta daugiausiai darbo.',
    ],
    scope: ['Pagrindo išlyginimas ir drenažas', 'Didelio ploto konstrukcija', 'Maumedžio danga', 'Žalios zonos įrėminimas'],
    images: ['large-deck-house'],
    demo: true,
  },
  {
    slug: 'kompaktiska-sodo-terasa',
    title: 'Kompaktiška sodo terasa',
    material: 'Impregnuota pušis',
    type: 'Nedidelė sodo terasa',
    area: '≈ 12 m²',
    duration: '≈ 2 darbo dienos',
    tags: ['medines'],
    summary: 'Nedidelė terasa sodo gilumoje – vieta rytinei kavai ir skaitymui.',
    description: [
      'Ne kiekvienai terasai reikia daug vietos. Šis pavyzdys – nedidelė aikštelė sodo kampe, kur ilgiausiai būna saulės.',
      'Konstrukcija remiasi į kelias atramas, todėl vejos ir medžių šaknų beveik nereikėjo liesti.',
    ],
    scope: ['Atramos ant pamatų blokelių', 'Impregnuotos pušies danga', 'Apdorojimas aliejumi'],
    images: ['garden-stool'],
    demo: true,
  },
  {
    slug: 'terasa-su-suolu-prie-stikliniu-duru',
    title: 'Terasa su įmontuotu suolu',
    material: 'Maumedis',
    type: 'Terasa prie namo',
    area: '≈ 35 m²',
    duration: '≈ 6 darbo dienos',
    tags: ['medines'],
    summary: 'Medinė terasa prie svetainės durų su suolu, turėklais ir vaizdu į mišką.',
    description: [
      'Terasa įrengta prie miško esančio namo, išilgai stiklinio fasado. Prie krašto suformuotas ilgas suolas, kuris kartu atlieka ir apsauginę funkciją.',
      'Turėklai pagaminti iš tos pačios medienos, kad visa terasa atrodytų vientisa.',
    ],
    scope: ['Pakelta konstrukcija', 'Maumedžio danga', 'Įmontuotas suolas', 'Mediniai turėklai'],
    images: ['deck-glass-door'],
    demo: true,
  },
  {
    slug: 'wpc-terasa-su-lauko-virtuve',
    title: 'WPC terasa su lauko virtuvės zona',
    material: 'WPC kompozitas',
    type: 'Terasa vakaro poilsiui',
    area: '≈ 25 m²',
    duration: '≈ 5 darbo dienos',
    tags: ['wpc'],
    summary: 'Tamsi kompozitinė terasa su griliu, lauko sofa ir šiltu apšvietimu.',
    description: [
      'Terasa, skirta vakarams: vienoje pusėje grilis, kitoje – minkšta sėdimoji zona. Tamsios WPC lentos atsparesnės riebalų dėmėms nei neapdorota mediena, tačiau jas būtina reguliariai valyti.',
      'Apšvietimas numatytas dar montuojant konstrukciją, kad laidai būtų paslėpti.',
    ],
    scope: ['Pagrindo konstrukcija', 'WPC danga', 'Paslėpti apšvietimo laidai', 'Tvorelės apdaila'],
    images: ['evening-grill'],
    demo: true,
  },
  {
    slug: 'patamsejusios-terasos-atnaujinimas',
    title: 'Patamsėjusios terasos atnaujinimas',
    material: 'Impregnuota pušis',
    type: 'Terasos atnaujinimas',
    area: '≈ 28 m²',
    duration: '≈ 3 darbo dienos',
    tags: ['atnaujinimas', 'medines'],
    summary: 'Esama terasa su tvirta konstrukcija – pakeistos pažeistos lentos, paviršius nušlifuotas ir iš naujo apdorotas.',
    description: [
      'Apžiūrėjus terasą paaiškėjo, kad lagai ir atramos geros būklės, todėl ardyti visos terasos nereikėjo. Pakeistos kelios suskilusios lentos, visas paviršius nušlifuotas.',
      'Po šlifavimo terasa apdorota tamsiu terasų aliejumi, kad naujos ir senos lentos atrodytų vienodai.',
    ],
    scope: ['Būklės įvertinimas', 'Pažeistų lentų keitimas', 'Šlifavimas', 'Apdorojimas aliejumi'],
    images: ['dark-timber-deck', 'sanding-detail'],
    demo: true,
  },
  {
    slug: 'terasos-dangos-ir-tureklu-keitimas',
    title: 'Dangos ir turėklų keitimas',
    material: 'Impregnuota pušis',
    type: 'Terasos atnaujinimas',
    area: '≈ 22 m²',
    duration: '≈ 4 darbo dienos',
    tags: ['atnaujinimas', 'medines'],
    summary: 'Pakeltos terasos danga ir turėklai pakeisti naujais, išsaugant esamas atramas.',
    description: [
      'Senoji danga buvo susidėvėjusi, o turėklai klibėjo. Atramos ir pagrindinės sijos išliko tvirtos, todėl jos sustiprintos, o visa kita pakeista.',
      'Nauji turėklai pritvirtinti prie konstrukcijos, o ne prie dangos lentų, kad būtų tvirtesni.',
    ],
    scope: ['Senos dangos demontavimas', 'Sijų sustiprinimas', 'Nauja danga', 'Nauji turėklai'],
    images: ['grey-house-railing'],
    demo: true,
  },
  {
    slug: 'medines-terasos-keitimas-wpc',
    title: 'Medinės terasos keitimas WPC lentomis',
    material: 'WPC kompozitas',
    type: 'Terasos atnaujinimas',
    area: '≈ 32 m²',
    duration: '≈ 4 darbo dienos',
    tags: ['atnaujinimas', 'wpc'],
    summary: 'Sena medinė danga pakeista kompozitinėmis lentomis, pritaikius esamą pagrindą.',
    description: [
      'Savininkai nebenorėjo kasmet aliejuoti terasos. Įvertinus pagrindą, jis pritaikytas WPC lentoms: sutankintas lagų žingsnis pagal gamintojo reikalavimus.',
      'Tokiu būdu išvengta visos terasos statybos iš naujo, o priežiūros poreikis sumažėjo.',
    ],
    scope: ['Senos dangos demontavimas', 'Lagų žingsnio pritaikymas', 'WPC dangos klojimas'],
    images: ['wpc-table'],
    demo: true,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
