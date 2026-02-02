'use client';

import React from 'react';
import { Link } from '@/i18n/i18n.navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo.component';
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
    <div className="hidden md:flex items-center justify-center w-full gap-8">
      <nav id="desktop-menu" aria-label="Main Navigation" className="contents">
        {/* Left navigation */}
        <ul className="flex items-center gap-6 list-none m-0 p-0 order-1">
          {leftNavigation.map((item, index) => (
            <li key={`left-${index}`}>
              <NavItem item={item} locale={locale} />
            </li>
          ))}
        </ul>

        {/* Right navigation */}
        <ul className="flex items-center gap-6 list-none m-0 p-0 order-3">
          {rightNavigation.map((item, index) => (
            <li key={`right-${index}`}>
              <NavItem item={item} locale={locale} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Centered logo */}
      <Logo className="order-2" logoUrl={logoUrl} logoAlt={logoAlt} />
    </div>
  );
};
