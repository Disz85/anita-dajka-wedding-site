import { sanityFetch } from '@/sanity/fetch';
import { headerQuery, type HeaderData } from '@/sanity/queries';

/**
 * Data Access Layer for Header Configuration
 */
export async function getHeaderData(): Promise<HeaderData | null> {
  return sanityFetch<HeaderData | null>(
    headerQuery,
    {},
    {
      revalidate: 3600, // Header config is fairly static
      tags: ['header'],
    },
  );
}
