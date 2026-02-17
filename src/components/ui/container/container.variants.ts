import { cva } from 'class-variance-authority';

export const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      default: 'max-w-screen-2xl',
      wide: 'max-w-[1400px]',
      content: 'max-w-[1200px]',
      narrow: 'max-w-[600px]',
      full: 'max-w-full',
      viewport: 'mx-0 md:mx-auto w-full md:w-[81.667vw]',
    },
    withPaddingForDesktop: {
      true: 'px-6 md:px-12',
      false: 'px-6 md:px-0',
    },
    /** Section content padding: px-4 md:px-8 */
    withPadding: {
      true: 'px-4 md:px-8',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    withPaddingForDesktop: false,
    withPadding: false,
  },
});
