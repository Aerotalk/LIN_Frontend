import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Provide fallback values for build time
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Warn if using dummy values
if (projectId === "dummy-project" && typeof window === "undefined") {
  console.warn("[Sanity] Using dummy project ID. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01", // or a specific date <= today's
  useCdn: process.env.NODE_ENV === "production",
});

// Add logging to sanityClient.fetch
const originalFetch = sanityClient.fetch.bind(sanityClient);
sanityClient.fetch = (async (query: string, params?: any, options?: any) => {
  console.log(`[Sanity Request] Entering query:`, typeof query === 'string' ? query.substring(0, 100) + (query.length > 100 ? '...' : '') : query);

  try {
    const result = await originalFetch(query, params, options);
    console.log(`[Sanity Response] Success for query`);
    return result;
  } catch (error) {
    console.error(`[Sanity Error] Database query failed:`, error);
    throw error;
  }
}) as any;

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
