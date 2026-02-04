export type HighlightItem = {
  id: string;
  image: string;
  orientation: 'portrait' | 'landscape';
  alt: string;
  blurDataURL?: string;
};

export type HighlightsCarouselProps = {
  items: HighlightItem[];
};

export type LoopPoint = {
  index: number;
  target: () => number;
};

export type EmblaEngine = {
  options: {
    loop: boolean;
  };
  slideLooper: {
    loopPoints: LoopPoint[];
  };
  slideRegistry: number[][];
};

export type HighlightsNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

export type HighlightsSlideProps = {
  item: HighlightItem;
  index: number;
  total: number;
};

export type TweenContext = {
  engine: EmblaEngine;
  scrollProgress: number;
  slidesInView: number[];
  isScrollEvent: boolean;
};
