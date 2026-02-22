import { sanityFetch } from '@/sanity/fetch';
import { settingsQuery, type SiteSettings } from '@/sanity/queries/settings.queries';
import { siteConfig } from '@/config/site.config';

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>(
    settingsQuery,
    {},
    {
      revalidate: siteConfig.sanity.revalidate,
      tags: ['settings'],
    },
  );
}
