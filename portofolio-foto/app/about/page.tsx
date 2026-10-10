import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <main className="max-w-2xl px-5 pb-32 pt-8 lg:pr-8 lg:pt-[70px]">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">About</h1>

      <div className="mt-8 space-y-6 text-[17px] leading-8 text-neutral-700">
        <p>
          Hello, I&apos;m {siteConfig.name}. Replace this paragraph with a short
          story about yourself, your photography, and what you look for through
          the lens.
        </p>
        <p>
          A second paragraph can cover the gear you use, the city you live in,
          or the project you are working on.
        </p>
      </div>

      <section id="contact" className="mt-20 scroll-mt-24">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400">
          Contact
        </h2>
        <p className="mt-4 text-neutral-700">
          Email:{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline underline-offset-4 hover:text-neutral-900"
          >
            {siteConfig.email}
          </a>
        </p>
        <p className="mt-2 text-neutral-700">
          Instagram:{' '}
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-neutral-900"
          >
            {siteConfig.instagram.replace('https://', '')}
          </a>
        </p>
      </section>
    </main>
  )
}