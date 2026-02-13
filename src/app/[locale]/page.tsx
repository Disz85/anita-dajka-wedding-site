import { setRequestLocale } from 'next-intl/server';
import { getSiteSettings } from '@/data-access/settings';
import { getHomePageData } from '@/data-access/home';
import { Hero } from '@/components/sections/hero/hero.component';
import { Introduction } from '@/components/sections/introduction/introduction.component';
import { Highlights } from '@/components/sections/highlights/highlights.component';
import { Video } from '@/components/sections/video/video.component';
import { Testimonials } from '@/components/sections/testimonials/testimonials.component';
import { PageProps } from '@/types/page.types';

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const [, homeData] = await Promise.all([getSiteSettings(), getHomePageData()]);

  return (
    <main className="min-h-screen relative">
      <Hero data={homeData?.heroSection} />
      <Highlights data={homeData?.highlightsSection} />
      <Video data={homeData?.videoSection} />
      <Introduction data={homeData?.introductionSection} />
      <Testimonials data={homeData?.testimonialsSection} />
    </main>
  );
}
