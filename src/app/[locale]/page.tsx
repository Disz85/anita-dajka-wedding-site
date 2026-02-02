import { setRequestLocale } from 'next-intl/server';
import { getSiteSettings } from '@/data-access/settings';

type Props = {
  params: Promise<{ locale: string }>;
};

// Next.js components are async by default in the app directory for data fetching
export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch data using Data Access Layer
  const settings = await getSiteSettings();

  const siteTitle = settings?.siteTitle ?? 'Waiting for CMS content...';
  const siteDescription = settings?.siteDescription;
  const hasDescription = typeof siteDescription === 'string' && siteDescription !== '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">{siteTitle}</h1>

      {hasDescription ? (
        <p className="mt-6 text-2xl text-gray-600 max-w-2xl">{siteDescription}</p>
      ) : null}

      <div className="mt-12 text-sm text-gray-400">(Adatok a Sanity CMS-ből • Cache: 60s)</div>
    </main>
  );
}
