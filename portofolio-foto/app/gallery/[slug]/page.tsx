import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PhotoGrid from '@/components/PhotoGrid'
import { client } from '@/sanity/lib/client'
import {
  galleryBySlugQuery,
  gallerySlugsQuery,
  type GalleryDetail,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(gallerySlugsQuery)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gallery = await client.fetch<GalleryDetail | null>(galleryBySlugQuery, { slug })
  if (!gallery) return {}
  return { title: gallery.title }
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params
  const gallery = await client.fetch<GalleryDetail | null>(galleryBySlugQuery, { slug })

  if (!gallery) notFound()

  const images = gallery.images ?? []

  return (
    <main className="px-5 pb-16 pt-6 lg:pr-20 lg:pt-[70px]">
      <header className="mb-8">
        <Link
          href="/gallery"
          className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-neutral-900"
        >
          ← Gallery
        </Link>
        <h1 className="mt-3 text-3xl font-normal tracking-tight">{gallery.title}</h1>
      </header>

      {images.length === 0 ? (
        <p className="text-neutral-500">No photos in this gallery yet.</p>
      ) : (
        <PhotoGrid images={images} />
      )}
    </main>
  )
}