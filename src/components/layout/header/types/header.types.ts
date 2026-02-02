/**
 * Types specific to the Header layout components
 */
import type { HeaderData, NavLink, SiteSettings } from '@/sanity/queries';

export type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

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

export type HeaderProps = {
  transparent?: boolean;
  data: HeaderData | null;
  settings: SiteSettings;
  locale: string;
};

export type LogoProps = {
  className?: string;
  /** Variant to apply blend mode for overlay contexts */
  variant?: 'default' | 'overlay';
  /** Logo image URL from CMS */
  logoUrl?: string | null;
  /** Logo alt text */
  logoAlt?: string;
};

export type DesktopMenuProps = {
  leftNavigation: NavLink[];
  rightNavigation: NavLink[];
  logoUrl?: string | null;
  logoAlt?: string;
  locale: string;
};

// Legacy types (can be removed once fully migrated to CMS)
export type MenuItemKey = 'home' | 'portfolio' | 'weddings' | 'about' | 'journal' | 'contact';

export type MenuItem = {
  key: MenuItemKey;
  href: string;
};
