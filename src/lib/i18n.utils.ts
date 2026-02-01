/**
 * Utility for retrieving localized text from CMS objects.
 * Handles dynamic property access and fallbacks safely.
 */

type LocalizedString = {
  [key: string]: string | undefined;
} & {
  en: string; // Enforce that 'en' always exists as base fallback
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
  if (!obj) {
    return '';
  }
  return obj[locale] || obj['en'] || '';
};
