/**
 * Types specific to the Header layout components
 */
export type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

export type MobileMenuProps = {
  isOpen: boolean;
};

export type HeaderProps = {
  transparent?: boolean;
};

export type LogoProps = {
  className?: string;
  /** Variant to apply blend mode for overlay contexts */
  variant?: 'default' | 'overlay';
};

export type MenuItemKey = 'home' | 'portfolio' | 'weddings' | 'about' | 'journal' | 'contact';

export type MenuItem = {
  key: MenuItemKey;
  href: string;
};
