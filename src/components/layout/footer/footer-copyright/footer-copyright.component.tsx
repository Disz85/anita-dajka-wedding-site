'use client';

import { useTranslations } from 'next-intl';
import type { FooterCopyrightProps } from './footer-copyright.types';

export const FooterCopyright = ({
  siteTitle,
  year,
}: FooterCopyrightProps): React.JSX.Element | null => {
  const t = useTranslations('footer');

  if (!siteTitle) {
    return null;
  }

  const copyrightText = t('copyright', { year, siteTitle });

  return (
    <p
      className="mt-8 font-nav text-[11px] uppercase tracking-[0.12em] text-primary/70"
      aria-label={copyrightText}
    >
      {copyrightText}
    </p>
  );
};
