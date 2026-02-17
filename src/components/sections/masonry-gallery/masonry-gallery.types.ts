import { MasonryGallerySectionData } from '@/sanity/queries/page.queries';

export type MasonryGallerySectionProps = {
  data: MasonryGallerySectionData;
};

export type MasonryGalleryProps = {
  images: {
    src: string;
    width: number;
    height: number;
    alt?: string;
    title?: string;
    description?: string;
    blurDataURL?: string;
  }[];
};

export type UseInfiniteScrollOptions = {
  totalCount: number;
};

export type UseInfiniteScrollReturn = {
  visibleCount: number;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
};

export type OnImageClickFn = (index: number) => void;
