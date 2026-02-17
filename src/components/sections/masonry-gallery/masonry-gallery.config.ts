export const MASONRY_CONFIG = {
  INITIAL_VISIBLE_COUNT: 12,
  LOAD_MORE_INCREMENT: 9,
  SPACING: 1, // Reset spacing to original value: 1
  ROOT_MARGIN: '400px',
  BREAKPOINTS: {
    MOBILE: 400,
    TABLET: 800,
  },
  COLUMNS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
  },
} as const;
