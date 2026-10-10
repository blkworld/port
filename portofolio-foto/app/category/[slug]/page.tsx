import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostArticle from '@/components/PostArticle'
import { client } from '@/sanity/lib/client'
import {
  categoryBySlugQuery,
  postsByCategoryQuery,
  type Post,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

type CategoryInfo = { title: string; description?: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await client.fetch<CategoryInfo | null>(categoryBySlugQuery, { slug })
  if (!category) return {}
  return {
    title: `#${category.title.toLowerCase()}`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const [category, posts] = await Promise.all([
    client.fetch<CategoryInfo | null>(categoryBySlugQuery, { slug }),
    client.fetch<Post[]>(postsByCategoryQuery, { slug }),
  ])

  if (!category) notFound()

  return (
    <main className="pt-14 sm:pt-20">
      <header className="mx-auto mb-20 max-w-2xl px-5 sm:px-8">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          #{category.title.toLowerCase()}
        </h1>
        {category.description && (
          <p className="mt-3 text-neutral-500">{category.description}</p>
        )}
      </header>

      {posts.map((post) => (
        <PostArticle key={post._id} post={post} />
      ))}

      {posts.length === 0 && (
        <p className="mx-auto max-w-2xl px-5 pb-32 text-neutral-500 sm:px-8">
          Belum ada postingan di kategori ini.
        </p>
      )}
    </main>
  )
}