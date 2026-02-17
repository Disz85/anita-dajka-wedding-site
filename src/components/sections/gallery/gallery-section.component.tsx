'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section/section.component';
import { GalleryGrid } from './gallery-grid.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { type GallerySectionProps } from './gallery-section.types';

export const GallerySection = ({ data }: GallerySectionProps) => {
  const locale = useLocale();
  const t = useTranslations('gallery');

  if (!data) {
    return null;
  }

  const { title, subtitle, description, items } = data;

  const currentTitle = getLocalizedValue(title, locale) || '';
  const currentSubtitle = getLocalizedValue(subtitle, locale);
  const currentDescription = getLocalizedValue(description, locale);

  return (
    <Section spacing="sm" aria-label={t('sectionLabel')}>
      {(currentTitle || currentSubtitle) && (
        <Section.Header title={currentTitle} subtitle={currentSubtitle} className="mb-12" />
      )}
      {currentDescription && (
        <Section.Description className="mb-16">{currentDescription}</Section.Description>
      )}
      <Section.Inner size="content" withPadding>
        <GalleryGrid items={items} />
      </Section.Inner>
    </Section>
  );
};
