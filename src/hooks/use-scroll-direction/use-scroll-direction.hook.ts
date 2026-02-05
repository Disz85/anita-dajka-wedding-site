'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  ScrollDirection,
  UseScrollDirectionOptions,
  UseScrollDirectionResult,
} from './use-scroll-direction.types';

const getInitialScrollY = () => {
  if (typeof window === 'undefined') {
    return 0;
  }
  return window.scrollY;
};

export const useScrollDirection = (
  options: UseScrollDirectionOptions = {},
): UseScrollDirectionResult => {
  const { threshold = 10, scrollThreshold = 100 } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(getInitialScrollY);
  const [lastScrollY, setLastScrollY] = useState(getInitialScrollY);
  const [isScrolled, setIsScrolled] = useState(() => getInitialScrollY() > scrollThreshold);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > scrollThreshold);

    if (Math.abs(currentScrollY - lastScrollY) < threshold) {
      return;
    }

    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    setScrollDirection(direction);
    setLastScrollY(currentScrollY);
  }, [lastScrollY, threshold, scrollThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollDirection, isScrolled, scrollY };
};
