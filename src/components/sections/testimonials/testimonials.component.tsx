'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/container/container.component';
import { Section } from '@/components/ui/section/section.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { TestimonialsSectionData } from '@/sanity/queries/home.queries';
import { TestimonialsCarousel } from './components/carousel/testimonials-carousel.component';

type TestimonialsProps = {
  data?: TestimonialsSectionData;
};

export const Testimonials = ({ data }: TestimonialsProps) => {
  const locale = useLocale();

  if (!data) {return null;}

  const { title, subtitle, testimonials } = data;
  const currentTitle = getLocalizedValue(title, locale);
  const currentSubtitle = getLocalizedValue(subtitle, locale);

  return (
    <Section className="bg-muted/30 py-20 md:py-32" aria-labelledby="testimonials-heading">
      <Container size="narrow" className="flex flex-col items-center">
        {currentTitle && (
          <Section.Header
            id="testimonials-heading"
            title={currentTitle}
            subtitle={currentSubtitle}
            subtitlePosition="top"
            titleSize="small"
            size="narrow"
            className="mb-12 md:mb-16 sr-only"
          />
        )}
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </Section>
  );
};
