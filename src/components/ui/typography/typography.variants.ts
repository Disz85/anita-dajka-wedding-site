import { cva } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
      h2: 'font-heading text-3xl md:text-4xl font-semibold tracking-tight',
      h3: 'font-heading text-2xl md:text-3xl font-semibold tracking-tight',
      h4: 'font-heading text-xl md:text-2xl font-semibold tracking-tight',
      p: 'font-body text-base leading-7',
      lead: 'font-body text-xl text-muted-foreground',
      large: 'font-body text-lg font-semibold',
      small: 'font-body text-sm font-medium leading-none',
      muted: 'font-body text-sm text-muted-foreground',
      nav: 'font-nav text-sm uppercase tracking-widest',
      subtitle: 'font-subtitle text-xs uppercase tracking-[0.2em] text-muted-foreground',
      videoTitle:
        'font-heading text-[clamp(25px,8vw,100px)] leading-none tracking-[0.05em] font-light',
    },
    tone: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      white: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'p',
    tone: 'default',
  },
});
