'use client';

import { useLocale } from 'next-intl';
import { Section } from '@/components/ui/section/section.component';
import { MasonryGallery } from './masonry-gallery.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { type MasonryGallerySectionProps } from './masonry-gallery.types';

export const MasonryGallerySection = ({ data }: MasonryGallerySectionProps) => {
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { title, description, items } = data;

  const currentTitle = getLocalizedValue(title, locale) || '';
  const currentDescription = getLocalizedValue(description, locale);

  const galleryImages =
    items?.map((item) => ({
      src: item.image.asset.url,
      width: item.image.asset.metadata.dimensions.width,
      height: item.image.asset.metadata.dimensions.height,
      alt: currentTitle,
      blurDataURL: item.image.asset.metadata.lqip,
    })) || [];

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <Section spacing="sm">
      {currentTitle && <Section.Header title={currentTitle} className="mb-12" />}
      {currentDescription && (
        <Section.Description className="mb-12" maxWidth="max-w-3xl">
          {currentDescription}
        </Section.Description>
      )}
      <Section.Inner size="viewport" withPadding>
        <MasonryGallery images={galleryImages} />
      </Section.Inner>
    </Section>
  );
};
