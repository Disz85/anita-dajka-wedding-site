import { sanityFetch } from '@/sanity/fetch';
import { footerQuery, type FooterData } from '@/sanity/queries/footer.queries';
import { siteConfig } from '@/config/site.config';

export async function getFooterData(): Promise<FooterData> {
  return sanityFetch<FooterData>(
    footerQuery,
    {},
    {
      revalidate: siteConfig.sanity.revalidate,
      tags: ['footer'],
    },
  );
}
