import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { LogoProps } from './types/header.types';

export const Logo = ({ className, variant = 'default' }: LogoProps): React.JSX.Element => {
  const t = useTranslations('common');

  return (
    <Link
      href="/"
      className={cn(
        'font-heading text-2xl uppercase tracking-widest transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        variant === 'overlay' && 'text-white mix-blend-difference',
        className,
      )}
    >
      {t('siteName')}
    </Link>
  );
};
