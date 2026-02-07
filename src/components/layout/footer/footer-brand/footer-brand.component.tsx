'use client';

import React from 'react';
import type { FooterBrandProps } from './footer-brand.types';

export const FooterBrand = ({ brandName }: FooterBrandProps): React.JSX.Element | null => {
  if (!brandName) {
    return null;
  }
  return (
    <div className="flex flex-col items-center">
      <p
        className="font-heading text-2xl md:text-3xl uppercase tracking-[0.15em] text-primary"
        aria-label={brandName}
      >
        {brandName}
      </p>
      <div className="mt-4 w-16 border-t border-primary/30" aria-hidden="true" />
    </div>
  );
};
