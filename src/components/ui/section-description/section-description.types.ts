import { ReactNode } from 'react';

export type SectionDescriptionAlign = 'left' | 'center' | 'right';

export type SectionDescriptionProps = {
  children: ReactNode;
  align?: SectionDescriptionAlign;
  className?: string;
  maxWidth?: string;
  as?: React.ElementType;
};
