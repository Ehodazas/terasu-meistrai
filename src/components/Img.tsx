import { images, type ImageKey } from '../data/images'

interface ImgProps {
  name: ImageKey
  /** CSS `sizes` atributas – kiek vietos nuotrauka užima ekrane. */
  sizes?: string
  className?: string
  /** Virš ekrano linijos esančioms nuotraukoms – įkeliama iškart. */
  priority?: boolean
  alt?: string
}

const base = import.meta.env.BASE_URL

function imageSrc(name: ImageKey, width: 800 | 1600 = 1600) {
  return `${base}images/${name}-${width}.webp`
}

/**
 * Optimizuota nuotrauka: WebP, srcset, aiškūs matmenys (be maketo šuolių).
 * Tėvinis elementas turėtų nustatyti proporcijas (pvz. aspect-[4/3]), o
 * nuotrauka jį užpildo `object-cover`.
 */
export function Img({ name, sizes = '100vw', className = '', priority = false, alt }: ImgProps) {
  const img = images[name]
  const xl = 'xl' in img && img.xl
  const srcSet = [
    // mažesnis failas sumažintas į 800×900 rėmą
    `${base}images/${name}-800.webp ${Math.round(Math.min(800, (900 * img.w) / img.h))}w`,
    `${base}images/${name}-1600.webp ${img.w}w`,
    xl ? `${base}images/${name}-2400.webp 2400w` : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <img
      src={imageSrc(name)}
      srcSet={srcSet}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={alt ?? img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
