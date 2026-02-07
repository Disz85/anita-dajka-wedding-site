import { Transition } from 'framer-motion';

export const PAUSE_BUTTON_TRANSITION = {
  duration: 0.4,
  ease: [0.32, 0, 0.67, 0],
} as const satisfies Transition;
