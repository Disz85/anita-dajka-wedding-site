import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/fetch';
import { getPageBySlugQuery, type PageData } from '@/sanity/queries/page.queries';
import { SectionRenderer } from '@/components/sections/section-renderer.component';
import { PageHeader } from '@/components/ui/page-header/page-header.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { SlugPageProps } from './page.types';

export const revalidate = 60;

export const generateMetadata = async ({ params }: SlugPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = await sanityFetch<PageData>(getPageBySlugQuery, {
    slug: Array.isArray(slug) ? slug.join('/') : slug,
  });

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    openGraph: page.seo?.image
      ? {
          images: [{ url: page.seo.image }],
        }
      : undefined,
  };
};

const Page = async ({ params }: SlugPageProps) => {
  const { slug, locale } = await params;
  const page = await sanityFetch<PageData>(getPageBySlugQuery, {
    slug: Array.isArray(slug) ? slug.join('/') : slug,
  });

  if (!page) {
    notFound();
  }

  const hasPageHeader = page.subtitle || page.description;
  const currentSubtitle = getLocalizedValue(page.subtitle, locale);

  return (
    <main className="pt-20 xl:pt-0">
      {hasPageHeader && (
        <PageHeader title={page.title} subtitle={currentSubtitle} description={page.description} />
      )}
      <SectionRenderer sections={page.sections} />
    </main>
  );
};

export default Page;
