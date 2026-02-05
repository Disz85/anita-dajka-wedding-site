import { EmblaOptionsType } from 'embla-carousel';

export const HERO_CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
  containScroll: false,
  dragFree: false,
  duration: 60,
};

export const AUTOPLAY_OPTIONS = {
  delay: 8000,
  stopOnInteraction: false,
  stopOnMouseEnter: false,
} as const;

export const HERO_STYLES = {
  viewport: 'overflow-hidden w-full h-full absolute inset-0',
  container: 'flex h-full touch-pan-y',
  slide: 'relative flex-[0_0_100%] min-w-0 h-full',
} as const satisfies Record<string, string>;
