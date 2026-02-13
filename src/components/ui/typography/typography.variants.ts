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
      action: 'font-body text-xs uppercase tracking-[0.15em] text-muted-foreground/80',
      introBody: 'font-body text-[14px] leading-[1.5] tracking-[0.05em]',
      videoTitle:
        'font-heading text-[clamp(25px,8vw,100px)] leading-none tracking-[0.05em] font-light',
      pageTitle:
        'font-heading text-[clamp(26px,5vw,65px)] font-light uppercase leading-[1] tracking-[0.1em] text-center mb-4',
      pageSubtitle:
        'font-subtitle text-[12px] uppercase tracking-[0.1em] leading-[1.5] text-[rgba(67,67,67,1)] mb-1',
      pageDescription:
        'font-body text-[14px] font-light leading-[1.5] tracking-[0.05em] text-center text-[rgba(67,67,67,1)]',
      portfolioTitle:
        'font-heading text-[clamp(30px,5vw,75px)] font-light uppercase tracking-[0.1em] text-white leading-[1.2]',
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
