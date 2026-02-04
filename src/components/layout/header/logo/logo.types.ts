export type LogoProps = {
  className?: string;
  /** Variant to apply blend mode for overlay contexts */
  variant?: 'default' | 'overlay';
  /** Logo image URL from CMS */
  logoUrl?: string | null;
  /** Logo alt text */
  logoAlt?: string;
};
