'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container.component';
import { MobileMenuProps } from '../types/header.types';
import { MobileMenuBody } from './mobile-menu-body.component';
import { MobileMenuFooter } from './mobile-menu-footer.component';
import {
  menuContentLayerVariants,
  menuIntroLayerVariants,
} from '../animations/mobile-menu.variants';

export const MobileMenu = ({
  isOpen,
  navigation,
  settings,
  locale,
}: MobileMenuProps): React.JSX.Element => {
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
            aria-label="Mobile Navigation"
            variants={menuContentLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden fixed left-0 top-0 h-screen w-full bg-white text-primary z-[60] flex flex-col"
          >
            <div className="h-20 flex-shrink-0" aria-hidden="true" />

            <div className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y">
              <Container className="flex min-h-full flex-col justify-between pb-10 pt-4">
                <MobileMenuBody navigation={navigation} locale={locale} />
                <MobileMenuFooter settings={settings} />
              </Container>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};
