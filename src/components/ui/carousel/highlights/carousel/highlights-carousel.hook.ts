import { useCallback, useEffect } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { EmblaEngine, TweenContext } from './highlights-carousel.types';
import { HighlightsTweenService } from './highlights-carousel.utils';

export const useHighlightsScale = (emblaApi: EmblaCarouselType | undefined) => {
  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: string) => {
    const context: TweenContext = {
      engine: emblaApi.internalEngine() as unknown as EmblaEngine,
      scrollProgress: emblaApi.scrollProgress(),
      slidesInView: emblaApi.slidesInView(),
      isScrollEvent: eventName === 'scroll',
    };

    HighlightsTweenService.tweenSlides(emblaApi, context);
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    tweenScale(emblaApi);
    emblaApi.on('reInit', tweenScale);
    emblaApi.on('scroll', tweenScale);

    return () => {
      emblaApi.off('reInit', tweenScale);
      emblaApi.off('scroll', tweenScale);
    };
  }, [emblaApi, tweenScale]);
};
