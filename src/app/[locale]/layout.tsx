import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header/header/header.component';
import { routing } from '@/i18n/i18n.routing';
import { getHeaderData } from '@/data-access/header';
import { getFooterData } from '@/data-access/footer';
import { getSiteSettings } from '@/data-access/settings';
import { Footer } from '@/components/layout/footer/footer.component';
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
  const [messages, settings] = await Promise.all([
    (await import(`../../../messages/${locale}.json`)).default,
    getSiteSettings(),
  ]);

  return {
    title: {
      template: `%s | ${settings?.siteTitle || messages.metadata.title}`,
      default: settings?.siteTitle || messages.metadata.title,
    },
    description: settings?.siteDescription || messages.metadata.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const localeSet = new Set(routing.locales as readonly string[]);
  if (!localeSet.has(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, headerData, footerData, settings] = await Promise.all([
    getMessages(),
    getHeaderData(),
    getFooterData(),
    getSiteSettings(),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${lora.variable} ${proza.variable} ${raleway.variable} font-body text-primary antialiased bg-background`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header data={headerData} settings={settings} locale={locale} />
          {children}
          <Footer data={footerData} settings={settings} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
