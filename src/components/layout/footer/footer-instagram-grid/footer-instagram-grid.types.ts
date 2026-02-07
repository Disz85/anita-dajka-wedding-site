import type { FooterImage } from '@/sanity/queries';

export type FooterInstagramGridProps = {
  images: FooterImage[];
  instagramUrl: string;
  navAriaLabel: string;
  getImageAriaLabel: (index: number) => string;
};
