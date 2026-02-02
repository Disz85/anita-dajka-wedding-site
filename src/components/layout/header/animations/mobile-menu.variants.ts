import { Variants, Easing } from 'framer-motion';

// Animation Configuration
const EASE_CUSTOM: Easing = [0.76, 0, 0.24, 1];
const MENU_ITEM_EASE: Easing = [0.37, 0, 0.63, 1];

const INTRO_DURATION = 0.6;
const CONTENT_DELAY = 0.5;
const CONTENT_DURATION = 0.7;

// Calculate when items should start appearing relative to content layer
const MENU_ITEMS_START_DELAY = CONTENT_DELAY + 0.4;

const STAGGER_DELAY = 0.09;

/**
 * Animation configuration for the Mobile Menu component.
 *
 * Implements a "curtain" effect where a black intro layer drops down first,
 * followed by the white content layer carrying the menu items.
 *
 * Exit animation reverses this flow, sliding everything upwards.
 */

/**
 * The main white background layer that holds the menu content.
 * It slides down slightly after the black layer to create the layered effect.
 */
export const menuContentLayerVariants: Variants = {
  initial: {
    y: '-100%',
  },
  animate: {
    y: '0%',
    transition: {
      duration: CONTENT_DURATION,
      ease: EASE_CUSTOM,
      delay: CONTENT_DELAY,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: CONTENT_DURATION,
      ease: EASE_CUSTOM,
    },
  },
};

/**
 * The black intro layer that appears first to cover the screen.
 * It serves as a visual transition before the content appears.
 */
export const menuIntroLayerVariants: Variants = {
  initial: {
    y: '-100%',
  },
  animate: {
    y: '0%',
    transition: {
      duration: INTRO_DURATION,
      ease: EASE_CUSTOM,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0,
    },
  },
};

/**
 * Container for the list of menu links.
 * Orchestrates the staggered entry of individual items.
 */
export const menuListVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: MENU_ITEMS_START_DELAY,
      staggerChildren: STAGGER_DELAY,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      duration: 0,
    },
  },
};

/**
 * Animation for individual menu items (links).
 * They fade in and slide up into position.
 */
export const menuItemVariants: Variants = {
  initial: {
    y: '30vh',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: MENU_ITEM_EASE,
    },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
  exit: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

/**
 * Animation for the menu footer (contact info, social links).
 * Appears after all menu items with a fade-in effect.
 */
export const menuFooterVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: MENU_ITEMS_START_DELAY + STAGGER_DELAY * 6 + 0.2,
      duration: 0.5,
      ease: MENU_ITEM_EASE,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

/**
 * Animation for header items (Logo, Hamburger) during mobile menu transition.
 * They fade out when the "black curtain" drops and fade back in on the white layer.
 */
export const headerItemVariants: Variants = {
  closed: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 1.2,
      times: [0, 0.1, 0.6, 1],
      ease: 'easeInOut',
    },
  },
};
