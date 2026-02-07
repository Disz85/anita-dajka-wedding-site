import { EmblaOptionsType } from 'embla-carousel';

export const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
  containScroll: false,
  dragFree: false,
};

export const TWEEN_FACTORS = {
  portrait: 1.4,
  landscape: 0.8,
} as const;

export const PARALLAX_FACTORS = {
  portrait: 0.9,
  landscape: 1.5,
} as const;

export const CAROUSEL_STYLES = {
  viewport: 'overflow-hidden w-full',
  container:
    'flex bg-transparent touch-pan-y ml-[-16px] items-center cursor-grab active:cursor-grabbing',
  slideWrapper: 'relative shrink-0 select-none box-border',
  slideInner:
    'embla__slide__inner relative overflow-hidden transition-transform duration-0 ease-linear origin-center',
} as const satisfies Record<string, string>;

export const ORIENTATION_STYLES = {
  portrait: {
    width: 'w-[40vw] md:w-[30vw] md:max-w-[360px]',
    aspectRatio: 'aspect-[2/3]',
  },
  landscape: {
    width: 'w-[90vw] md:w-[67.5vw] md:max-w-[810px]',
    aspectRatio: 'aspect-[3/2]',
  },
} as const satisfies Record<string, Record<string, string>>;
