import { sanityFetch } from '@/sanity/fetch';
import { settingsQuery, type SiteSettings } from '@/sanity/queries';

/**
 * Data Access Layer for Site Settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>(
    settingsQuery,
    {},
    {
      revalidate: 3600, // Global settings can be cached longer (1 hour)
      tags: ['settings'],
    },
  );
}
