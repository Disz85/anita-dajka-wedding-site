'use client';

import React from 'react';
import { Link } from '@/i18n/i18n.navigation';
import type { FooterLegalProps } from './footer-legal.types';

const linkClassName =
  'font-nav text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const FooterLegal = ({
  privacyLabel,
  impressumLabel,
  privacyHref,
  legalHref,
}: FooterLegalProps): React.JSX.Element => {
  return (
    <nav aria-label="Legal and privacy" className="mt-4 flex gap-6 justify-center">
      <Link href={privacyHref} className={linkClassName}>
        {privacyLabel}
      </Link>
      <Link href={legalHref} className={linkClassName}>
        {impressumLabel}
      </Link>
    </nav>
  );
};
