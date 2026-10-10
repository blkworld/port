import type { Metadata } from 'next'
import PostArticle from '@/components/PostArticle'
import { client } from '@/sanity/lib/client'
import { postsQuery, type Post } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(postsQuery)

  return (
    <main className="pt-14 sm:pt-20">
      {posts.length === 0 ? (
        <p className="mx-auto max-w-2xl px-5 py-32 text-center text-neutral-500 sm:px-8">
          No posts yet. Open <strong>/admin</strong> to write your first post.
        </p>
      ) : (
        posts.map((post) => <PostArticle key={post._id} post={post} />)
      )}
    </main>
  )
}