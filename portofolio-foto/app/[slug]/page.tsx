import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostBody from '@/components/PostBody'
import { client } from '@/sanity/lib/client'
import {
  pageBySlugQuery,
  pageSlugsQuery,
  type PageContent,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(pageSlugsQuery)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch<PageContent | null>(pageBySlugQuery, { slug })
  if (!page) return {}
  return { title: page.title }
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params
  const page = await client.fetch<PageContent | null>(pageBySlugQuery, { slug })

  if (!page) notFound()

  return (
    <main className="pb-24 pt-6 lg:pt-[70px]">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 px-5 text-3xl font-normal tracking-tight sm:text-4xl lg:px-14">
          {page.title}
        </h1>
        <PostBody value={page.body} />
      </div>
    </main>
  )
}
