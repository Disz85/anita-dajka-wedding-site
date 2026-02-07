import { cva } from 'class-variance-authority';

export const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-4 md:py-8',
      default: 'py-8 md:py-16',
      lg: 'py-24 md:py-32',
    },
    background: {
      default: 'bg-background',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
    container: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    spacing: 'default',
    background: 'default',
  },
});
