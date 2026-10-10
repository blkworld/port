import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate, formatMonthYear } from '@/lib/site'
import { client } from '@/sanity/lib/client'
import {
  archiveQuery,
  categoriesQuery,
  type ArchiveItem,
  type CategoryItem,
} from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Archive',
}

export default async function ArchivePage() {
  const [posts, categories] = await Promise.all([
    client.fetch<ArchiveItem[]>(archiveQuery),
    client.fetch<CategoryItem[]>(categoriesQuery),
  ])

  const groups = new Map<string, ArchiveItem[]>()
  for (const post of posts) {
    const key = formatMonthYear(post.publishedAt)
    const list = groups.get(key) ?? []
    list.push(post)
    groups.set(key, list)
  }

  return (
    <main className="mx-auto max-w-2xl px-5 pb-32 pt-14 sm:px-8 sm:pt-20">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Archive</h1>

      {categories.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
            Kategori
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-neutral-700">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-neutral-900">
                  #{c.title.toLowerCase()}{' '}
                  <span className="text-sm text-neutral-400">({c.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14 space-y-12">
        {Array.from(groups.entries()).map(([month, items]) => (
          <div key={month}>
            <h2 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              {month}
            </h2>
            <ul className="space-y-3">
              {items.map((post) => (
                <li key={post._id} className="flex items-baseline gap-4">
                  <span className="w-28 shrink-0 text-sm text-neutral-400">
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link href={`/post/${post.slug}`} className="hover:opacity-60">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-neutral-500">Belum ada postingan.</p>
        )}
      </section>
    </main>
  )
}