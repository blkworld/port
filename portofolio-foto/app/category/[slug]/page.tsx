import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { client } from '@/sanity/lib/client'
import {
  categoryBySlugQuery,
  postCardsByCategoryQuery,
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
    title: category.title,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const [category, posts] = await Promise.all([
    client.fetch<CategoryInfo | null>(categoryBySlugQuery, { slug }),
    client.fetch<Post[]>(postCardsByCategoryQuery, { slug }),
  ])

  if (!category) notFound()

  return (
    <main className="px-5 pb-20 pt-6 lg:px-14 lg:pt-[70px]">
      <header className="mb-14">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          Category
        </p>
        <h1 className="mt-2 text-3xl font-normal tracking-tight">
          {category.title}
        </h1>
        {category.description && (
          <p className="mt-3 text-neutral-500">{category.description}</p>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts in this category yet.</p>
      ) : (
        <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}