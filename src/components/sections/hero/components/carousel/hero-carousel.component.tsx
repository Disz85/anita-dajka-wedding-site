'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import Fade from 'embla-carousel-fade';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HeroCarouselProps } from './hero-carousel.types';
import { HERO_CAROUSEL_OPTIONS, HERO_STYLES } from './hero-carousel.config';
import { useHeroAutoplay } from './hero-carousel.hook';
import { HeroSlide } from '../slide/hero-slide.component';
import { PauseIcon, PlayIcon } from '@/components/ui/icons/pause-play/pause-play.component';
import { PAUSE_BUTTON_TRANSITION } from './hero-carousel.variants';
import { useState, useCallback, useEffect } from 'react';

export const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const t = useTranslations('carousel.hero');
  const [emblaRef, emblaApi] = useEmblaCarousel(HERO_CAROUSEL_OPTIONS, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const isTextVisible = useHeroAutoplay(emblaApi, isPaused);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return (
    <div
      className={HERO_STYLES.viewport}
      role="region"
      aria-roledescription={t('roledescription')}
      aria-label={t('label')}
      ref={emblaRef}
    >
      <ul className={HERO_STYLES.container} aria-live={isPaused ? 'polite' : 'off'}>
        {items.map((item, index) => (
          <HeroSlide
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            isActive={index === selectedIndex && isTextVisible}
            isFirst={index === 0}
          />
        ))}
      </ul>

      <motion.button
        type="button"
        onClick={togglePause}
        className="absolute bottom-8 right-8 z-30 group/pause flex items-center justify-center w-10 h-10 text-black/70 hover:text-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black/50"
        initial="initial"
        whileHover="hover"
        aria-label={isPaused ? t('play') : t('pause')}
        aria-pressed={isPaused}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-black/30 group-hover/pause:border-black/60 transition-colors"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={PAUSE_BUTTON_TRANSITION}
        />

        <span className="relative w-3 h-3.5">{isPaused ? <PlayIcon /> : <PauseIcon />}</span>
      </motion.button>
    </div>
  );
};
