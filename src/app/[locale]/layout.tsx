import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import { sanityFetch } from '@/lib/sanity.fetch';
import { headerQuery, settingsQuery } from '@/lib/queries';
import type { HeaderData, SiteSettings } from '@/lib/queries';
import { cormorant, lora, proza, raleway } from '../fonts';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

/**
 * Locale Layout Component
 *
 * This layout wraps all pages for a specific locale.
 * It handles:
 * - HTML lang attribute based on locale
 * - Global Font injection (CSS variables)
 * - NextIntlClientProvider for translations
 * - Server-side CMS data fetching for header and settings
 * - Global styles application
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch messages and CMS data in parallel
  const [messages, headerData, settings] = await Promise.all([
    getMessages(),
    sanityFetch<HeaderData | null>(headerQuery, {}, { tags: ['header'] }),
    sanityFetch<SiteSettings>(settingsQuery, {}, { tags: ['settings'] }),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${lora.variable} ${proza.variable} ${raleway.variable} font-body text-primary antialiased bg-background`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header data={headerData} settings={settings} locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
