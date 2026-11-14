import type { ImageKey } from './images.ts'

export interface Service {
  slug: string
  number: string
  title: string
  /** Trumpas pavadinimas navigacijai. */
  nav: string
  short: string
  description: string[]
  benefits: string[]
  applications: string[]
  image: ImageKey
  /** Užpildo formos „Terasos tipas“ lauką, kai pereinama iš paslaugos. */
  terraceType?: 'medine' | 'wpc'
}

export const services: Service[] = [
  {
    slug: 'mediniu-terasu-irengimas',
    nav: 'Medinės terasos',
    number: '01',
    title: 'Medinių terasų įrengimas',
    short: 'Impregnuotos pušies, maumedžio ar termomedienos terasos – nuo pagrindo paruošimo iki paskutinės lentos.',
    description: [
      'Medinė terasa saulėje sušyla, yra maloni basoms kojoms ir dera prie daugumos namų architektūros. Padedame pasirinkti medieną pagal biudžetą, terasos vietą ir tai, kiek laiko esate pasirengę skirti jos priežiūrai.',
      'Įrengiame visą terasą: paruošiame pagrindą, sumontuojame konstrukciją, kloname lentas su tinkamais tarpais ir ventiliacija, kad mediena galėtų išdžiūti ir tarnautų ilgiau.',
    ],
    benefits: [
      'Natūrali išvaizda ir tekstūra',
      'Medienos rūšį galima parinkti pagal biudžetą',
      'Paviršių galima atnaujinti šlifuojant ir aliejuojant',
      'Lengvai pritaikoma nestandartinėms formoms',
    ],
    applications: [
      'Terasos prie individualių namų',
      'Sodo terasos ir poilsio aikštelės',
      'Terasos prie pirčių ir sodybų',
      'Kavinių ir restoranų lauko erdvės',
    ],
    image: 'deck-glass-door',
    terraceType: 'medine',
  },
  {
    slug: 'wpc-terasu-irengimas',
    nav: 'WPC terasos',
    number: '02',
    title: 'WPC kompozitinių terasų įrengimas',
    short: 'Kompozitinės lentos iš medienos plaušų ir polimerų – mažiau kasdienės priežiūros ir platus spalvų pasirinkimas.',
    description: [
      'WPC lentų nereikia kasmet aliejuoti ar dažyti, todėl jos tinka tiems, kurie nori daugiau laiko praleisti terasoje, o ne ją prižiūrėdami. Vis dėlto jas reikia reguliariai valyti, o kokybė tarp gamintojų labai skiriasi.',
      'Padedame palyginti skirtingų gamintojų sistemas: pilnavidures ir tuščiavidures lentas, apsauginį sluoksnį, garantijos sąlygas. Montuojame pagal gamintojo reikalavimus – su tarpais šiluminiam plėtimuisi ir ventiliacija po danga.',
    ],
    benefits: [
      'Nereikia kasmetinio aliejavimo ar dažymo',
      'Vienoda spalva ir paviršius visame plote',
      'Galimi paslėpti tvirtinimo elementai',
      'Didelis spalvų ir paviršiaus faktūrų pasirinkimas',
    ],
    applications: [
      'Terasos prie modernių namų',
      'Baseinų ir lauko SPA zonos',
      'Balkonai ir stogų terasos (įvertinus konstrukciją)',
      'Intensyviai naudojamos komercinės erdvės',
    ],
    image: 'wpc-grey-boards',
    terraceType: 'wpc',
  },
  {
    slug: 'terasu-konstrukciju-montavimas',
    nav: 'Konstrukcijos',
    number: '03',
    title: 'Terasų konstrukcijų montavimas',
    short: 'Pagrindas, nuo kurio priklauso terasos ilgaamžiškumas: atramos, sijos, lagai ir vandens nutekėjimas.',
    description: [
      'Dažniausios terasų problemos – įlinkusios lentos, stovintis vanduo, pūvantys lagai – atsiranda dėl netinkamai įrengtos konstrukcijos. Todėl jai skiriame daugiausia dėmesio.',
      'Įvertiname gruntą ir aukščių skirtumus, parenkame atramų tipą – sraigtinius polius, betoninius pamatus ar atramas ant esamo pagrindo – ir sumontuojame sijų bei lagų sistemą su tinkamu žingsniu ir nuolydžiu vandeniui nutekėti.',
    ],
    benefits: [
      'Atramų tipas parenkamas pagal gruntą ir apkrovas',
      'Lagų žingsnis atitinka pasirinktas lentas',
      'Numatytas vandens nutekėjimas ir ventiliacija',
      'Galima montuoti ir nelygiame sklype',
    ],
    applications: [
      'Naujų terasų statyba',
      'Pakeltos terasos šlaituose',
      'Konstrukcija, kai lentas klojate patys',
      'Pergolių ir stoginių pagrindai',
    ],
    image: 'workers-building',
  },
  {
    slug: 'senu-terasu-atnaujinimas',
    nav: 'Atnaujinimas',
    number: '04',
    title: 'Senų terasų atnaujinimas',
    short: 'Įvertiname esamą terasą ir pasiūlome, ką verta taisyti, o ką – keisti.',
    description: [
      'Ne kiekvieną seną terasą reikia ardyti. Jei konstrukcija tvirta, dažnai pakanka pakeisti pažeistas lentas, nušlifuoti ir iš naujo apdoroti paviršių. Kitais atvejais tikslingiau pakeisti tik dangą, paliekant esamą pagrindą.',
      'Pirmiausia apžiūrime konstrukciją, lagus ir tvirtinimą, tuomet aiškiai paaiškiname galimus variantus ir jų kainų skirtumus.',
    ],
    benefits: [
      'Sąžiningas esamos būklės įvertinimas',
      'Galimybė išsaugoti tvirtą konstrukciją',
      'Šlifavimas, valymas ir naujas apdorojimas',
      'Medinės dangos keitimas WPC lentomis',
    ],
    applications: [
      'Papilkėjusi ar suskilinėjusi mediena',
      'Klibančios ar įlinkusios lentos',
      'Pasenusi terasa įsigytame name',
      'Esamos terasos išplėtimas',
    ],
    image: 'dark-timber-deck',
  },
  {
    slug: 'terasu-laiptai-ir-turekliai',
    nav: 'Laiptai ir turėklai',
    number: '05',
    title: 'Terasų laiptų ir turėklų montavimas',
    short: 'Laiptai, pakopos ir turėklai, suprojektuoti kartu su terasa – patogūs ir saugūs.',
    description: [
      'Laiptai ir turėklai dažnai pridedami paskutiniai, nors būtent jie lemia, kaip patogiai naudojama terasa. Juos projektuojame kartu su visa terasa, kad aukščiai, medžiagos ir detalės sudarytų vientisą visumą.',
      'Laiptus gaminame iš tos pačios medžiagos kaip ir terasą, montuojame medinius, metalinius ar kombinuotus turėklus. Pakeltoms terasoms turėklų aukštį ir tvirtinimą parenkame atsižvelgdami į saugumą.',
    ],
    benefits: [
      'Vientisas terasos ir laiptų dizainas',
      'Patogus pakopų aukštis ir gylis',
      'Mediniai, metaliniai ar stiklo turėklai',
      'Galimas pakopų apšvietimas',
    ],
    applications: [
      'Pakeltos terasos',
      'Terasos šlaituose',
      'Įėjimai į namą',
      'Kelių lygių terasos',
    ],
    image: 'stairs-white',
  },
  {
    slug: 'terasu-prieziura',
    nav: 'Priežiūra',
    number: '06',
    title: 'Terasų priežiūra ir apsauga',
    short: 'Sezoninis valymas, aliejavimas ir smulkūs remontai, kad terasa ilgiau išliktų graži.',
    description: [
      'Net ir geriausiai įrengta terasa ilgiau tarnauja, kai yra reguliariai prižiūrima. Galime perimti šį darbą: išvalyti paviršių ir tarpus tarp lentų, patikrinti tvirtinimą, pakeisti pažeistas lentas ir apdoroti medieną apsauginiu aliejumi.',
      'WPC terasoms atliekame gilesnį valymą pagal gamintojo rekomendacijas – jų aliejuoti nereikia, tačiau reguliarus valymas būtinas.',
    ],
    benefits: [
      'Valymas tinkamomis priemonėmis',
      'Tvirtinimo ir lentų būklės patikra',
      'Aliejavimas ar dažyvės atnaujinimas',
      'Smulkūs remontai vietoje',
    ],
    applications: [
      'Kasmetinė priežiūra pavasarį',
      'Terasos paruošimas sezonui',
      'Papilkėjusios medienos atgaivinimas',
      'Terasos prie nuomojamų sodybų',
    ],
    image: 'sanding-detail',
  },
]
