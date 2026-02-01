'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Hamburger } from './hamburger';
import { MobileMenu } from './mobile-menu/mobile-menu';
import { DesktopMenu } from './desktop-menu';
import { Logo } from './logo';
import type { HeaderProps } from './types/header.types';

export const Header = ({ data, settings, locale }: HeaderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Extract data with fallbacks for when CMS data is not available
  const leftNavigation = data?.leftNavigation ?? [];
  const rightNavigation = data?.rightNavigation ?? [];
  const logoUrl = data?.logo?.asset?.url ?? null;
  const logoAlt = locale === 'hu' ? data?.logoAlt?.hu : data?.logoAlt?.en;

  // Combine all navigation for mobile menu
  const allNavigation = [...leftNavigation, ...rightNavigation];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-gray-100">
      <Container className="flex items-center justify-between h-20">
        <Logo
          variant={isOpen ? 'overlay' : 'default'}
          className={cn('md:hidden z-50', isOpen && 'z-[100] relative')}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
        />
        <DesktopMenu
          leftNavigation={leftNavigation}
          rightNavigation={rightNavigation}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          locale={locale}
        />
        <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="md:hidden" />
      </Container>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isOpen} navigation={allNavigation} settings={settings} locale={locale} />
    </header>
  );
};
