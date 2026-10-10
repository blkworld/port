import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PhotoGrid from '@/components/PhotoGrid'
import { client } from '@/sanity/lib/client'
import { galleryBySlugQuery, type Gallery } from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gallery = await client.fetch<Gallery | null>(galleryBySlugQuery, { slug })
  if (!gallery) return {}
  return { title: gallery.title }
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params
  const gallery = await client.fetch<Gallery | null>(galleryBySlugQuery, { slug })

  if (!gallery) notFound()

  return (
    <main className="px-5 pb-16 pt-2 lg:pr-20 lg:pt-[70px]">
      <PhotoGrid images={gallery.images ?? []} />
    </main>
  )
}