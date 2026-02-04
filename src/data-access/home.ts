import { sanityFetch } from '@/sanity/fetch';
import { homeHighlightsQuery, type HomeHighlightsResponse } from '@/sanity/queries';

/**
 * Data Access Layer for Home Page content
 */
export async function getHomeHighlights(): Promise<HomeHighlightsResponse> {
  return sanityFetch<HomeHighlightsResponse>(
    homeHighlightsQuery,
    {},
    {
      revalidate: 300, // Home page content can be cached for 5 minutes
      tags: ['home', 'highlights'],
    },
  );
}
