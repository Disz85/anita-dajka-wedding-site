import type { NavLink, SiteSettings } from '@/sanity/queries';

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
