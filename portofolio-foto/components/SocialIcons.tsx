import type { ReactNode } from 'react'
import { showSocialIcons, socialLinks } from '@/lib/site'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<string, ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </>
  ),
}

export default function SocialIcons({ size = 'md' }: { size?: 'md' | 'lg' }) {
  if (!showSocialIcons) return null

  const items = socialLinks.filter((s) => s.show && s.href && icons[s.id])
  if (items.length === 0) return null

  const box = size === 'lg' ? 'h-7 w-7' : 'h-[18px] w-[18px]'
  const gap = size === 'lg' ? 'gap-7' : 'gap-5'

  return (
    <ul className={`flex items-center ${gap}`}>
      {items.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="block text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <svg viewBox="0 0 24 24" className={box} aria-hidden="true" {...strokeProps}>
              {icons[s.id]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}