import { defineArrayMember, defineField, defineType } from 'sanity'

// Alamat yang sudah dipakai website, tidak boleh dipakai halaman baru
const reserved = ['blog', 'archive', 'admin', 'post', 'category', 'api']

const photoMember = defineArrayMember({
  type: 'image',
  title: 'Photo',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text (short description of the photo)',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional, shown under the photo)',
      type: 'string',
    }),
  ],
})

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Shown at the top of the page and in the left menu, e.g. About',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description:
        'Click Generate. A page with the slug "about" will live at yourwebsite.com/about.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current
          if (current && reserved.includes(current)) {
            return 'This address is reserved by the website. Please choose another one.'
          }
          return true
        }),
    }),
    defineField({
      name: 'showInMenu',
      title: 'Show in the left menu',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'menuOrder',
      title: 'Menu order',
      description: 'Smaller numbers appear higher in the menu (1, 2, 3...).',
      type: 'number',
    }),
    defineField({
      name: 'body',
      title: 'Page content',
      description:
        'Type your text. Use the Insert (+) button to add a photo or a gallery. Drag blocks to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Paragraph',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Large heading', value: 'h2' },
            { title: 'Small heading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                ],
              },
            ],
          },
        }),
        photoMember,
        defineArrayMember({
          name: 'gallery',
          title: 'Gallery (many photos at once)',
          type: 'object',
          fields: [
            defineField({
              name: 'images',
              title: 'Photos',
              description: 'Drag many photos here at once.',
              type: 'array',
              of: [photoMember],
              options: { layout: 'grid' },
            }),
          ],
          preview: {
            select: { images: 'images' },
            prepare({ images }) {
              const count = Array.isArray(images) ? images.length : 0
              return {
                title: `Gallery (${count} photos)`,
                media: Array.isArray(images) ? images[0] : undefined,
              }
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Menu order',
      name: 'menuOrder',
      by: [{ field: 'menuOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : '' }
    },
  },
})