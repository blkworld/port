import Link from 'next/link'
import { formatDate } from '@/lib/site'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/queries'

const WIDTHS = [500, 800, 1200]

export default function PostCard({ post }: { post: Post }) {
  const cover = post.mainImage
  const categories = (post.categories ?? []).map((c) => c.title).join(', ')

  const build = (w: number) =>
    urlFor(cover!)
      .width(w)
      .height(Math.round((w * 9) / 16))
      .fit('crop')
      .auto('format')
      .quality(80)
      .url()

  return (
    <article>
      <Link href={`/post/${post.slug}`} className="group block">
        {cover?.asset ? (
          <img
            src={build(800)}
            srcSet={WIDTHS.map((w) => `${build(w)} ${w}w`).join(', ')}
            sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
            width={800}
            height={450}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full bg-neutral-200 object-cover"
          />
        ) : (
          <div className="aspect-video w-full bg-neutral-200" />
        )}

        <h2 className="mt-3 text-[22px] font-medium leading-[1.15] tracking-tight transition group-hover:opacity-60">
          {post.title}
        </h2>
      </Link>

      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
        {categories && `${categories} · `}
        {formatDate(post.publishedAt)}
      </p>
    </article>
  )
}