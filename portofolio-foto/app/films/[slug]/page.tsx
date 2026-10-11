import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import YouTubePlayer from '@/components/YouTubePlayer'
import { getYouTubeId, posterSources } from '@/lib/youtube'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  filmBySlugQuery,
  filmSlugsQuery,
  type FilmDetail,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(filmSlugsQuery)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const film = await client.fetch<FilmDetail | null>(filmBySlugQuery, { slug })
  if (!film) return {}

  const id = getYouTubeId(film.youtubeUrl)
  const image = film.cover?.asset
    ? urlFor(film.cover).width(1200).height(630).fit('crop').url()
    : id
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : undefined

  return {
    title: film.title,
    description: film.description,
    openGraph: {
      title: film.title,
      description: film.description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params
  const film = await client.fetch<FilmDetail | null>(filmBySlugQuery, { slug })
  if (!film) notFound()

  const videoId = getYouTubeId(film.youtubeUrl)
  if (!videoId) notFound()

  const coverUrl = film.cover?.asset
    ? urlFor(film.cover).width(1600).height(900).fit('crop').auto('format').quality(80).url()
    : undefined
  const posters = coverUrl
    ? [coverUrl, ...posterSources(videoId)]
    : posterSources(videoId)

  return (
    <main className="px-5 pb-20 pt-6 lg:pr-20 lg:pt-[70px]">
      <header className="mb-8">
        <Link
          href="/films"
          className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-neutral-900"
        >
          ← Films
        </Link>
        <h1 className="mt-3 text-3xl font-normal tracking-tight">{film.title}</h1>
      </header>

      <div className="max-w-5xl">
        <YouTubePlayer videoId={videoId} title={film.title} posters={posters} />
      </div>

      {film.description && (
        <p className="mt-8 max-w-2xl whitespace-pre-line text-[16px] leading-[1.85] text-neutral-700">
          {film.description}
        </p>
      )}
    </main>
  )
}