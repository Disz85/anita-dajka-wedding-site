/**
 * Utility for retrieving localized text from CMS objects.
 * Handles dynamic property access and fallbacks safely.
 */

type LocalizedString = {
  [key: string]: string | undefined;
};

/**
 * Gets the localized text for a given locale, falling back to English.
 * @param obj The object containing localized strings (e.g., { en: 'Hello', hu: 'Szia' })
 * @param locale The current locale code (e.g., 'hu', 'en')
 * @returns The localized string or the English fallback
 */
export const getLocalizedText = (
  obj: LocalizedString | undefined | null,
  locale: string,
): string => {
  if (obj === null || obj === undefined) {
    return '';
  }

  const localizedValue = obj[locale];
  if (typeof localizedValue === 'string' && localizedValue !== '') {
    return localizedValue;
  }

  const englishValue = obj['en'];
  if (typeof englishValue === 'string' && englishValue !== '') {
    return englishValue;
  }

  return '';
};
