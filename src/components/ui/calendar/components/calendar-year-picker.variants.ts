import { Variants, Transition } from 'framer-motion';

export const YEAR_PICKER_TRANSITION: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

export const yearPickerVariants: Variants = {
  initial: { opacity: 0, y: -5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -5, scale: 0.95 },
};

export const chevronVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

export const CHEVRON_TRANSITION: Transition = {
  duration: 0.2,
};
