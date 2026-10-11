'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SocialIcons from '@/components/SocialIcons'
import { siteConfig } from '@/lib/site'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Lock page scrolling while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close with the Escape key, or when the window becomes desktop-size
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const links = [
    { label: 'Photos', href: '/', active: pathname === '/' },
    { label: 'Gallery', href: '/gallery', active: pathname.startsWith('/gallery') },
    }
      label: 'Blog',
      href: '/blog',
      active:
        pathname.startsWith('/blog') ||
        pathname.startsWith('/post') ||
        pathname.startsWith('/category'),
    },
    { label: 'About', href: '/about', active: pathname === '/about' },
  ]

  const itemClass = (active: boolean) =>
    `block w-fit text-[11px] uppercase tracking-[0.14em] transition-colors ${
      active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
    }`

  const bar = 'absolute left-2.5 h-[2px] w-5 bg-neutral-900 transition-all duration-300'

  return (
    <>
      {/* ===== Mobile / tablet: sticky top bar ===== */}
      <div className="sticky top-0 z-[60] flex items-center justify-between bg-[var(--site-bg)] px-5 py-4 lg:hidden">
        <Link
          href="/"
          onClick={close}
          className="text-[17px] font-bold tracking-tight text-neutral-900"
        >
          {siteConfig.name}
        </Link>

        {/* Hamburger that morphs into an X */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative -mr-2 h-10 w-10"
        >
          <span
            className={`${bar} top-[13px] ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`${bar} top-[19px] ${open ? 'scale-x-0 opacity-0' : ''}`}
          />
          <span
            className={`${bar} top-[25px] ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* ===== Mobile / tablet: full-screen menu ===== */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-[var(--site-bg)] px-5 pb-10 pt-28 transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav>
          <ul className="space-y-7">
            {links.map((link, i) => (
              <li
                key={link.label}
                className={`transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  onClick={close}
                  className={`block w-fit text-[30px] uppercase leading-none tracking-[0.14em] transition-colors ${
                    link.active ? 'text-neutral-900' : 'text-neutral-500'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <SocialIcons size="lg" />
        </div>
      </div>

      {/* ===== Desktop: fixed left sidebar ===== */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[280px] lg:flex-col lg:overflow-y-auto lg:pb-10 lg:pl-[70px] lg:pr-6 lg:pt-[62px]">
        <Link
          href="/"
          className="w-fit text-[17px] font-bold tracking-tight text-neutral-900"
        >
          {siteConfig.name}
        </Link>

        <nav className="mt-14 pl-[3px]">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={itemClass(link.active)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pl-[3px] pt-10">
          <SocialIcons />
        </div>
      </aside>
    </>
  )
}