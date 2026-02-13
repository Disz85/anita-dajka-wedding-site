import type { ComponentProps } from 'react';
import type { Link } from '@/i18n/i18n.navigation';

type LinkProps = ComponentProps<typeof Link>;
type LinkHref = LinkProps['href'];

export type DynamicLinkProps = Omit<LinkProps, 'href'> & {
  href: string;
};

export type { LinkHref };
