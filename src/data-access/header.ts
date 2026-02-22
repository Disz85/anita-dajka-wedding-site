import { sanityFetch } from '@/sanity/fetch';
import { headerQuery, type HeaderData } from '@/sanity/queries/header.queries';
import { siteConfig } from '@/config/site.config';

export async function getHeaderData(): Promise<HeaderData | null> {
  return sanityFetch<HeaderData | null>(
    headerQuery,
    {},
    {
      revalidate: siteConfig.sanity.revalidate,
      tags: ['header'],
    },
  );
}
