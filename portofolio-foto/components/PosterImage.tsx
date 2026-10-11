'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export default function PosterImage({
  sources,
  alt,
  className,
  eager = false,
}: {
  sources: string[]
  alt: string
  className?: string
  eager?: boolean
}) {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLImageElement>(null)
  const last = sources.length - 1

  const next = useCallback(
    () => setIndex((i) => (i < last ? i + 1 : i)),
    [last]
  )

  // YouTube answers with a tiny 120x90 grey picture when a size does not exist
  const check = useCallback(
    (img: HTMLImageElement) => {
      if (img.naturalWidth > 0 && img.naturalWidth <= 120) next()
    },
    [next]
  )

  // The image may finish loading before React takes over
  useEffect(() => {
    const img = ref.current
    if (!img || !img.complete) return
    if (img.naturalWidth === 0) next()
    else check(img)
  }, [index, next, check])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={sources[index]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={next}
      onLoad={(e) => check(e.currentTarget)}
    />
  )
}