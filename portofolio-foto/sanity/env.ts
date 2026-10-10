function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage)
  }
  return v
}

export const apiVersion = '2025-01-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Isi NEXT_PUBLIC_SANITY_DATASET di file .env.local'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Isi NEXT_PUBLIC_SANITY_PROJECT_ID di file .env.local'
)