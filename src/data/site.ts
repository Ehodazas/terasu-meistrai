/**
 * ĮMONĖS DUOMENYS
 * ------------------------------------------------------------------
 * Visi žemiau esantys kontaktai yra PAVYZDINIAI (placeholder).
 * Prieš paleidžiant svetainę pakeiskite juos tikrais duomenimis ir
 * nustatykite `isPlaceholder: false` – tada dings „pavyzdiniai duomenys“ žymos.
 */
export const site = {
  name: 'Terasų meistrai',
  /** Pilnas svetainės adresas be pasvirojo brūkšnio gale (naudojamas canonical, sitemap, OG). */
  url: 'https://www.jusu-domenas.lt',
  isPlaceholder: true,

  phone: '+370 600 00000',
  phoneHref: 'tel:+37060000000',
  email: 'info@jusu-domenas.lt',
  address: 'Biuro adresas bus nurodytas',

  hours: [
    { days: 'Pirmadienis–penktadienis', time: '8:00–18:00' },
    { days: 'Šeštadienis', time: 'Pagal susitarimą' },
    { days: 'Sekmadienis', time: 'Nedirbame' },
  ],

  /** Aptarnaujama teritorija – pavyzdys, pakeiskite pagal realią darbo zoną. */
  serviceArea: [
    'Vilnius ir Vilniaus rajonas',
    'Kaunas ir Kauno rajonas',
    'Trakai, Elektrėnai, Kaišiadorys',
    'Klaipėda ir pajūrio regionas',
  ],
} as const
