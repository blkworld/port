'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // The admin panel uses the full screen, without the sidebar
  if (pathname.startsWith('/admin')) return <>{children}</>

  return (
    <div className="min-h-screen">
      <Sidebar />
      {/* flex-col + flex-1 pushes the footer to the bottom on short pages */}
      <div className="flex min-h-screen flex-col lg:pl-[280px]">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  )
}