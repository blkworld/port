import type { Metadata } from 'next'
import FilmCard from '@/components/FilmCard'
import { getYouTubeId } from '@/lib/youtube'
import { client } from '@/sanity/lib/client'
import { filmsQuery, type FilmCardData } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Films',
}

export default async function FilmsPage() {
  const films = await client.fetch<FilmCardData[]>(filmsQuery)

  // Skip films whose YouTube link is missing or invalid
  const items = films
    .map((film) => ({ film, videoId: getYouTubeId(film.youtubeUrl) }))
    .filter((item): item is { film: FilmCardData; videoId: string } =>
      Boolean(item.videoId)
    )

  return (
    <main className="px-5 pb-20 pt-6 lg:px-14 lg:pt-[70px]">
      {items.length === 0 ? (
        <p className="text-neutral-500">
          No films yet. Open <strong>/admin</strong>, choose{' '}
          <strong>Films</strong> and add your first one.
        </p>
      ) : (
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map(({ film, videoId }) => (
            <FilmCard
              key={film._id}
              href={`/films/${film.slug}`}
              title={film.title}
              videoId={videoId}
              cover={film.cover}
            />
          ))}
        </div>
      )}
    </main>
  )
}