'use client';

import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion/use-reduced-motion.hook';
import { VideoSectionData } from '@/sanity/queries/home.queries';
import { getLocalizedValue, toPlainText } from '@/lib/sanity-utils';
import { Typography } from '@/components/ui/typography/typography.component';
import { Section } from '@/components/ui/section/section.component';
import { CustomPortableText } from '@/components/ui/typography/portable-text.component';
import { ParallaxImage } from '@/components/ui/parallax-image/parallax-image.component';

export const Video = ({ data }: { data?: VideoSectionData }) => {
  const t = useTranslations('video');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  if (!data?.video?.asset?.url || !data?.poster?.asset?.url) {
    return null;
  }

  const { title, description, video, poster, posterAlt } = data;

  const currentTitle = getLocalizedValue(title, locale);

  const currentDescription = getLocalizedValue(description, locale);
  const currentPosterAlt = getLocalizedValue(posterAlt, locale);

  const videoUrl = video.asset.url;
  const posterUrl = poster.asset.url;
  const posterLqip = poster.asset.metadata?.lqip;

  return (
    <Section
      ref={containerRef}
      spacing="none"
      className="relative h-[70vw] max-h-[600px] overflow-hidden"
      aria-label={
        currentTitle && Array.isArray(currentTitle) ? toPlainText(currentTitle) : t('sectionLabel')
      }
    >
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
        {prefersReducedMotion ? (
          <ParallaxImage
            src={posterUrl}
            alt={
              currentPosterAlt ??
              (currentTitle && Array.isArray(currentTitle) ? toPlainText(currentTitle) : '')
            }
            fill
            className="object-cover"
            placeholder={posterLqip ? 'blur' : 'empty'}
            blurDataURL={posterLqip}
            sizes="100vw"
            priority
            parallaxIntensity={8}
            containerClassName="w-full h-full"
          />
        ) : (
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={posterUrl}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 text-center md:text-left">
        <div className="max-w-4xl w-full">
          {currentTitle && (
            <div className="mb-6 video-title">
              <CustomPortableText
                value={currentTitle}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <Typography variant="videoTitle" tone="white" className="mb-2 last:mb-0">
                        {children}
                      </Typography>
                    ),
                  },
                }}
              />
            </div>
          )}
          {currentDescription && (
            <div className="font-light leading-6 max-w-lg mx-auto md:mx-0">
              <CustomPortableText
                value={currentDescription}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <Typography variant="p" tone="white" className="mb-4 last:mb-0">
                        {children}
                      </Typography>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
