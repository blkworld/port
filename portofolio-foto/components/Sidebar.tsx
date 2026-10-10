'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { siteConfig } from '@/lib/site'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const linkClass = (active: boolean) =>
    `block transition-colors ${
      active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
    }`

  const blogActive =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/post') ||
    pathname.startsWith('/category')

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
          className="text-xs uppercase tracking-widest text-neutral-600"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

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

        <nav className="lg:mt-14 lg:pl-[3px]">
          <ul className="space-y-[7px] text-[15px]">
            <li>
              <Link href="/" onClick={close} className={linkClass(pathname === '/')}>
                Photos
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={close} className={linkClass(blogActive)}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={close}
                className={linkClass(pathname === '/about')}
              >
                About
              </Link>
            </li>
          </ul>

          <ul className="mt-10 space-y-[7px] text-[15px]">
            <li>
              <Link
                href="/archive"
                onClick={close}
                className={linkClass(pathname === '/archive')}
              >
                Archive
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass(false)}
              >
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className={linkClass(false)}>
                Email
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}