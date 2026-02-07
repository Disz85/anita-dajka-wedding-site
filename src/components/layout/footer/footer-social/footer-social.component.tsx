'use client';

import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import type { FooterSocialProps } from './footer-social.types';

const socialLinkClassName =
  'p-2 -m-2 hover:text-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const FooterSocial = ({
  instagramUrl,
  facebookUrl,
  navAriaLabel,
  instagramIconAriaLabel,
  facebookIconAriaLabel,
}: FooterSocialProps): React.JSX.Element | null => {
  if (!instagramUrl && !facebookUrl) {
    return null;
  }
  return (
    <nav aria-label={navAriaLabel} className="mt-8 flex gap-4">
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClassName}
          aria-label={instagramIconAriaLabel}
        >
          <Instagram size={22} strokeWidth={1} aria-hidden="true" />
        </a>
      )}
      {facebookUrl && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClassName}
          aria-label={facebookIconAriaLabel}
        >
          <Facebook size={22} strokeWidth={1} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
};
