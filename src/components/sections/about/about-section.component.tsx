'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useId, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { CustomPortableText } from '@/components/ui/typography/portable-text.component';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AboutSectionProps } from './about-section.types';
import { aboutSectionAnimations } from './about-section.animations';

export const AboutSection = ({ data }: AboutSectionProps) => {
  const locale = useLocale();
  const sectionId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yMain = useTransform(
    scrollYProgress,
    [0, 1],
    aboutSectionAnimations.parallax.main as unknown as string[],
  );
  const ySecondary = useTransform(
    scrollYProgress,
    [0, 1],
    aboutSectionAnimations.parallax.secondary as unknown as string[],
  );

  if (!data) {
    return null;
  }

  const { title, prologue, quote, description, mainImage, secondaryImage } = data;

  const currentTitle = getLocalizedValue(title, locale);
  const currentPrologue = getLocalizedValue(prologue, locale);
  const currentQuote = getLocalizedValue(quote, locale);
  const descriptionBlocks = getLocalizedValue(description, locale);

  const mainImageAlt = mainImage?.alt;
  const secondaryImageAlt = secondaryImage?.alt;

  const mainImageUrl = mainImage?.asset?.url;
  const mainLqip = mainImage?.asset?.metadata?.lqip;
  const secondaryImageUrl = secondaryImage?.asset?.url;
  const secondaryLqip = secondaryImage?.asset?.metadata?.lqip;

  return (
    <Section
      ref={sectionRef}
      className="overflow-hidden"
      id="about"
      aria-labelledby={currentTitle ? `${sectionId}-title` : undefined}
    >
      <Container size="content" withPaddingForDesktop={true}>
        <div className="relative flex flex-col items-center gap-8 md:gap-0 w-full">
          <div className="text-center z-10 w-full order-1 md:mb-4">
            <h2
              id={`${sectionId}-title`}
              className="text-sm font-sans tracking-[0.2em] uppercase text-foreground/80"
            >
              {currentTitle}
            </h2>
          </div>
          {secondaryImageUrl && (
            <motion.div
              style={isDesktop ? { y: ySecondary } : undefined}
              className="relative w-full aspect-3/4 overflow-hidden z-10 order-2 md:absolute md:right-0 md:top-0 md:w-[30%] md:order-0"
            >
              <Image
                src={secondaryImageUrl}
                alt={secondaryImageAlt ?? 'Portrait'}
                fill
                className="object-cover"
                placeholder={secondaryLqip ? 'blur' : 'empty'}
                blurDataURL={secondaryLqip}
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </motion.div>
          )}
          {currentQuote && (
            <div className="relative z-20 pointer-events-none text-center w-full flex justify-center order-3 md:order-3">
              <blockquote className="font-heading font-light text-[20px] leading-none tracking-[0.05em] text-foreground uppercase md:text-[clamp(20px,5vw,70px)] md:w-[60%] mx-auto">
                &quot;{currentQuote}&quot;
              </blockquote>
            </div>
          )}
          {currentPrologue && (
            <div className="text-center z-10 order-4 md:order-2 md:mb-8 md:w-[25%]">
              <p className="font-heading font-light text-[12px] leading-normal tracking-[0.05em] text-primary">
                {currentPrologue}
              </p>
            </div>
          )}
          {mainImageUrl && (
            <motion.div
              style={isDesktop ? { y: yMain } : undefined}
              className="relative w-full aspect-3/4 overflow-hidden z-10 order-5 md:absolute md:left-0 md:top-48 lg:top-56 md:w-[30%] md:order-0"
            >
              <Image
                src={mainImageUrl}
                alt={mainImageAlt ?? 'Portrait'}
                fill
                className="object-cover"
                placeholder={mainLqip ? 'blur' : 'empty'}
                blurDataURL={mainLqip}
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </motion.div>
          )}
          {descriptionBlocks && (
            <div className="z-10 order-6 md:order-4 md:mt-8 md:w-[25%]">
              <div className="font-heading font-light text-[12px] leading-normal tracking-[0.05em] text-primary text-center md:text-left">
                <CustomPortableText value={descriptionBlocks} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
