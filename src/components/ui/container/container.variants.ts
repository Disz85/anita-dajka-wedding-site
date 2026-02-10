import { cva } from 'class-variance-authority';

export const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      default: 'max-w-screen-2xl',
      narrow: 'max-w-[600px]',
      full: 'max-w-full',
    },
    withPaddingForDesktop: {
      true: 'px-6 md:px-12',
      false: 'px-6 md:px-0',
    },
  },
  defaultVariants: {
    size: 'default',
    withPaddingForDesktop: false,
  },
});
