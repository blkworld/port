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
              .title('Photos (homepage)')
              .id('homepage')
              .child(
                S.document().schemaType('homepage').documentId('homepage')
              ),
            S.documentTypeListItem('film').title('Films'),
            S.documentTypeListItem('photoGallery').title('Galleries'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Homepage Photos exists only once, so hide it from "New"
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== 'homepage'),
  },
})