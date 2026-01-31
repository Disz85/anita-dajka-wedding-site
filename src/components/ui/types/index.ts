import { HTMLAttributes } from 'react';

/**
 * Types for generic UI components
 */
export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
