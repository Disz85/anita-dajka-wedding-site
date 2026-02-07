'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { useLocale } from 'next-intl';
import { Typography } from '@/components/ui/typography/typography.component';
import { TestimonialsCarouselProps } from './testimonials-carousel.types';

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const locale = useLocale();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    Fade(),
  ]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden w-full max-w-[800px] mx-auto px-4" ref={emblaRef}>
      <div className="flex items-center touch-pan-y">
        {testimonials.map((testimonial, index) => {
          const text = getLocalizedValue(testimonial.text, locale);
          if (!text) {
            return null;
          }

          return (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 select-none cursor-grab active:cursor-grabbing">
                <Typography
                  as="p"
                  className="font-heading font-light italic uppercase tracking-widest leading-normal text-sm mb-4"
                >
                  {text}
                </Typography>
                <Typography
                  as="p"
                  className="font-heading font-light uppercase tracking-widest leading-normal text-sm m-0"
                >
                  {testimonial.author}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
