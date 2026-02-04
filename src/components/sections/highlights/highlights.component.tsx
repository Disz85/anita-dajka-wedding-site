'use client';

import { useLocale } from 'next-intl';
import { HighlightsCarousel } from '@/components/ui/carousel/highlights/carousel/highlights-carousel.component';
import { SectionHeader } from '@/components/ui/section-header/section-header.component';
import { SectionDescription } from '@/components/ui/section-description/section-description.component';
import { HighlightItem } from '@/components/ui/carousel/highlights/carousel/highlights-carousel.types';
import { HighlightsSectionData, SanityHighlightItem } from '@/sanity/queries/home.queries';
import { getLocalizedValue } from '@/lib/sanity-utils';

export const Highlights = ({ data }: { data?: HighlightsSectionData }) => {
  const locale = useLocale();

  if (data?.items === undefined || data?.items === null) {
    return null;
  }

  const { title, subtitle, description, items } = data;

  const currentTitle = getLocalizedValue(title, locale);
  const currentSubtitle = getLocalizedValue(subtitle, locale);
  const currentDescription = getLocalizedValue(description, locale);

  const mappedItems = items.map((item: SanityHighlightItem, idx: number) => {
    const { dimensions, lqip } = item.image.asset.metadata;
    const orientation = dimensions.width > dimensions.height ? 'landscape' : 'portrait';

    return {
      id: idx.toString(),
      image: item.image.asset.url,
      alt: getLocalizedValue(item.alt, locale) ?? '',
      orientation,
      blurDataURL: lqip,
    } as HighlightItem;
  });

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      {currentTitle && (
        <SectionHeader
          title={currentTitle}
          subtitle={currentSubtitle}
          subtitleTag="h3"
          isOverlapping={true}
        />
      )}
      <HighlightsCarousel items={mappedItems} />
      {currentDescription && <SectionDescription>{currentDescription}</SectionDescription>}
    </section>
  );
};
