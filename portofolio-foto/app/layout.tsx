import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Chivo } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { siteConfig } from '@/lib/site'

const chivo = Chivo({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  icons: {
  icon: '/favicon.png',
  apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${chivo.className} text-neutral-900 antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}