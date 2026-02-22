import { sanityFetch } from '@/sanity/fetch';
import { homePageQuery, type HomePageResponse } from '@/sanity/queries/home.queries';
import { siteConfig } from '@/config/site.config';

export async function getHomePageData(): Promise<HomePageResponse> {
  return sanityFetch<HomePageResponse>(
    homePageQuery,
    {},
    {
      revalidate: siteConfig.sanity.revalidate,
      tags: ['home', 'highlights', 'video', 'introduction', 'testimonials'],
    },
  );
}
