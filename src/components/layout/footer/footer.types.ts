import type { FooterData } from '@/sanity/queries';
import type { SiteSettings } from '@/sanity/queries';

export type FooterProps = {
  data: FooterData;
  settings: SiteSettings;
  locale: string;
};
