import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { filmSlugsQuery, gallerySlugsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const [films, galleries] = await Promise.all([
    client.fetch<{ slug: string }[]>(filmSlugsQuery),
    client.fetch<{ slug: string }[]>(gallerySlugsQuery),
  ])

  const now = new Date()

  return [
    { url: base, lastModified: now },
    { url: `${base}/films`, lastModified: now },
    { url: `${base}/gallery`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    ...films.map((f) => ({ url: `${base}/films/${f.slug}`, lastModified: now })),
    ...galleries.map((g) => ({
      url: `${base}/gallery/${g.slug}`,
      lastModified: now,
    })),
  ]
}