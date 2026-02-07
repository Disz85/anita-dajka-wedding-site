import { cn } from '@/lib/utils';
import React from 'react';
import { SectionProps } from './section.types';
import { sectionVariants } from './section.variants';

export const Section = React.forwardRef<HTMLElement, SectionProps>(
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
Section.displayName = 'Section';
