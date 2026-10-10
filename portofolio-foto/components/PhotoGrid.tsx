import { getDimensions, urlFor, type SanityPhoto } from '@/sanity/lib/image'

const WIDTHS = [600, 900, 1200, 1800]

function Tile({ photo }: { photo: SanityPhoto }) {
  const ref = photo?.asset?._ref
  if (!ref) return null

  const { width, height } = getDimensions(ref)

  const build = (w: number) =>
    urlFor(photo).width(w).fit('max').auto('format').quality(80).url()

  const srcSet = WIDTHS.map((w) => `${build(w)} ${w}w`).join(', ')

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={build(900)}
      srcSet={srcSet}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
      width={width}
      height={height}
      alt={photo.alt || ''}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full bg-neutral-300"
    />
  )
}

// Membagi foto ke kolom: setiap foto masuk ke kolom yang paling pendek,
// sehingga urutan foto tetap terbaca kiri ke kanan seperti di Studio.
function split(images: SanityPhoto[], count: number) {
  const columns: SanityPhoto[][] = Array.from({ length: count }, () => [])
  const heights: number[] = Array(count).fill(0)

  for (const photo of images) {
    const ref = photo?.asset?._ref
    if (!ref) continue
    const { width, height } = getDimensions(ref)

    let target = 0
    for (let i = 1; i < count; i++) {
      if (heights[i] < heights[target]) target = i
    }
    columns[target].push(photo)
    heights[target] += height / width
  }

  return columns
}

function Columns({
  images,
  count,
  className,
}: {
  images: SanityPhoto[]
  count: number
  className: string
}) {
  return (
    <div className={`gap-2.5 ${className}`}>
      {split(images, count).map((column, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-2.5">
          {column.map((photo, j) => (
            <Tile key={photo._key ?? j} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function PhotoGrid({ images }: { images: SanityPhoto[] }) {
  return (
    <>
      <Columns images={images} count={3} className="hidden lg:flex" />
      <Columns images={images} count={2} className="hidden sm:flex lg:hidden" />
      <Columns images={images} count={1} className="flex sm:hidden" />
    </>
  )
}