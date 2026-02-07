import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { sectionVariants } from './section.variants';

export type SectionProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: React.ElementType;
  };
