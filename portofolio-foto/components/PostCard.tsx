import ThumbCard from '@/components/ThumbCard'
import { formatDate } from '@/lib/site'
import type { Post } from '@/sanity/lib/queries'

export default function PostCard({ post }: { post: Post }) {
  const categories = (post.categories ?? []).map((c) => c.title).join(', ')
  const meta = `${categories ? `${categories} · ` : ''}${formatDate(post.publishedAt)}`

  return (
    <ThumbCard
      href={`/post/${post.slug}`}
      title={post.title}
      image={post.mainImage}
      meta={meta}
    />
  )
}