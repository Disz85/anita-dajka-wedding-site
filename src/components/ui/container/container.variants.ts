import { cva } from 'class-variance-authority';

export const containerVariants = cva('mx-auto w-full px-6 md:px-0', {
  variants: {
    size: {
      default: 'max-w-screen-2xl',
      narrow: 'max-w-[600px]',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
