import { cn } from '@/lib/utils';
import React from 'react';
import { SectionProps } from './section.types';
import { sectionVariants } from './section.variants';
import { SectionHeader } from './components/header/section-header.component';
import { SectionDescription } from './components/description/section-description.component';

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

export const Section = Object.assign(SectionRoot, {
  Header: SectionHeader,
  Description: SectionDescription,
});
