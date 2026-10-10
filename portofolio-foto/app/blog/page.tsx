import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { client } from '@/sanity/lib/client'
import { postCardsQuery, type Post } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(postCardsQuery)

  return (
    <main className="px-5 pb-20 pt-6 lg:px-14 lg:pt-[70px]">
      {posts.length === 0 ? (
        <p className="text-neutral-500">
          No posts yet. Open <strong>/admin</strong> to write your first post.
        </p>
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