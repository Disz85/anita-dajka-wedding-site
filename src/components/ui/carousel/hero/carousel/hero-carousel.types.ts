export type HeroItem = {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  blurDataURL?: string;
};

export type HeroCarouselProps = {
  items: HeroItem[];
};

export type HeroSlideProps = {
  item: HeroItem;
  index: number;
  total: number;
  isActive?: boolean;
  isFirst: boolean;
};
