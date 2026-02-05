import { useLocale } from 'next-intl';
import { siteConfig, type Locale } from '@/config/site.config';

export const useAppLocale = (): Locale => {
  const locale = useLocale();

  const isValidLocale = (localeCode: string): localeCode is Locale => {
    return siteConfig.i18n.locales.includes(localeCode as Locale);
  };

  if (isValidLocale(locale)) {
    return locale;
  }

  return siteConfig.i18n.defaultLocale;
};
