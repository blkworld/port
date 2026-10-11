import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getDimensions, urlFor, type SanityPhoto } from '@/sanity/lib/image'
import type { PortableTextValue } from '@/sanity/lib/queries'

const WIDTHS = [800, 1200, 1600, 2400]
const wrap = 'mx-auto max-w-[1300px] px-5 lg:px-14'

// Removes spaces and invisible characters
const clean = (text: string) =>
  text.replace(/[\s\u200B-\u200D\u2060\uFEFF]/g, '')

// True when a text block has no visible text
function isEmptyBlock(value: { children?: unknown }) {
  const children = (value.children ?? []) as { _type?: string; text?: string }[]
  return children.every(
    (child) => child._type === 'span' && clean(child.text ?? '') === ''
  )
}

function Photo({ value }: { value: SanityPhoto }) {
  const ref = value?.asset?._ref
  if (!ref) return null

  const { width, height } = getDimensions(ref)

  const build = (w: number) =>
    urlFor(value).width(w).fit('max').auto('format').quality(80).url()

  const srcSet = WIDTHS.map((w) => `${build(w)} ${w}w`).join(', ')
  const caption = value.caption?.trim()

  return (
    // Padding (not margin) so the space above and below is always equal
    <figure className={`${wrap} py-6`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={build(1600)}
        srcSet={srcSet}
        sizes="(min-width: 1536px) 1300px, 100vw"
        width={width}
        height={height}
        alt={value.alt || ''}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      // Skip empty paragraphs so extra Enter presses do not add blank space
      if (isEmptyBlock(value)) return null
      return (
        <p className={`${wrap} my-6 text-[16px] leading-[1.85] text-neutral-800`}>
          {children}
        </p>
      )
    },
    h2: ({ children }) => (
      <h2 className={`${wrap} mb-4 mt-14 text-2xl font-medium tracking-tight`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={`${wrap} mb-3 mt-10 text-xl font-medium`}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`${wrap} my-8 text-lg italic leading-8 text-neutral-600`}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={`${wrap} my-6 list-disc pl-10 leading-8 text-neutral-800 lg:pl-20`}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={`${wrap} my-6 list-decimal pl-10 leading-8 text-neutral-800 lg:pl-20`}
      >
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
      <div>
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