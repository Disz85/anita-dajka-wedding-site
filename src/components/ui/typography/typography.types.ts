import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { typographyVariants } from './typography.variants';

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
  };
