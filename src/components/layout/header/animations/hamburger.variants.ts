import { Variants, Transition } from 'framer-motion';

/**
 * Animation variants for the "Menu" / "Close" text container.
 * slides up to reveal "Close" and down to reveal "Menu".
 */
export const menuTextVariants: Variants = {
  closed: { y: 0 },
  open: { y: -30 },
};

/**
 * Shared transition configuration for the text animation.
 * Uses a custom cubic-bezier for a smooth, snappy feel.
 */
export const menuTextTransition: Transition = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1],
};

/**
 * Animation for the top line of the hamburger icon.
 * Rotates 45 degrees and moves down to form one arm of the X.
 * Expands from 50% to full width when opening.
 */
export const topLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    width: '50%',
  },
  open: {
    rotate: 45,
    y: 5.5,
    width: '100%',
  },
};

/**
 * Animation for the middle line of the hamburger icon.
 * Fades out completely when the menu opens to declutter the X shape.
 */
export const middleLineVariants: Variants = {
  closed: {
    opacity: 1,
    width: '100%',
  },
  open: {
    opacity: 0,
    width: '100%',
  },
};

/**
 * Animation for the bottom line of the hamburger icon.
 * Rotates -45 degrees and moves up to form the other arm of the X.
 * Expands from 75% to full width when opening.
 */
export const bottomLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    width: '75%',
  },
  open: {
    rotate: -45,
    y: -5.5,
    width: '100%',
  },
};
