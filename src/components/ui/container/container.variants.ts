import { cva } from 'class-variance-authority';

export const containerVariants = cva('mx-auto w-full px-6 md:px-12', {
  variants: {
    size: {
      default: 'max-w-screen-2xl', // 1536px, close to 1400px but standard
      narrow: 'max-w-screen-lg',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
