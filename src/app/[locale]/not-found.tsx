import { Link } from '@/i18n/i18n.navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-6 text-2xl text-gray-600">{t('message')}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-white hover:bg-secondary transition-colors"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
