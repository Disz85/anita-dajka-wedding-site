'use client';

import NextImage from 'next/image';
import { motion, type HTMLMotionProps } from 'framer-motion';
import {
  type RenderImageContext,
  type RenderImageProps,
  type RenderWrapperProps,
} from 'react-photo-album';
import { MASONRY_CONFIG } from './masonry-gallery.config';
import { type OnImageClickFn } from './masonry-gallery.types';

export const renderImage = (
  { src, alt, title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
): React.ReactElement => {
  const validSrc = typeof src === 'string' ? src : photo.src;
  const blurValue = 'blurDataURL' in photo ? photo.blurDataURL : undefined;
  const blurDataURL = typeof blurValue === 'string' ? blurValue : undefined;

  return (
    <NextImage
      src={validSrc}
      alt={alt || ''}
      title={title}
      width={width}
      height={height}
      sizes={sizes}
      className="object-cover w-full h-auto rounded-none"
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  );
};

// Type assertion escape hatch: react-photo-album's RenderWrapperProps includes
// event handlers that conflict with framer-motion's HTMLMotionProps types.
// This isolated wrapper bridges the two libraries safely.
export const createWrapperRenderer = (onImageClick: OnImageClickFn) => {
  const WrapperRenderer = (
    { style, children, ...rest }: RenderWrapperProps,
    { index }: { index: number },
  ): React.ReactElement => {
    const motionProps = rest as unknown as HTMLMotionProps<'div'>;

    return (
      <motion.div
        style={{ ...style, position: 'relative' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: (index % MASONRY_CONFIG.LOAD_MORE_INCREMENT) * 0.05,
        }}
        className="group cursor-pointer overflow-hidden"
        {...motionProps}
      >
        {children}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
          onClick={() => onImageClick(index)}
        />
      </motion.div>
    );
  };

  return WrapperRenderer;
};

export const getColumnCount = (containerWidth: number): number => {
  if (containerWidth < MASONRY_CONFIG.BREAKPOINTS.MOBILE) {
    return MASONRY_CONFIG.COLUMNS.MOBILE;
  }
  if (containerWidth < MASONRY_CONFIG.BREAKPOINTS.TABLET) {
    return MASONRY_CONFIG.COLUMNS.TABLET;
  }
  return MASONRY_CONFIG.COLUMNS.DESKTOP;
};
