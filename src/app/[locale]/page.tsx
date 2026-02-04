import { setRequestLocale } from 'next-intl/server';
import { getSiteSettings } from '@/data-access/settings';
import { getHomeHighlights } from '@/data-access/home';
import { Highlights } from '@/components/sections/highlights/highlights.component';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch data using Data Access Layer
  const [settings, homeData] = await Promise.all([getSiteSettings(), getHomeHighlights()]);

  return (
    <main className="min-h-screen">
      <Highlights data={homeData?.highlightsSection} />
    </main>
  );
}
