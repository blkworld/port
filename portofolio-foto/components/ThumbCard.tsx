import Link from 'next/link'
import { urlFor, type SanityPhoto } from '@/sanity/lib/image'

const WIDTHS = [500, 800, 1200]

export default function ThumbCard({
  href,
  title,
  image,
  meta,
}: {
  href: string
  title: string
  image?: SanityPhoto
  meta?: string
}) {
  const build = (w: number) =>
    urlFor(image!)
      .width(w)
      .height(Math.round((w * 2) / 3))
      .fit('crop')
      .auto('format')
      .quality(80)
      .url()

  return (
    <article>
      <Link href={href} className="group block">
        {image?.asset ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={build(800)}
            srcSet={WIDTHS.map((w) => `${build(w)} ${w}w`).join(', ')}
            sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
            width={800}
            height={533}
            alt={title}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full bg-neutral-200 object-cover"
          />
        ) : (
          <div className="aspect-[3/2] w-full bg-neutral-200" />
        )}

        <h2 className="mt-3 text-[22px] font-medium leading-[1.15] tracking-tight transition group-hover:opacity-60">
          {title}
        </h2>
      </Link>

      {meta && (
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
          {meta}
        </p>
      )}
    </article>
  )
}