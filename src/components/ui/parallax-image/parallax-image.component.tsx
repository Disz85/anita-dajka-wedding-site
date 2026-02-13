'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxImageProps } from './parallax-image.types';
import { cn } from '@/lib/utils';

export const ParallaxImage = ({
  className,
  containerClassName,
  parallaxIntensity = 10,
  priority = false,
  alt,
  ...props
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallaxIntensity}%`, `${parallaxIntensity}%`],
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden w-full h-full', containerClassName)}
    >
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
      >
        <Image
          {...props}
          alt={alt}
          className={cn('object-cover w-full h-full', className)}
          priority={priority}
          onLoad={(e) => {
            setIsLoaded(true);
            if (props.onLoad) {
              props.onLoad(e);
            }
          }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
        )}
      </motion.div>
    </div>
  );
};
