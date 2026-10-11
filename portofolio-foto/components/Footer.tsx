import { siteConfig } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-10 text-xs text-neutral-500">
      <div className="flex h-[18px] items-center justify-center">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  )
}