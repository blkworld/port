'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import type { GalleryLink } from '@/sanity/lib/queries'

export default function SiteShell({
  galleries,
  children,
}: {
  galleries: GalleryLink[]
  children: ReactNode
}) {
  const pathname = usePathname()

  // The admin panel uses the full screen, without the sidebar
  if (pathname.startsWith('/admin')) return <>{children}</>

  return (
    <>
      <Sidebar galleries={galleries} />
      <div className="lg:pl-[280px]">
        <div className="min-h-[80vh]">{children}</div>
        <Footer />
      </div>
    </>
  )
}