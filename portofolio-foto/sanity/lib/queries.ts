import type { SanityPhoto } from './image'

// ---------- Homepage photos ----------

export interface Homepage {
  images?: SanityPhoto[]
}

export const homepageQuery = `*[_type == "homepage"][0]{ images }`

// ---------- Galleries ----------

export interface GalleryCard {
  _id: string
  title: string
  slug: string
  cover?: SanityPhoto
}

export interface GalleryDetail {
  title: string
  images?: SanityPhoto[]
}

export const galleriesQuery = `*[_type == "photoGallery" && defined(slug.current)] | order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  "cover": select(
    defined(cover.asset) => cover,
    images[defined(asset)][0]
  )
}`

export const galleryBySlugQuery = `*[_type == "photoGallery" && slug.current == $slug][0]{ title, images }`

export const gallerySlugsQuery = `*[_type == "photoGallery" && defined(slug.current)]{ "slug": slug.current }`

// ---------- Films ----------

export interface FilmCardData {
  _id: string
  title: string
  slug: string
  youtubeUrl?: string
  cover?: SanityPhoto
}

export interface FilmDetail {
  title: string
  description?: string
  youtubeUrl?: string
  cover?: SanityPhoto
}

export const filmsQuery = `*[_type == "film" && defined(slug.current)] | order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  youtubeUrl,
  cover
}`

export const filmBySlugQuery = `*[_type == "film" && slug.current == $slug][0]{ title, description, youtubeUrl, cover }`

export const filmSlugsQuery = `*[_type == "film" && defined(slug.current)]{ "slug": slug.current }`