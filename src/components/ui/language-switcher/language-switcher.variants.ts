import { Variants, Transition } from 'framer-motion';

export const dropdownVariants = {
  initial: { opacity: 0, y: -5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -5, scale: 0.95 },
} as const satisfies Variants;

export const dropdownTransition = {
  duration: 0.15,
  ease: 'easeOut',
} as const satisfies Transition;

export const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
} as const satisfies Variants;

export const iconTransition = {
  duration: 0.2,
} as const satisfies Transition;
