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