import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { archiveQuery, type ArchiveItem } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const posts = await client.fetch<ArchiveItem[]>(archiveQuery)

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/archive`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${base}/post/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
  ]
}