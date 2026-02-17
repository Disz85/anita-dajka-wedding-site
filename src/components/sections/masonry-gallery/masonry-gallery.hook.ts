'use client';

import { useState, useEffect, useRef } from 'react';
import { MASONRY_CONFIG } from './masonry-gallery.config';
import {
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
} from './masonry-gallery.types';

export const useInfiniteScroll = ({
  totalCount,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [visibleCount, setVisibleCount] = useState<number>(MASONRY_CONFIG.INITIAL_VISIBLE_COUNT);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const hasMore = visibleCount < totalCount;

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!hasMore || !currentRef) {
      return;
    }

    const loadMore = () => {
      setVisibleCount((prev) => Math.min(prev + MASONRY_CONFIG.LOAD_MORE_INCREMENT, totalCount));
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMore();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: MASONRY_CONFIG.ROOT_MARGIN,
    });

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, totalCount]);

  return { visibleCount, hasMore, loadMoreRef };
};
