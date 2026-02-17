'use client';

import { useState, useEffect, useRef } from 'react';
import PhotoAlbum, {
  type RenderImageContext,
  type RenderImageProps,
  type RenderWrapperProps,
} from 'react-photo-album';
import 'react-photo-album/masonry.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import NextImage from 'next/image';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { type MasonryGalleryProps } from './masonry-gallery.types';
import { MASONRY_CONFIG } from './masonry-gallery.config';

export const MasonryGallery = ({ images }: MasonryGalleryProps) => {
  const t = useTranslations('gallery');
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState<number>(MASONRY_CONFIG.INITIAL_VISIBLE_COUNT);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + MASONRY_CONFIG.LOAD_MORE_INCREMENT, images.length),
          );
        }
      },
      { rootMargin: MASONRY_CONFIG.ROOT_MARGIN },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasMore, images.length]);

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIndex(i);
    }
  };

  const renderers: React.ComponentProps<typeof PhotoAlbum>['render'] = {
    image: (
      { src, alt, title, sizes }: RenderImageProps,
      { photo, width, height }: RenderImageContext,
    ) => {
      const validSrc = typeof src === 'string' ? src : photo.src;

      return (
        <NextImage
          src={validSrc}
          alt={alt || ''}
          title={title}
          width={width}
          height={height}
          sizes={sizes}
          className="object-cover w-full h-auto rounded-none"
          placeholder="blur"
          blurDataURL={photo.src.includes('?') ? `${photo.src}&blur=20` : `${photo.src}?blur=20`}
        />
      );
    },
    wrapper: ({ style, ...rest }: RenderWrapperProps, { index, photo }) => {
      const motionProps = rest as unknown as HTMLMotionProps<'div'>;

      return (
        <motion.div
          style={{ ...style, position: 'relative' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          layout
          transition={{
            opacity: { duration: 0.5, delay: (index % MASONRY_CONFIG.LOAD_MORE_INCREMENT) * 0.05 },
            layout: { duration: 0.3 },
          }}
          className="group cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          role="button"
          tabIndex={0}
          aria-label={photo.alt || t('viewGallery')}
          onClick={() => setIndex(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          {...motionProps}
        >
          {rest.children}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </motion.div>
      );
    },
  };

  const getColumns = (containerWidth: number) => {
    if (containerWidth < MASONRY_CONFIG.BREAKPOINTS.MOBILE) {
      return MASONRY_CONFIG.COLUMNS.MOBILE;
    }
    if (containerWidth < MASONRY_CONFIG.BREAKPOINTS.TABLET) {
      return MASONRY_CONFIG.COLUMNS.TABLET;
    }
    return MASONRY_CONFIG.COLUMNS.DESKTOP;
  };

  return (
    <div className="flex flex-col gap-12 min-h-dvh">
      <PhotoAlbum
        layout="masonry"
        photos={visibleImages}
        columns={getColumns}
        spacing={MASONRY_CONFIG.SPACING}
        render={renderers}
      />

      {hasMore && <div ref={loadMoreRef} className="h-20 w-full pointer-events-none" />}

      <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
    </div>
  );
};
