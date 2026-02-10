'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { Typography } from '@/components/ui/typography/typography.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { PageHeaderProps } from './page-header.types';

export const PageHeader = ({ title, subtitle, description }: PageHeaderProps) => {
  const locale = useLocale();
  const currentDescription = getLocalizedValue(description, locale);

  return (
    <Section className="pb-10 pt-24 md:pb-20">
      <Container size="narrow" className="flex flex-col items-center text-center space-y-6">
        <Typography variant="pageSubtitle">{subtitle}</Typography>
        <Typography variant="pageTitle">{title}</Typography>
        {currentDescription && (
          <Typography variant="pageDescription" className="max-w-xl mx-auto">
            {currentDescription}
          </Typography>
        )}
      </Container>
    </Section>
  );
};
