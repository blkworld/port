import PhotoGrid from '@/components/PhotoGrid'
import { client } from '@/sanity/lib/client'
import { homepageQuery, type Homepage } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function HomePage() {
  const home = await client.fetch<Homepage | null>(homepageQuery)
  const images = home?.images ?? []

  if (images.length === 0) {
    return (
      <main className="px-5 py-20 text-neutral-500 lg:pr-20 lg:pt-[70px]">
        No photos yet. Open <strong>/admin</strong>, choose{' '}
        <strong>Homepage Photos</strong> and upload your first photos.
      </main>
    )
  }

  return (
    <main className="px-5 pb-16 pt-2 lg:pr-20 lg:pt-[70px]">
      <PhotoGrid images={images} />
    </main>
  )
}