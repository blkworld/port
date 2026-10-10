import Link from 'next/link'
import PostBody from '@/components/PostBody'
import { formatDate } from '@/lib/site'
import type { Post } from '@/sanity/lib/queries'

export default function PostArticle({ post }: { post: Post }) {
  const categories = post.categories ?? []

  return (
    <article className="mb-24">
      <header className="mx-auto mb-14 max-w-[1300px] px-5 text-center lg:px-14">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          {categories.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && ', '}
              <Link
                href={`/category/${c.slug}`}
                className="transition hover:text-neutral-900"
              >
                {c.title}
              </Link>
            </span>
          ))}
          {categories.length > 0 && ' · '}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <h1 className="mt-5 text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
      </header>

      <PostBody value={post.body} />
    </article>
  )
}