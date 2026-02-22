'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getLocalizedText } from '@/lib/i18n.utils';
import { Container } from '@/components/ui/container/container.component';
import { Hamburger } from '../hamburger/hamburger.component';
import { MobileMenu } from '../mobile-menu/mobile-menu.component';
import { DesktopMenu } from '../desktop-menu/desktop-menu.component';
import { Logo } from '../logo/logo.component';
import { LanguageSwitcher } from '@/components/layout/header/language-switcher/language-switcher.component';
import { motion, AnimatePresence } from 'framer-motion';
import { urlForImage } from '@/sanity/image';
import { useScrollDirection } from '@/hooks/use-scroll-direction/use-scroll-direction.hook';
import type { HeaderProps } from './header.types';

export const Header = ({ data, settings, locale }: HeaderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isScrolled } = useScrollDirection({
    threshold: 10,
    scrollThreshold: 100,
  });

  const leftNavigation = data?.leftNavigation ?? [];
  const rightNavigation = data?.rightNavigation ?? [];
  const logo = data?.logo;
  const logoUrl =
    logo !== undefined && logo !== null && logo.asset !== undefined && logo.asset !== null
      ? urlForImage(logo).url()
      : null;
  const logoAlt = getLocalizedText(data?.logoAlt, locale);

  const allNavigation = [...leftNavigation, ...rightNavigation];
  const showStickyHamburger = isScrolled;

  return (
    <>
      <header
        className={cn(
          'top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-gray-100 transition-transform duration-300',
          'xl:absolute',
          isScrolled ? 'xl:-translate-y-full' : 'xl:translate-y-0',
          'fixed xl:relative',
        )}
      >
        <Container className="flex items-center justify-between h-20">
          <DesktopMenu
            leftNavigation={leftNavigation}
            rightNavigation={rightNavigation}
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            locale={locale}
          />

          <div className="xl:hidden w-24" aria-hidden="true" />
        </Container>
      </header>

      <div className="xl:hidden fixed top-0 left-0 right-0 h-20 z-70 flex items-center justify-between px-4">
        <Logo variant={isOpen ? 'overlay' : 'default'} logoUrl={logoUrl} logoAlt={logoAlt} />
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="mobile" />
          <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      <AnimatePresence>
        {showStickyHamburger && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="hidden xl:flex fixed top-6 right-6 z-70 items-center gap-4"
          >
            <LanguageSwitcher variant="mobile" />
            <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Logo - Desktop only */}
      <AnimatePresence>
        {showStickyHamburger && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="hidden xl:flex fixed top-6 left-6 z-70 items-center"
          >
            <Logo variant="default" logoUrl={logoUrl} logoAlt={logoAlt} />
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigation={allNavigation}
        settings={settings}
        locale={locale}
      />
    </>
  );
};
