import { VariantProps } from 'class-variance-authority';
import { ReactNode, HTMLAttributes } from 'react';
import { containerVariants } from './container.variants';

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants> & {
    children: ReactNode;
  };
