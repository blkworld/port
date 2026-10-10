'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import type { PageLink } from '@/sanity/lib/queries'

export default function SiteShell({
  pages,
  children,
}: {
  pages: PageLink[]
  children: ReactNode
}) {
  const pathname = usePathname()

  // The admin panel uses the full screen, without the sidebar
  if (pathname.startsWith('/admin')) return <>{children}</>

  // Home is light grey (photo grid), every other page is white
  const background = pathname === '/' ? 'bg-[#e8eaec]' : 'bg-white'

  return (
    <div className={`min-h-screen ${background}`}>
      <Sidebar pages={pages} />
      <div className="lg:pl-[280px]">
        <div className="min-h-[80vh]">{children}</div>
        <Footer />
      </div>
    </div>
  )
}