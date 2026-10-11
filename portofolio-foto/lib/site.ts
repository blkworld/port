export const siteConfig = {
  name: 'Uncovered Cines',
  tagline: 'Street & travel photography',
  description: 'A personal photo journal: stories, travels and small things I come across.',
  email: 'hello@example.com',
  instagram: 'https://instagram.com/username',
  timeZone: 'Asia/Jakarta',
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: siteConfig.timeZone,
  }).format(new Date(iso))
}

export function formatMonthYear(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: siteConfig.timeZone,
  }).format(new Date(iso))
}

// ---- Social icons (bottom of the sidebar) ----
// Set to false to hide ALL icons at once.
export const showSocialIcons = true

// To hide a single icon, set its "show" to false.
// Replace "username" with your real account before turning one on.
export const socialLinks: {
  id: string
  label: string
  href: string
  show: boolean
}[] = [
  { id: 'instagram', label: 'Instagram', href: siteConfig.instagram, show: true },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@username', show: false },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@username', show: false },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/username', show: false },
  { id: 'email', label: 'Email', href: `mailto:${siteConfig.email}`, show: true },
]