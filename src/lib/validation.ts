export type TerraceType = 'medine' | 'wpc' | 'neapsisprendziau'

export interface QuoteValues {
  name: string
  phone: string
  email: string
  city: string
  type: TerraceType | ''
  area: string
  message: string
  consent: boolean
}

export type QuoteErrors = Partial<Record<keyof QuoteValues, string>>

export const emptyQuote: QuoteValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  type: '',
  area: '',
  message: '',
  consent: false,
}

export const MESSAGE_MAX = 1500

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Lietuviški numeriai: +370XXXXXXXX, 00370XXXXXXXX arba 8XXXXXXXX. */
const PHONE_RE = /^(?:\+370|00370|8)\d{8}$/

export function normalizePhone(v: string) {
  return v.replace(/[\s\-().]/g, '')
}

export function validateField<K extends keyof QuoteValues>(key: K, values: QuoteValues): string | undefined {
  const v = values[key]
  switch (key) {
    case 'name': {
      const s = (v as string).trim()
      if (!s) return 'Įveskite savo vardą.'
      if (s.length < 2) return 'Vardas per trumpas.'
      if (s.length > 80) return 'Vardas per ilgas.'
      return
    }
    case 'phone': {
      const s = normalizePhone(v as string)
      if (!s) return 'Įveskite telefono numerį.'
      if (!PHONE_RE.test(s)) return 'Įveskite teisingą numerį, pvz., +370 612 34567 arba 8 612 34567.'
      return
    }
    case 'email': {
      const s = (v as string).trim()
      if (!s) return
      if (!EMAIL_RE.test(s)) return 'Patikrinkite el. pašto adresą, pvz., vardas@pastas.lt.'
      return
    }
    case 'city': {
      const s = (v as string).trim()
      if (!s) return 'Nurodykite miestą arba rajoną.'
      if (s.length > 80) return 'Per ilgas pavadinimas.'
      return
    }
    case 'type':
      if (!v) return 'Pasirinkite terasos tipą.'
      return
    case 'area': {
      const s = (v as string).trim().replace(',', '.')
      if (!s) return
      const n = Number(s)
      if (!Number.isFinite(n) || n <= 0) return 'Įveskite plotą skaičiumi, pvz., 25.'
      if (n > 5000) return 'Plotas atrodo per didelis – patikslinkite.'
      return
    }
    case 'message':
      if ((v as string).length > MESSAGE_MAX) return `Žinutė negali būti ilgesnė nei ${MESSAGE_MAX} simbolių.`
      return
    case 'consent':
      if (!v) return 'Norėdami pateikti užklausą, sutikite su privatumo politika.'
      return
  }
}

export function validateAll(values: QuoteValues): QuoteErrors {
  const errors: QuoteErrors = {}
  for (const key of Object.keys(values) as (keyof QuoteValues)[]) {
    const e = validateField(key, values)
    if (e) errors[key] = e
  }
  return errors
}
