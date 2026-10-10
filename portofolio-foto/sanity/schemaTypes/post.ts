import { defineArrayMember, defineField, defineType } from 'sanity'

const photoMember = defineArrayMember({
  type: 'image',
  title: 'Photo',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text (short description of the photo, for SEO)',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional, shown under the photo)',
      type: 'string',
    }),
  ],
})

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Click Generate to create it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary (for Google and link previews)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover photo (thumbnail on the Blog page)',
      description: 'Shown as the thumbnail on the Blog page and in link previews. Not shown inside the post.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Category / Tag',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Post content (photos + text)',
      description:
        'Use the Insert (+) button to add a photo or a gallery. Drag blocks to reorder.',
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
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
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
              description:
                'Drag many photos here at once. Drag them around to reorder.',
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
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'mainImage' },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('en-US') : '',
        media,
      }
    },
  },
})