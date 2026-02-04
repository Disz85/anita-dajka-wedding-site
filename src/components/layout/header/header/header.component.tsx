'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { getLocalizedText } from '@/lib/i18n.utils';
import { Container } from '@/components/ui/container/container.component';
import { Hamburger } from '../hamburger/hamburger.component';
import { MobileMenu } from '../mobile-menu/mobile-menu.component';
import { DesktopMenu } from '../desktop-menu/desktop-menu.component';
import { Logo } from '../logo/logo.component';
import { LanguageSwitcher } from '@/components/ui/language-switcher/language-switcher.component';
import { motion } from 'framer-motion';
import { urlForImage } from '@/sanity/image';
import { headerItemVariants } from '../mobile-menu/mobile-menu.variants';
import type { HeaderProps } from './header.types';

export const Header = ({ data, settings, locale }: HeaderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const leftNavigation = data?.leftNavigation ?? [];
  const rightNavigation = data?.rightNavigation ?? [];
  const logo = data?.logo;
  const logoUrl =
    logo !== undefined && logo !== null && logo.asset !== undefined && logo.asset !== null
      ? urlForImage(logo).url()
      : null;
  const logoAlt = getLocalizedText(data?.logoAlt, locale);

  const allNavigation = [...leftNavigation, ...rightNavigation];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-gray-100">
      <Container className="flex items-center justify-between h-20">
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={headerItemVariants}
          className="xl:hidden relative z-100"
        >
          <Logo variant={isOpen ? 'overlay' : 'default'} logoUrl={logoUrl} logoAlt={logoAlt} />
        </motion.div>

        <DesktopMenu
          leftNavigation={leftNavigation}
          rightNavigation={rightNavigation}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          locale={locale}
        />

        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={headerItemVariants}
          className="xl:hidden relative z-100"
        >
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="mobile" />
            <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </motion.div>
      </Container>

      <MobileMenu isOpen={isOpen} navigation={allNavigation} settings={settings} locale={locale} />
    </header>
  );
};
