import { defineField, defineType } from 'sanity'
import { getYouTubeId } from '../../lib/youtube'

export const filmType = defineType({
  name: 'film',
  title: 'Film',
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
      description: 'Click Generate to create it from the title.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube link',
      description:
        'Paste the normal YouTube link. The video must be Public or Unlisted, and "Allow embedding" must be on in YouTube.',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          return getYouTubeId(value)
            ? true
            : 'This does not look like a YouTube link'
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo (optional)',
      description:
        'If empty, the YouTube thumbnail is used automatically. Upload one to use your own.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Order (optional)',
      description:
        'Smaller numbers appear first (1, 2, 3...). If empty, the newest film appears first.',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'youtubeUrl', media: 'cover' },
  },
})