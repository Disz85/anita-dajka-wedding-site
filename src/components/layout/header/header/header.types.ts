import type { HeaderData } from '@/sanity/queries/header.queries';
import type { SiteSettings } from '@/sanity/queries/settings.queries';

export type HeaderProps = {
  transparent?: boolean;
  data: HeaderData | null;
  settings: SiteSettings;
  locale: string;
};
