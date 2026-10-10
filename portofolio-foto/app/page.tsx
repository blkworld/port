import PhotoGrid from '@/components/PhotoGrid'
import { client } from '@/sanity/lib/client'
import { firstGalleryQuery, type Gallery } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function HomePage() {
  const gallery = await client.fetch<Gallery | null>(firstGalleryQuery)

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return (
      <main className="px-5 py-20 text-neutral-500 lg:pr-20 lg:pt-[70px]">
        No galleries yet. Open <strong>/admin</strong> and create your first
        gallery.
      </main>
    )
  }

  return (
    <main className="px-5 pb-16 pt-2 lg:pr-20 lg:pt-[70px]">
      <PhotoGrid images={gallery.images} />
    </main>
  )
}