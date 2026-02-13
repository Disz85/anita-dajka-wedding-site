import { sanityFetch } from '@/sanity/fetch';
import { settingsQuery, type SiteSettings } from '@/sanity/queries/settings.queries';

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>(
    settingsQuery,
    {},
    {
      revalidate: 3600,
      tags: ['settings'],
    },
  );
}
