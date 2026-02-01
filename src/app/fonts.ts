import { Cormorant_Garamond, Lora, Raleway, Proza_Libre } from 'next/font/google';

/**
 * Primary font for headings and body text.
 * Represents the elegant, "Fine Art" aesthetic.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

/**
 * Secondary font used specifically for navigation elements.
 * Provides a structured, classic look.
 */
export const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
  display: 'swap',
});

/**
 * Modern sans-serif font for accents and smaller UI elements.
 * Offers readability and contrast to the serif fonts.
 */
export const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-raleway',
  display: 'swap',
});

/**
 * Clean sans-serif font for subtitles and secondary accents.
 */
export const proza = Proza_Libre({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-proza',
  display: 'swap',
});
