'use client';

import { Link } from '@/i18n/i18n.navigation';
import { isAppPathname } from '@/i18n/i18n.routing';
import { Typography } from '@/components/ui/typography/typography.component';
import { ParallaxImage } from '@/components/ui/parallax-image/parallax-image.component';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { type GalleryGridItemProps } from './gallery-section.types';

export const GalleryGridItem = ({
  item,
  parallaxIntensity,
  orientation,
  className,
}: GalleryGridItemProps) => {
  const locale = useLocale();
  const t = useTranslations('gallery');
  const title = getLocalizedValue(item.title, locale) || '';
  const subtitle = getLocalizedValue(item.subtitle, locale);

  const aspectRatioClass = orientation === 'portrait' ? 'aspect-[365/485]' : 'aspect-[630/485]';

  const content = (
    <>
      <div className={`relative w-full ${aspectRatioClass} overflow-hidden`}>
        <ParallaxImage
          src={item.image}
          alt={item.imageAlt || title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder={item.lqip ? 'blur' : 'empty'}
          blurDataURL={item.lqip}
          parallaxIntensity={parallaxIntensity}
        />
      </div>

      <div className="mt-4 text-center space-y-1">
        <Typography
          variant="h4"
          className="font-cormorant font-light tracking-widest uppercase text-foreground"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="small" className="text-muted-foreground tracking-wider">
            {subtitle}
          </Typography>
        )}
        <Typography
          variant="action"
          className="pt-1 transition-colors duration-300 group-hover:text-foreground"
        >
          {t('viewGallery')}
        </Typography>
      </div>
    </>
  );

  const linkClassName = `block group ${className || ''}`;

  if (isAppPathname(item.link)) {
    return (
      <Link href={item.link} className={linkClassName}>
        {content}
      </Link>
    );
  }

  return (
    <a href={item.link} className={linkClassName}>
      {content}
    </a>
  );
};
