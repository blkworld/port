'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Admin',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  document: {
    // dipakai Sanity untuk query internal
    productionUrl: undefined,
  },
})

export { apiVersion }