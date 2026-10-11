import { defineArrayMember, defineField, defineType } from 'sanity'

export const photoGalleryType = defineType({
  name: 'photoGallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Example: Tokyo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'Click Generate to create it from the title.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      description:
        'Drag many photos here at once, or click Upload and select many files. Drag them around to change the order.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text (short description of the photo)',
              type: 'string',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo (optional)',
      description:
        'Shown on the Gallery page. If empty, the first photo above is used.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Order (optional)',
      description:
        'Smaller numbers appear first (1, 2, 3...). If empty, the newest gallery appears first.',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'images.0' },
  },
})