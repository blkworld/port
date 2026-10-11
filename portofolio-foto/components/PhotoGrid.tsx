import PhotoGridClient from '@/components/PhotoGridClient'
import type { GridItem } from '@/components/Lightbox'
import { getDimensions, urlFor, type SanityPhoto } from '@/sanity/lib/image'

const THUMB_WIDTHS = [600, 900, 1200, 1800]
const FULL_WIDTHS = [1200, 1800, 2400]

export default function PhotoGrid({ images }: { images: SanityPhoto[] }) {
  const items: GridItem[] = []

  images.forEach((photo, i) => {
    const ref = photo?.asset?._ref
    if (!ref) return

    const { width, height } = getDimensions(ref)
    const build = (w: number) =>
      urlFor(photo).width(w).fit('max').auto('format').quality(80).url()

    items.push({
      id: photo._key ?? String(i),
      thumb: build(900),
      thumbSet: THUMB_WIDTHS.map((w) => `${build(w)} ${w}w`).join(', '),
      full: build(1800),
      fullSet: FULL_WIDTHS.map((w) => `${build(w)} ${w}w`).join(', '),
      width,
      height,
      alt: photo.alt || '',
    })
  })

  return <PhotoGridClient items={items} />
}