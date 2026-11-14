import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

const words = ['Medinės terasos', 'WPC terasos', 'Maumedis', 'Termomediena', 'Laiptai ir turėklai', 'Pergolės', 'Terasų atnaujinimas', 'Konstrukcijos']

/** Lėtai bėganti užrašų juosta. Sustoja užvedus pelę, mygtuku arba esant reduced-motion. */
export function Marquee() {
  const [paused, setPaused] = useState(false)
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-[1.6rem] font-medium tracking-[-0.02em] sm:px-10 sm:text-[2.4rem]">{w}</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-wood sm:h-5 sm:w-5" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-paper py-6 sm:py-8" data-paused={paused}>
      <div className="marquee-track flex w-max motion-reduce:!animate-none">
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Paleisti bėgančią juostą' : 'Sustabdyti bėgančią juostą'}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink/60 transition-colors hover:text-ink motion-reduce:hidden"
      >
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </div>
  )
}
