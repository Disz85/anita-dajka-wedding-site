import { setRequestLocale } from 'next-intl/server';
import { getPortfolioPageData } from '@/data-access/portfolio';
import { PageHeader } from '@/components/ui/page-header/page-header.component';
import { PortfolioCategories } from '@/components/sections/portfolio/portfolio-categories.component';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/page.types';
import { getLocalizedValue } from '@/lib/sanity-utils';

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const portfolioData = await getPortfolioPageData();

  if (!portfolioData) {
    notFound();
  }

  const title = getLocalizedValue(portfolioData.title, locale) || '';
  const subtitle = getLocalizedValue(portfolioData.subtitle, locale) || '';

  return (
    <main className="min-h-screen">
      <PageHeader title={title} subtitle={subtitle} description={portfolioData.description} />
      <PortfolioCategories items={portfolioData.items} />
    </main>
  );
}
