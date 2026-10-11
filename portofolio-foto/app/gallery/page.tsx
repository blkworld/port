import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor, type SanityPhoto } from '@/sanity/lib/image'
import { galleriesQuery, type GalleryCard } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery',
}

const WIDTHS = [500, 800, 1200]

function coverUrl(cover: SanityPhoto, width: number) {
  return urlFor(cover)
    .width(width)
    .height(Math.round((width * 2) / 3))
    .fit('crop')
    .auto('format')
    .quality(80)
    .url()
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
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {galleries.map((gallery) => (
            <Link
              key={gallery._id}
              href={`/gallery/${gallery.slug}`}
              className="group block"
            >
              {gallery.cover?.asset ? (
                <img
                  src={coverUrl(gallery.cover, 800)}
                  srcSet={WIDTHS.map((w) => `${coverUrl(gallery.cover!, w)} ${w}w`).join(', ')}
                  sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
                  width={800}
                  height={533}
                  alt={gallery.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full bg-neutral-200 object-cover"
                />
              ) : (
                <div className="aspect-[3/2] w-full bg-neutral-200" />
              )}
              <h2 className="mt-3 text-[22px] font-medium leading-[1.15] tracking-tight transition group-hover:opacity-60">
                {gallery.title}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}