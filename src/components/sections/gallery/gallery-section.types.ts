import { type GalleryItem, type GallerySectionData } from '@/sanity/queries/page.queries';

export type GallerySectionProps = {
  data: GallerySectionData;
};

export type GalleryGridProps = {
  items: GalleryItem[];
};

export type GalleryGridItemProps = {
  item: GalleryItem;
  parallaxIntensity: number;
  orientation: 'portrait' | 'landscape';
  className?: string;
};
