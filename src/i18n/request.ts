import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { locales, type Locale } from './config';

const isValidLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.some((locale) => locale === value);

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale: Locale = isValidLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
