import type { FooterData } from '@/sanity/queries/footer.queries';
import type { SiteSettings } from '@/sanity/queries/settings.queries';

export type FooterProps = {
  data: FooterData;
  settings: SiteSettings;
  locale: string;
};
