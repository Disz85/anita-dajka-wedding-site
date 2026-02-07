import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container/container.component';
import { routing } from '@/i18n/i18n.routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'footer' });
  return { title: t('legalImpressum') };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'footer' });
  const placeholder = t('legalImpressumPlaceholder');
  return (
    <main className="min-h-screen py-16">
      <Container>
        <h1 className="font-heading text-2xl uppercase tracking-wider text-primary">
          {t('legalImpressum')}
        </h1>
        <p className="mt-4 font-body text-primary/80">{placeholder}</p>
      </Container>
    </main>
  );
}
