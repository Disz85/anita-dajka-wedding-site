export const dropdownVariants = {
  initial: { opacity: 0, y: -5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -5, scale: 0.95 },
  transition: { duration: 0.15, ease: 'easeOut' },
};

export const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
  transition: { duration: 0.2 },
};
