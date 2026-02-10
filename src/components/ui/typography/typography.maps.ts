import React from 'react';
import { TypographyProps } from './typography.types';

export const defaultElementMap: Record<
  NonNullable<TypographyProps['variant']>,
  React.ElementType
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
  nav: 'span',
  subtitle: 'p',
  introBody: 'p',
  videoTitle: 'h2',
  pageTitle: 'h1',
  pageSubtitle: 'p',
  pageDescription: 'p',
  portfolioTitle: 'h3',
};
