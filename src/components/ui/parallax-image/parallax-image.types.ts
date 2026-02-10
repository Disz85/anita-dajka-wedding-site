import { ImageProps } from 'next/image';

export type ParallaxImageProps = Omit<ImageProps, 'className'> & {
  className?: string;
  containerClassName?: string;
  parallaxIntensity?: number;
  priority?: boolean;
};
