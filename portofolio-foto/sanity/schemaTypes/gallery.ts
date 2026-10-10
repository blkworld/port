import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Appears in the left menu, e.g. Lithic',
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
      name: 'order',
      title: 'Menu order',
      description:
        '1 = first in the menu and shown on the homepage. 2 = second, and so on.',
      type: 'number',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      description:
        'Drag many photos here at once. Drag them around to change the order.',
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
  ],
  orderings: [
    {
      title: 'Menu order',
      name: 'menuOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'images.0' },
  },
})