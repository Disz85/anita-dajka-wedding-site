import { sanityFetch } from '@/sanity/fetch';
import { getPortfolioPageQuery, type PortfolioPageData } from '@/sanity/queries/page.queries';

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  return sanityFetch<PortfolioPageData>(
    getPortfolioPageQuery,
    {},
    {
      revalidate: 300,
      tags: ['portfolio'],
    },
  );
}
