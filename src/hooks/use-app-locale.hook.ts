import { useLocale } from 'next-intl';
import { siteConfig, type Locale } from '@/config/site.config';

/**
 * A type-safe wrapper around useLocale() that guarantees the returned value
 * is a valid Locale from siteConfig.
 */
export const useAppLocale = (): Locale => {
  const locale = useLocale();

  // Validate if the current locale is actually supported
  // This provides runtime safety in addition to compile-time types
  const isValidLocale = (localeCode: string): localeCode is Locale => {
    return siteConfig.i18n.locales.includes(localeCode as Locale);
  };

  if (isValidLocale(locale)) {
    return locale;
  }

  // Fallback to default locale if something goes wrong
  return siteConfig.i18n.defaultLocale;
};
