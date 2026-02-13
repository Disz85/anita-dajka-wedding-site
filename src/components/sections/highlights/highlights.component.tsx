'use client';

import { useLocale, useTranslations } from 'next-intl';
import { HighlightsCarousel } from '@/components/sections/highlights/components/carousel/highlights-carousel.component';
import { Section } from '@/components/ui/section/section.component';
import { HighlightItem } from '@/components/sections/highlights/components/carousel/highlights-carousel.types';
import { SanityHighlightItem } from '@/sanity/queries/home.queries';
import { getLocalizedValue } from '@/lib/sanity-utils';

import { HighlightsProps } from './highlights.types';

export const Highlights = ({ data }: HighlightsProps) => {
  const t = useTranslations('highlights');
  const locale = useLocale();

  if (data?.items === undefined || data?.items === null) {
    return null;
  }

  const { title, subtitle, description, items } = data;

  const currentTitle = getLocalizedValue(title, locale);
  const currentSubtitle = getLocalizedValue(subtitle, locale);
  const currentDescription = getLocalizedValue(description, locale);

  const mappedItems: HighlightItem[] = items.map((item: SanityHighlightItem, idx: number) => {
    const { dimensions, lqip } = item.image.asset.metadata;
    const orientation = dimensions.width > dimensions.height ? 'landscape' : 'portrait';

    return {
      id: idx.toString(),
      image: item.image.asset.url,
      alt: getLocalizedValue(item.alt, locale) ?? '',
      orientation,
      blurDataURL: lqip,
    };
  });

  return (
    <Section
      spacing="sm"
      background="default"
      className="overflow-hidden"
      aria-label={t('sectionLabel')}
    >
      {currentTitle && (
        <Section.Header
          title={currentTitle}
          subtitle={currentSubtitle}
          subtitleTag="h3"
          isOverlapping={true}
        />
      )}
      <HighlightsCarousel items={mappedItems} />
      {currentDescription && <Section.Description>{currentDescription}</Section.Description>}
    </Section>
  );
};
