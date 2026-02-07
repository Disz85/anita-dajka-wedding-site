'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  ScrollDirection,
  UseScrollDirectionOptions,
  UseScrollDirectionResult,
} from './use-scroll-direction.types';

export const useScrollDirection = (
  options: UseScrollDirectionOptions = {},
): UseScrollDirectionResult => {
  const { threshold = 10, scrollThreshold = 100 } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > scrollThreshold);

    if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
      return;
    }

    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
    setScrollDirection(direction);
    lastScrollY.current = currentScrollY;
  }, [threshold, scrollThreshold]);

  useEffect(() => {
    // Set initial values on mount
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > scrollThreshold);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollThreshold]);

  return { scrollDirection, isScrolled, scrollY };
};
