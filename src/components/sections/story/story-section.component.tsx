'use client';

import { useLocale } from 'next-intl';
import clsx from 'clsx';
import { Section } from '@/components/ui/section/section.component';

import { StorySectionProps } from './story-section.types';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { StoryItemSide } from './components/story-item-side.component';
import { StoryMainImage } from './components/story-main-image.component';

export const StorySection = ({ data }: StorySectionProps) => {
  const locale = useLocale();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  return (
    <Section spacing="sm">
      <div className="mx-auto flex flex-col relative w-[81.667vw] gap-[0.833vw]">
        {data.items.map((item) => {
          const isLeft = item.layout === 'left' || item.layout === 'left-bottom';
          const isBottom = item.layout === 'left-bottom' || item.layout === 'right-bottom';
          const title = getLocalizedValue(item.title, locale);
          const description = getLocalizedValue(item.description, locale);

          const sideItemClassName = clsx(
            'order-2 md:gap-2',
            isBottom
              ? clsx(
                  'md:absolute md:top-[20vw] md:w-[15vw] md:z-10',
                  isLeft ? 'md:left-0' : 'md:right-0',
                )
              : isLeft
                ? 'md:order-1 md:col-start-1'
                : 'md:order-3 md:col-start-3',
          );

          const imageContainerClassName = clsx(
            'w-[35%] -mt-36 z-10',
            isLeft ? 'self-start ml-4' : 'self-end mr-4',
            'md:w-full md:mt-0 md:bg-transparent md:self-auto md:ml-0 md:mr-0',
          );

          const contentContainerClassName = clsx('m-2 px-4', 'md:m-0 md:px-0');

          return (
            <article
              key={item._key}
              className="w-full grid grid-cols-1 md:grid-cols-[15vw_50vw_15vw] gap-[0.833vw] items-start relative"
            >
              <StoryItemSide
                image={item.secondaryImage}
                title={title}
                description={description}
                className={sideItemClassName}
                imageContainerClassName={imageContainerClassName}
                contentContainerClassName={contentContainerClassName}
              />

              <StoryMainImage
                image={item.mainImage}
                secondImage={item.secondMainImage}
                className="relative order-1 md:order-2 md:col-start-2 w-full aspect-50/35 md:w-[50vw] md:h-[35vw] md:aspect-auto"
              />
            </article>
          );
        })}
      </div>
    </Section>
  );
};
