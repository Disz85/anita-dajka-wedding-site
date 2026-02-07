import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button.variants';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
