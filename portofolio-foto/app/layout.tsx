import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Chivo } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { siteConfig } from '@/lib/site'
import { client } from '@/sanity/lib/client'
import { pageLinksQuery, type PageLink } from '@/sanity/lib/queries'

export const revalidate = 60

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
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pages = await client.fetch<PageLink[]>(pageLinksQuery)

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${chivo.className} text-neutral-900 antialiased`}
      >
        <SiteShell pages={pages}>{children}</SiteShell>
      </body>
    </html>
  )
}