/**
 * Types specific to the Header layout components
 */
export type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string; // Optional styling
};

export type MobileMenuProps = {
  isOpen: boolean;
};

export type HeaderProps = {
  transparent?: boolean; // Future-proof: átlátszó header opció
};
