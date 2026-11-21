/**
 * Terasos konstrukcijos pjūvio schema (statinė SVG) su sunumeruotais sluoksniais.
 * Telefonuose rodomas atskiras, apkarpytas variantas su didesniais numeriais ir užrašais,
 * kad schema būtų įskaitoma ir siaurame ekrane. Paaiškinimai – HTML sąraše šalia.
 */
const layers = [
  { n: 1, title: 'Danga', text: 'Terasos lentos su tarpais – vanduo nubėga, mediena išdžiūsta.' },
  { n: 2, title: 'Lagai', text: 'Jų žingsnis parenkamas pagal lentų gamintojo reikalavimus, kad danga neįlinktų.' },
  { n: 3, title: 'Sijos', text: 'Perduoda visą apkrovą atramoms ir išlygina aukščių skirtumus.' },
  { n: 4, title: 'Atramos', text: 'Sraigtiniai poliai, betoniniai pamatai arba blokeliai – pagal gruntą ir aukštį.' },
  { n: 5, title: 'Geotekstilė', text: 'Po terasa stabdo piktžoles, bet praleidžia vandenį.' },
  { n: 6, title: 'Nuolydis ir vėdinimas', text: 'Nedidelis nuolydis nuo namo ir oro tarpas po danga apsaugo nuo drėgmės.' },
]

const INK = '#252923'
const FONT_SANS = 'Inter Variable, Inter, sans-serif'

type Pt = [number, number]
interface Variant {
  id: string
  viewBox: string
  markerR: number
  markerFont: number
  labelFont: number
  slope: { text: string; x: number; y: number; from: Pt; to: Pt }
  piles: number[]
  airArrows: number[]
  /** Žymeklio centras ir (nebūtinai) linija iki detalės. */
  markers: { n: number; at: Pt; line?: [Pt, Pt] }[]
}

const desktop: Variant = {
  id: 'd',
  viewBox: '0 6 1000 464',
  markerR: 28,
  markerFont: 27,
  labelFont: 26,
  slope: { text: '~1–2 % nuolydis nuo namo', x: 540, y: 108, from: [580, 126], to: [880, 132] },
  piles: [200, 500, 800],
  airArrows: [330, 640],
  markers: [
    { n: 1, at: [300, 116], line: [[300, 144], [300, 160]] },
    { n: 2, at: [966, 166], line: [[938, 172], [869, 192]] },
    { n: 3, at: [966, 240], line: [[938, 236], [905, 230]] },
    { n: 4, at: [860, 424], line: [[833, 416], [812, 408]] },
    { n: 5, at: [640, 424], line: [[640, 396], [640, 364]] },
    { n: 6, at: [490, 300] },
  ],
}

/** Telefonui: rodoma kairioji pjūvio dalis (namas ir dvi atramos), viskas stambiau. */
const mobile: Variant = {
  id: 'm',
  viewBox: '0 0 620 470',
  markerR: 34,
  markerFont: 34,
  labelFont: 30,
  slope: { text: '~1–2 % nuolydis', x: 250, y: 44, from: [260, 62], to: [600, 68] },
  piles: [200, 500],
  airArrows: [330],
  markers: [
    { n: 1, at: [230, 116], line: [[230, 150], [230, 160]] },
    { n: 2, at: [380, 116], line: [[380, 150], [380, 176]] },
    { n: 3, at: [575, 300], line: [[575, 266], [575, 240]] },
    { n: 4, at: [420, 428], line: [[452, 418], [492, 408]] },
    { n: 5, at: [290, 428], line: [[290, 394], [290, 357]] },
    { n: 6, at: [330, 300] },
  ],
}

function Drawing({ v, className }: { v: Variant; className: string }) {
  const boards = Array.from({ length: 17 }, (_, i) => 120 + i * 45)
  const joists = Array.from({ length: 13 }, (_, i) => 140 + i * 60)
  return (
    <svg viewBox={v.viewBox} role="img" aria-labelledby={`diagram-title-${v.id} diagram-desc-${v.id}`} className={className}>
      <title id={`diagram-title-${v.id}`}>Terasos konstrukcijos pjūvis</title>
      <desc id={`diagram-desc-${v.id}`}>
        Schemoje matyti namo siena, terasos lentos, po jomis lagai ir sijos, atramos į gruntą, geotekstilė ant žemės,
        nedidelis nuolydis nuo namo ir oro tarpas po danga.
      </desc>

      <defs>
        <marker id={`arrow-${v.id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#34483B" />
        </marker>
        <marker id={`arrow-ink-${v.id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={INK} />
        </marker>
      </defs>

      {/* Gruntas ir geotekstilė */}
      <path d="M0 360 L1000 378 L1000 470 L0 470 Z" fill="#e6dfd2" />
      <path d="M0 360 L1000 378" stroke="#c9bda7" strokeWidth="2" fill="none" />
      <path d="M100 352 L960 367" stroke="#34483B" strokeWidth="3" strokeDasharray="10 7" fill="none" />

      {/* Namo siena */}
      <rect x="20" y="70" width="80" height="290" fill="#d8d2c6" />
      <rect x="34" y="88" width="52" height="110" rx="3" fill="#f7f5f0" stroke="#c9bda7" />
      <text x="60" y={70 - v.labelFont * 0.45} textAnchor="middle" fontSize={v.labelFont} fill="#4B4F47" fontFamily={FONT_SANS}>
        Namas
      </text>

      {/* Atramos (sraigtiniai poliai) */}
      {v.piles.map((x) => (
        <g key={x}>
          <rect x={x - 7} y="250" width="14" height="190" fill="#7d7f78" />
          {[392, 410, 428].map((y) => (
            <path key={y} d={`M${x - 18} ${y} L${x + 18} ${y + 8}`} stroke="#7d7f78" strokeWidth="4" />
          ))}
          <rect x={x - 22} y="240" width="44" height="12" rx="2" fill="#5f615b" />
        </g>
      ))}

      {/* Sijos, lagai, danga */}
      <rect x="115" y="214" width="790" height="26" rx="3" fill="#8A6440" />
      {joists.map((x) => (
        <rect key={x} x={x - 9} y="176" width="18" height="38" rx="2" fill="#A67C52" />
      ))}
      <g transform="rotate(0.9 120 176)">
        {boards.map((x) => (
          <rect key={x} x={x} y="160" width="40" height="15" rx="2" fill="#c9a274" />
        ))}
      </g>

      {/* Oro tarpas – vėdinimo rodyklės */}
      {v.airArrows.map((x) => (
        <path
          key={x}
          d={`M${x - 70} 300 C ${x - 30} 280, ${x + 30} 320, ${x + 70} 296`}
          stroke="#34483B"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          markerEnd={`url(#arrow-${v.id})`}
          opacity="0.7"
        />
      ))}

      {/* Nuolydis */}
      <path d={`M${v.slope.from.join(' ')} L${v.slope.to.join(' ')}`} stroke={INK} strokeWidth="2.5" markerEnd={`url(#arrow-ink-${v.id})`} />
      <text x={v.slope.x} y={v.slope.y} fontSize={v.labelFont} fill="#4B4F47" fontFamily={FONT_SANS}>
        {v.slope.text}
      </text>

      {/* Žymekliai */}
      {v.markers.map((m) => (
        <g key={m.n}>
          {m.line && <line x1={m.line[0][0]} y1={m.line[0][1]} x2={m.line[1][0]} y2={m.line[1][1]} stroke={INK} strokeWidth="2.5" />}
          <circle cx={m.at[0]} cy={m.at[1]} r={v.markerR} fill={INK} />
          <text
            x={m.at[0]}
            y={m.at[1] + v.markerFont * 0.35}
            textAnchor="middle"
            fontSize={v.markerFont}
            fontWeight="700"
            fill="#F7F5F0"
            fontFamily="Manrope Variable, Manrope, sans-serif"
          >
            {m.n}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function ConstructionDiagram() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
      <figure className="lg:col-span-7">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-2 sm:p-4">
          <Drawing v={mobile} className="h-auto w-full sm:hidden" />
          <Drawing v={desktop} className="hidden h-auto w-full sm:block" />
        </div>
        <figcaption className="mt-3 text-sm text-muted">
          Supaprastinta schema<span className="sm:hidden"> (telefone rodoma pjūvio dalis)</span>. Konkretūs sprendimai priklauso nuo
          grunto, aukščio ir pasirinktų lentų.
        </figcaption>
      </figure>

      <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
        {layers.map((l) => (
          <li key={l.n} className="flex gap-4 border-b border-line py-4 first:border-t sm:[&:nth-child(2)]:border-t lg:[&:nth-child(2)]:border-t-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper">{l.n}</span>
            <div>
              <h3 className="font-display text-lg font-medium leading-snug">{l.title}</h3>
              <p className="mt-1 leading-relaxed text-ink-2">{l.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
