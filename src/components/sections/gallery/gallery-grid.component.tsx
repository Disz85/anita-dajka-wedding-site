'use client';

import { GalleryGridItem } from './gallery-grid-item.component';
import { type GalleryGridProps } from './gallery-section.types';

const PARALLAX_INTENSITIES = [5, 12, 8, 15, 6, 10];

export const GalleryGrid = ({ items }: GalleryGridProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-y-8 md:gap-y-16 gap-x-4 md:gap-x-[135px]">
        {items.map((item, i) => {
          const isSmall = i === 0 || (i > 1 && i % 2 !== 0);
          const baseFlexClass = isSmall
            ? 'md:flex-[365_1_30%] md:max-w-[365px]'
            : 'md:flex-[630_1_45%] md:max-w-[630px]';
          const offsetClass = i % 2 !== 0 ? 'md:mt-[60px]' : '';
          const flexClass = `${baseFlexClass} ${offsetClass}`;
          const orientation = isSmall ? 'portrait' : 'landscape';

          return (
            <GalleryGridItem
              key={item._key}
              item={item}
              parallaxIntensity={PARALLAX_INTENSITIES[i % PARALLAX_INTENSITIES.length]}
              orientation={orientation}
              className={flexClass}
            />
          );
        })}
      </div>
    </div>
  );
};
