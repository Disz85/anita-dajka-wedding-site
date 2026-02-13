import { Cormorant_Garamond, Lora, Raleway, Proza_Libre } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-raleway',
  display: 'swap',
});

export const proza = Proza_Libre({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-proza',
  display: 'swap',
});
