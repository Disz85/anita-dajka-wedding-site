'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { TestimonialsCarousel } from './components/carousel/testimonials-carousel.component';
import { TestimonialsProps } from './testimonials.types';

export const Testimonials = ({ data }: TestimonialsProps) => {
  const t = useTranslations('testimonials');
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { testimonials } = data;

  return (
    <Section className="bg-warm-white py-20 md:py-32" aria-label={t('sectionLabel')}>
      <Container size="narrow" className="flex flex-col items-center">
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </Section>
  );
};
