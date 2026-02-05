export const HERO_SLIDE_ANIMATION = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
} as const;

export const TEXT_CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8, // Wait for slide fade-in to complete
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

export const TEXT_ITEM_VARIANTS = {
  hidden: { y: '110%', skewY: 5, opacity: 0 },
  visible: {
    y: '0%',
    skewY: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: '-120%', // Move upwards (continue direction)
    skewY: 0,
    rotate: -5,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.64, 0, 0.78, 0],
      opacity: { duration: 0.1, delay: 0.4 }, // Fade only at the very end
    },
  },
} as const;
