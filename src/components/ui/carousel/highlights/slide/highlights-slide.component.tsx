import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HighlightsSlideProps } from '../carousel/highlights-carousel.types';
import { CAROUSEL_STYLES, ORIENTATION_STYLES } from '../carousel/highlights-carousel.config';
import { useTranslations } from 'next-intl';

export const HighlightsSlide = ({ item, index, total }: HighlightsSlideProps) => {
  const t = useTranslations('carousel.highlights');
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = React.useRef(null);
  // Only start loading/rendering when within 400px of viewport
  const isInView = useInView(ref, { once: true, margin: '400px 0px 400px 0px' });

  return (
    <li
      ref={ref}
      role="group"
      aria-roledescription={t('slideRoledescription')}
      aria-label={t('slideLabel', { current: index + 1, total })}
      data-orientation={item.orientation}
      className={cn(
        CAROUSEL_STYLES.slideWrapper,
        item.orientation === 'portrait'
          ? ORIENTATION_STYLES.portrait.width
          : ORIENTATION_STYLES.landscape.width,
      )}
    >
      <div
        className={cn(
          CAROUSEL_STYLES.slideInner,
          item.orientation === 'portrait'
            ? ORIENTATION_STYLES.portrait.aspectRatio
            : ORIENTATION_STYLES.landscape.aspectRatio,
          'overflow-hidden relative',
        )}
      >
        {(isInView || index < 2) && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="w-full h-full relative"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover embla__parallax__img w-[150%] h-[150%] max-w-none -left-[25%] -top-[25%]"
              sizes="(max-width: 768px) 130vw, (max-width: 1200px) 70vw, 800px"
              priority={index < 2}
              placeholder={item.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={item.blurDataURL}
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        )}

        {/* Subtle overlay/loading state if needed */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 border-2 border-neutral-100 border-t-neutral-300 rounded-full animate-spin opacity-20" />
          </div>
        )}
      </div>
    </li>
  );
};
