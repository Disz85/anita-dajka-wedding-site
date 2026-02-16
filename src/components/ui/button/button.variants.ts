import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'relative font-nav text-xs uppercase tracking-[0.2em] border border-primary/40 overflow-hidden text-foreground transition-all duration-300 hover:border-primary hover:text-white focus:border-primary focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 before:content-[""] before:absolute before:inset-0 before:bg-primary before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 focus:before:scale-y-100',
        link: 'text-primary underline-offset-4 hover:underline',
        'outline-white':
          'group relative font-subtitle text-[12px] uppercase tracking-[0.1em] border border-white bg-transparent text-white overflow-hidden transition-all duration-300 hover:border-white hover:text-black focus:border-white focus:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 before:content-[""] before:absolute before:inset-0 before:bg-white before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 focus:before:scale-y-100',
      },
      size: {
        default: 'h-10 px-6 py-2',
        none: 'h-auto px-0 py-0',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-10 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
