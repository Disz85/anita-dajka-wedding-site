'use client';

import React from 'react';
import type { FooterTaglineProps } from './footer-tagline.types';

export const FooterTagline = ({ tagline }: FooterTaglineProps): React.JSX.Element | null => {
  if (!tagline) {
    return null;
  }
  return (
    <p className="mt-4 font-heading text-xs uppercase tracking-[0.1em] leading-[1.5] font-light text-primary text-center">
      {tagline}
    </p>
  );
};
