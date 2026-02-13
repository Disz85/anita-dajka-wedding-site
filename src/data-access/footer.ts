import { sanityFetch } from '@/sanity/fetch';
import { footerQuery, type FooterData } from '@/sanity/queries/footer.queries';

export async function getFooterData(): Promise<FooterData> {
  return sanityFetch<FooterData>(
    footerQuery,
    {},
    {
      revalidate: 3600,
      tags: ['footer'],
    },
  );
}
