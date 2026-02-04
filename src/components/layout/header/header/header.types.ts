import type { HeaderData, SiteSettings } from '@/sanity/queries';

export type HeaderProps = {
  transparent?: boolean;
  data: HeaderData | null;
  settings: SiteSettings;
  locale: string;
};
