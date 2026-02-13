'use client';

import { Link } from '@/i18n/i18n.navigation';
import { isAppPathname } from '@/i18n/i18n.routing';
import { Typography } from '@/components/ui/typography/typography.component';
import { Button } from '@/components/ui/button/button.component';
import { PortfolioCategoryItemProps } from './portfolio-categories.types';
import { ParallaxImage } from '@/components/ui/parallax-image/parallax-image.component';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedValue } from '@/lib/sanity-utils';

export const PortfolioCategoryItem = ({ item }: PortfolioCategoryItemProps) => {
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const title = getLocalizedValue(item.title, locale) || '';

  const content = (
    <>
      <ParallaxImage
        src={item.image}
        alt={item.imageAlt || title}
        fill
        className="object-cover"
        sizes="100vw"
        placeholder="empty"
        parallaxIntensity={8}
      />

      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-center px-4 space-y-8 text-white transition-all duration-300',
          'items-center text-center',
          'md:justify-end md:pb-16',
          item.textAlignment === 'left' && 'md:items-start md:pl-16',
          item.textAlignment === 'right' && 'md:items-end md:pr-16',
          (!item.textAlignment || item.textAlignment === 'center') && 'md:items-center',
        )}
      >
        <div className={cn('max-w-100 w-full flex flex-col space-y-4 text-center')}>
          <Typography variant="portfolioTitle" tone="white" className="drop-shadow-sm uppercase">
            {title}
          </Typography>
          <div className={cn('flex w-full', 'justify-center')}>
            <Button variant="outline-white" size="default" className="uppercase">
              <span className="relative z-10">{t('browse')}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative w-full max-w-[1200px] aspect-1200/570 mx-auto overflow-hidden group">
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
