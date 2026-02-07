import { setRequestLocale } from 'next-intl/server';
import { getSiteSettings } from '@/data-access/settings';
import { getHomeHighlights } from '@/data-access/home';
import { Hero } from '@/components/sections/hero/hero.component';
import { Highlights } from '@/components/sections/highlights/highlights.component';
import { Video } from '@/components/sections/video/video.component';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch data using Data Access Layer
  const [, homeData] = await Promise.all([getSiteSettings(), getHomeHighlights()]);

  return (
    <main className="min-h-screen">
      <Hero data={homeData?.heroSection} />
      <Highlights data={homeData?.highlightsSection} />
      <Video data={homeData?.videoSection} />
    </main>
  );
}
