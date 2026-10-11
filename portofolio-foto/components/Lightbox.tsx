'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type GridItem = {
  id: string
  thumb: string
  thumbSet: string
  full: string
  fullSet: string
  width: number
  height: number
  alt: string
}

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GridItem[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}) {
  const [shown, setShown] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = items.length
  const item = items[index]

  const go = useCallback(
    (dir: 1 | -1) => onChange((index + dir + count) % count),
    [index, count, onChange]
  )

  // Fade in
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Keyboard: Esc closes, arrows move
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Lock page scrolling while open
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Preload the next and previous photo so swiping feels instant
  useEffect(() => {
    if (count < 2) return
    ;[1, -1].forEach((dir) => {
      const neighbour = items[(index + dir + count) % count]
      if (neighbour) {
        const img = new window.Image()
        img.sizes = '100vw'
        img.srcset = neighbour.fullSet
        img.src = neighbour.full
      }
    })
  }, [index, items, count])

  if (!item) return null

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b]/95 transition-opacity duration-300 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Counter */}
      <p className="absolute left-5 top-5 text-[11px] uppercase tracking-[0.14em] text-white/60">
        {index + 1} / {count}
      </p>

      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          stop(e)
          onClose()
        }}
        aria-label="Close"
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>

      {/* Previous */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            stop(e)
            go(-1)
          }}
          aria-label="Previous photo"
          className="absolute left-1 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white/60 transition-colors hover:text-white sm:left-4"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            stop(e)
            go(1)
          }}
          aria-label="Next photo"
          className="absolute right-1 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white/60 transition-colors hover:text-white sm:right-4"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={item.id}
        src={item.full}
        srcSet={item.fullSet}
        sizes="100vw"
        alt={item.alt}
        onClick={stop}
        draggable={false}
        className="max-h-[88dvh] max-w-[94vw] select-none object-contain"
      />
    </div>
  )
}