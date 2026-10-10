'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { siteConfig } from '@/lib/site'

type NavLink = {
  label: string
  href: string
  external?: boolean
  active?: boolean
}

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const blogActive =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/post') ||
    pathname.startsWith('/category')

  const mainLinks: NavLink[] = [
    { label: 'Photos', href: '/', active: pathname === '/' },
    { label: 'Blog', href: '/blog', active: blogActive },
    { label: 'About', href: '/about', active: pathname === '/about' },
  ]

  const secondaryLinks: NavLink[] = [
    { label: 'Archive', href: '/archive', active: pathname === '/archive' },
    { label: 'Instagram', href: siteConfig.instagram, external: true },
    { label: 'Email', href: `mailto:${siteConfig.email}`, external: true },
  ]

  // One style for every menu item
  const itemClass = (active?: boolean) =>
    `block text-[11px] uppercase tracking-[0.14em] transition-colors ${
      active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
    }`

  const renderLink = (link: NavLink) => (
    <li key={link.label}>
      {link.external ? (
        <a
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={itemClass()}
        >
          {link.label}
        </a>
      ) : (
        <Link
          href={link.href}
          onClick={close}
          className={itemClass(link.active)}
        >
          {link.label}
        </Link>
      )}
    </li>
  )

  return (
    <>
      {/* Top bar on phones and tablets */}
      <div className="flex items-center justify-between px-5 py-5 lg:hidden">
        <Link
          href="/"
          onClick={close}
          className="text-[17px] font-bold tracking-tight text-neutral-900"
        >
          {siteConfig.name}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="text-[11px] uppercase tracking-[0.14em] text-neutral-600"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar (always visible on desktop, toggled on mobile) */}
      <aside
        className={`${
          open ? 'block' : 'hidden'
        } px-5 pb-8 lg:fixed lg:left-0 lg:top-0 lg:block lg:h-screen lg:w-[280px] lg:overflow-y-auto lg:pb-10 lg:pl-[70px] lg:pr-6 lg:pt-[62px]`}
      >
        <Link
          href="/"
          onClick={close}
          className="hidden text-[17px] font-bold tracking-tight text-neutral-900 lg:block"
        >
          {siteConfig.name}
        </Link>

        <nav className="lg:mt-14">
          <ul className="space-y-2">{mainLinks.map(renderLink)}</ul>
          <ul className="mt-10 space-y-2">{secondaryLinks.map(renderLink)}</ul>
        </nav>
      </aside>
    </>
  )
}