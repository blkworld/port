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
          Hello, I&apos;m {siteConfig.name}. What started as a casual interest in travel videos and photography eventually led me to pick up a camera of my own. At the time, I was looking for something new outside my usual routine. One camera purchase later, I found myself exploring photography and filmmaking, learning as I went, and discovering a new way to experience the world around me.

I'm a full-time trader by profession, and photography started almost by accident. During breaks from trading, I'd often scroll through social media, watching travel videos and discovering places that looked interesting. Eventually, I thought, “That looks pretty cool. Maybe I'll buy a camera after my next profitable trade.” And so I did.

As I spent more time behind the camera, I became drawn to the atmosphere of a place, the way light changes throughout the day, and the little details that make ordinary scenes interesting. Photography became a reason to step away from my routine, explore somewhere new, and see things from a different perspective.

The name Bluehour Cinema is inspired by the blue hour, that brief transition between day and night when the light shifts and familiar surroundings take on a different character. I liked the idea of a moment that exists between two states: temporary, atmospheric, and impossible to recreate exactly. It felt like a fitting name for a space dedicated to photography and film.

Through Bluehour Cinema, I share the places I explore, the moments that catch my eye, and my ongoing journey into photography and filmmaking. I'm still learning, experimenting, and developing my own visual style. For now, it's about exploring the world, finding inspiration in unexpected places, and capturing whatever feels worth remembering.
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