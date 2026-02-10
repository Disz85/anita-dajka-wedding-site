import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './i18n.config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/portfolio': {
      en: '/portfolio',
      hu: '/portfolio',
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;

export const validPathnames = Object.keys(routing.pathnames) as AppPathnames[];

export const isAppPathname = (href: string): href is AppPathnames =>
  validPathnames.includes(href as AppPathnames);
