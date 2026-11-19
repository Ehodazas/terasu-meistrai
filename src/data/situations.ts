import type { ImageKey } from './images.ts'

export type Situation = 'prie-namo' | 'mazas-kiemas' | 'nuolydis' | 'atnaujinimas'

export interface SituationInfo {
  value: Situation
  label: string
  /** Klausimas, kurį sau užduoda lankytojas. */
  question: string
  /** Kas šioje situacijoje svarbiausia. */
  challenge: string
  /** Dažniausi sprendimai. */
  solutions: string[]
  image: ImageKey
}

/** Terasų situacijos – pagal jas grupuojami darbų pavyzdžiai. */
export const situations: SituationInfo[] = [
  {
    value: 'prie-namo',
    label: 'Prie namo',
    question: 'Terasa kaip svetainės tęsinys',
    challenge: 'Svarbiausia – suderinti terasos lygį su vidaus grindimis ir namo architektūra, kad išėjimas būtų patogus be slenksčio.',
    solutions: ['Lygis suderinamas su durimis', 'Medžiaga parenkama pagal fasadą', 'Paslėpti tvirtinimai, švarūs kraštai'],
    image: 'hero-modern-house',
  },
  {
    value: 'mazas-kiemas',
    label: 'Mažas kiemas',
    question: 'Kiekvienas metras turi būti naudingas',
    challenge: 'Nedideliame plote terasa turi tilpti su baldais ir nepanaikinti žalumos. Padeda įmontuoti suolai ir aiškios zonos.',
    solutions: ['Įmontuoti suolai vietoj baldų', 'Vieta augalams prie krašto', 'Atramos, kurios mažai liečia vejos'],
    image: 'wpc-bench',
  },
  {
    value: 'nuolydis',
    label: 'Nuolydis',
    question: 'Sklypas su aukščių skirtumu',
    challenge: 'Kai žemė leidžiasi nuo namo, terasą tenka pakelti arba suskaidyti į kelis lygius. Čia svarbiausia – atramos ir saugūs laiptai.',
    solutions: ['Keli lygiai su pakopomis', 'Sraigtiniai poliai be didelių žemės darbų', 'Turėklai pakeltose vietose'],
    image: 'multilevel-1',
  },
  {
    value: 'atnaujinimas',
    label: 'Atnaujinimas',
    question: 'Sena terasa, kurią verta išsaugoti',
    challenge: 'Dažnai konstrukcija dar tvirta, o pavargusi tik danga. Įvertiname būklę ir siūlome tai, kas iš tikrųjų reikalinga.',
    solutions: ['Būklės įvertinimas vietoje', 'Pažeistų lentų keitimas, šlifavimas', 'Medinės dangos keitimas WPC'],
    image: 'dark-timber-deck',
  },
]

export const getSituation = (v: Situation) => situations.find((s) => s.value === v)!
