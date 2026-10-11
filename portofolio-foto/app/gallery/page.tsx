import type { Metadata } from 'next'
import ThumbCard from '@/components/ThumbCard'
import { client } from '@/sanity/lib/client'
import { galleriesQuery, type GalleryCard } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery',
}

export default async function GalleryIndexPage() {
  const galleries = await client.fetch<GalleryCard[]>(galleriesQuery)

  return (
    <main className="px-5 pb-20 pt-6 lg:px-14 lg:pt-[70px]">
      {galleries.length === 0 ? (
        <p className="text-neutral-500">
          No galleries yet. Open <strong>/admin</strong>, choose{' '}
          <strong>Galleries</strong> and create your first one.
        </p>
      ) : (
        <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {galleries.map((gallery) => (
            <ThumbCard
              key={gallery._id}
              href={`/gallery/${gallery.slug}`}
              title={gallery.title}
              image={gallery.cover}
            />
          ))}
        </div>
      )}
    </main>
  )
}