import { defineArrayMember, defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Photos',
      description:
        'These photos appear on the homepage. Drag many photos here at once. Drag them around to change the order.',
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
  preview: {
    prepare() {
      return { title: 'Homepage Photos' }
    },
  },
})