import { cache } from 'react';
import { client } from './sanity';

/**
 * Cached fetch wrapper for Sanity queries.
 *
 * Uses React's cache() for request deduplication within a single render,
 * and Next.js revalidate for ISR caching.
 *
 * @param query - GROQ query string
 * @param params - Query parameters (optional)
 * @param revalidate - Revalidation interval in seconds (default: 60)
 */
export const sanityFetch = cache(
  async <T>(
    query: string,
    params: Record<string, unknown> = {},
    { tags = [], revalidate = 60 }: { tags?: string[]; revalidate?: number | false } = {},
  ): Promise<T> => {
    return client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  },
);
