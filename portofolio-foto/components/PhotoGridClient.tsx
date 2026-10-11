'use client'

import { useCallback, useState } from 'react'
import Lightbox, { type GridItem } from '@/components/Lightbox'

// Each photo goes into the shortest column, so the reading order
// stays left to right, like in the Studio.
function split(items: GridItem[], count: number) {
  const columns: number[][] = Array.from({ length: count }, () => [])
  const heights: number[] = Array(count).fill(0)

  items.forEach((item, index) => {
    let target = 0
    for (let i = 1; i < count; i++) {
      if (heights[i] < heights[target]) target = i
    }
    columns[target].push(index)
    heights[target] += item.height / item.width
  })

  return columns
}

function Columns({
  items,
  count,
  className,
  onOpen,
}: {
  items: GridItem[]
  count: number
  className: string
  onOpen: (index: number) => void
}) {
  return (
    <div className={`gap-2.5 ${className}`}>
      {split(items, count).map((column, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-2.5">
          {column.map((index) => {
            const item = items[index]
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpen(index)}
                aria-label={item.alt || `Open photo ${index + 1}`}
                className="block w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumb}
                  srcSet={item.thumbSet}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full bg-neutral-300"
                />
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function PhotoGridClient({ items }: { items: GridItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <>
      <Columns items={items} count={3} className="hidden lg:flex" onOpen={setOpenIndex} />
      <Columns items={items} count={2} className="hidden sm:flex lg:hidden" onOpen={setOpenIndex} />
      <Columns items={items} count={1} className="flex sm:hidden" onOpen={setOpenIndex} />

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={close}
          onChange={setOpenIndex}
        />
      )}
    </>
  )
}