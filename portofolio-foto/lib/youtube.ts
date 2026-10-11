const ID = /^[\w-]{11}$/

// Accepts a normal YouTube link (watch, youtu.be, shorts, embed) or a plain video ID
export function getYouTubeId(input?: string | null): string | null {
  if (!input) return null
  const value = input.trim()
  if (ID.test(value)) return value

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`)
    const host = url.hostname.replace(/^(www|m)\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0] ?? ''
      return ID.test(id) ? id : null
    }

    if (
      host === 'youtube.com' ||
      host === 'youtube-nocookie.com' ||
      host === 'music.youtube.com'
    ) {
      const v = url.searchParams.get('v')
      if (v && ID.test(v)) return v
      const [kind, id] = url.pathname.split('/').filter(Boolean)
      if (['embed', 'shorts', 'live', 'v'].includes(kind) && ID.test(id ?? '')) {
        return id
      }
    }
  } catch {
    // not a valid link
  }

  return null
}

// Best quality first. If a size does not exist, the next one is used.
export function posterSources(id: string) {
  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ]
}