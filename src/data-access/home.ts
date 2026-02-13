import { sanityFetch } from '@/sanity/fetch';
import { homePageQuery, type HomePageResponse } from '@/sanity/queries/home.queries';

export async function getHomePageData(): Promise<HomePageResponse> {
  return sanityFetch<HomePageResponse>(
    homePageQuery,
    {},
    {
      revalidate: 300,
      tags: ['home', 'highlights', 'video', 'introduction', 'testimonials'],
    },
  );
}
