const locales = ['en', 'hu'] as const;
const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

/**
 * Global Site Configuration
 * Centralizing constant values used across the application.
 */
export const siteConfig = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-30',
    revalidate: 3600,
  },
  openai: {
    model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  },
  i18n: {
    locales,
    defaultLocale,
  },
} as const;

export type SiteConfig = typeof siteConfig;
