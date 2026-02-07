import React from 'react';

export const HEADING_TAG_MAP = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} satisfies Record<number, React.ElementType>;

export const HEADING_VARIANT_MAP = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h4',
  6: 'h4',
} satisfies Record<number, 'h1' | 'h2' | 'h3' | 'h4'>;
