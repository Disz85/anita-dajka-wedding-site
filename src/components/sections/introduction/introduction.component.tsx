'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { Button } from '@/components/ui/button/button.component';
import { LongArrowRight } from '@/components/ui/icons/long-arrows/long-arrows.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { Link } from '@/i18n/i18n.navigation';
import { CustomPortableText } from '@/components/ui/typography/portable-text.component';
import { animationVariants, textVariants } from './introduction.variants';
import { IntroductionProps } from './introduction.types';

export const Introduction = ({ data }: IntroductionProps) => {
  const locale = useLocale();
  const sectionId = useId();
  const shouldReduceMotion = useReducedMotion();

  if (!data) {
    return null;
  }

  const { title, subtitle, description, image, ctaLabel, ctaUrl } = data;

  const currentTitle = getLocalizedValue(title, locale);
  const currentSubtitle = getLocalizedValue(subtitle, locale);
  const currentImageAlt = getLocalizedValue(image.alt, locale);
  const currentCtaLabel = getLocalizedValue(ctaLabel, locale);

  const descriptionBlocks = getLocalizedValue(description, locale);

  const imageUrl = image.asset.url;
  const lqip = image.asset.metadata?.lqip;

  const animationProps = shouldReduceMotion
    ? { initial: 'visible', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } };

  return (
    <Section
      className="overflow-hidden"
      aria-labelledby={currentTitle ? `${sectionId}-title` : undefined}
    >
      {currentTitle && (
        <Section.Header
          id={`${sectionId}-title`}
          title={currentTitle}
          subtitle={currentSubtitle}
          subtitlePosition="bottom"
          titleSize="small"
          size="narrow"
          className="mb-4 md:mb-8"
        />
      )}
      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={textVariants}
            {...animationProps}
            className="order-2 md:order-1 flex flex-col items-center text-center md:text-left w-full"
          >
            {descriptionBlocks && (
              <div className="mb-10 text-justify md:text-left w-full">
                <CustomPortableText value={descriptionBlocks} />
              </div>
            )}

            {currentCtaLabel && ctaUrl && (
              <div className="flex justify-center md:justify-start w-full">
                <Button
                  variant="link"
                  asChild
                  className="group p-0 h-auto font-sans tracking-widest uppercase text-xs hover:no-underline"
                >
                  <Link href={ctaUrl} className="flex items-center gap-6 text-foreground">
                    <span className="tracking-[0.2em]">{currentCtaLabel}</span>
                    <LongArrowRight className="w-16 h-auto text-foreground group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={animationVariants}
            {...animationProps}
            className="order-1 md:order-2 w-full relative flex justify-center"
          >
            <div className="relative w-full max-w-[350px] aspect-3/4 overflow-hidden">
              <Image
                src={imageUrl}
                alt={currentImageAlt ?? 'Fine art photography'}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover"
                placeholder={lqip ? 'blur' : 'empty'}
                blurDataURL={lqip}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
