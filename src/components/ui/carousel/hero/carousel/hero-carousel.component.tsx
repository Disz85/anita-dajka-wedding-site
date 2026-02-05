'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import Fade from 'embla-carousel-fade';
import { useTranslations } from 'next-intl';
import { HeroCarouselProps } from './hero-carousel.types';
import { HERO_CAROUSEL_OPTIONS, HERO_STYLES } from './hero-carousel.config';
import { useHeroAutoplay } from './hero-carousel.hook';
import { HeroSlide } from '../slide/hero-slide.component';
import { useState, useCallback, useEffect } from 'react';

export const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const t = useTranslations('carousel.hero');
  const [emblaRef, emblaApi] = useEmblaCarousel(HERO_CAROUSEL_OPTIONS, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const isTextVisible = useHeroAutoplay(emblaApi);

  return (
    <div
      className={HERO_STYLES.viewport}
      role="region"
      aria-roledescription={t('roledescription')}
      aria-label={t('label')}
      ref={emblaRef}
    >
      <ul className={HERO_STYLES.container} aria-live="off">
        {items.map((item, index) => (
          <HeroSlide
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            isActive={index === selectedIndex && isTextVisible}
          />
        ))}
      </ul>
    </div>
  );
};
