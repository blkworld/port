import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category / Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'string',
      description: 'Example: Street, Travel, Essay',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})