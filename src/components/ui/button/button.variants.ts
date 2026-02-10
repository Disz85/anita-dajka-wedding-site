import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide uppercase',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'outline-white':
          'group relative font-subtitle text-[12px] uppercase tracking-[0.1em] border border-white bg-transparent text-white overflow-hidden transition-all duration-300 hover:border-white hover:text-black focus:border-white focus:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 before:content-[""] before:absolute before:inset-0 before:bg-white before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 focus:before:scale-y-100',
      },
      size: {
        default: 'h-10 px-6 py-2', // Slightly wider than default
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-10 text-base', // Larger touch target
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
