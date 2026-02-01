import { setRequestLocale } from 'next-intl/server';
import { client } from '@/lib/sanity';

// GROQ query to fetch the settings singleton
const SETTINGS_QUERY = `*[_type == "settings"][0]`;

interface Settings {
  siteTitle?: string;
  siteDescription?: string;
}

type Props = {
  params: Promise<{ locale: string }>;
};

// Next.js components are async by default in the app directory for data fetching
export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch data with ISR (Incremental Static Regeneration)
  // Revalidate at most every 60 seconds
  const settings = await client.fetch<Settings>(SETTINGS_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        {settings?.siteTitle || 'Waiting for CMS content...'}
      </h1>

      {settings?.siteDescription && (
        <p className="mt-6 text-2xl text-gray-600 max-w-2xl">{settings.siteDescription}</p>
      )}

      <div className="mt-12 text-sm text-gray-400">(Adatok a Sanity CMS-ből • Cache: 60s)</div>
    </main>
  );
}
