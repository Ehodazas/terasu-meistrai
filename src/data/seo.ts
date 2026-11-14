import { articles } from './articles.ts'
import { projects } from './projects.ts'

export interface SeoEntry {
  path: string
  title: string
  description: string
}

const brand = 'Terasų meistrai'

export const seo = {
  home: {
    path: '/',
    title: `Terasų įrengimas ir montavimas – medinės ir WPC terasos | ${brand}`,
    description:
      'Projektuojame ir įrengiame medines bei WPC kompozitines terasas: konstrukcijos, laiptai, turėklai ir senų terasų atnaujinimas. Gaukite pasiūlymą savo terasai.',
  },
  services: {
    path: '/paslaugos',
    title: `Paslaugos – terasų montavimas, gamyba ir renovacija | ${brand}`,
    description:
      'Medinių ir WPC terasų įrengimas, terasų konstrukcijų montavimas, senų terasų renovacija, laiptų ir turėklų montavimas. Sužinokite, ką atliekame.',
  },
  materials: {
    path: '/terasu-tipai',
    title: `Terasų tipai – impregnuota mediena, maumedis, termomediena, WPC | ${brand}`,
    description:
      'Palyginkite terasų medžiagas: impregnuotą medieną, maumedį, termomedieną ir WPC kompozitą. Privalumai, trūkumai, priežiūra ir lyginamoji lentelė.',
  },
  projects: {
    path: '/atlikti-darbai',
    title: `Atlikti darbai – medinių ir WPC terasų pavyzdžiai | ${brand}`,
    description:
      'Medinių terasų, WPC terasų ir terasų atnaujinimo pavyzdžiai: terasos su laiptais, pergolėmis, sodo terasos ir didelės lauko erdvės.',
  },
  about: {
    path: '/apie-mus',
    title: `Apie mus – požiūris į kokybę ir darbą | ${brand}`,
    description:
      'Kaip dirbame: kruopšti konstrukcija, sąžiningai parinktos medžiagos, aiški komunikacija ir darbų perdavimas su priežiūros rekomendacijomis.',
  },
  contact: {
    path: '/kontaktai',
    title: `Kontaktai – užklausa terasos įrengimui | ${brand}`,
    description:
      'Susisiekite dėl terasos įrengimo ar renovacijos. Užpildykite užklausos formą – aptarsime jūsų terasą ir parengsime pasiūlymą.',
  },
  privacy: {
    path: '/privatumo-politika',
    title: `Privatumo politika | ${brand}`,
    description: 'Kaip tvarkome per svetainės užklausos formą pateiktus asmens duomenis.',
  },
  advice: {
    path: '/patarimai',
    title: `Patarimai – terasų priežiūra, medžiagos ir konstrukcija | ${brand}`,
    description:
      'Praktiniai patarimai apie terasas: kaip pasirinkti tarp medinės ir WPC terasos, kaip prižiūrėti medinę terasą ir kokį pagrindą rinktis.',
  },
  planner: {
    path: '/terasos-planuokle',
    title: `Terasos planuoklė – užklausa per 2 minutes | ${brand}`,
    description:
      'Atsakykite į kelis klausimus apie planuojamą terasą: darbų tipą, medžiagą, dydį ir papildomus elementus. Užklausą gausime su visa reikalinga informacija.',
  },
} satisfies Record<string, SeoEntry>

export function projectSeo(slug: string): SeoEntry | undefined {
  const p = projects.find((x) => x.slug === slug)
  if (!p) return undefined
  return {
    path: `/atlikti-darbai/${p.slug}`,
    title: `${p.title} – ${p.material} | ${brand}`,
    description: `${p.summary} Projekto tipas: ${p.type.toLowerCase()}. Demonstracinis projekto pavyzdys.`,
  }
}

export function articleSeo(slug: string): SeoEntry | undefined {
  const a = articles.find((x) => x.slug === slug)
  if (!a) return undefined
  return { path: `/patarimai/${a.slug}`, title: `${a.title} | ${brand}`, description: a.excerpt }
}

export const allSeoRoutes: SeoEntry[] = [
  ...Object.values(seo),
  ...projects.map((p) => projectSeo(p.slug)!),
  ...articles.map((a) => articleSeo(a.slug)!),
]
