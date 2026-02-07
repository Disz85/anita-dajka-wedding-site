import { sanityFetch } from '@/sanity/fetch';
import { homePageQuery, type HomePageResponse } from '@/sanity/queries';

/**
 * Data Access Layer for Home Page content
 */
export async function getHomePageData(): Promise<HomePageResponse> {
  return sanityFetch<HomePageResponse>(
    homePageQuery,
    {},
    {
      revalidate: 300, // Home page content can be cached for 5 minutes
      tags: ['home', 'highlights', 'video', 'introduction', 'testimonials'],
    },
  );
}
