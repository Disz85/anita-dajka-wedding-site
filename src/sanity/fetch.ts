import { cache } from 'react';
import { siteConfig } from '@/config/site.config';
import { client } from './client';

export const sanityFetch = cache(
  async <T>(
    query: string,
    params: Record<string, unknown> = {},
    {
      tags = [],
      revalidate = siteConfig.sanity.revalidate,
    }: { tags?: string[]; revalidate?: number | false } = {},
  ): Promise<T> => {
    return client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  },
);
