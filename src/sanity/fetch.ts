import { cache } from 'react';
import { client } from './client';

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
