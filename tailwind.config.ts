import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#434343', // The elegant dark grey from the site
        secondary: '#3E3E3E', // Navigation grey
        background: '#FFFFFF',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-cormorant)', 'serif'], // The site uses Cormorant for body too
        nav: ['var(--font-lora)', 'serif'],
        subtitle: ['var(--font-proza)', 'sans-serif'],
        sans: ['var(--font-raleway)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
