'use client';

import { Link } from '@/i18n/i18n.navigation';
import type { DynamicLinkProps, LinkHref } from './dynamic-link.types';

export const DynamicLink = ({ href, children, ...props }: DynamicLinkProps) => {
  return (
    <Link {...props} href={href as LinkHref}>
      {children}
    </Link>
  );
};
