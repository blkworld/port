import type { PortableText } from '@portabletext/react'
import type { SanityPhoto } from './image'

export type PortableTextValue = Parameters<typeof PortableText>[0]['value']

export interface Category {
  title: string
  slug: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  mainImage?: SanityPhoto
  body?: PortableTextValue
  categories?: Category[]
}

export interface ArchiveItem {
  _id: string
  title: string
  slug: string
  publishedAt: string
}

export interface CategoryItem extends Category {
  count: number
}

export interface PostLink {
  title: string
  slug: string
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "categories": categories[]->{ title, "slug": slug.current }
`

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...20]{ ${postFields} }`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`

export const slugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

export const archiveQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ _id, title, "slug": slug.current, publishedAt }`

export const categoriesQuery = `*[_type == "category" && defined(slug.current)] | order(title asc){
  title,
  "slug": slug.current,
  "count": count(*[_type == "post" && references(^._id)])
}`

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{ title, description }`

export const postsByCategoryQuery = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc){ ${postFields} }`

export const olderPostQuery = `*[_type == "post" && publishedAt < $date] | order(publishedAt desc)[0]{ title, "slug": slug.current }`

export const newerPostQuery = `*[_type == "post" && publishedAt > $date] | order(publishedAt asc)[0]{ title, "slug": slug.current }`

export interface Homepage {
  images?: SanityPhoto[]
}

export const homepageQuery = `*[_type == "homepage"][0]{ images }`

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  "categories": categories[]->{ title, "slug": slug.current }
`

export const postCardsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${cardFields} }`

export const postCardsByCategoryQuery = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc){ ${cardFields} }`

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