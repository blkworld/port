'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

// Satu warna latar untuk semua halaman. Ganti kodenya di sini kalau mau.
const BACKGROUND = 'bg-[#fffff]'

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // The admin panel uses the full screen, without the sidebar
  if (pathname.startsWith('/admin')) return <>{children}</>

  return (
    <div className={`min-h-screen ${BACKGROUND}`}>
      <Sidebar />
      <div className="lg:pl-[280px]">
        <div className="min-h-[80vh]">{children}</div>
        <Footer />
      </div>
    </div>
  )
}