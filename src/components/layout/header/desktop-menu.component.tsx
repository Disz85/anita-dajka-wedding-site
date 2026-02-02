'use client';

import React from 'react';
import { Link } from '@/i18n/i18n.navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo.component';
import { LanguageSwitcher } from '@/components/ui/language-switcher.component';
import type { DesktopMenuProps } from './types/header.types';
import type { NavLink } from '@/sanity/queries';
import { getLocalizedText } from '@/lib/i18n.utils';

const baseLinkClassName =
  'font-nav text-xs uppercase tracking-[0.2em] transition-opacity duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

const highlightedLinkClassName =
  'group relative font-nav text-xs uppercase tracking-[0.2em] border border-primary/40 px-4 py-1.5 overflow-hidden transition-all duration-300 hover:border-primary hover:text-white focus:border-primary focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 before:content-[""] before:absolute before:inset-0 before:bg-primary before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 focus:before:scale-y-100';

const NavItem = ({ item, locale }: { item: NavLink; locale: string }): React.JSX.Element => {
  const label = getLocalizedText(item.label, locale);
  const className = item.isHighlighted
    ? highlightedLinkClassName
    : cn(baseLinkClassName, 'hover:opacity-60');

  const content = item.isHighlighted ? <span className="relative z-10">{label}</span> : label;

  if (item.isExternal) {
    return (
      <a href={item.href || '#'} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href || '#'} className={className}>
      {content}
    </Link>
  );
};

export const DesktopMenu = ({
  leftNavigation,
  rightNavigation,
  logoUrl,
  logoAlt,
  locale,
}: DesktopMenuProps): React.JSX.Element => {
  return (
    <div className="hidden xl:flex items-center w-full">
      <nav id="desktop-menu" aria-label="Main Navigation" className="flex items-center w-full">
        <div className="flex-1 flex justify-end pr-8 md:pr-12">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {leftNavigation.map((item, index) => (
              <li key={`left-${index}`}>
                <NavItem item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0">
          <Logo logoUrl={logoUrl} logoAlt={logoAlt} />
        </div>

        <div className="flex-1 flex justify-start items-center gap-6 pl-8 md:pl-12">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {rightNavigation.map((item, index) => (
              <li key={`right-${index}`}>
                <NavItem item={item} locale={locale} />
              </li>
            ))}
          </ul>

          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </div>
  );
};
