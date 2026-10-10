import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostArticle from '@/components/PostArticle'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  newerPostQuery,
  olderPostQuery,
  postBySlugQuery,
  slugsQuery,
  type Post,
  type PostLink,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(slugsQuery)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug })
  if (!post) return {}

  const image = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug })

  if (!post) notFound()

  const [older, newer] = await Promise.all([
    client.fetch<PostLink | null>(olderPostQuery, { date: post.publishedAt }),
    client.fetch<PostLink | null>(newerPostQuery, { date: post.publishedAt }),
  ])

  return (
    <main className="pt-6 lg:pt-[70px]">
      <PostArticle post={post} />

      <nav className="mx-auto mb-24 grid max-w-[1300px] grid-cols-2 gap-6 px-5 text-sm lg:px-14">
        <div className="border-t border-neutral-200 pt-8">
          {older && (
            <Link href={`/post/${older.slug}`} className="group block">
              <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                ← Older
              </span>
              <span className="mt-1 block group-hover:opacity-60">
                {older.title}
              </span>
            </Link>
          )}
        </div>
        <div className="border-t border-neutral-200 pt-8 text-right">
          {newer && (
            <Link href={`/post/${newer.slug}`} className="group block">
              <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                Newer →
              </span>
              <span className="mt-1 block group-hover:opacity-60">
                {newer.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  )
}