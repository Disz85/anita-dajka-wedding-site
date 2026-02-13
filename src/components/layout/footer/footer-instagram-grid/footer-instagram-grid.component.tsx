'use client';

import React from 'react';
import Image from 'next/image';
import type { FooterInstagramGridProps } from './footer-instagram-grid.types';
import type { FooterImage } from '@/sanity/queries/footer.queries';

export const FooterInstagramGrid = ({
  images,
  instagramUrl,
  navAriaLabel,
  getImageAriaLabel,
}: FooterInstagramGridProps): React.JSX.Element | null => {
  if (!images || images.length === 0 || !instagramUrl) {
    return null;
  }
  return (
    <nav className="mt-8 grid grid-cols-5 gap-1 w-full max-w-md mx-auto" aria-label={navAriaLabel}>
      {images.map((item: FooterImage, index: number) => {
        const url = item?.asset?.url;
        if (!url) {
          return null;
        }

        const imageLabel = getImageAriaLabel(index + 1);

        return (
          <a
            key={item.asset._id ?? index}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={imageLabel}
          >
            <Image
              src={url}
              alt={imageLabel}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 20vw, 120px"
            />
          </a>
        );
      })}
    </nav>
  );
};
