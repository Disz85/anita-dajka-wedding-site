import { Transition, Variants } from 'framer-motion';

export const NAV_TRANSITION = {
  duration: 0.5,
  ease: [0.6, 0.01, -0.05, 0.9],
} as const satisfies Transition;

export const leftArrowVariants = {
  layer1: {
    initial: { x: 0 },
    hover: { x: -80 },
  },
  layer2: {
    initial: { x: 80 },
    hover: { x: 0 },
  },
} as const satisfies Record<string, Variants>;

export const rightArrowVariants = {
  layer1: {
    initial: { x: 0 },
    hover: { x: 80 },
  },
  layer2: {
    initial: { x: -80 },
    hover: { x: 0 },
  },
} as const satisfies Record<string, Variants>;
