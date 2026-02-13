'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section/section.component';
import { PortfolioCategories } from './portfolio-categories.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { type PortfolioPageData } from '@/sanity/queries/page.queries';

export const PortfolioSection = ({ data }: { data: PortfolioPageData }) => {
  const locale = useLocale();
  const t = useTranslations('portfolio');

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
      <PortfolioCategories items={items} />
    </Section>
  );
};
