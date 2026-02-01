'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';

type MenuItemKey = 'home' | 'about' | 'weddings' | 'portfolio' | 'journal' | 'contact';

interface MenuItem {
  key: MenuItemKey;
  href: string;
}

const leftMenuItems: MenuItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'weddings', href: '/weddings' },
];

const rightMenuItems: MenuItem[] = [
  { key: 'portfolio', href: '/portfolio' },
  { key: 'journal', href: '/journal' },
];

const linkClassName =
  'font-nav text-xs uppercase tracking-[0.2em] hover:opacity-60 transition-opacity duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const DesktopMenu = (): React.JSX.Element => {
  const t = useTranslations('navigation');

  return (
    <div className="hidden md:flex items-center justify-center w-full gap-8">
      <nav id="desktop-menu" aria-label={t('mainNavigation')} className="contents">
        <ul className="flex items-center gap-6 list-none m-0 p-0 order-1">
          {leftMenuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClassName}>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-6 list-none m-0 p-0 order-3">
          {rightMenuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClassName}>
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="group relative font-nav text-xs uppercase tracking-[0.2em] border border-primary/40 px-4 py-1.5 overflow-hidden transition-all duration-300 hover:border-primary hover:text-white focus:border-primary focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 before:content-[''] before:absolute before:inset-0 before:bg-primary before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 focus:before:scale-y-100"
            >
              <span className="relative z-10">{t('contact')}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Logo className="order-2" />
    </div>
  );
};
