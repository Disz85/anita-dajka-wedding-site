import { type MotionProps } from 'framer-motion';
import { MASONRY_CONFIG } from './masonry-gallery.config';

export const masonryItemAnimation = (index: number): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  layout: true,
  transition: {
    opacity: { duration: 0.5, delay: (index % MASONRY_CONFIG.LOAD_MORE_INCREMENT) * 0.05 },
    layout: { duration: 0.3 },
  },
});
