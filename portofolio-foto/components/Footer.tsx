import { siteConfig } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6 text-xs text-neutral-500 lg:pr-20">
      © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </footer>
  )
}