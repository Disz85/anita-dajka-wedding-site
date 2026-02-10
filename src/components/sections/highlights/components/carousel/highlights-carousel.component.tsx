import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { HighlightsCarouselProps } from './highlights-carousel.types';
import { CAROUSEL_OPTIONS, CAROUSEL_STYLES } from './highlights-carousel.config';
import { useHighlightsScale } from './highlights-carousel.hook';
import { HighlightsSlide } from '../slide/highlights-slide.component';
import { HighlightsNavigation } from '../navigation/highlights-navigation.component';

export const HighlightsCarousel = ({ items }: HighlightsCarouselProps) => {
  const t = useTranslations('carousel.highlights');
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS, []);

  useHighlightsScale(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div
      className="w-full max-w-[1100px] mx-auto relative group px-0"
      role="region"
      aria-roledescription={t('roledescription')}
      aria-label={t('label')}
    >
      <div className={CAROUSEL_STYLES.viewport} ref={emblaRef}>
        <ul className={CAROUSEL_STYLES.container} aria-live="polite">
          {items.map((item, index) => (
            <HighlightsSlide key={item.id} item={item} index={index} total={items.length} />
          ))}
        </ul>
      </div>
      <HighlightsNavigation onPrev={scrollPrev} onNext={scrollNext} />
    </div>
  );
};
