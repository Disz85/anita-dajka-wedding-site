import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './i18n.config';

const isValidLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.some((locale) => locale === value);

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isValidLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
