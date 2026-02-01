'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { MobileMenuProps } from '../types/header.types';
import { MobileMenuBody } from './mobile-menu-body';
import { MobileMenuFooter } from './mobile-menu-footer';
import {
  menuContentLayerVariants,
  menuIntroLayerVariants,
} from '../animations/mobile-menu.variants';

export const MobileMenu = ({ isOpen }: MobileMenuProps): React.JSX.Element => {
  const t = useTranslations('navigation');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={menuIntroLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full bg-black z-[60]"
            aria-hidden="true"
          />

          <motion.nav
            id="mobile-menu"
            aria-label={t('mainNavigation')}
            variants={menuContentLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden fixed left-0 top-0 h-screen w-full bg-white text-primary z-[60]"
          >
            <Container className="flex h-full flex-col overflow-y-auto">
              <div className="flex min-h-full w-full flex-col justify-between pt-24 pb-10">
                <MobileMenuBody />
                <MobileMenuFooter />
              </div>
            </Container>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};
