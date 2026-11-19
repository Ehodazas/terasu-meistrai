import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { Img } from './Img'

interface Props {
  project: Project
  aspect?: string
  sizes?: string
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, aspect = 'aspect-[4/3]', sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', headingLevel = 'h3' }: Props) {
  const H = headingLevel
  return (
    <Link to={`/atlikti-darbai/${project.slug}`} className="group block">
      <div className={`img-zoom relative overflow-hidden rounded-[var(--radius-img)] bg-sand ${aspect}`}>
        <Img name={project.images[0]} sizes={sizes} />
        <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <H className="text-lg font-medium leading-snug tracking-[-0.015em] sm:text-xl">
            <span className="link-underline">{project.title}</span>
          </H>
          <p className="mt-1 text-sm text-muted">{project.type}</p>
        </div>
        <span className="mt-1 shrink-0 text-xs uppercase tracking-[0.12em] text-muted/80">Pavyzdys</span>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
        {[
          ['Medžiaga', project.material],
          ['Plotas', project.area],
          ['Trukmė', project.duration],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="mt-0.5 font-medium leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-2">
        <span className="font-medium text-ink">Sprendimas: </span>
        {project.solution}
      </p>
    </Link>
  )
}
