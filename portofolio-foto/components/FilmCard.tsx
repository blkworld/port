import Link from 'next/link'
import PosterImage from '@/components/PosterImage'
import { posterSources } from '@/lib/youtube'
import { urlFor, type SanityPhoto } from '@/sanity/lib/image'

export default function FilmCard({
  href,
  title,
  videoId,
  cover,
}: {
  href: string
  title: string
  videoId: string
  cover?: SanityPhoto
}) {
  const coverUrl = cover?.asset
    ? urlFor(cover).width(900).height(506).fit('crop').auto('format').quality(80).url()
    : undefined
  const sources = coverUrl
    ? [coverUrl, ...posterSources(videoId)]
    : posterSources(videoId)

  return (
    <article>
      <Link href={href} className="group block">
        <div className="aspect-video w-full overflow-hidden bg-neutral-200">
          <PosterImage
            sources={sources}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-3 text-[22px] font-medium leading-[1.15] tracking-tight transition group-hover:opacity-60">
          {title}
        </h2>
      </Link>
    </article>
  )
}