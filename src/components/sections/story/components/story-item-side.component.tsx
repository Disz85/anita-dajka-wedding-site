import clsx from 'clsx';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography/typography.component';
import { StoryItemSideProps } from './story-item-side.types';

export const StoryItemSide = ({
  image,
  title,
  description,
  className,
  imageContainerClassName,
  contentContainerClassName,
  style,
}: StoryItemSideProps) => {
  return (
    <figure className={clsx('flex flex-col m-0', className)} style={style}>
      <div className={clsx('relative aspect-square overflow-hidden', imageContainerClassName)}>
        <Image
          src={image.asset.url}
          alt={image.alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 35vw, 15vw"
          placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={image.asset.metadata?.lqip}
        />
      </div>
      <figcaption className={clsx('flex flex-col gap-2', contentContainerClassName)}>
        {title && (
          <Typography variant="nav" as="h3">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="introBody" as="p" className="text-gray-500">
            {description}
          </Typography>
        )}
      </figcaption>
    </figure>
  );
};
