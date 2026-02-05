'use client';

import React from 'react';

/**
 * Elegant thin pause/play icons matching the arrow style.
 * Using 0.8 stroke width for consistency with LongArrow icons.
 */
export const PauseIcon = () => (
  <svg viewBox="0 0 12 14" fill="none" className="w-full h-full" aria-hidden="true">
    <path d="M3 1V13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M9 1V13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

export const PlayIcon = () => (
  <svg viewBox="0 0 12 14" fill="none" className="w-full h-full" aria-hidden="true">
    <path
      d="M2 1.5L10.5 7L2 12.5V1.5Z"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
