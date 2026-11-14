export const navigation = [
  { to: '/', label: 'Pagrindinis' },
  { to: '/paslaugos', label: 'Paslaugos' },
  { to: '/terasu-tipai', label: 'Terasų tipai' },
  { to: '/atlikti-darbai', label: 'Atlikti darbai' },
  { to: '/patarimai', label: 'Patarimai' },
  { to: '/apie-mus', label: 'Apie mus' },
  { to: '/kontaktai', label: 'Kontaktai' },
] as const

export const QUOTE_LINK = '/kontaktai#uzklausa'
export const PLANNER_LINK = '/terasos-planuokle'

export const processSteps = [
  {
    title: 'Užklausa ir pokalbis',
    text: 'Papasakojate apie savo idėją, sklypą ir lūkesčius. Jau pirmo pokalbio metu aptariame galimas medžiagas ir preliminarų sprendimą.',
  },
  {
    title: 'Apžiūra ir matavimai',
    text: 'Atvykstame į vietą, įvertiname gruntą, aukščių skirtumus, privažiavimą ir esamas konstrukcijas.',
  },
  {
    title: 'Sprendimas ir pasiūlymas',
    text: 'Parengiame terasos planą ir detalų pasiūlymą: medžiagos, darbų apimtis ir terminai. Be paslėptų eilučių.',
  },
  {
    title: 'Įrengimas',
    text: 'Įrengiame pagrindą, konstrukciją, dangą ir detales. Apie darbų eigą informuojame reguliariai.',
  },
  {
    title: 'Perdavimas ir priežiūra',
    text: 'Kartu apžiūrime atliktus darbus ir paliekame aiškias priežiūros rekomendacijas pasirinktai medžiagai.',
  },
]
