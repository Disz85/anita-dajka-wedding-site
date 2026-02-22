import { sanityFetch } from '@/sanity/fetch';
import { getPortfolioPageQuery, type PortfolioPageData } from '@/sanity/queries/page.queries';
import { siteConfig } from '@/config/site.config';

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  return sanityFetch<PortfolioPageData>(
    getPortfolioPageQuery,
    {},
    {
      revalidate: siteConfig.sanity.revalidate,
      tags: ['portfolio'],
    },
  );
}
