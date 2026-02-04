import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/i18n.navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { LogoProps } from './logo.types';

export const Logo = ({
  className,
  variant = 'default',
  logoUrl,
  logoAlt,
}: LogoProps): React.JSX.Element => {
  const t = useTranslations('common');

  const linkClassName = cn(
    'transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    variant === 'overlay',
    className,
  );

  if (logoUrl) {
    return (
      <Link href="/" className={linkClassName}>
        <Image
          src={logoUrl}
          alt={logoAlt || t('siteName')}
          width={160}
          height={40}
          className="h-10 object-contain"
          style={{ width: 'auto', height: 'auto', maxHeight: '2.5rem' }}
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        linkClassName,
        'font-heading text-2xl uppercase tracking-widest',
        variant === 'overlay' && 'text-white',
      )}
    >
      {t('siteName')}
    </Link>
  );
};
