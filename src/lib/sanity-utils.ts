import { LocalizedString } from '@/sanity/queries/home.queries';

/**
 * Safely extracts a localized string from a Sanity object.
 * Returns the requested locale version, or falls back to 'hu', or returns undefined.
 */
export const getLocalizedValue = (
  value: LocalizedString | undefined | null,
  locale: string,
): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (locale === 'hu') {
    return value.hu ?? value.en;
  }

  if (locale === 'en') {
    return value.en ?? value.hu;
  }

  return value.hu ?? value.en;
};
