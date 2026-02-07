'use client';

import { useRef } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion/use-reduced-motion.hook';
import { VideoSectionData } from '@/sanity/queries/home.queries';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { Typography } from '@/components/ui/typography/typography.component';
import { Section } from '@/components/ui/section/section.component';

export const Video = ({ data }: { data?: VideoSectionData }) => {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  if (!data?.video?.asset?.url || !data?.poster?.asset?.url) {
    return null;
  }

  const { title, description, video, poster, posterAlt } = data;

  const currentTitle = getLocalizedValue(title, locale);

  const currentDescription = getLocalizedValue(description, locale);
  const currentPosterAlt = getLocalizedValue(posterAlt, locale) ?? currentTitle ?? '';

  const videoUrl = video.asset.url;
  const posterUrl = poster.asset.url;
  const posterLqip = poster.asset.metadata?.lqip;

  return (
    <Section
      ref={containerRef}
      spacing="none"
      className="relative h-[70vw] max-h-[800px] overflow-hidden"
      aria-label={currentTitle ?? 'Video showcase'}
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        {prefersReducedMotion ? (
          <Image
            src={posterUrl}
            alt={currentPosterAlt}
            fill
            className="object-cover"
            placeholder={posterLqip ? 'blur' : 'empty'}
            blurDataURL={posterLqip}
            sizes="100vw"
            priority
          />
        ) : (
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
        )}
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          {currentTitle && (
            <Typography variant="videoTitle" tone="white" className="mb-6 whitespace-pre-wrap">
              {currentTitle}
            </Typography>
          )}
          {currentDescription && (
            <Typography variant="p" tone="white" className="font-light leading-6 max-w-lg">
              {currentDescription}
            </Typography>
          )}
        </div>
      </div>
    </Section>
  );
};
