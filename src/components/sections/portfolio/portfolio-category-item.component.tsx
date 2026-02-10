'use client';

import Image from 'next/image';
import { Link } from '@/i18n/i18n.navigation';
import { isAppPathname } from '@/i18n/i18n.routing';
import { Typography } from '@/components/ui/typography/typography.component';
import { Button } from '@/components/ui/button/button.component';
import { PortfolioCategoryItemProps } from './portfolio-categories.types';

import { useLocale } from 'next-intl';
import { getLocalizedValue } from '@/lib/sanity-utils';

export const PortfolioCategoryItem = ({ item }: PortfolioCategoryItemProps) => {
  const locale = useLocale();
  const title = getLocalizedValue(item.title, locale) || '';

  const content = (
    <>
      <Image
        src={item.image}
        alt={item.imageAlt || title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="100vw"
        placeholder="empty"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-8 px-4">
        <div className="max-w-[570px] w-full flex flex-col items-center space-y-8 text-center">
          <Typography variant="portfolioTitle" tone="white" className="drop-shadow-sm uppercase">
            {title}
          </Typography>
          <Button variant="outline-white" size="default" className="uppercase">
            <span className="relative z-10">Browse portfolio</span>
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
      {isAppPathname(item.link) ? (
        <Link href={item.link} className="block w-full h-full relative">
          {content}
        </Link>
      ) : (
        <a href={item.link} className="block w-full h-full relative">
          {content}
        </a>
      )}
    </div>
  );
};
