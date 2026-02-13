import type { NavLink } from '@/sanity/queries/header.queries';

export type DesktopMenuProps = {
  leftNavigation: NavLink[];
  rightNavigation: NavLink[];
  logoUrl?: string | null;
  logoAlt?: string;
  locale: string;
};
