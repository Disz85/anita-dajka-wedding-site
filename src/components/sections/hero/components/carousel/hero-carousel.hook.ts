import { useState, useEffect, useCallback, useRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { AUTOPLAY_OPTIONS } from './hero-carousel.config';

export const useHeroAutoplay = (
  emblaApi: EmblaCarouselType | undefined,
  isPaused: boolean = false,
) => {
  const [internalIsTextVisible, setInternalIsTextVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || isPaused) {
      return;
    }

    clearTimers();
    setInternalIsTextVisible(true);

    timerRef.current = setTimeout(() => {
      // 1. Text exit
      setInternalIsTextVisible(false);

      // 2. Wait for exit animation, then scroll
      transitionTimerRef.current = setTimeout(() => {
        if (!emblaApi.canScrollNext()) {
          emblaApi.scrollTo(0);
          return;
        }

        emblaApi.scrollNext();
      }, 600);
    }, AUTOPLAY_OPTIONS.delay);
  }, [emblaApi, isPaused, clearTimers]);

  // Handle pause state changes
  useEffect(() => {
    if (isPaused) {
      clearTimers();
    } else if (emblaApi) {
      const timer = setTimeout(() => {
        startAutoplay();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isPaused, emblaApi, clearTimers, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setInternalIsTextVisible(true);
      if (!isPaused) {
        startAutoplay();
      }
    };

    const stop = () => {
      clearTimers();
      setInternalIsTextVisible(true);
    };

    const resume = () => {
      if (!isPaused) {
        startAutoplay();
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('pointerDown', stop);
    emblaApi.on('pointerUp', resume);

    let initTimer: NodeJS.Timeout;
    if (!isPaused) {
      initTimer = setTimeout(() => {
        startAutoplay();
      }, 0);
    }

    return () => {
      if (initTimer) {
        clearTimeout(initTimer);
      }
      clearTimers();
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', stop);
      emblaApi.off('pointerUp', resume);
    };
  }, [emblaApi, isPaused, startAutoplay, clearTimers]);

  return isPaused || internalIsTextVisible;
};
