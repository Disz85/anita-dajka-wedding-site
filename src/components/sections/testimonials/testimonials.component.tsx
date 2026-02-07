'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { TestimonialsSectionData } from '@/sanity/queries/home.queries';
import { TestimonialsCarousel } from './components/carousel/testimonials-carousel.component';
import { TestimonialsProps } from './testimonials.types';

export const Testimonials = ({ data }: TestimonialsProps) => {
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { testimonials } = data;

  return (
    <Section className="bg-muted/30 py-20 md:py-32" aria-label="Testimonials">
      <Container size="narrow" className="flex flex-col items-center">
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </Section>
  );
};
