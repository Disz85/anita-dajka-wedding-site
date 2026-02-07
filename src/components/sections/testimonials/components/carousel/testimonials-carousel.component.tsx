'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { SanityTestimonial } from '@/sanity/queries/home.queries';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { useLocale } from 'next-intl';
import { Typography } from '@/components/ui/typography/typography.component';
import { cn } from '@/lib/utils';

type TestimonialsCarouselProps = {
  testimonials: SanityTestimonial[];
};

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const locale = useLocale();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    Fade(),
  ]);

  if (!testimonials || testimonials.length === 0) {return null;}

  return (
    <div className="overflow-hidden w-full max-w-[800px] mx-auto px-4" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {testimonials.map((testimonial, index) => {
          const text = getLocalizedValue(testimonial.text, locale);
          if (!text) {return null;}

          return (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 select-none cursor-grab active:cursor-grabbing">
                <Typography
                  variant="h3"
                  as="p"
                  className="font-heading italic font-light text-fluid-h3 leading-normal"
                >
                  “{text}”
                </Typography>
                <Typography
                  variant="subtitle"
                  as="p"
                  className="font-subtitle text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground"
                >
                  — {testimonial.author}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
