'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSlideProps } from '../carousel/hero-carousel.types';
import { ParallaxImage } from '@/components/ui/parallax-image/parallax-image.component';
import { HERO_STYLES } from '../carousel/hero-carousel.config';
import { HERO_SLIDE_ANIMATION } from './hero-slide.variants';
import { useTranslations } from 'next-intl';
import { AnimatedText } from './animated-text.component';

export const HeroSlide = ({ item, index, total, isActive, isFirst }: HeroSlideProps) => {
  const t = useTranslations('carousel.hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const TitleTag = isFirst ? 'h1' : 'h2';

  return (
    <li
      ref={containerRef}
      role="group"
      aria-roledescription={t('slideRoledescription')}
      aria-label={t('slideLabel', { current: index + 1, total })}
      aria-hidden={!isActive}
      className={`${HERO_STYLES.slide} overflow-hidden`}
    >
      <motion.div
        initial={HERO_SLIDE_ANIMATION.initial}
        animate={isLoaded ? HERO_SLIDE_ANIMATION.animate : {}}
        transition={HERO_SLIDE_ANIMATION.transition}
        className="w-full h-full relative"
      >
        <ParallaxImage
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index < 2}
          placeholder={item.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={item.blurDataURL}
          onLoad={() => setIsLoaded(true)}
          parallaxIntensity={20}
          containerClassName="absolute inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />

        {(item.title || item.subtitle) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 pointer-events-none px-4">
            {item.title && (
              <AnimatedText
                tag={TitleTag}
                text={item.title}
                isActive={!!isActive}
                className="font-sans font-extralight uppercase tracking-widest text-center leading-none text-fluid-hero-title mb-2"
              />
            )}
            {item.subtitle && (
              <AnimatedText
                tag="p"
                text={item.subtitle}
                isActive={!!isActive}
                className="font-subtitle uppercase tracking-[0.05em] mt-4 text-center text-fluid-hero-subtitle opacity-90"
              />
            )}
          </div>
        )}
      </motion.div>
    </li>
  );
};
