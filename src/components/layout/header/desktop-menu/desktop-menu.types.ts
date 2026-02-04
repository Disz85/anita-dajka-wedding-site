import type { NavLink } from '@/sanity/queries';

export type DesktopMenuProps = {
  leftNavigation: NavLink[];
  rightNavigation: NavLink[];
  logoUrl?: string | null;
  logoAlt?: string;
  locale: string;
};
