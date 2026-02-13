import type { NavLink } from '@/sanity/queries/header.queries';
import type { SiteSettings } from '@/sanity/queries/settings.queries';

export type MobileMenuProps = {
  isOpen: boolean;
  navigation: NavLink[];
  settings: SiteSettings;
  locale: string;
};

export type MobileMenuBodyProps = {
  navigation: NavLink[];
  locale: string;
};

export type MobileMenuFooterProps = {
  settings: SiteSettings;
};
