export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-28'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
  'production'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
  'dummy-project'
)

function assertValue<T>(v: T | undefined, errorMessage: string, fallback: T): T {
  if (v === undefined) {
    // Only warn during build, don't throw
    if (typeof window === 'undefined') {
      console.warn(`[Sanity] ${errorMessage}. Using fallback value.`);
    }
    return fallback;
  }

  return v
}
