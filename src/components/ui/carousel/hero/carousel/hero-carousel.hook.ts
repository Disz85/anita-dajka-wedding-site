import { useState, useEffect, useCallback, useRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { AUTOPLAY_OPTIONS } from './hero-carousel.config';

export const useHeroAutoplay = (emblaApi: EmblaCarouselType | undefined) => {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // 1. Text exit
      setIsTextVisible(false);

      // 2. Wait for exit animation, then scroll
      transitionTimerRef.current = setTimeout(() => {
        if (!emblaApi.canScrollNext()) {
          emblaApi.scrollTo(0);
          return;
        }

        emblaApi.scrollNext();
      }, 600);
    }, AUTOPLAY_OPTIONS.delay);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setIsTextVisible(true);
      startAutoplay();
    };

    const stop = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('pointerDown', stop);
    emblaApi.on('pointerUp', startAutoplay);

    startAutoplay();

    return () => {
      stop();
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', stop);
      emblaApi.off('pointerUp', startAutoplay);
    };
  }, [emblaApi, startAutoplay]);

  return isTextVisible;
};
