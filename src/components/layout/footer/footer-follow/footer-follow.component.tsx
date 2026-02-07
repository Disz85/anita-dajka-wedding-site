'use client';

import React from 'react';
import type { FooterFollowProps } from './footer-follow.types';

const linkClassName =
  'mt-1 font-heading text-xs font-light italic uppercase leading-[18px] text-[var(--footer-handle)] hover:text-primary hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const FooterFollow = ({
  instagramUrl,
  instagramHandle,
  followAlongLabel,
  ariaLabel,
}: FooterFollowProps): React.JSX.Element | null => {
  if (!instagramUrl || !instagramHandle) {
    return null;
  }
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
      aria-label={ariaLabel}
    >
      {followAlongLabel} {instagramHandle}
    </a>
  );
};
