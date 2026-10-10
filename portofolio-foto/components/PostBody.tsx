import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getDimensions, urlFor, type SanityPhoto } from '@/sanity/lib/image'
import type { PortableTextValue } from '@/sanity/lib/queries'

const WIDTHS = [800, 1200, 1600, 2400]

function Photo({ value }: { value: SanityPhoto }) {
  const ref = value?.asset?._ref
  if (!ref) return null

  const { width, height } = getDimensions(ref)

  const build = (w: number) =>
    urlFor(value).width(w).fit('max').auto('format').quality(80).url()

  const srcSet = WIDTHS.map((w) => `${build(w)} ${w}w`).join(', ')

  return (
    <figure className="mx-auto my-10 max-w-5xl sm:px-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={build(1600)}
        srcSet={srcSet}
        sizes="(min-width: 1024px) 960px, 100vw"
        width={width}
        height={height}
        alt={value.alt || ''}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
      {value.caption && (
        <figcaption className="mt-3 px-5 text-center text-sm text-neutral-500 sm:px-0">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mx-auto my-6 max-w-2xl px-5 text-[17px] leading-8 text-neutral-700 sm:px-8">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mx-auto mb-4 mt-14 max-w-2xl px-5 text-2xl font-medium tracking-tight sm:px-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mx-auto mb-3 mt-10 max-w-2xl px-5 text-xl font-medium sm:px-8">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mx-auto my-8 max-w-2xl px-5 text-lg italic leading-8 text-neutral-600 sm:px-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mx-auto my-6 max-w-2xl list-disc pl-10 pr-5 leading-8 text-neutral-700 sm:pl-14 sm:pr-8">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mx-auto my-6 max-w-2xl list-decimal pl-10 pr-5 leading-8 text-neutral-700 sm:pl-14 sm:pr-8">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-neutral-900"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityPhoto }) => <Photo value={value} />,
    gallery: ({ value }: { value: { images?: SanityPhoto[] } }) => (
      <div className="my-10">
        {(value.images ?? []).map((img, index) => (
          <Photo key={img._key ?? index} value={img} />
        ))}
      </div>
    ),
  },
}

export default function PostBody({ value }: { value?: PortableTextValue }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}