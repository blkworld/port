import Link from 'next/link'
import PostBody from '@/components/PostBody'
import { formatDate } from '@/lib/site'
import type { Post } from '@/sanity/lib/queries'

export default function PostArticle({
  post,
  asLink = true,
}: {
  post: Post
  asLink?: boolean
}) {
  return (
    <article className="mb-32 sm:mb-48">
      <header className="mx-auto mb-10 max-w-2xl px-5 sm:px-8">
        <time
          dateTime={post.publishedAt}
          className="block text-xs uppercase tracking-widest text-neutral-400"
        >
          {formatDate(post.publishedAt)}
        </time>

        {asLink ? (
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            <Link href={`/post/${post.slug}`} className="transition hover:opacity-60">
              {post.title}
            </Link>
          </h2>
        ) : (
          <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            {post.title}
          </h1>
        )}
      </header>

      <PostBody value={post.body} />

      {post.categories && post.categories.length > 0 && (
        <footer className="mx-auto mt-10 max-w-2xl px-5 sm:px-8">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
            {post.categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="transition hover:text-neutral-900"
                >
                  #{c.title.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}