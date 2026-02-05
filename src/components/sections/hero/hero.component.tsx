'use client';

import { useLocale } from 'next-intl';
import { HeroCarousel } from '@/components/ui/carousel/hero/carousel/hero-carousel.component';
import { HeroItem } from '@/components/ui/carousel/hero/carousel/hero-carousel.types';
import { HeroSectionData, SanityHeroItem } from '@/sanity/queries/home.queries';
import { getLocalizedValue } from '@/lib/sanity-utils';

export const Hero = ({ data }: { data?: HeroSectionData }) => {
  const locale = useLocale();

  if (!data?.items || data.items.length === 0) {
    return null;
  }

  const { items } = data;

  const mappedItems: HeroItem[] = items.map((item: SanityHeroItem) => ({
    id: item._key,
    image: item.image.asset.url,
    alt: getLocalizedValue(item.alt, locale) ?? '',
    title: getLocalizedValue(item.title, locale),
    subtitle: getLocalizedValue(item.subtitle, locale),
    blurDataURL: item.image.asset.metadata?.lqip,
  }));

  return (
    <section className="relative w-full aspect-video xl:aspect-none xl:h-[calc(100vh-5rem)] overflow-hidden mt-20 xl:mt-0 px-0">
      <HeroCarousel items={mappedItems} />
    </section>
  );
};
