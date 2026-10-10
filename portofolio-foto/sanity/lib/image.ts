import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId, dataset })

type Source = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]

export type SanityPhoto = {
  _key?: string
  asset?: { _ref: string }
  crop?: unknown
  hotspot?: unknown
  alt?: string
  caption?: string
}

export function urlFor(source: SanityPhoto) {
  return builder.image(source as unknown as Source)
}

// Sanity menyimpan ukuran foto di dalam kode asset-nya, misal "image-abc-3000x2000-jpg"
export function getDimensions(ref: string) {
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (match) {
    return { width: Number(match[1]), height: Number(match[2]) }
  }
  return { width: 1600, height: 1067 }
}