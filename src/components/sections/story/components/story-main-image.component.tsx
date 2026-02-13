import { ParallaxImage } from '@/components/ui/parallax-image/parallax-image.component';
import { cn } from '@/lib/utils';
import { StoryMainImageProps } from './story-main-image.types';

export const StoryMainImage = ({ image, secondImage, className }: StoryMainImageProps) => {
  if (secondImage) {
    return (
      <figure className={cn('m-0 grid grid-cols-2 gap-4', className)}>
        <ParallaxImage
          src={image.asset.url}
          alt={image.alt || ''}
          fill
          className="object-cover"
          containerClassName="shadow-sm aspect-[3/4]"
          sizes="(max-width: 768px) 50vw, 25vw"
          placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={image.asset.metadata?.lqip}
          parallaxIntensity={20}
        />
        <ParallaxImage
          src={secondImage.asset.url}
          alt={secondImage.alt || ''}
          fill
          className="object-cover"
          containerClassName="shadow-sm aspect-[3/4]"
          sizes="(max-width: 768px) 50vw, 25vw"
          placeholder={secondImage.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={secondImage.asset.metadata?.lqip}
          parallaxIntensity={20}
        />
      </figure>
    );
  }

  return (
    <figure className={cn('m-0', className)}>
      <ParallaxImage
        src={image.asset.url}
        alt={image.alt || ''}
        fill
        className="object-cover"
        containerClassName="shadow-sm"
        sizes="(max-width: 768px) 100vw, 50vw"
        placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={image.asset.metadata?.lqip}
        parallaxIntensity={20}
      />
    </figure>
  );
};
