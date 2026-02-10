import { sanityFetch } from '@/sanity/fetch';
import { getPortfolioPageQuery } from '@/sanity/queries';
import { PortfolioPageData } from '@/types/portfolio.types';

/**
 * Data Access Layer for Portfolio Page content
 */
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
