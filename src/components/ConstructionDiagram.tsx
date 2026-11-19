/**
 * Terasos konstrukcijos pjūvio schema (statinė SVG) su sunumeruotais sluoksniais.
 * Paaiškinimai pateikiami HTML sąraše, kad būtų įskaitomi ir telefone.
 */
const layers = [
  { n: 1, title: 'Danga', text: 'Terasos lentos su tarpais – vanduo nubėga, mediena išdžiūsta.' },
  { n: 2, title: 'Lagai', text: 'Jų žingsnis parenkamas pagal lentų gamintojo reikalavimus, kad danga neįlinktų.' },
  { n: 3, title: 'Sijos', text: 'Perduoda visą apkrovą atramoms ir išlygina aukščių skirtumus.' },
  { n: 4, title: 'Atramos', text: 'Sraigtiniai poliai, betoniniai pamatai arba blokeliai – pagal gruntą ir aukštį.' },
  { n: 5, title: 'Geotekstilė', text: 'Po terasa stabdo piktžoles, bet praleidžia vandenį.' },
  { n: 6, title: 'Nuolydis ir vėdinimas', text: 'Nedidelis nuolydis nuo namo ir oro tarpas po danga apsaugo nuo drėgmės.' },
]

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="21" fill="#252923" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="21" fontWeight="700" fill="#F7F5F0" fontFamily="Manrope Variable, Manrope, sans-serif">
        {n}
      </text>
    </g>
  )
}

export function ConstructionDiagram() {
  const boards = Array.from({ length: 17 }, (_, i) => 120 + i * 45)
  const joists = Array.from({ length: 13 }, (_, i) => 140 + i * 60)
  const piles = [200, 500, 800]
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
      <figure className="lg:col-span-7">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-2 sm:p-4">
          <svg viewBox="0 6 1000 464" role="img" aria-labelledby="diagram-title diagram-desc" className="h-auto w-full">
            <title id="diagram-title">Terasos konstrukcijos pjūvis</title>
            <desc id="diagram-desc">
              Schemoje matyti namo siena, terasos lentos, po jomis lagai ir sijos, atramos į gruntą, geotekstilė ant
              žemės, nedidelis nuolydis nuo namo ir oro tarpas po danga.
            </desc>

            {/* Gruntas */}
            <path d="M0 360 L1000 378 L1000 470 L0 470 Z" fill="#e6dfd2" />
            <path d="M0 360 L1000 378" stroke="#c9bda7" strokeWidth="2" fill="none" />
            {/* Geotekstilė */}
            <path d="M100 352 L960 367" stroke="#34483B" strokeWidth="3" strokeDasharray="10 7" fill="none" />

            {/* Namo siena */}
            <rect x="20" y="40" width="80" height="320" fill="#d8d2c6" />
            <rect x="34" y="60" width="52" height="128" rx="3" fill="#f7f5f0" stroke="#c9bda7" />
            <text x="60" y="32" textAnchor="middle" fontSize="20" fill="#6C6F66" fontFamily="Inter Variable, Inter, sans-serif">
              Namas
            </text>

            {/* Atramos (sraigtiniai poliai) */}
            {piles.map((x) => (
              <g key={x}>
                <rect x={x - 7} y="250" width="14" height="190" fill="#7d7f78" />
                {[392, 410, 428].map((y) => (
                  <path key={y} d={`M${x - 18} ${y} L${x + 18} ${y + 8}`} stroke="#7d7f78" strokeWidth="4" />
                ))}
                <rect x={x - 22} y="240" width="44" height="12" rx="2" fill="#5f615b" />
              </g>
            ))}

            {/* Sijos */}
            <rect x="115" y="214" width="790" height="26" rx="3" fill="#8A6440" />

            {/* Lagai (pjūvyje – stačiakampiai ant sijos) */}
            {joists.map((x) => (
              <rect key={x} x={x - 9} y="176" width="18" height="38" rx="2" fill="#A67C52" />
            ))}

            {/* Danga su tarpais, nedidelis nuolydis nuo namo */}
            <g transform="rotate(0.9 120 176)">
              {boards.map((x) => (
                <rect key={x} x={x} y="160" width="40" height="15" rx="2" fill="#c9a274" />
              ))}
            </g>

            {/* Oro tarpas – vėdinimo rodyklės */}
            {[330, 640].map((x) => (
              <path
                key={x}
                d={`M${x - 70} 300 C ${x - 30} 280, ${x + 30} 320, ${x + 70} 296`}
                stroke="#34483B"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrow)"
                opacity="0.7"
              />
            ))}
            {/* Nuolydžio rodyklė */}
            <path d="M600 128 L880 134" stroke="#252923" strokeWidth="2" markerEnd="url(#arrow-ink)" />
            <text x="560" y="114" fontSize="21" fill="#4B4F47" fontFamily="Inter Variable, Inter, sans-serif">
              ~1–2 % nuolydis nuo namo
            </text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#34483B" />
              </marker>
              <marker id="arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#252923" />
              </marker>
            </defs>

            {/* Žymekliai */}
            <Marker x={300} y={126} n={1} />
            <line x1="300" y1="147" x2="300" y2="160" stroke="#252923" strokeWidth="2" />
            <Marker x={962} y={178} n={2} />
            <line x1="941" y1="182" x2="869" y2="194" stroke="#252923" strokeWidth="2" />
            <Marker x={962} y={236} n={3} />
            <line x1="941" y1="232" x2="905" y2="228" stroke="#252923" strokeWidth="2" />
            <Marker x={860} y={420} n={4} />
            <line x1="839" y1="414" x2="812" y2="405" stroke="#252923" strokeWidth="2" />
            <Marker x={640} y={420} n={5} />
            <line x1="640" y1="399" x2="640" y2="364" stroke="#252923" strokeWidth="2" />
            <Marker x={490} y={300} n={6} />
          </svg>
        </div>
        <figcaption className="mt-3 text-sm text-muted">Supaprastinta schema. Konkretūs sprendimai priklauso nuo grunto, aukščio ir pasirinktų lentų.</figcaption>
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
