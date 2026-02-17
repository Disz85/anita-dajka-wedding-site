import { cn } from '@/lib/utils';
import React from 'react';
import { SectionProps } from './section.types';
import { sectionVariants } from './section.variants';
import { SectionHeader } from './components/header/section-header.component';
import { SectionDescription } from './components/description/section-description.component';
import { Container } from '@/components/ui/container/container.component';

export const SectionRoot = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, as: Component = 'section', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ spacing, background, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

SectionRoot.displayName = 'Section';

/** Szekció tartalom constrainelésére: full (teljes szélesség) vagy wide/content (max szélesség) */
export const SectionInner = ({
  size = 'wide',
  withPadding = true,
  className,
  ...props
}: React.ComponentProps<typeof Container>) => (
  <Container size={size} withPadding={withPadding} className={className} {...props} />
);

export const Section = Object.assign(SectionRoot, {
  Header: SectionHeader,
  Description: SectionDescription,
  /** Szekció tartalom wrapper: max-w + padding. size: 'wide' | 'content' | 'narrow' | 'full' */
  Inner: SectionInner,
});
