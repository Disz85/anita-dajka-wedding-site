import { sanityFetch } from '@/sanity/fetch';
import { headerQuery, type HeaderData } from '@/sanity/queries/header.queries';

export async function getHeaderData(): Promise<HeaderData | null> {
  return sanityFetch<HeaderData | null>(
    headerQuery,
    {},
    {
      revalidate: 3600,
      tags: ['header'],
    },
  );
}
