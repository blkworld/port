'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Admin',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage Photos')
              .id('homepage')
              .child(
                S.document().schemaType('homepage').documentId('homepage')
              ),
            S.divider(),
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('category').title('Categories / Tags'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Homepage Photos hanya boleh ada satu, jadi disembunyikan dari tombol "New"
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== 'homepage'),
  },
})