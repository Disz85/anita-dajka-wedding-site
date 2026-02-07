import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HighlightsSlideProps } from '../carousel/highlights-carousel.types';
import { CAROUSEL_STYLES, ORIENTATION_STYLES } from '../carousel/highlights-carousel.config';
import { useTranslations } from 'next-intl';

export const HighlightsSlide = ({ item, index, total }: HighlightsSlideProps) => {
  const t = useTranslations('carousel.highlights');
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '400px 0px 400px 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

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
            style={{ y }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover embla__parallax__img w-[150%] h-[150%] max-w-none -left-[25%] -top-[25%] will-change-transform"
              sizes="(max-width: 768px) 130vw, (max-width: 1200px) 70vw, 800px"
              placeholder={item.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={item.blurDataURL}
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        )}

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 border-2 border-neutral-100 border-t-neutral-300 rounded-full animate-spin opacity-20" />
          </div>
        )}
      </div>
    </li>
  );
};
